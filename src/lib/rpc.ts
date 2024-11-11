import { hc } from "hono/client";
import { AppType, WebSocketApp } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);
export const socket = hc<WebSocketApp>(
  process.env.NEXT_PUBLIC_API_URL!,
).ws.$ws();
