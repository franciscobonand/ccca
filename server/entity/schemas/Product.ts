import { z } from "zod";

export const productQuerySchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
});

const productCommandSchema = z.object({
    name: z.string({
        required_error: "'name' is required",
    }),
    description: z.string({
        required_error: "'description' is required",
    }),
    price: z.number({
        required_error: "'price' is required",
    }).min(0.01, "'price' must be positive"),
}); 

export const productCreateSchema = z.object({
    body: productCommandSchema
});

export const productUpdateSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
    body: productCommandSchema,
});
