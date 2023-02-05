import Coupon from '../entity/Coupon';
import Product from '../entity/Product';
import Address from '../entity/Address';

export default interface Database {
    health(): Promise<boolean>;

    getCoupon(id: string): Promise<Coupon>;
    createCoupon(coupon: Coupon): Promise<Coupon>;
    updateCoupon(coupon: Coupon): Promise<Coupon>;
    deleteCoupon(id: string): Promise<null>;

    getClient();
    createClient();
    updateClient();
    deleteClient();

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
