import { createAuthClient } from "better-auth/client";

const client = createAuthClient();

export type AuthUser = typeof client.$Infer.Session.user;
