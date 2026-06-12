"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Edit, Eye, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { schemas } from "@/lib/manager/validation";
import Link from "next/link";
import {
  defaultResourceValues,
  FieldConfig,
  ResourceName,
  resourceColumns,
  resourceFields,
  resourceTitles,
} from "@/lib/manager/resources";
import { cn } from "@/lib/utils";

type Row = Record<string, any> & { id: string };

type Props = {
  resource: ResourceName;
  initialRows: Row[];
  options?: {
    plans?: { label: string; value: string }[];
    members?: { label: string; value: string }[];
    branches?: { label: string; value: string }[];
    trainers?: { label: string; value: string }[];
    equipment?: { label: string; value: string }[];
  };
};

export function ResourcePage({ resource, initialRows, options = {} }: Props) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [editing, setEditing] = useState<Row | null>(null);
  const [viewing, setViewing] = useState<Row | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fields = resourceFields(options)[resource];
  const columns = resourceColumns[resource];
  const meta = resourceTitles[resource];

  const form = useForm({
    resolver: zodResolver(schemas[resource]),
    defaultValues: defaultResourceValues[resource],
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const textMatch = Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase());
      const statusMatch =
        filter === "ALL" || row.status === filter || row.category === filter || row.method === filter;
      return textMatch && statusMatch;
    });
  }, [rows, query, filter]);

  const filterOptions = useMemo(() => {
    const values = new Set<string>();
    rows.forEach((row) => {
      if (row.status) values.add(row.status);
      if (row.category) values.add(row.category);
      if (row.method) values.add(row.method);
    });
    return ["ALL", ...Array.from(values)];
  }, [rows]);

  function openCreate() {
    setEditing(null);
    form.reset(defaultResourceValues[resource]);
    setFormOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    form.reset({ ...defaultResourceValues[resource], ...row });
    setFormOpen(true);
  }

  async function refreshRows() {
    const response = await fetch(`/api/manager/${resource}`);
    const data = await response.json();
    setRows(data.rows || []);
  }

  function submit(data: Record<string, unknown>) {
    startTransition(async () => {
      const response = await fetch(`/api/manager/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: editing ? "update" : "create", id: editing?.id, data }),
      });
      if (!response.ok) {
        const payload = await response.json();
        alert(payload.error || "Unable to save.");
        return;
      }
      const payload = await response.json();
      setRows(payload.rows || rows);
      setFormOpen(false);
      setEditing(null);
    });
  }

  function remove(row: Row) {
    if (!confirm(`Delete ${row.fullName || row.name || row.title || "record"}?`)) return;
    startTransition(async () => {
      const response = await fetch(`/api/manager/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: row.id }),
      });
      if (!response.ok) {
        const payload = await response.json();
        alert(payload.error || "Unable to delete.");
        return;
      }
      await refreshRows();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{meta.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">{meta.description}</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          {meta.cta}
        </button>
      </div>

      <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-[1fr_220px]">
        <label className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-lg border border-white/10 bg-black/60 pl-10 pr-3 text-sm outline-none focus:border-primary"
            placeholder={`Search ${meta.title.toLowerCase()}`}
          />
        </label>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm outline-none focus:border-primary"
        >
          {filterOptions.map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-background-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase text-text-secondary">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-3 font-semibold">
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.03]">
                  {columns.map((column) => (
                    <td key={column.key} className="whitespace-nowrap px-4 py-3 text-text-secondary">
                      <Cell value={row[column.key]} />
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {resource === "members" && (
                        <Link
                          href={`/manager-dashboard/members/${row.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white"
                          title="Profile"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      {resource !== "members" && (
                        <IconButton label="View" onClick={() => setViewing(row)} icon={<Eye className="h-4 w-4" />} />
                      )}
                      {resource === "payments" && row.id && (
                        <a
                          href={`/api/manager/receipts/${row.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white"
                          title="Download Receipt"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      )}
                      <IconButton label="Edit" onClick={() => openEdit(row)} icon={<Edit className="h-4 w-4" />} />
                      <IconButton label="Delete" onClick={() => remove(row)} icon={<Trash2 className="h-4 w-4" />} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-text-secondary" colSpan={columns.length + 1}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {formOpen && (
        <Panel title={editing ? `Edit ${meta.title}` : meta.cta} onClose={() => setFormOpen(false)}>
          <form onSubmit={form.handleSubmit(submit)} className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <Field key={field.name} field={field} form={form} />
            ))}
            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="h-11 rounded-lg border border-white/10 px-4 text-sm text-text-secondary hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </Panel>
      )}

      {viewing && (
        <Panel title={viewing.fullName || viewing.name || viewing.title || "Profile"} onClose={() => setViewing(null)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(viewing)
              .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
              .map(([key, value]) => (
                <div key={key} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs uppercase text-text-muted">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-1 break-words text-sm text-white">
                    <Cell value={value} />
                  </p>
                </div>
              ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

function Field({ field, form }: { field: FieldConfig; form: ReturnType<typeof useForm> }) {
  const error = form.formState.errors[field.name]?.message as string | undefined;
  const commonClass =
    "min-h-11 w-full rounded-lg border border-white/10 bg-black/60 px-3 text-sm outline-none focus:border-primary";

  return (
    <label className={cn("space-y-2", field.type === "textarea" && "sm:col-span-2")}>
      <span className="text-sm font-medium text-text-secondary">{field.label}</span>
      {field.type === "select" ? (
        <select {...form.register(field.name)} className={commonClass}>
          <option value="">Select</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea {...form.register(field.name)} rows={4} className={commonClass} />
      ) : field.type === "checkbox" ? (
        <input {...form.register(field.name)} type="checkbox" className="h-5 w-5 rounded border-white/10 accent-primary" />
      ) : (
        <input {...form.register(field.name)} type={field.type} className={commonClass} />
      )}
      {error && <span className="text-xs text-primary">{error}</span>}
    </label>
  );
}

function Cell({ value }: { value: unknown }) {
  if (typeof value === "boolean") return <>{value ? "Yes" : "No"}</>;
  if (typeof value === "number") return <>{value.toLocaleString("en-IN")}</>;
  if (value === null || value === undefined || value === "") return <>-</>;
  return <>{String(value).replaceAll("_", " ")}</>;
}

function IconButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white"
    >
      {icon}
    </button>
  );
}

function Panel({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm">
      <div className="mx-auto flex max-h-[92vh] w-full max-w-3xl flex-col rounded-lg border border-white/10 bg-[#090909] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
