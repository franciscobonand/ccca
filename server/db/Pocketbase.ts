import PocketBase from 'pocketbase';
import Database from './Interface';
import Coupon from '../entity/Coupon';
import Product from '../entity/Product';
import Address from '../entity/Address';
import Client from '../entity/Client';

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

    // Coupons
    async getCoupon(id: string): Promise<Coupon> {
        const record = await this.conn.collection(this.COUPON_COLL).getOne<Coupon>(id); 
        return new Coupon(record.id, record.name, record.discount, record.expireDate);
    }
    async createCoupon(coupon: Coupon): Promise<Coupon> {
        const record = await this.conn.collection(this.COUPON_COLL).create<Coupon>(coupon);
        return new Coupon(record.id, record.name, record.discount, record.expireDate);
    }
    async updateCoupon(id: string, coupon: Coupon): Promise<Coupon> {
        const record = await this.conn.collection(this.COUPON_COLL).update<Coupon>(id, coupon);
        return new Coupon(record.id, record.name, record.discount, record.expireDate);
    }
    async deleteCoupon(id: string): Promise<null> {
        await this.conn.collection(this.COUPON_COLL).delete(id); 
        return null;
    }

    // Clients
    async getClient(id: string): Promise<Client> {
        const record = await this.conn.collection(this.CLIENT_COLL).getOne<Client>(id); 
        return new Client(record.id, record.fullname, record.cpf);
    }
    async createClient(client: Client): Promise<Client> {
        const record = await this.conn.collection(this.CLIENT_COLL).create<Client>(client);
        return new Client(record.id, record.fullname, record.cpf);
    }
    async updateClient(id: string, client: Client): Promise<Client> {
        const record = await this.conn.collection(this.CLIENT_COLL).update<Client>(id, client);
        return new Client(record.id, record.fullname, record.cpf);
    }
    async deleteClient(id: string): Promise<null> {
        await this.conn.collection(this.CLIENT_COLL).delete(id); 
        return null;
    }

    // Addresses
    async getAddress(id: string): Promise<Address> {
        const record = await this.conn.collection(this.ADDRESS_COLL).getOne<Address>(id);
        return new Address(
            record.id,
            record.postalcode,
        );
    }
    async createAddress(addr: Address): Promise<Address> {
        const record = await this.conn.collection(this.ADDRESS_COLL).create<Address>(addr);
        return new Address(
            record.id,
            record.postalcode,
        );
    }
    async updateAddress(id: string, addr: Address): Promise<Address> {
        const record = await this.conn.collection(this.ADDRESS_COLL).update<Address>(id, addr);
        return new Address(
            record.id,
            record.postalcode,
        );
    }
    async deleteAddress(id: string): Promise<null> {
        await this.conn.collection(this.ADDRESS_COLL).delete(id); 
        return null;
    }

    // Products
    async getProduct(id: string): Promise<Product> {
        const record = await this.conn.collection(this.PRODUCT_COLL).getOne<Product>(id);
        return new Product(record.id, record.name, record.description, record.price);
    }
    async createProduct(product: Product): Promise<Product> {
        const record = await this.conn.collection(this.PRODUCT_COLL).create<Product>(product);
        return new Product(record.id, record.name, record.description, record.price);
    }
    async updateProduct(id: string, product: Product): Promise<Product> {
        const record = await this.conn.collection(this.PRODUCT_COLL).update<Product>(id, product);
        return new Product(record.id, record.name, record.description, record.price);
    }
    async deleteProduct(id: string): Promise<null> {
        await this.conn.collection(this.PRODUCT_COLL).delete(id); 
        return null;
    }

    getOrder(){}
    createOrder(){}
    updateOrder(){}
    deleteOrder(){}
}
