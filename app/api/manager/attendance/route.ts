import { createResourceHandlers } from "@/lib/manager/crud";

const handlers = createResourceHandlers("attendance");
export const GET = handlers.GET;
export const POST = handlers.POST;
