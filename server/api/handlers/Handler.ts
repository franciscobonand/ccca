import express from 'express';
import Database from '../../db/Interface';
import { getCoupon } from './Coupon';

export default class Handler {
    constructor(readonly db: Database){}

    couponHandler(): express.Router {
        const couponRouter = express.Router();
        couponRouter.get("/:id", getCoupon(this.db));
        return couponRouter;
    }
}
