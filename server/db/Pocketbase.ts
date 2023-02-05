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

    // Clients
    async getClient(id: string): Promise<Client> {
        const record = await this.conn.collection(this.CLIENT_COLL).getOne<Client>(id); 
        return new Client(record.id, record.fullname, record.cpf, record.addresses);
    }
    async createClient(client: Client): Promise<Client> {
        const record = await this.conn.collection(this.CLIENT_COLL).create<Client>({
            "fullname": client.fullname,
            "cpf": client.cpf,
            "addresses": client.addresses.map(addr => addr.id),
        });
        return new Client(record.id, record.fullname, record.cpf, record.addresses);
    }
    async updateClient(client: Client): Promise<Client> {
        const record = await this.conn.collection(this.CLIENT_COLL).update<Client>(client.id, {
            "fullname": client.fullname,
            "cpf": client.cpf,
            "addresses": client.addresses.map(addr => addr.id),
        });
        return new Client(record.id, record.fullname, record.cpf, record.addresses);
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
    async updateAddress(addr: Address): Promise<Address> {
        const record = await this.conn.collection(this.ADDRESS_COLL).update<Address>(addr.id, addr);
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
        return new Product(record.id, record.name, record.description, record.price, record.qntAvailable);
    }
    async createProduct(product: Product): Promise<Product> {
        const record = await this.conn.collection(this.PRODUCT_COLL).create<Product>(product);
        return new Product(record.id, record.name, record.description, record.price, record.qntAvailable);
    }
    async updateProduct(product: Product): Promise<Product> {
        const record = await this.conn.collection(this.PRODUCT_COLL).update<Product>(product.id, product);
        return new Product(record.id, record.name, record.description, record.price, record.qntAvailable);
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
