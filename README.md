# SimpleRpc

<div align="center">

**Minimal desktop client for Discord Rich Presence.**

Customize your Discord activity from a small Electron app: text, images, hover text, buttons, and a live active state.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Electron](https://img.shields.io/badge/Electron-42-47848F?style=for-the-badge&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Discord RPC](https://img.shields.io/badge/Discord-Rich%20Presence-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

## What It Is

**SimpleRpc** is a lightweight desktop app for setting up Discord Rich Presence without editing scripts by hand. Enter your Discord Application data, click `Active`, and the status appears in Discord.

The project is built with **Next.js + React + Electron**. The UI runs in Next.js, while Electron handles the app window, the secure preload bridge, and the Discord connection through `discord-rpc`.

## Features

- Start Discord Rich Presence by `Application ID`.
- `Details` and `State` fields for two status lines.
- `Large Image Key`, `Small Image Key`, and hover text for Discord Application assets.
- Up to two Rich Presence buttons.
- Validation for the main Discord RPC limits.
- Active status screen with the Discord app name and icon.
- Custom frameless Electron window with close and minimize controls.
- Production builds for Windows, Linux, and macOS through Electron Builder.

## Quick Start

### Requirements

- Node.js 20+.
- npm.
- Discord Desktop installed and running.
- A Discord Application in the [Discord Developer Portal](https://discord.com/developers/applications).

### Installation

```bash
git clone https://github.com/kuzzia88/SimpleRpc.git
cd SimpleRpc
npm install
```

### Development

```bash
npm run dev
```

This starts Next.js at `http://localhost:3001`, waits for the dev server to be ready, and opens the Electron window.

### Build Next.js

```bash
npm run build
```

Next.js builds a static export, which Electron reads from the `out` folder.

### Build The Desktop App

```bash
npm run build:app
```

This builds the app for the current platform. Output files are placed in `dist-electron`.

### Platform Builds

```bash
npm run build:win
npm run build:linux
npm run build:mac
```

Build formats:

| Platform | Command | Artifacts |
| --- | --- | --- |
| Windows | `npm run build:win` | NSIS installer |
| Linux | `npm run build:linux` | AppImage, deb |
| macOS | `npm run build:mac` | dmg, zip |

The GitHub workflow at `.github/workflows/build.yml` builds Windows, Linux, and macOS on separate runners and saves the results as workflow artifacts.

## Getting RPC Data

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create an application or choose an existing one.
3. Copy the `Application ID` from `General Information`.
4. If you need images, upload assets in the Rich Presence section and use their keys:
   - `Large Image Key` - the large image in the status.
   - `Small Image Key` - the small image shown over the large one.
   - `Image Text` - the text shown on hover.
5. Make sure Discord Desktop is running, otherwise the IPC connection to RPC will not be available.

## Project Structure

```text
SimpleRpc/
|-- .github/
|   `-- workflows/
|       `-- build.yml  # CI builds for Windows, Linux, and macOS
|-- electron/
|   |-- main.js        # Main process, Electron window, IPC handlers
|   |-- preload.js     # Secure bridge between the UI and Electron
|   `-- rpc.js         # discord-rpc logic: startRpc / stopRpc
|-- src/
|   |-- electron.d.ts  # window.desktop types for React code
|   `-- app/
|       |-- page.tsx   # Main app screen
|       `-- components/
|           |-- active/     # Running RPC screen
|           |-- messages/   # Toast notifications
|           |-- rpcInputs/  # Rich Presence setup form
|           `-- titleBar/   # Custom Electron title bar
|-- next.config.ts
|-- LICENSE
|-- package.json
`-- README.md
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js dev server and Electron |
| `npm run dev:next` | Starts only Next.js on port `3001` |
| `npm run dev:electron` | Starts Electron after port `3001` is ready |
| `npm run build` | Builds the static Next.js export |
| `npm run build:app` | Builds Next.js and packages the app for the current platform |
| `npm run build:win` | Builds the Windows installer |
| `npm run build:linux` | Builds the Linux AppImage and deb |
| `npm run build:mac` | Builds the macOS dmg and zip |
| `npm run lint` | Checks the project with ESLint |

## How It Works

The React form sends data through `window.desktop.startRpc(...)`. This API is created in `electron/preload.js` with `contextBridge`, so the renderer does not get direct Node.js access.

Then `electron/main.js` receives the `rpc:start` IPC event and calls `startRpc` from `electron/rpc.js`. There, a `discord-rpc` client is created, `login` runs with the `Application ID`, and the activity is set with `setActivity`.

Stopping the status works through `window.desktop.stopRpc()`, the `rpc:stop` IPC handler, and `clearActivity()`.

## Troubleshooting

**RPC does not appear in Discord**

- Check that Discord Desktop is running, not only the web version.
- Make sure the `Application ID` contains 17-20 digits.
- Check that the application exists in the Discord Developer Portal.

**Images do not appear**

- Check that the assets are uploaded to the Discord Application.
- Use the asset key, not an image URL.
- Discord CDN can take a few minutes to update newly uploaded assets.

**Buttons are not visible**

- A button needs both `Label` and `Url`.
- Discord limits Rich Presence to two buttons.

## Stack

- **Next.js** - app interface.
- **React** - UI components and state.
- **Electron** - desktop shell, window, and IPC.
- **discord-rpc** - Discord Rich Presence connection.
- **TypeScript** - renderer types.
- **Electron Builder** - desktop app packaging.

## License

This project is distributed under the [MIT](LICENSE) license.
