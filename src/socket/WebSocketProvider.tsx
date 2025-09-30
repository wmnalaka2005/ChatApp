import { createContext, useContext, useEffect, useRef, useState } from "react";

interface WebSockentContextValue {

    socket: WebSocket | null,
    isConnected: boolean,
    userId: number,
    sendMessage: (data: any) => void;

}

const WebSockentContext = createContext<WebSockentContextValue | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode; userId: number }> = ({ children, userId }) => {

    const [isConnected, setConected] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);
    useEffect(() => {

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            return;
        }

        const socket = new WebSocket(`wss://${process.env.EXPO_PUBLIC_WS_URL}/ChatAppAPI/chat?userId=${userId}`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket Connected.................!");
            setConected(true);
        }
        socket.onclose = () => {
            console.log("WebSocket Disconnected.................!");
            setConected(false);
        }
        socket.onerror = (error) => {
            console.log("WebSocket Error.................!", error);
            setConected(false);
        }

    }, [userId]);

    const sendMessage = (data: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ ...data, userId }));
        }
    }

    return (<WebSockentContext.Provider value={{ socket: socketRef.current, isConnected, userId, sendMessage }}>{children}</WebSockentContext.Provider>);


};

export const useWebSocket = () => {
    const ctx = useContext(WebSockentContext);
    if (!ctx) {
        throw new Error("userWebSocket must be used inside WebSocket Provider");
    }
    return ctx;
}
