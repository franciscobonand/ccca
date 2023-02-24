import { Order } from "../../server/entity/Order"
import Client from "../../server/entity/Client"
import Product from "../../server/entity/Product"
import Coupon from "../../server/entity/Coupon"

const client = new Client("", "Alberto","411.502.100-44") 
const prod1 = new Product("1", "Bola", "Bola branca de futebol", 10.5, 20, 15, 10, 1)
const prod2 = new Product("2", "Caneca", "Caneca colorida grande", 5.5, 100, 30, 10, 3)
const prod3 = new Product("3", "Óculos", "Óculos azul", 15, 200, 100, 50, 40)
const coupon = new Coupon("1", "PROMO20", 0.2, new Date("2024-01-01T10:00:00"));
const expiredCoupon = new Coupon("1", "PROMO20", 0.2, new Date("2022-01-01T10:00:00"));


test("Deve criar um pedido vazio", () => {
    const order = new Order("", client);
    expect(order.getTotal()).toBe(0);
})

test("Deve criar um pedido com três produtos", () => {
    const order = new Order("", client);
    order.addItem(prod1, 1);
    order.addItem(prod2, 1);
    order.addItem(prod3, 1);
    const expectedTotal = prod1.price + prod2.price + prod3.price; 
    expect(order.getTotal()).toBe(expectedTotal);
})

test("Deve criar um pedido com três produtos e cupom de desconto", () => {
    const order = new Order("", client);
    order.addItem(prod1, 1);
    order.addItem(prod2, 1);
    order.addItem(prod3, 1);
    order.addCoupon(coupon);
    let expectedTotal = prod1.price + prod2.price + prod3.price; 
    expectedTotal -= (expectedTotal * coupon.discount);
    expect(order.getTotal()).toBe(expectedTotal);
})

test("Não deve adicionar um produto com quantidade negativa a um pedido", () => {
    const order = new Order("", client);
    expect(() => order.addItem(prod3, -1)).toThrow(new Error("Invalid quantity"));
})

test("Não deve adicionar um produto repetido a um pedido", () => {
    const order = new Order("", client);
    order.addItem(prod3, 1);
    expect(() => order.addItem(prod3, 1)).toThrow(new Error("Duplicated item"));
})

test("Não deve adicionar cupom expirado a um pedido", () => {
    const order = new Order("", client);
    order.addItem(prod3, 1);
    order.addCoupon(expiredCoupon)
    expect(order.getTotal()).toBe(prod3.price);
})
