import { createResourceHandlers } from "@/lib/manager/crud";

const handlers = createResourceHandlers("diet-plans");
export const GET = handlers.GET;
export const POST = handlers.POST;
