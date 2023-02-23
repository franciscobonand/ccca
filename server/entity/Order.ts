import Product from "./Product"
import Client from "./Client"
import Coupon from "./Coupon"

class OrderItem {
    constructor(
        readonly idProduct: string,
        readonly price: number,
        readonly quantity: number,
    ){}
}

class Order {
    readonly items: OrderItem[];
    readonly creationDate: Date;
    coupon?: Coupon;

    constructor(
        readonly id: string | undefined,
        readonly client: Client,
    ){
        this.items = [];
        this.creationDate = new Date();
    }

    addCoupon(coupon: Coupon) {
        if (!coupon.isExpired(this.creationDate)) this.coupon = coupon;
    }

    addItem(product: Product, quantity: number) {
        if (quantity <= 0)
            throw new Error("Invalid quantity");

		if (this.items.some((item: OrderItem) => item.idProduct === product.id))
            throw new Error("Duplicated item");

		this.items.push(new OrderItem(product.id, product.price, quantity));
    }

    getTotal(): number {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            total += item.price * item.quantity;
        }
        if (this.coupon) {
            total -= (total * this.coupon.discount);
        }
        return total;
    }
}

export { Order, OrderItem };
