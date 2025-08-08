/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Options = {
  autoConnect?: boolean;
  reconnect?: boolean;
  reconnectInterval?: number;
  onOpen?: () => void;
};

export function useWebSocketStream<T = any>(
  options: Options = {},
  startEventType?: string,
  url?: string
) {
  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<any>(null);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const hasConnected = useRef(false);

  const connect = () => {
    if (hasConnected.current) return;
    hasConnected.current = true;

    if (ws.current?.readyState === WebSocket.OPEN || !isConnecting) return;

    const connectPromise = new Promise<void>((resolve, reject) => {
      try {
        ws.current = new WebSocket(url || "/ws");

        ws.current.onopen = () => {
          setIsConnected(true);
          setIsConnecting(false);
          options?.onOpen?.();
          if (startEventType) {
            ws.current?.send(JSON.stringify({ type: startEventType }));
          }
          resolve();
        };

        ws.current.onerror = (err) => {
          console.error("⚠️ WebSocket error", err);
          setError(err);
          setIsConnecting(false);
          hasConnected.current = false;
          reject(err);
          ws.current?.close();
        };

        ws.current.onclose = () => {
          setIsConnected(false);
          setIsConnecting(false);
          hasConnected.current = false;
          if (options.reconnect) {
            reconnectTimer.current = setTimeout(() => {
              connect();
            }, options.reconnectInterval ?? 3000);
          }
        };

        ws.current.onmessage = (event) => {
          try {
            const json = JSON.parse(event.data);
            setData(json);
          } catch (e) {
            console.error("Invalid WebSocket message", e);
          }
        };
      } catch (err) {
        setIsConnecting(false);
        hasConnected.current = false;
        reject(err);
      }
    });

    toast.promise(connectPromise, {
      loading: "Connecting to WebSocket...",
      success: "WebSocket connected",
      error: "Failed to connect to WebSocket",
    });
  };

  const disconnect = () => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
    }
    hasConnected.current = false;
    ws.current?.close();
    toast.success("WebSocket disconnected");
  };

  useEffect(() => {
    if (options.autoConnect) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    connect,
    error,
    disconnect,
    isConnected,
    isConnecting,
    ws: ws.current,
  };
}
