export {};

declare global {
  interface Window {
    desktop: {
      startRpc: (data: unknown) => Promise<{ ok: true }>;
      stopRpc: () => Promise<{ ok: true }>;
      closeApp: () => Promise<void>;
      minimizeApp: () => Promise<void>;
      
      getVersions?: () => Promise<{
        chrome: string;
        electron: string;
        node: string;
      }>;
    };
  }
}