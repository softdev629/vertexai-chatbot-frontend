/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_WS_SERVER_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
