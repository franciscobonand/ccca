import { Request, Response } from 'express';
import Database from '../../db/Interface';
import { HandlerFunc } from './Handler';
import Product from '../../entity/Product';

export function getProduct(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("getting product", id);
        try {
            const product = await db.getProduct(id);
            resp.status(200).json(product);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Product not found");
        }
    }
};

export function createProduct(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const body = req.body;
        console.log("creating new product"); 
        try {
            const product = new Product(
                "",
                body.name,
                body.description,
                body.price,
                body.width,
                body.height,
                body.length,
                body.weight,
            );
            const dbResponse = await db.createProduct(product);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to create product");
        }
    }
};

export function updateProduct(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        const body = req.body;
        console.log("updating product"); 
        try {
            const product = new Product(
                id,
                body.name,
                body.description,
                body.price,
                body.width,
                body.height,
                body.length,
                body.weight,
            );
            const dbResponse = await db.updateProduct(id, product);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to update product");
        }
    }
};

export function deleteProduct(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("deleting product", id);
        try {
            await db.deleteProduct(id);
            resp.sendStatus(204);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Product not found");
        }
    }
};
