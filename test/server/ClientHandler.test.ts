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
test("Deve criar um novo cliente", async () => {
    const expectedReturn = {
        id: "randomID",
        fullname: "Diego Augusto Porto",
        cpf: "194.081.740-46",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("createClient").once().resolves(expectedReturn);
    mockClientHandler.expects("createAddress").once();
    mockClientHandler.expects("getAddress").once();
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "194.081.740-46",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.post(`${serverAddr}/client`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockClientHandler.verify();
})

test("Não deve criar um novo cliente sem nome", async () => {
    const input = {
        cpf: "470.611.643-01",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.post(`${serverAddr}/client`, input);
    expect(resp.status).toBe(400);
    const fullnameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'fullname' is required",
    );
        expect(fullnameErr).toBeTruthy();
})

test("Não deve criar um novo cliente sem CPF", async () => {
    const input = {
        fullname: "Diego Augusto Porto",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.post(`${serverAddr}/client`, input);
    expect(resp.status).toBe(400);
    const fullnameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'cpf' is required",
    );
    expect(fullnameErr).toBeTruthy();
})

test("Não deve criar um novo cliente sem endereço", async () => {
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-01",
        addresses: [],
    }
    const resp = await axios.post(`${serverAddr}/client`, input);
    expect(resp.status).toBe(400);
    const fullnameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'addresses' is required",
    );
    expect(fullnameErr).toBeTruthy();
})

test("Não deve criar um novo cliente com cpf inválido", async () => {
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-11",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.post(`${serverAddr}/client`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to create client");
})

test("Não deve criar um cliente devido a erro no banco de dados", async () => {
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("createClient").once().throws("DB error");
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-01",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.post(`${serverAddr}/client`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to create client");
    mockClientHandler.verify();
})

// GET
test("Deve obter um cliente existente", async () => {
    const expectedReturn = {
        id: "randomID",
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-01",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("getClient").once().resolves(expectedReturn);
    const resp = await axios.get(`${serverAddr}/client/${expectedReturn.id}`);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockClientHandler.verify();
})

test("Não deve retornar um cliente não existente", async () => {
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("getClient").once().throws("Record not found");
    const resp = await axios.get(`${serverAddr}/client/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Client not found");
    mockClientHandler.verify();
})
 
// UPDATE
test("Deve atualizar um novo cliente", async () => {
    const expectedReturn = {
        id: "randomID",
        fullname: "Diego Augusto Porto",
        cpf: "194.081.740-46",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("updateClient").once().resolves(expectedReturn);
    mockClientHandler.expects("createAddress").once();
    mockClientHandler.expects("getAddress").once();
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "194.081.740-46",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.put(`${serverAddr}/client/randomID`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockClientHandler.verify();
})

test("Não deve atualizar um novo cliente sem nome", async () => {
    const input = {
        cpf: "470.611.643-01",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.put(`${serverAddr}/client/randomID`, input);
    expect(resp.status).toBe(400);
    const fullnameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'fullname' is required",
    );
        expect(fullnameErr).toBeTruthy();
})

test("Não deve atualizar um novo cliente sem CPF", async () => {
    const input = {
        fullname: "Diego Augusto Porto",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.put(`${serverAddr}/client/randomID`, input);
    expect(resp.status).toBe(400);
    const fullnameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'cpf' is required",
    );
    expect(fullnameErr).toBeTruthy();
})

test("Não deve atualizar um novo cliente sem endereço", async () => {
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-01",
        addresses: [],
    }
    const resp = await axios.put(`${serverAddr}/client/randomID`, input);
    expect(resp.status).toBe(400);
    const fullnameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'addresses' is required",
    );
    expect(fullnameErr).toBeTruthy();
})

test("Não deve atualizar um novo cliente com cpf inválido", async () => {
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-11",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.put(`${serverAddr}/client/randomID`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to update client");
})

test("Não deve atualizar um cliente devido a erro no banco de dados", async () => {
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("updateClient").once().throws("DB error");
    const input = {
        fullname: "Diego Augusto Porto",
        cpf: "470.611.643-01",
        addresses: [
            {
                id: "addrID",
                postalcode: "78954123",
            },
            {
                postalcode: "96456256",
            },
        ],
    }
    const resp = await axios.put(`${serverAddr}/client/randomID`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to update client");
    mockClientHandler.verify();
})
 
// DELETE
test("Deve deletar um cliente existente", async () => {
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("deleteClient").once().resolves(null);
    const resp = await axios.delete(`${serverAddr}/client/randomID`);
    expect(resp.status).toBe(204);
    mockClientHandler.verify();
})

test("Não deve deletar cliente não existente", async () => {
    const mockClientHandler = sinon.mock(MockDB.prototype);
    mockClientHandler.expects("deleteClient").once().throws("Record not found");
    const resp = await axios.delete(`${serverAddr}/client/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Client not found");
    mockClientHandler.verify();
})
