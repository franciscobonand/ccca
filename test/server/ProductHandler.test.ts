import axios from "axios";
import sinon from "sinon";
import * as http from "http";
import { ZodIssue } from "zod";
import Server from "../../server/api/Server";
import MockDB from "../MockDB";

axios.defaults.validateStatus = function () {
	return true;
}
const serverAddr = "http://localhost:4444";
let serverInstance: http.Server;

beforeAll(() => {
    const mockDB = new MockDB();
    const server = new Server(4444, mockDB);
    serverInstance = server.run();
});

afterAll(() => {
    serverInstance.close();
});

// CREATE
test("Deve criar um novo produto", async () => {
    const expectedReturn = {
        id: "randomID",
        name: "Bola de futebol",
        description: "Uma bola com hexagonos pretos e brancos",
        price: 10.5,
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
    }
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("createProduct").once().resolves(expectedReturn);
    const input = {
        name: "Bola de futebol",
        description: "Uma bola com hexagonos pretos e brancos",
        price: 10.5,
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
    }
    const resp = await axios.post(`${serverAddr}/product`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockProductHandler.verify();
})

test.each([
    [
        "'name' is required",
        {
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'description' is required",
        {
            name: "Bola de futebol",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'price' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'width' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'height' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'length' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            weight: 3,
        },
    ],
    [
        "'weight' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
        },
    ],
    [
        "'price' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: -10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'width' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: -100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'height' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: -30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'length' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: -10,
            weight: 3,
        },
    ],
    [
        "'weight' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: -3,
        },
    ],
])("Não deve criar um novo produto - %p", async (err, input) => {
    const resp = await axios.post(`${serverAddr}/product`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == err,
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve criar um produto devido a erro no banco de dados", async () => {
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("createProduct").once().throws("DB error");
    const input = {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
    }
    const resp = await axios.post(`${serverAddr}/product`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to create product");
    mockProductHandler.verify();
})

// GET
test("Deve obter um produto existente", async () => {
    const expectedReturn = {
        id: "randomID",
        name: "Bola de futebol",
        description: "Uma bola com hexagonos pretos e brancos",
        price: 10.5,
    }
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("getProduct").once().resolves(expectedReturn);
    const resp = await axios.get(`${serverAddr}/product/${expectedReturn.id}`);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockProductHandler.verify();
})

test("Não deve retornar um produto não existente", async () => {
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("getProduct").once().throws("Record not found");
    const resp = await axios.get(`${serverAddr}/product/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Product not found");
    mockProductHandler.verify();
})


test("Não deve retornar um produto cadastrado com preço inválido", async () => { 
    const expectedReturn = {
        id: "randomID",
        name: "Bola de futebol",
        description: "Uma bola com hexagonos pretos e brancos",
        price: -10.5,
    }
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("getProduct")
        .once()
        .resolves(expectedReturn)
        .throws("Invalid price, should be greater than 0");
    const resp = await axios.get(`${serverAddr}/product/${expectedReturn.id}`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Product not found");
    mockProductHandler.verify();
})

// UPDATE
test("Deve atualizar um novo produto", async () => {
    const expectedReturn = {
        id: "randomID",
        name: "Bola de futebol",
        description: "Uma bola com hexagonos pretos e brancos",
        price: 10.5,
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
    }
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("updateProduct").once().resolves(expectedReturn);
    const input = {
        name: "Bola de futebol",
        description: "Uma bola com hexagonos pretos e brancos",
        price: 10.5,
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
    }
    const resp = await axios.put(`${serverAddr}/product/${expectedReturn.id}`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockProductHandler.verify();
})

test.each([
    [
        "'name' is required",
        {
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'description' is required",
        {
            name: "Bola de futebol",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'price' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'width' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'height' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'length' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            weight: 3,
        },
    ],
    [
        "'weight' is required",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
        },
    ],
    [
        "'price' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: -10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'width' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: -100,
            height: 30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'height' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: -30,
            length: 10,
            weight: 3,
        },
    ],
    [
        "'length' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: -10,
            weight: 3,
        },
    ],
    [
        "'weight' must be positive",
        {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: -3,
        },
    ],
])("Não deve atualizar um novo produto - %p", async (err, input) => {
    const resp = await axios.put(`${serverAddr}/product/randomID`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == err,
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve atualizar um produto devido a erro no banco de dados", async () => {
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("updateProduct").once().throws("DB error");
    const input = {
            name: "Bola de futebol",
            description: "Uma bola com hexagonos pretos e brancos",
            price: 10.5,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
    }
    const resp = await axios.put(`${serverAddr}/product/randomID`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to update product");
    mockProductHandler.verify();
})

// DELETE
test("Deve deletar um produto existente", async () => {
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("deleteProduct").once().resolves(null);
    const resp = await axios.delete(`${serverAddr}/product/randomID`);
    expect(resp.status).toBe(204);
    mockProductHandler.verify();
})

test("Não deve deletar produto não existente", async () => {
    const mockProductHandler = sinon.mock(MockDB.prototype);
    mockProductHandler.expects("deleteProduct").once().throws("Record not found");
    const resp = await axios.delete(`${serverAddr}/product/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Product not found");
    mockProductHandler.verify();
})
