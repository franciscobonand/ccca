import { Request, Response } from 'express';
import Database from '../../db/Interface';
import { HandlerFunc } from './Handler';
import Address from '../../entity/Address';

export function getAddress(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("getting address", id);
        try {
            const address = await db.getAddress(id);
            resp.status(200).json(address);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Address not found");
        }
    }
};

export function createAddress(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const body = req.body;
        console.log("creating new address"); 
        try {
            const address = new Address(
                "",
                body.postalcode,
            );
            const dbResponse = await db.createAddress(address);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to create address");
        }
    }
};

export function updateAddress(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        const body = req.body;
        console.log("updating address"); 
        try {
            const address = new Address(
                "",
                body.postalcode,
            );
            const dbResponse = await db.updateAddress(id, address);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to update address");
        }
    }
};

export function deleteAddress(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("deleting address", id);
        try {
            await db.deleteAddress(id);
            resp.sendStatus(204);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Address not found");
        }
    }
};
