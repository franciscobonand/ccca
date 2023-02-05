import express from 'express';
import Database from '../db/Interface';
import { Handler } from './handlers/Handler';

export default class Server {
    app: express.Express

    constructor(readonly port: number, readonly db: Database) {
        if (port < 1025 || port > 65535)
            throw new Error("Invalid server port");

        this.app = express();
        this.app.use(express.json());
    }

    run() {
        const handler = new Handler(this.db);
        this.app.use("/coupon", handler.couponHandler());
        this.app.use("/product", handler.productHandler());
        this.app.use("/address", handler.addressHandler());
        this.app.use("/client", handler.clientHandler());
        this.app.listen(
            this.port,
            () => console.log("Server is running on port", this.port)
        );
    }
}
