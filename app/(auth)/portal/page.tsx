import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Member Portal",
  description:
    "AAMDAR Fitness Club member portal. Track progress, view membership status, and renew online.",
  path: "/portal",
});

export default function PortalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold">Member Portal</h1>
        <p className="mt-4 text-text-secondary">
          Login with your phone number to access your membership dashboard.
        </p>
      </div>
    </div>
  );
}
