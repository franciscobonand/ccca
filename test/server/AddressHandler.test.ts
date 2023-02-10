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
test("Deve criar um novo endereço", async () => {
    const expectedReturn = {
        id: "randomID",
        postalcode: "45565123",
    }
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("createAddress").once().resolves(expectedReturn);
    const input = {
        postalcode: "45565123",
    }
    const resp = await axios.post(`${serverAddr}/address`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockAddressHandler.verify();
})

test("Não deve criar um novo endereço sem código postal", async () => {
    const resp = await axios.post(`${serverAddr}/address`, {});
    expect(resp.status).toBe(400);
    const postalcodeErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'postalcode' is required",
    );
    expect(postalcodeErr).toBeTruthy();
})

test("Não deve criar um endereço devido a erro no banco de dados", async () => {
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("createAddress").once().throws("DB error");
    const input = {
        postalcode: "45565123",
    }
    const resp = await axios.post(`${serverAddr}/address`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to create address");
    mockAddressHandler.verify();
})

// GET
test("Deve obter um endereço existente", async () => {
    const expectedReturn = {
        id: "randomID",
        postalcode: "45565123",
    }
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("getAddress").once().resolves(expectedReturn);
    const resp = await axios.get(`${serverAddr}/address/${expectedReturn.id}`);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockAddressHandler.verify();
})

test("Não deve retornar um endereço não existente", async () => {
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("getAddress").once().throws("Record not found");
    const resp = await axios.get(`${serverAddr}/address/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Address not found");
    mockAddressHandler.verify();
})

// UPDATE
test("Deve atualizar um endereço existente", async () => {
    const expectedReturn = {
        id: "randomID",
        postalcode: "12123123",
    }
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("updateAddress").once().resolves(expectedReturn);
    const input = {
        postalcode: "12123123",
    }
    const resp = await axios.put(`${serverAddr}/address/${expectedReturn.id}`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockAddressHandler.verify();
})

test("Não deve atualizar um endereço existente sem código postal", async () => {
    const resp = await axios.put(`${serverAddr}/address/randomID`, {});
    expect(resp.status).toBe(400);
    const postalcodeErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'postalcode' is required",
    );
    expect(postalcodeErr).toBeTruthy();
})


test("Não deve atualizar o endereço devido a erro no banco de dados", async () => {
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("updateAddress").once().throws("DB error");
    const input = {
        postalcode: "45565123",
    }
    const resp = await axios.put(`${serverAddr}/address/randomID`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to update address");
    mockAddressHandler.verify();
})


// DELETE
test("Deve deletar um endereço existente", async () => {
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("deleteAddress").once().resolves(null);
    const resp = await axios.delete(`${serverAddr}/address/randomID`);
    expect(resp.status).toBe(204);
    mockAddressHandler.verify();
})

test("Não deve deletar endereço não existente", async () => {
    const mockAddressHandler = sinon.mock(MockDB.prototype);
    mockAddressHandler.expects("deleteAddress").once().throws("Record not found");
    const resp = await axios.delete(`${serverAddr}/address/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Address not found");
    mockAddressHandler.verify();
})
