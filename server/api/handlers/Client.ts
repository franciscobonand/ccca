import { Request, Response } from 'express';
import Database from '../../db/Interface';
import { HandlerFunc } from './Handler';
import Client from '../../entity/Client';
import Address from '../../entity/Address';

export function getClient(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("getting client", id);
        try {
            const client = await db.getClient(id);
            resp.status(200).json(client);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Client not found");
        }
    }
};

export function createClient(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const body = req.body;
        console.log("creating new client"); 
        try {
            const client = new Client(
                "",
                body.fullname,
                body.cpf,
            );
            const dbResponse = await db.createClient(client);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to create client");
        }
    }
};

export function updateClient(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        const body = req.body;
        console.log("updating client"); 
        try {
            const client = new Client(
                "",
                body.fullname,
                body.cpf,
            );
            const dbResponse = await db.updateClient(id, client);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to update client");
        }
    }
};

export function deleteClient(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("deleting client", id);
        try {
            await db.deleteClient(id);
            resp.sendStatus(204);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Client not found");
        }
    }
};
