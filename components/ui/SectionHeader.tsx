import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  badge?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
  badge,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          {badge}
        </span>
      )}
      <h2 className="section-title">
        {align === "center" ? (
          <>
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">
              {title.split(" ").slice(-1)[0]}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "section-subtitle",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
