import PocketBase from 'pocketbase';
import Database from './Interface';
import Coupon from '../entity/Coupon';

export default class PocketBaseDB implements Database {
    COUPON_COLL = "coupons";
    CLIENT_COLL = "clients";
    ADDRESS_COLL = "addresses";
    PRODUCT_COLL = "products";
    ORDER_COLL = "orders";
    
    conn: PocketBase

    constructor(readonly host: string) {
       this.conn = new PocketBase(host);
    }

    async health() {
        const hc = await this.conn.health.check();
        if (hc.code != 200) return false;
        return true;
    }

    async getCoupon(id: string): Promise<Coupon> {
        const record = await this.conn.collection(this.COUPON_COLL).getOne<Coupon>(id); 
        return new Coupon(record.id, record.name, record.discount);
    }
    async createCoupon(coupon: Coupon): Promise<Coupon> {
        const record = await this.conn.collection(this.COUPON_COLL).create<Coupon>(coupon);
        return new Coupon(record.id, record.name, record.discount);
    }
    async updateCoupon(coupon: Coupon): Promise<Coupon> {
        const record = await this.conn.collection(this.COUPON_COLL).update<Coupon>(coupon.id, coupon);
        return new Coupon(record.id, record.name, record.discount);
    }
    async deleteCoupon(id: string): Promise<null> {
        await this.conn.collection(this.COUPON_COLL).delete(id); 
        return null;
    }


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
