import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const SESSION_COOKIE = "aamdar_manager_session";

type ManagerSession = {
  sub: string;
  email: string;
  name: string;
  role: "MANAGER";
  exp: number;
};

function base64UrlEncode(value: string) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
}

async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

function getSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-only-change-this-secret";
}

export async function signManagerToken(payload: Omit<ManagerSession, "exp">) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
    })
  );
  const unsigned = `${header}.${body}`;
  return `${unsigned}.${await hmac(unsigned, getSecret())}`;
}

export async function verifyManagerToken(token?: string | null): Promise<ManagerSession | null> {
  if (!token) return null;
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;

  const expected = await hmac(`${header}.${body}`, getSecret());
  if (expected !== signature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as ManagerSession;
    if (payload.role !== "MANAGER" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getManagerSession() {
  const cookieStore = await cookies();
  return verifyManagerToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function getManagerSessionFromRequest(request: NextRequest) {
  return verifyManagerToken(request.cookies.get(SESSION_COOKIE)?.value);
}

type PasswordResetPayload = {
  purpose: "password_reset";
  sub: string;
  email: string;
  exp: number;
};

export async function signPasswordResetToken(managerId: string, email: string) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(
    JSON.stringify({
      purpose: "password_reset",
      sub: managerId,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    } satisfies PasswordResetPayload)
  );
  const unsigned = `${header}.${body}`;
  return `${unsigned}.${await hmac(unsigned, getSecret())}`;
}

export async function verifyPasswordResetToken(token?: string | null) {
  if (!token) return null;
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;

  const expected = await hmac(`${header}.${body}`, getSecret());
  if (expected !== signature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as PasswordResetPayload;
    if (
      payload.purpose !== "password_reset" ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
