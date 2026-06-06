import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Owner Dashboard",
  description: "AAMDAR Fitness Club owner dashboard for member and gym management.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <p className="mt-4 text-text-secondary">
          Admin login required. Manage members, plans, and gym operations.
        </p>
      </div>
    </div>
  );
}
