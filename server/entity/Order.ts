import Product from "./Product"
import Address from "./Address"
import Client from "./Client"
import Coupon from "./Coupon"

enum PaymentMethod {
    CreditCard = "CreditCard",
    BankTransfer = "BankTransfer",
    PIX = "PIX",
    DepositSlip = "DepositSlip",
}

enum OrderStatus {
    Processing = "Processing",
    Shipped = "Shipped",
    InTransit = "InTransit",
    Delivered = "Delivered",
    Canceled = "Canceled",
}

class OrderItem {
    constructor(
        readonly product: Product,
        readonly quantity: number,
    ){}
}

class Order {
    totalValue: number
    status: OrderStatus
    coupons: Coupon[]

    constructor(
        readonly items: OrderItem[],
        readonly address: Address,
        readonly client: Client,
        readonly paymentMethod: PaymentMethod,
        coupons: Coupon[] = [],
        public id?: string,
    ){
        this.totalValue = this.calculateTotal(items, coupons, address);
        this.status = OrderStatus.Processing;
        this.coupons = coupons;
    }

    calculateTotal(items: OrderItem[], coupons: Coupon[], address: Address): number {
        let itemsValue = 0;
        let maxDiscount = 0;
        for (let i = 0; i < items.length; i++) {
            itemsValue += items[i].product.price * items[i].quantity;
        }
        for (let i = 0; i < coupons.length; i++) {
            if (coupons[i].discount > maxDiscount) {
                maxDiscount = coupons[i].discount
            }
        }
        const totalDiscount = maxDiscount || 1
        return (itemsValue * totalDiscount) + address.getShippingCost()
    }
}

export { Order, OrderItem, PaymentMethod, OrderStatus };
