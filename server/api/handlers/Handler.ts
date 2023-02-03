import express from 'express';
import Database from '../../db/Interface';
import { getCoupon, createCoupon, updateCoupon, deleteCoupon } from './Coupon';

export type HandlerFunc = (req: express.Request, resp: express.Response) => void;

export class Handler {
    constructor(readonly db: Database){}

    couponHandler(): express.Router {
        const couponRouter = express.Router();
        couponRouter.get("/:id", getCoupon(this.db));
        couponRouter.post("/", createCoupon(this.db));
        couponRouter.put("/", updateCoupon(this.db));
        couponRouter.delete("/:id", deleteCoupon(this.db));
        return couponRouter;
    }
}
