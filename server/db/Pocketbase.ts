import PocketBase from 'pocketbase';
import Database from './Interface';

export default class PocketBaseDB implements Database {
    COUPON_COLL = "coupons";
    CLIENT_COLL = "clients";
    ADDRESS_COLL = "addresses";
    PRODUCT_COLL = "products";
    ORDER_COLL = "orders";
    
    connection: PocketBase

    constructor(readonly host: string) {
       this.connection = new PocketBase(host);
    }

    async health() {
        const hc = await this.connection.health.check();
        if (hc.code != 200) return false;
        return true;
    }

    getCoupon(){}
    createCoupon(){}
    updateCoupon(){}
    deleteCoupon(){}

    getClient(){}
    createClient(){}
    updateClient(){}
    deleteClient(){}

    getAddress(){}
    createAddress(){}
    updateAddress(){}
    deleteAddress(){}

    getProduct(){}
    createProduct(){}
    updateProduct(){}
    deleteProduct(){}

    getOrder(){}
    createOrder(){}
    updateOrder(){}
    deleteOrder(){}
}
