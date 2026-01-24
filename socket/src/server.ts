// server.js
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req : Request, res : Response) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket : any) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("message", (data : any) => {
      console.log("Message:", data);
      io.emit("message", data); // broadcast
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  httpServer.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});
