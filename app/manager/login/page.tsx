import { redirect } from "next/navigation";

export default function LegacyManagerLoginRedirect() {
  redirect("/manager-login");
}
