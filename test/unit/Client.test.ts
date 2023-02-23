import Client from "../../server/entity/Client"

test.each([
    "411.502.100-44",
    "684.053.160-00",
    "74697131401",
])("Deve criar um novo cliente com CPF válido - %p", (cpf) => {
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: cpf,
    }; 
    const actual = new Client("", expected.fullname, expected.cpf) 
    expect(actual.fullname).toBe(expected.fullname)
    expect(actual.cpf).toBe(expected.cpf.replaceAll(".","").replaceAll("-","").trim())
})

test.each([
    "411.502.1009-44",
    "444.444.444-44",
    "411.502.100-14",
])("Deve gerar erro devido a CPF inválido - %p", (cpf) => {
    const expected = {
        fullname: "Ronaldo Miguel",
        cpf: cpf,
    }; 
    expect(() => new Client("", expected.fullname, expected.cpf)).toThrow(new Error("Invalid CPF"))
})
