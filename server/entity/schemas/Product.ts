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
    width: z.number({
        required_error: "'width' is required",
    }).min(0.01, "'width' must be positive"),
    height: z.number({
        required_error: "'height' is required",
    }).min(0.01, "'height' must be positive"),
    length: z.number({
        required_error: "'length' is required",
    }).min(0.01, "'length' must be positive"),
    weight: z.number({
        required_error: "'weight' is required",
    }).min(0.01, "'weight' must be positive"),
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
