/**
 * FAT/exFAT USB drives on Windows throw EISDIR when readlink() is called on
 * regular files. Webpack handles EINVAL as "not a symlink"; remap EISDIR.
 */
const fs = require("fs");
const Module = require("module");

function toEINVAL(err) {
  const mapped = new Error(err.message);
  mapped.code = "EINVAL";
  mapped.errno = err.errno;
  mapped.syscall = err.syscall;
  mapped.path = err.path;
  return mapped;
}

function patchReadlink(target) {
  if (!target || target.__fatReadlinkPatched) return;
  target.__fatReadlinkPatched = true;

  const originalReadlink = target.readlink;
  const originalReadlinkSync = target.readlinkSync;

  if (originalReadlink) {
    target.readlink = function patchedReadlink(filePath, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = undefined;
      }
      return originalReadlink.call(this, filePath, options, (err, result) => {
        if (err && err.code === "EISDIR") {
          callback(toEINVAL(err));
          return;
        }
        callback(err, result);
      });
    };
  }

  if (originalReadlinkSync) {
    target.readlinkSync = function patchedReadlinkSync(filePath, options) {
      try {
        return originalReadlinkSync.call(this, filePath, options);
      } catch (err) {
        if (err && err.code === "EISDIR") {
          throw toEINVAL(err);
        }
        throw err;
      }
    };
  }

  if (target.promises?.readlink) {
    const originalPromiseReadlink = target.promises.readlink.bind(target.promises);
    target.promises.readlink = async function patchedPromiseReadlink(filePath, options) {
      try {
        return await originalPromiseReadlink(filePath, options);
      } catch (err) {
        if (err && err.code === "EISDIR") {
          throw toEINVAL(err);
        }
        throw err;
      }
    };
  }
}

patchReadlink(fs);

const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  const exported = originalLoad.apply(this, arguments);
  if (request === "graceful-fs" || request.endsWith("/graceful-fs")) {
    patchReadlink(exported);
  }
  return exported;
};
