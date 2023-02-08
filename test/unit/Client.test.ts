import Client from "../../server/entity/Client"
import Address from "../../server/entity/Address"

const address = new Address("", "65452123") 

test("Deve criar um novo cliente com CPF válido", () => {
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: "411.502.100-44",
        addresses: [address]
    }; 
    const actual = new Client("", expected.fullname, expected.cpf, expected.addresses) 
    expect(actual.fullname).toBe(expected.fullname)
    expect(actual.cpf).toBe(expected.cpf.replaceAll(".","").replaceAll("-","").trim())
    expect(actual.addresses[0]).toBe(expected.addresses[0])
})

test.each([
    "411.502.1009-44",
    "444.444.444-44",
    "411.502.100-14",
])("Deve gerar erro devido a CPF inválido - %p", (cpf) => {
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: cpf,
        addresses: [address]
    }; 
    expect(() => 
           new Client("", expected.fullname, expected.cpf, expected.addresses)
          ).toThrow(new Error("Invalid CPF"))
})
