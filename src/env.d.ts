import { User } from "./utils/User";

interface ImportMetaEnv {
  readonly APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}