import { z } from "zod";

export const addressQuerySchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
});

const addressCommandSchema = z.object({
    postalcode: z.string({
        required_error: "'postalcode' is required",
    }),
});

export const addressCreateSchema = z.object({
    body: addressCommandSchema,
});

export const addressUpdateSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
    body: addressCommandSchema,
});
