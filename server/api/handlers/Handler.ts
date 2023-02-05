import express from 'express';
import Database from '../../db/Interface';
import { getCoupon, createCoupon, updateCoupon, deleteCoupon } from './Coupon';
import { getProduct, createProduct, updateProduct, deleteProduct } from './Product';
import { getAddress, createAddress, updateAddress, deleteAddress } from './Address';
import { getClient, createClient, updateClient, deleteClient } from './Client';

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

    productHandler(): express.Router {
        const productRouter = express.Router();
        productRouter.get("/:id", getProduct(this.db));
        productRouter.post("/", createProduct(this.db));
        productRouter.put("/", updateProduct(this.db));
        productRouter.delete("/:id", deleteProduct(this.db));
        return productRouter;
    }

    addressHandler(): express.Router {
        const addressRouter = express.Router();
        addressRouter.get("/:id", getAddress(this.db));
        addressRouter.post("/", createAddress(this.db));
        addressRouter.put("/", updateAddress(this.db));
        addressRouter.delete("/:id", deleteAddress(this.db));
        return addressRouter;
    }

    clientHandler(): express.Router {
        const clientRouter = express.Router();
        clientRouter.get("/:id", getClient(this.db));
        clientRouter.post("/", createClient(this.db));
        clientRouter.put("/", updateClient(this.db));
        clientRouter.delete("/:id", deleteClient(this.db));
        return clientRouter;
    }
}
