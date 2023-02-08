import {Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate =
    (schema: AnyZodObject) =>
async (req: Request, resp: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        return resp.status(400).json(error);
    } 
};
