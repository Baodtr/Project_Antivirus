import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "../lib/api";

type AuthResponse = {
  token: string;
  [key: string]: unknown;
};

type ClientTenant = {
  id: string;
  name: string;
  [key: string]: unknown;
};

type RegisterPayload = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  clientTenantId?: string;
};

type AuthContextValue = {
  auth: AuthResponse | null;
  clients: ClientTenant[];
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshClients: () => Promise<void>;
};

const storageKey = "malware-protection-suite-auth";
const roleMap: Record<string, number> = { Admin: 1, Analyst: 2, Customer: 3 };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthResponse | null>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as AuthResponse) : null;
  });
  const [clients, setClients] = useState<ClientTenant[]>([]);

  useEffect(() => {
    if (auth) {
      void refreshClients(auth.token);
    }
  }, [auth]);

  async function login(email: string, password: string) {
    const result = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem(storageKey, JSON.stringify(result));
    setAuth(result);
  }

  async function register(payload: RegisterPayload) {
    const result = await apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        role: roleMap[payload.role] ?? 3,
        clientTenantId: payload.clientTenantId || null,
      }),
    });

    localStorage.setItem(storageKey, JSON.stringify(result));
    setAuth(result);
  }

  function logout() {
    localStorage.removeItem(storageKey);
    setAuth(null);
    setClients([]);
  }

  async function refreshClients(token = auth?.token) {
    if (!token) return;
    const result = await apiFetch<ClientTenant[]>("/api/clients", { token });
    setClients(result);
  }

  return <AuthContext.Provider value={{ auth, clients, login, register, logout, refreshClients }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
