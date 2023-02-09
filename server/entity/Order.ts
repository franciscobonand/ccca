import Product from "./Product"
import Address from "./Address"
import Client from "./Client"
import Coupon from "./Coupon"

class OrderItem {
    constructor(
        readonly product: Product,
        readonly quantity: number,
    ){}
}

class Order {
    totalValue: number
    coupons: Coupon[]

    constructor(
        readonly items: OrderItem[],
        readonly address: Address,
        readonly client: Client,
        coupons: Coupon[] = [],
        public id?: string,
    ){
        this.totalValue = this.calculateTotal(items, coupons);
        this.coupons = coupons;
    }

    calculateTotal(items: OrderItem[], coupons: Coupon[]): number {
        let itemsValue = 0;
        let maxDiscount = 0;
        for (let i = 0; i < items.length; i++) {
            itemsValue += items[i].product.price * items[i].quantity;
        }
        for (let i = 0; i < coupons.length; i++) {
            if (coupons[i].discount > maxDiscount) {
                maxDiscount = coupons[i].discount;
            }
        }
        const totalDiscount = maxDiscount || 1;
        return (itemsValue * totalDiscount);
    }
}

export { Order, OrderItem };
