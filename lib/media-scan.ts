import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

export interface FolderImage {
  src: string;
  name: string;
  alt: string;
  fileName: string;
}

/** Convert a file name like "Leg-Press-Machine.jpg" → "Leg Press Machine" */
export function fileNameToLabel(fileName: string): string {
  const base = path.parse(fileName).name;
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Scan a folder under /public and return all image assets.
 * Drop new images into public/Equipment or public/images/gym-tour — no code changes needed.
 */
export function getImagesFromPublicFolder(
  folderPath: string,
  altPrefix = "Aamdar Fitness Club"
): FolderImage[] {
  const absoluteDir = path.join(process.cwd(), "public", folderPath);

  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((entry) => {
      const label = fileNameToLabel(entry.name);
      const urlPath = `/${folderPath.split(path.sep).join("/")}/${entry.name}`;
      return {
        src: urlPath,
        name: label,
        alt: `${label} at ${altPrefix}`,
        fileName: entry.name,
      };
    });
}

export function getEquipmentImages(): FolderImage[] {
  return getImagesFromPublicFolder("Equipment", "Aamdar Fitness Club");
}

export function getGymTourImages(): FolderImage[] {
  return getImagesFromPublicFolder("images/gym-tour", "Aamdar Fitness Club");
}
