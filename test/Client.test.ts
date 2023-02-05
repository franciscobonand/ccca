import Client from "../server/entity/Client"
import Address from "../server/entity/Address"

test("Deve criar um novo cliente com CPF válido", () => {
    const address = new Address("", "65452123") 
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: "411.502.100-44",
        addresses: [address]
    }; 
    const actual = new Client(expected.fullname, expected.cpf, expected.addresses[0]) 
    expect(actual.fullname).toBe(expected.fullname)
    expect(actual.cpf).toBe(expected.cpf.replaceAll(".","").replaceAll("-","").trim())
    expect(actual.addresses[0]).toBe(expected.addresses[0])
})

test("Deve gerar erro devido a CPF inválido - tamanho", () => {
    const address = new Address("", "65452123") 
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: "411.502.1009-44",
        addresses: [address]
    }; 
    expect(() => 
           new Client(expected.fullname, expected.cpf, expected.addresses[0])
    ).toThrow(new Error("Invalid CPF"))
})

test("Deve gerar erro devido a CPF inválido - todos os dígitos iguais", () => {
    const address = new Address("", "65452123") 
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: "444.444.444-44",
        addresses: [address]
    }; 
    expect(() => 
           new Client(expected.fullname, expected.cpf, expected.addresses[0])
    ).toThrow(new Error("Invalid CPF"))
})

test("Deve gerar erro devido a CPF inválido - dígitos verificadores", () => {
    const address = new Address("", "65452123") 
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: "411.502.100-14",
        addresses: [address]
    }; 
    expect(() => 
           new Client(expected.fullname, expected.cpf, expected.addresses[0])
    ).toThrow(new Error("Invalid CPF"))
})
