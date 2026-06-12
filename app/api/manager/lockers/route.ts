import { createResourceHandlers } from "@/lib/manager/crud";

const handlers = createResourceHandlers("lockers");
export const GET = handlers.GET;
export const POST = handlers.POST;
