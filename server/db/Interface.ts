import Coupon from '../entity/Coupon';
import Product from '../entity/Product';

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

    getAddress();
    createAddress();
    updateAddress();
    deleteAddress();

    getProduct(id: string): Promise<Product>;
    createProduct(product: Product): Promise<Product>;
    updateProduct(product: Product): Promise<Product>;
    deleteProduct(id: string): Promise<null>;

    getOrder();
    createOrder();
    updateOrder();
    deleteOrder();
}
