import Coupon from "../../server/entity/Coupon"

test("Deve criar um cupom válido", () => {
    const coupon = new Coupon("", "PROMO", 0.5, new Date("2024-01-01T10:00:00"))
    expect(coupon.name).toBe("PROMO")
    expect(coupon.discount).toBe(0.5)
    expect(coupon.isExpired(new Date())).toBeFalsy();
})

test("Deve gerar um erro de cupom inválido - valor do desconto", () => {
    expect(() =>
           new Coupon("", "PROMO", 15, new Date("2024-01-01T10:00:00"))
    ).toThrow(new Error("Invalid discount, should be between 0 and 1"));
})

test("Deve criar um cupom expirado", () => {
    const coupon = new Coupon("", "PROMO", 0.5, new Date("2022-01-01T10:00:00"));
    expect(coupon.name).toBe("PROMO");
    expect(coupon.discount).toBe(0.5);
    expect(coupon.isExpired(new Date())).toBeTruthy();
})
