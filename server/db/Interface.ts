import Coupon from '../entity/Coupon';
import Product from '../entity/Product';
import Address from '../entity/Address';
import Client from '../entity/Client';

export default interface Database {
    health(): Promise<boolean>;

    getCoupon(id: string): Promise<Coupon>;
    createCoupon(coupon: Coupon): Promise<Coupon>;
    updateCoupon(coupon: Coupon): Promise<Coupon>;
    deleteCoupon(id: string): Promise<null>;

    getClient(id: string): Promise<Client>;
    createClient(client: Client): Promise<Client>;
    updateClient(client: Client): Promise<Client>;
    deleteClient(id: string): Promise<null>;

    getAddress(id: string): Promise<Address>;
    createAddress(addr: Address): Promise<Address>;
    updateAddress(addr: Address): Promise<Address>;
    deleteAddress(id: string): Promise<null>;

    getProduct(id: string): Promise<Product>;
    createProduct(product: Product): Promise<Product>;
    updateProduct(product: Product): Promise<Product>;
    deleteProduct(id: string): Promise<null>;

    getOrder();
    createOrder();
    updateOrder();
    deleteOrder();
}
