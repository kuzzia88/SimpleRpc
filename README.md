# SimpleRpc

Готовая рабочая среда для связки Next.js + Electron.

## Команды

```bash
npm run dev
```

Запускает Next.js на `http://localhost:3001` и открывает Electron-окно.

```bash
npm run build
```

Собирает статический Next.js экспорт в папку `out`.

```bash
npm run build:app
```

Собирает Next.js и затем упаковывает Windows-приложение через Electron Builder.

## Структура

- `src/app` - интерфейс Next.js.
- `electron/main.js` - главный процесс Electron.
- `electron/preload.js` - безопасный bridge между Electron и браузерным UI.
- `next.config.ts` - статический экспорт, подходящий для продакшен-режима Electron.
