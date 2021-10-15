import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const isDev =
    location.href.includes("localhost") || location.href.includes("127.0.0.1");

export default function XTermPanel() {
    const containerRef = useRef(null);
    const webSocket = new WebSocket(
        isDev ? "ws://127.0.0.1" : "ws://www.dodream.top:3334"
    );

    const handleClick = () => {
        if (isDev)
            webSocket.send("cd D:\\projects\\Dolphin.Sound.Frontend.Mobile \r");
        else {
            webSocket.send("cd /var/www/html/project/Dolphin.Sound.Frontend.Mobile \r");
        }
        webSocket.send("expo build:status\r");
    };
    const handleBuild = () => {
        if (isDev)
            webSocket.send("cd D:\\projects\\Dolphin.Sound.Frontend.Mobile \r");
        else {
            webSocket.send("cd /var/www/html/project/MyTerminal \r");
        }
        webSocket.send("expo build:android -t apk\r");
    };
    useEffect(() => {
        if (containerRef.current) {
            const terminal = new Terminal({ disableStdin: true });

            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);

            const attachAddon = new AttachAddon(webSocket);
            terminal.loadAddon(attachAddon);

            terminal.open(containerRef.current);
            fitAddon.fit();

            webSocket.addEventListener("message", (event) => { });
        }
    }, []);

    return (
        <div>
            <button onClick={handleClick}>获取打包列表</button>
            <button onClick={handleBuild}>重新打包</button>
            <div ref={containerRef}></div>
        </div>
    );
}
