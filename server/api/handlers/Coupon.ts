import { Request, Response } from 'express';
import Database from '../../db/Interface';
import { HandlerFunc } from './Handler';
import Coupon from '../../entity/Coupon';

export function getCoupon(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("getting coupon", id);
        try {
            const coupon = await db.getCoupon(id);
            resp.status(200).json(coupon);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Coupon not found");
        }
    }
};

export function createCoupon(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const body = req.body;
        console.log("creating new coupon"); 
        try {
            const coupon = new Coupon(
                "",
                body.name,
                body.discount,
                body.expireDate,
            );
            const dbResponse = await db.createCoupon(coupon);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to create coupon");
        }
    }
};

export function updateCoupon(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        const body = req.body;
        console.log("updating coupon"); 
        try {
            const coupon = new Coupon(
                "",
                body.name,
                body.discount,
                body.expireDate,
            );
            const dbResponse = await db.updateCoupon(id, coupon);
            resp.status(200).json(dbResponse);
        } catch (error) {
            console.log(error);
            resp.status(500).send("Failed to update coupon");
        }
    }
};

export function deleteCoupon(db: Database): HandlerFunc {
    return async function(req: Request, resp: Response) {
        const id = req.params.id;
        console.log("deleting coupon", id);
        try {
            await db.deleteCoupon(id);
            resp.sendStatus(204);
        } catch (error) {
            console.log(error);
            resp.status(404).send("Coupon not found");
        }
    }
};
