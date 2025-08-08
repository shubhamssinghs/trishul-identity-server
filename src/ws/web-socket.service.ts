import { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";
import { wsEventHandlers } from "./";

export class WebSocketService {
  private wss!: WebSocketServer;

  async initialize(server: HttpServer, route = "/ws"): Promise<void> {
    this.wss = new WebSocketServer({ noServer: true });

    server.on("upgrade", (req, socket, head) => {
      if (req.url?.startsWith(route)) {
        this.wss.handleUpgrade(req, socket, head, (ws) => {
          this.wss.emit("connection", ws, req);
        });
      } else {
        socket.destroy();
      }
    });

    this.wss.on("connection", (ws, req) => {
      console.log("🔌 WebSocket client connected");
      const url = new URL(req.url!, `http://${req.headers.host}`);
      const eventType = url.searchParams.get("ws:event");

      if (eventType && wsEventHandlers[eventType]) {
        console.log(`⚡ Handling ws:event:${eventType}`);
        wsEventHandlers[eventType]({ ws, data: null });
      }

      ws.on("message", async (message) => {
        try {
          const parsed = JSON.parse(message.toString());
          const type = parsed?.type;

          if (type && wsEventHandlers[type]) {
            console.log(`📩 Message event type received: ${type}`);
            await wsEventHandlers[type]({ ws, data: parsed });
          }
        } catch (err) {
          console.error("❌ Invalid message format:", err);
        }
      });

      ws.on("close", () => console.log("❌ WebSocket connection closed"));
      ws.on("error", (err) => console.error("⚠️ WebSocket error:", err));
    });
  }
}

export const wsService = new WebSocketService();
