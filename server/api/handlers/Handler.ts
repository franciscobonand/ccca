import express from 'express';
import Database from '../../db/Interface';
import { validate } from "../../entity/schemas/Validator";
import { addressQuerySchema, addressCreateSchema, addressUpdateSchema } from "../../entity/schemas/Address";
import { couponQuerySchema, couponCreateSchema, couponUpdateSchema } from "../../entity/schemas/Coupon";
import { productQuerySchema, productCreateSchema, productUpdateSchema } from "../../entity/schemas/Product";
import { clientQuerySchema, clientCreateSchema, clientUpdateSchema } from "../../entity/schemas/Client";
import { getCoupon, createCoupon, updateCoupon, deleteCoupon } from './Coupon';
import { getProduct, createProduct, updateProduct, deleteProduct } from './Product';
import { getAddress, createAddress, updateAddress, deleteAddress } from './Address';
import { getClient, createClient, updateClient, deleteClient } from './Client';

export type HandlerFunc = (req: express.Request, resp: express.Response) => void;

export class Handler {
    constructor(readonly db: Database){}

    couponHandler(): express.Router {
        const couponRouter = express.Router();
        couponRouter.get("/:id", validate(couponQuerySchema), getCoupon(this.db));
        couponRouter.post("/", validate(couponCreateSchema), createCoupon(this.db));
        couponRouter.put("/:id", validate(couponUpdateSchema), updateCoupon(this.db));
        couponRouter.delete("/:id", validate(couponQuerySchema), deleteCoupon(this.db));
        return couponRouter;
    }

    productHandler(): express.Router {
        const productRouter = express.Router();
        productRouter.get("/:id", validate(productQuerySchema), getProduct(this.db));
        productRouter.post("/", validate(productCreateSchema), createProduct(this.db));
        productRouter.put("/:id", validate(productUpdateSchema), updateProduct(this.db));
        productRouter.delete("/:id", validate(productQuerySchema), deleteProduct(this.db));
        return productRouter;
    }

    addressHandler(): express.Router {
        const addressRouter = express.Router();
        addressRouter.get("/:id", validate(addressQuerySchema), getAddress(this.db));
        addressRouter.post("/", validate(addressCreateSchema), createAddress(this.db));
        addressRouter.put("/:id", validate(addressUpdateSchema), updateAddress(this.db));
        addressRouter.delete("/:id", validate(addressQuerySchema), deleteAddress(this.db));
        return addressRouter;
    }

    clientHandler(): express.Router {
        const clientRouter = express.Router();
        clientRouter.get("/:id", validate(clientQuerySchema), getClient(this.db));
        clientRouter.post("/", validate(clientCreateSchema), createClient(this.db));
        clientRouter.put("/:id", validate(clientUpdateSchema), updateClient(this.db));
        clientRouter.delete("/:id", validate(clientQuerySchema), deleteClient(this.db));
        return clientRouter;
    }
}
