import { createResourceHandlers } from "@/lib/manager/crud";

const handlers = createResourceHandlers("trainer-salaries");
export const GET = handlers.GET;
export const POST = handlers.POST;
