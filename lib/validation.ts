import { z } from "zod";

export const loginSchema = z.object({
    phone: z
        .string()
        .min(11, "شماره باید 11 رقم باشد")
        .regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد"),
});
