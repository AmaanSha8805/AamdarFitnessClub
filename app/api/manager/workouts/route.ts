import { createResourceHandlers } from "@/lib/manager/crud";

const handlers = createResourceHandlers("workouts");
export const GET = handlers.GET;
export const POST = handlers.POST;
