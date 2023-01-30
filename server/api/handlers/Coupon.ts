import { Request, Response } from 'express';
import Database from '../../db/Interface';

export function getCoupon(db: Database) {
    return function(req: Request, resp: Response) {
        const coupid = req.params.id
        resp.json({ message: coupid });
    }
};
