import Product from "../../server/entity/Product"

test("Deve criar um produto válido", () => {
    const product = new Product("", "Bola", "Bola branca de futebol", 10.5, 100, 30, 10, 3)
    expect(product.name).toBe("Bola")
    expect(product.description).toBe("Bola branca de futebol")
    expect(product.price).toBe(10.5)
    expect(product.getVolume()).toBe(0.03);
    expect(product.getDensity()).toBe(100);
})

test("Deve gerar um erro de produto inválido - preço negativo", () => {
    expect(() =>
        new Product("", "Bola", "Bola branca de futebol", -10.5, 10, 10, 10, 1)
    ).toThrow(new Error("Invalid price, should be greater than 0"))
})

test("Deve gerar um erro de produto inválido - peso negativo", () => {
    expect(() =>
        new Product("", "Bola", "Bola branca de futebol", 10.5, 10, 10, 10, -1)
    ).toThrow(new Error("Invalid weight, should be greater than 0"))
})

test.each([
    [-10, 10, 10],
    [10, -10, 10],
    [10, 10, -10],
    [-10, -10, -10],
])("Deve gerar um erro de produto inválido - dimensão negativa", (width, height, length) => {
    expect(() =>
        new Product("", "Bola", "Bola branca de futebol", 10.5, width, height, length, 1)
    ).toThrow(new Error("Invalid dimentions, should be greater than 0"))
})
