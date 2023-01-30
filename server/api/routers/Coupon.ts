import express from 'express';
import { getCoupon } from '../handlers/Coupon';

const couponRouter = express.Router();

couponRouter.get("/", getCoupon);

export default couponRouter;
