import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { clients, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "admin@local.test",
    password: "Admin@123",
    userName: "",
    fullName: "",
    role: "Customer",
    clientTenantId: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form);
      }

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#071a19_0%,#113532_48%,#dbece7_48%,#f4f8f7_100%)] px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 text-white shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Production-ready starter</p>
          <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight">Endpoint security platform rebuilt with ASP.NET Core Web API and React.</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Backend", "Clean Architecture, EF Core, JWT, Swagger"],
              ["Runtime", "localhost:5000 API and localhost:3000 UI"],
              ["Ops", "Docker compose, Redis cache and background worker"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold">{title}</p>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-950/10 backdrop-blur">
          <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
            <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-white shadow" : "text-slate-500"}`}>
              Login
            </button>
            <button type="button" onClick={() => setMode("register")} className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${mode === "register" ? "bg-white shadow" : "text-slate-500"}`}>
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Username" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </>
            )}

            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

            {mode === "register" && (
              <>
                <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option>Customer</option>
                  <option>Analyst</option>
                  <option>Admin</option>
                </select>
                <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={form.clientTenantId} onChange={(e) => setForm({ ...form, clientTenantId: e.target.value })}>
                  <option value="">No client tenant</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </>
            )}

            {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60">
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-slate-950 px-4 py-4 text-sm text-slate-200">
            <p>Demo accounts:</p>
            <p>admin@local.test / Admin@123</p>
            <p>analyst@local.test / Analyst@123</p>
          </div>
        </section>
      </div>
    </div>
  );
}
