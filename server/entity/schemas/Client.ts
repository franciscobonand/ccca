import { z } from "zod";

export const clientQuerySchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
});

const clientCommandSchema = z.object({
    fullname: z.string({
        required_error: "'fullname' is required",
    }),
    cpf: z.string({
        required_error: "'cpf' is required",
    }).min(11).max(14),
    addresses: z.object({
        id: z.string().optional(),
        postalcode: z.string({
            required_error: "'postalcode' is required",
        })
    }).array().nonempty("'addresses' is required"),
});

export const clientCreateSchema = z.object({
    body: clientCommandSchema,
});

export const clientUpdateSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID is required",
        }),
    }),
    body: clientCommandSchema,
});
