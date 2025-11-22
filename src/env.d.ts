import { User } from "./utils/User";

declare namespace App {
  interface Locals {
    user: User | null;
    welcomeTitle: () => string;
    orders: Map<string, object>;
    session: import("better-auth").Session | null;
  }
}