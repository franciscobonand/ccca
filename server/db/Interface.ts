import Coupon from '../entity/Coupon';

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

    getProduct();
    createProduct();
    updateProduct();
    deleteProduct();

    getOrder();
    createOrder();
    updateOrder();
    deleteOrder();
}
