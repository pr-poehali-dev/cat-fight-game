const AUTH_URL = "https://functions.poehali.dev/bf4dcc17-e3d8-4d0a-ad27-acf89e5ea338";
const TOKEN_KEY = "nekocyber_token";

export interface User {
  id: number;
  username: string;
  email: string;
  nkt_balance: number;
  level: number;
  xp: number;
  battles: number;
  wins: number;
}

async function call(body: object, token?: string): Promise<{ data?: unknown; error?: string }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["X-Auth-Token"] = token;
  const res = await fetch(AUTH_URL, { method: "POST", headers, body: JSON.stringify(body) });
  const json = await res.json();
  if (json.error) return { error: json.error };
  return { data: json };
}

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiRegister(username: string, email: string, password: string): Promise<{ user?: User; token?: string; error?: string }> {
  const res = await call({ action: "register", username, email, password });
  if (res.error) return { error: res.error };
  const d = res.data as { user: User; token: string };
  return { user: d.user, token: d.token };
}

export async function apiLogin(email: string, password: string): Promise<{ user?: User; token?: string; error?: string }> {
  const res = await call({ action: "login", email, password });
  if (res.error) return { error: res.error };
  const d = res.data as { user: User; token: string };
  return { user: d.user, token: d.token };
}

export async function apiMe(token: string): Promise<{ user?: User; error?: string }> {
  const res = await call({ action: "me" }, token);
  if (res.error) return { error: res.error };
  const d = res.data as { user: User };
  return { user: d.user };
}

export async function apiLogout(token: string): Promise<void> {
  await call({ action: "logout" }, token);
}
