import { Server } from "ws";

export default async function handler(req, res) {
  if (req.headers.upgrade !== "websocket") {
    res.status(400).end();
    return;
  }

  const wss = new Server({ noServer: true });
  const clients = new Set();

  wss.on("connection", function connection(ws) {
    clients.add(ws);

    ws.on("message", function message(data) {
      // Broadcast cursor position to all clients except the sender
      clients.forEach(function each(client) {
        if (client !== ws && client.readyState === Server.OPEN) {
          client.send(data);
        }
      });
    });

    ws.on("close", function close() {
      clients.delete(ws);
    });
  });

  // Handle WebSocket handshake
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function done(ws) {
    wss.emit("connection", ws, req);
  });
}
