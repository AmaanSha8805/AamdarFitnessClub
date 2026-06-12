import { createResourceHandlers } from "@/lib/manager/crud";

const handlers = createResourceHandlers("exercises");
export const GET = handlers.GET;
export const POST = handlers.POST;
