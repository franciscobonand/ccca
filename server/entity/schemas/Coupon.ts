import { z } from "zod";

export const couponQuerySchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
});

const couponCommandSchema = z.object({
    name: z.string({
        required_error: "'name' is required",
    }),
    discount: z.number({
        required_error: "'discount' is required",
    })
    .min(0.01, "'discount' must be greater than 0.01")
    .max(1, "'discount' must be at max 1"),
});

export const couponCreateSchema = z.object({
    body: couponCommandSchema,
});

export const couponUpdateSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
    body: couponCommandSchema,
});
