export default interface Database {
    health(): Promise<boolean>;

    getCoupon();
    createCoupon();
    updateCoupon();
    deleteCoupon();

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
