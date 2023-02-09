import Server from './api/Server';
import PocketBaseDB from './db/Pocketbase';

const db = new PocketBaseDB("http://localhost:8090");
    const server = new Server(4000, db);

const serverInstance = server.run();

process.on("SIGTERM", () => {
    console.log("Closing http server.");
    serverInstance.close(() => console.log("Server closed."))
});
