const RPC = require("discord-rpc");
require("dotenv").config();

const clientId = process.env.DISCORD_CLIENT_ID;
const rpc = new RPC.Client({ transport: "ipc" });

RPC.register(clientId);

rpc.on("ready", () => {
  rpc.setActivity({
    details: "MY CUSTOM JS RPC",
    state: "index.js works",
    startTimestamp: Date.now()
  });
});

rpc.login({ clientId });
