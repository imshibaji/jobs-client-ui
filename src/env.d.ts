import { User } from "./utils/User";

interface ImportMetaEnv {
  readonly APP_URL: string;
  readonly BASE_URL: string;
  readonly APP_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}