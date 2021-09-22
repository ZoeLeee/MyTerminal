import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css'

export default function XTermPanel() {
    const containerRef=useRef(null);
    const webSocket=new WebSocket("ws://127.0.0.1:3334")

    const handleClick=()=>{
        webSocket.send("cd D:\\projects\\Dolphin.Sound.Frontend.Mobile \r");
        webSocket.send("expo bs\r");
    }
    useEffect(()=>{
        if(containerRef.current){
            const terminal=new Terminal({disableStdin:true})

            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);

            const attachAddon = new AttachAddon(webSocket);
            terminal.loadAddon(attachAddon);

            terminal.write("welcome come $\r\n")
            terminal.write("$")
            terminal.open(containerRef.current)
            fitAddon.fit();
        }
    },[])

    return (
        <div>
            <button onClick={handleClick}>测试</button>
            <div ref={containerRef}></div>
        </div>
    )
}
