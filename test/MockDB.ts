import Database from "../server/db/Interface";
import Coupon from "../server/entity/Coupon";
import Product from "../server/entity/Product";
import Address from "../server/entity/Address";
import Client from "../server/entity/Client";

export default class MockDB implements Database {
    constructor() {}

    async health() {
        return true;
    }

    // Coupons
    async getCoupon(id: string): Promise<Coupon> {
        return new Coupon("", "", 0, new Date());
    }
    async createCoupon(coupon: Coupon): Promise<Coupon> {
        return new Coupon("", "", 0, new Date());
    }
    async updateCoupon(id: string, coupon: Coupon): Promise<Coupon> {
        return new Coupon("", "", 0, new Date());
    }
    async deleteCoupon(id: string): Promise<null> {
        return null;
    }

    // Clients
    async getClient(id: string): Promise<Client> {
        return new Client("", "", "");
    }
    async createClient(client: Client): Promise<Client> {
        return new Client("", "", "");
    }
    async updateClient(id: string, client: Client): Promise<Client> {
        return new Client("", "", "");
    }
    async deleteClient(id: string): Promise<null> {
        return null;
    }

    // Addresses
    async getAddress(id: string): Promise<Address> {
        return new Address("", "");
    }
    async createAddress(addr: Address): Promise<Address> {
        return new Address("", "");
    }
    async updateAddress(id: string, addr: Address): Promise<Address> {
        return new Address("", "");
    }
    async deleteAddress(id: string): Promise<null> {
        return null;
    }

    // Products
    async getProduct(id: string): Promise<Product> {
        return new Product("", "", "", 0);
    }
    async createProduct(product: Product): Promise<Product> {
        return new Product("", "", "", 0);
    }
    async updateProduct(id: string, product: Product): Promise<Product> {
        return new Product("", "", "", 0);
    }
    async deleteProduct(id: string): Promise<null> {
        return null;
    }

    getOrder(){}
    createOrder(){}
    updateOrder(){}
    deleteOrder(){}
}
