import Product from "../../server/entity/Product"

test("Deve criar um produto válido", () => {
    const product = new Product("", "Bola", "Bola branca de futebol", 10.5)
    expect(product.name).toBe("Bola")
    expect(product.description).toBe("Bola branca de futebol")
    expect(product.price).toBe(10.5)
})

test("Deve gerar um erro de produto inválido - preço negativo", () => {
    expect(() =>
        new Product("", "Bola", "Bola branca de futebol", -10.5)
    ).toThrow(new Error("Invalid price, should be greater than 0"))
})
