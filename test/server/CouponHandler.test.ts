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
test("Deve criar um novo cupom", async () => {
    const date = new Date("2024-01-01T10:00:00");
    const expectedReturn = {
        id: "randomID",
        name: "PROMO20",
        discount: 0.5,
        expireDate: date.toISOString(),
    }
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("createCoupon").once().resolves(expectedReturn);
    const input = {
        name: "PROMO20",
        discount: 0.5,
        expireDate: date,
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockCouponHandler.verify();
})

test("Não deve criar um novo cupom sem nome", async () => {
    const input = {
        discount: 0.5,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'name' is required",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve criar um novo cupom sem desconto", async () => {
    const input = {
        name: "PROMO20",
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'discount' is required",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve criar um novo cupom sem data de expiração", async () => {
    const input = {
        name: "PROMO20",
        discount: 0.2,
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'expireDate' is required",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve criar um novo cupom com desconto acima de 100%", async () => {
    const input = {
        name: "PROMO20",
        discount: 5,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'discount' must be at max 1",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve criar um novo cupom com desconto abaixo de 1%", async () => {
    const input = {
        name: "PROMO20",
        discount: 0,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'discount' must be greater than 0.01",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve criar um cupom devido a erro no banco de dados", async () => {
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("createCoupon").once().throws("DB error");
    const input = {
        name: "PROMO20",
        discount: 0.5,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.post(`${serverAddr}/coupon`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to create coupon");
    mockCouponHandler.verify();
})

// GET
test("Deve obter um cupom existente", async () => {
    const date = new Date("2024-01-01T10:00:00");
    const expectedReturn = {
        id: "randomID",
        name: "PROMO20",
        discount: 0.5,
        expireDate: date.toISOString(),
    }
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("getCoupon").once().resolves(expectedReturn);
    const resp = await axios.get(`${serverAddr}/coupon/${expectedReturn.id}`);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockCouponHandler.verify();
})

test("Não deve retornar um cupom não existente", async () => {
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("getCoupon").once().throws("Record not found");
    const resp = await axios.get(`${serverAddr}/coupon/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Coupon not found");
    mockCouponHandler.verify();
})

//UPDATE
test("Deve atualizar um novo cupom", async () => {
    const date = new Date("2024-01-01T10:00:00");
    const expectedReturn = {
        id: "randomID",
        name: "PROMO20",
        discount: 0.5,
        expireDate: date.toISOString(),
    }
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("updateCoupon").once().resolves(expectedReturn);
    const input = {
        name: "PROMO20",
        discount: 0.5,
        expireDate: date,
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(200);
    expect(resp.data).toMatchObject(expectedReturn);
    mockCouponHandler.verify();
})

test("Não deve atualizar um novo cupom sem nome", async () => {
    const input = {
        discount: 0.5,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'name' is required",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve atualizar um novo cupom sem desconto", async () => {
    const input = {
        name: "PROMO20",
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'discount' is required",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve atualizar um novo cupom sem data de expiração", async () => {
    const input = {
        name: "PROMO20",
        discount: 0.2,
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'expireDate' is required",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve atualizar um novo cupom com desconto acima de 100%", async () => {
    const input = {
        name: "PROMO20",
        discount: 5,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'discount' must be at max 1",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve atualizar um novo cupom com desconto abaixo de 1%", async () => {
    const input = {
        name: "PROMO20",
        discount: 0,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(400);
    const nameErr = resp.data.issues.find(
        (issue: ZodIssue) => issue.message == "'discount' must be greater than 0.01",
    );
        expect(nameErr).toBeTruthy();
})

test("Não deve atualizar um cupom devido a erro no banco de dados", async () => {
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("updateCoupon").once().throws("DB error");
    const input = {
        name: "PROMO20",
        discount: 0.5,
        expireDate: new Date("2024-01-01T10:00:00"),
    }
    const resp = await axios.put(`${serverAddr}/coupon/randomID`, input);
    expect(resp.status).toBe(500);
    expect(resp.data).toBe("Failed to update coupon");
    mockCouponHandler.verify();
})

// DELETE
test("Deve deletar um cupom existente", async () => {
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("deleteCoupon").once().resolves(null);
    const resp = await axios.delete(`${serverAddr}/coupon/randomID`);
    expect(resp.status).toBe(204);
    mockCouponHandler.verify();
})

test("Não deve deletar cupom não existente", async () => {
    const mockCouponHandler = sinon.mock(MockDB.prototype);
    mockCouponHandler.expects("deleteCoupon").once().throws("Record not found");
    const resp = await axios.delete(`${serverAddr}/coupon/invalidRecordID`);
    expect(resp.status).toBe(404);
    expect(resp.data).toBe("Coupon not found");
    mockCouponHandler.verify();
})
