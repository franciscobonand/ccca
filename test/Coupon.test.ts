import Coupon from "../server/entity/Coupon"

test("Deve criar um cupom válido", () => {
    const coupon = new Coupon("", "PROMO", 0.5)
    expect(coupon.name).toBe("PROMO")
    expect(coupon.discount).toBe(0.5)
})

test("Deve gerar um erro de cupom inválido - valor do desconto", () => {
    expect(() =>
           new Coupon("", "PROMO", 15)
    ).toThrow(new Error("Invalid discount, should be between 0 and 1"));
})
