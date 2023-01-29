import Product from "../server/entity/Product"

test("Deve criar um produto válido", () => {
    const product = new Product("Bola", "Bola branca de futebol", 10.5, 5)
    expect(product.name).toBe("Bola")
    expect(product.description).toBe("Bola branca de futebol")
    expect(product.price).toBe(10.5)
    expect(product.qntAvailable).toBe(5)
})

test("Deve gerar um erro de produto inválido - quantidade negativa", () => {
    expect(() =>
        new Product("Bola", "Bola branca de futebol", 10.5, -5)
    ).toThrow(new Error("Invalid qntAvailable, should be a positive integer"))
})

test("Deve gerar um erro de produto inválido - quantidade fracionária", () => {
    expect(() =>
        new Product("Bola", "Bola branca de futebol", 10.5, 2.5)
    ).toThrow(new Error("Invalid qntAvailable, should be a positive integer"))
})
