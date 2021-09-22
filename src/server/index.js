const os = require("os");
const WebSocket = require("ws");
const pty = require("node-pty");

const wss = new WebSocket.Server({ port: 3334 });
const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

wss.on("connection", function connection(ws) {
  console.log("success");
  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", function (data) {
    // console.log("data: ", data);
    process.stdout.write(data);
    ws.send(data);
  });

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ptyProcess.write(message);
  });
});
