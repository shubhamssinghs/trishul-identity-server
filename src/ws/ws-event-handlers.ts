import { WebSocket } from "ws";

export type WSEventContext = {
  ws: WebSocket;
  data: any;
};

type Handler = (ctx: WSEventContext) => void | Promise<void>;

export const wsEventHandlers: Record<string, Handler> = {
  example: async ({ ws }) => {
    ws.send(JSON.stringify({ message: "This is an example ws handler" }));

    ws.on("close", () => console.log("WS connection closed"));
    ws.on("error", (error) => console.log("WS ran into error : ", error));
  },
};
