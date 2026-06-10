const RPC = require("discord-rpc");

let rpc;

async function startRpc(data) {
  const clientId = data.applicationId;

  rpc = new RPC.Client({ transport: "ipc" });

  RPC.register(clientId);

  await rpc.login({ clientId });

  const buttons = [];

  if (data.fBtnLabel && data.fBtnUrl) {
    buttons.push({
      label: data.fBtnLabel,
      url: data.fBtnUrl
    });
  }

  if (data.sBtnLabel && data.sBtnUrl) {
    buttons.push({
      label: data.sBtnLabel,
      url: data.sBtnUrl
    });
  }

  rpc.setActivity({
    details: data.details || undefined,
    state: data.state || undefined,

    largeImageKey: data.largeImageKey || undefined,
    smallImageKey: data.smallImageKey || undefined,

    largeImageText: data.imageText || undefined,
    smallImageText: data.imageText || undefined,

    buttons: buttons.length > 0 ? buttons : undefined,

    startTimestamp: Date.now()
  });
}

async function stopRpc() {
  rpc.clearActivity();
}

module.exports = { startRpc, stopRpc };

// const clientId = process.env.DISCORD_CLIENT_ID;
// const rpc = new RPC.Client({ transport: "ipc" });

// RPC.register(clientId);

// rpc.on("ready", () => {
//   rpc.setActivity({
//     details: "MY CUSTOM JS RPC",
//     state: "index.js works",
//     startTimestamp: Date.now()
//   });

//   console.log("RPC started");
// });

// rpc.login({ clientId });
