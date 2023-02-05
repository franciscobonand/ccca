import { Order, OrderItem, PaymentMethod } from "../server/entity/Order"
import Client from "../server/entity/Client"
import Address from "../server/entity/Address"
import Product from "../server/entity/Product"
import Coupon from "../server/entity/Coupon"

const address = new Address("", "65452123") 
const client = new Client("Alberto","411.502.100-44", address) 
const product1 = new Product("", "Bola", "Bola branca de futebol", 10.5, 5)
const product2 = new Product("", "Caneca", "Caneca colorida grande", 5.5, 5)
const product3 = new Product("", "Óculos", "Óculos azul", 15, 5)


test("Deve criar um pedido válido sem desconto", () => {
    const items: OrderItem[] = [
        { product: product1, quantity: 2 },
        { product: product2, quantity: 4 },
        { product: product3, quantity: 1 },
    ];
    const expectedTotal = product1.price * 2 + product2.price * 4 + product3.price * 1
    const order = new Order(
        items, 
        address,
        client,
        PaymentMethod.CreditCard
    )
    expect(order.totalValue).toBe(expectedTotal)
})

test("Deve criar um pedido válido com um cupom de desconto", () => {
    const items: OrderItem[] = [
        { product: product1, quantity: 2 },
        { product: product2, quantity: 4 },
    ];
    const coupon = new Coupon("", "PROMO", 0.5)
    const expectedTotal = (product1.price * 2 + product2.price * 4) * coupon.discount
    const order = new Order(
        items, 
        address,
        client,
        PaymentMethod.CreditCard,
        [coupon]
    )
    expect(order.totalValue).toBe(expectedTotal)
})

test("Deve criar um pedido válido com múltiplos cupons de desconto", () => {
    const items: OrderItem[] = [
        { product: product1, quantity: 2 },
        { product: product2, quantity: 4 },
    ];
    const coupon1 = new Coupon("", "PROMO1", 0.5)
    const coupon2 = new Coupon("", "PROMO2", 0.25)
    const coupon3 = new Coupon("", "PROMO3", 0.75)
    const expectedTotal = (product1.price * 2 + product2.price * 4) * coupon3.discount
    const order = new Order(
        items, 
        address,
        client,
        PaymentMethod.CreditCard,
        [coupon1, coupon2, coupon3]
    )
    expect(order.totalValue).toBe(expectedTotal)
})
