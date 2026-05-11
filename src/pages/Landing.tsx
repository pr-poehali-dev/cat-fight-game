import { useState } from "react";
import { CAT_IMAGE, CATS_IMAGE } from "./game/constants";
import { User, apiLogin, apiRegister, setToken } from "@/lib/auth";

interface Props {
  onAuth: (user: User, token: string) => void;
}

type Mode = "landing" | "login" | "register";

const FEATURES = [
  { icon: "⚔", title: "PVP БИТВЫ", desc: "Сражайся с игроками по всему миру в реальном времени" },
  { icon: "🐱", title: "NFT КОТЫ", desc: "Коллекционируй уникальных киберкотов с редкими характеристиками" },
  { icon: "💎", title: "EARN & PLAY", desc: "Зарабатывай NEKOTOKEN за победы и участие в турнирах" },
  { icon: "🏆", title: "ЛИДЕРБОРД", desc: "Попади в топ лучших бойцов сезона и получи эксклюзивные награды" },
];

const STATS = [
  { value: "120K+", label: "Игроков" },
  { value: "2.4M", label: "Сражений" },
  { value: "340K", label: "NFT котов" },
  { value: "$1.2M", label: "Выплачено" },
];

function AuthForm({ mode, onAuth, onSwitch, onBack }: { mode: "login" | "register"; onAuth: (u: User, t: string) => void; onSwitch: () => void; onBack: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let result;
      if (mode === "register") {
        result = await apiRegister(username, email, password);
      } else {
        result = await apiLogin(email, password);
      }
      if (result.error) {
        setError(result.error);
      } else if (result.user && result.token) {
        setToken(result.token);
        onAuth(result.user, result.token);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(2,0,16,0.97)", backdropFilter: "blur(20px)" }}>
      <div className="w-full max-w-sm fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-orbitron font-black text-3xl mb-2 flicker" style={{ color: "var(--neon-cyan)", textShadow: "0 0 20px rgba(0,255,255,0.8)" }}>
            NEKO<span style={{ color: "var(--neon-magenta)" }}>CYBER</span>
          </div>
          <div className="font-rajdhani text-sm" style={{ color: "rgba(0,255,255,0.5)" }}>
            {mode === "login" ? "Вход в систему" : "Регистрация бойца"}
          </div>
        </div>

        {/* Card */}
        <div className="cyber-card p-6 space-y-5">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--neon-cyan), transparent)" }} />

          {/* Tab switch */}
          <div className="flex gap-0">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={m !== mode ? onSwitch : undefined}
                className="flex-1 py-2 font-orbitron text-xs font-bold transition-all"
                style={{
                  borderBottom: mode === m ? "2px solid var(--neon-cyan)" : "2px solid rgba(0,255,255,0.15)",
                  color: mode === m ? "var(--neon-cyan)" : "rgba(0,255,255,0.35)",
                  background: "transparent",
                }}
              >
                {m === "login" ? "ВХОД" : "РЕГИСТРАЦИЯ"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="font-orbitron text-xs block mb-1.5" style={{ color: "rgba(0,255,255,0.6)" }}>НИКНЕЙМ</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="YourCatName"
                  maxLength={32}
                  className="w-full px-3 py-2.5 font-mono text-sm outline-none transition-all"
                  style={{
                    background: "rgba(0,255,255,0.04)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    color: "var(--neon-cyan)",
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--neon-cyan)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,255,0.2)")}
                />
              </div>
            )}

            <div>
              <label className="font-orbitron text-xs block mb-1.5" style={{ color: "rgba(0,255,255,0.6)" }}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cat@neko.io"
                className="w-full px-3 py-2.5 font-mono text-sm outline-none transition-all"
                style={{
                  background: "rgba(0,255,255,0.04)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  color: "var(--neon-cyan)",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--neon-cyan)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,255,0.2)")}
              />
            </div>

            <div>
              <label className="font-orbitron text-xs block mb-1.5" style={{ color: "rgba(0,255,255,0.6)" }}>ПАРОЛЬ</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 font-mono text-sm outline-none transition-all"
                style={{
                  background: "rgba(0,255,255,0.04)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  color: "var(--neon-cyan)",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--neon-cyan)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,255,0.2)")}
              />
              {mode === "register" && (
                <div className="font-mono text-xs mt-1" style={{ color: "rgba(0,255,255,0.3)" }}>Минимум 6 символов</div>
              )}
            </div>

            {error && (
              <div className="px-3 py-2 font-rajdhani text-sm" style={{ background: "rgba(255,0,80,0.08)", border: "1px solid rgba(255,0,80,0.3)", color: "rgba(255,80,80,0.9)" }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-cyber w-full"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              <span>{loading ? "ПОДКЛЮЧЕНИЕ..." : mode === "login" ? "ВОЙТИ В СИСТЕМУ" : "СОЗДАТЬ БОЙЦА"}</span>
            </button>
          </form>

          <div className="text-center">
            <button
              className="font-rajdhani text-sm transition-all"
              style={{ color: "rgba(0,255,255,0.4)" }}
              onClick={onSwitch}
            >
              {mode === "login" ? "Нет аккаунта? → Регистрация" : "Уже есть аккаунт? → Войти"}
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="font-mono text-xs" style={{ color: "rgba(0,255,255,0.2)" }} onClick={onBack}>
            ← НА ГЛАВНУЮ
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Landing({ onAuth }: Props) {
  const [mode, setMode] = useState<Mode>("landing");

  if (mode === "login" || mode === "register") {
    return (
      <AuthForm
        mode={mode}
        onAuth={onAuth}
        onSwitch={() => setMode(mode === "login" ? "register" : "login")}
        onBack={() => setMode("landing")}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      {/* Scanline */}
      <div className="scanline" />

      {/* Header */}
      <header className="sticky top-0 z-40" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,255,0.12)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="font-orbitron font-black text-lg flicker" style={{ color: "var(--neon-cyan)", textShadow: "0 0 10px rgba(0,255,255,0.8)" }}>
            NEKO<span style={{ color: "var(--neon-magenta)" }}>CYBER</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="font-orbitron text-xs px-4 py-1.5 transition-all"
              style={{ color: "rgba(0,255,255,0.6)", border: "1px solid rgba(0,255,255,0.2)", clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
              onClick={() => setMode("login")}
            >
              ВОЙТИ
            </button>
            <button className="btn-cyber" onClick={() => setMode("register")}>
              <span>ИГРАТЬ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}>
        {/* BG effects */}
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,255,255,0.02) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,255,255,0.02) 60px)" }} />
        <div className="absolute top-0 right-0 w-96 h-96" style={{ background: "radial-gradient(ellipse, rgba(255,0,255,0.12) 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80" style={{ background: "radial-gradient(ellipse, rgba(0,255,255,0.1) 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />

        <div className="max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 space-y-6 fade-in-up">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full neon-pulse" style={{ background: "var(--neon-green)", boxShadow: "0 0 8px var(--neon-green)" }} />
                <span className="font-mono text-xs" style={{ color: "var(--neon-green)" }}>ОТКРЫТАЯ БЕТА · СЕЗОН 7</span>
              </div>

              <h1 className="font-orbitron font-black leading-none" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                <span style={{ color: "var(--neon-cyan)", textShadow: "0 0 30px rgba(0,255,255,0.6)" }}>NEKO</span>
                <br />
                <span style={{ color: "var(--neon-magenta)", textShadow: "0 0 30px rgba(255,0,255,0.6)" }}>CYBER</span>
              </h1>

              <p className="font-rajdhani text-xl" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 480 }}>
                Первая NFT-игра с котами в киберпанк-вселенной. Сражайся, прокачивай и зарабатывай реальные токены.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button className="btn-cyber text-base" onClick={() => setMode("register")} style={{ padding: "0.8rem 2rem" }}>
                  <span>🐱 НАЧАТЬ ИГРАТЬ</span>
                </button>
                <button
                  className="font-orbitron text-sm px-6 py-3 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  onClick={() => setMode("login")}
                >
                  ВОЙТИ
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-orbitron font-black text-xl neon-cyan">{s.value}</div>
                    <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative flex-shrink-0 fade-in-up fade-in-up-2">
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)", transform: "scale(1.3)" }} />
              <div className="absolute inset-0 rounded-full ring-pulse" style={{ border: "1px solid rgba(0,255,255,0.2)" }} />
              <div className="absolute inset-0 rounded-full ring-pulse" style={{ border: "1px solid rgba(255,0,255,0.15)", animationDelay: "1s" }} />
              <img
                src={CAT_IMAGE}
                alt="Cyber Cat"
                className="float relative z-10 rounded-sm object-cover"
                style={{ width: 280, height: 280, border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 40px rgba(0,255,255,0.3), 0 0 80px rgba(0,255,255,0.1)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="font-orbitron font-black text-2xl neon-cyan mb-2">КАК ЭТО РАБОТАЕТ</div>
            <div className="font-rajdhani text-lg" style={{ color: "rgba(255,255,255,0.4)" }}>Зарегистрируйся и начни зарабатывать прямо сейчас</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="cyber-card p-5 text-center fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-orbitron font-bold text-sm mb-2 neon-cyan">{f.title}</div>
                <div className="font-rajdhani text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NFT showcase */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-sm" style={{ border: "1px solid rgba(255,0,255,0.2)" }}>
            <img src={CATS_IMAGE} alt="NFT Cats" className="w-full object-cover" style={{ height: 300 }} />
            <div className="absolute inset-0 flex items-center" style={{ background: "linear-gradient(90deg, rgba(2,0,16,0.95) 40%, transparent 100%)" }}>
              <div className="p-8 md:p-12 max-w-md">
                <div className="font-orbitron font-black text-2xl mb-3 neon-magenta">NFT КОЛЛЕКЦИЯ</div>
                <p className="font-rajdhani text-lg mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Каждый кот уникален. Редкие бойцы дают бонусы в PVP и стоят реальных денег.
                </p>
                <button className="btn-cyber-magenta" onClick={() => setMode("register")}>
                  <span>ПОЛУЧИТЬ КОТА</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}>
        <div className="max-w-xl mx-auto px-4">
          <div className="font-orbitron font-black mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--neon-cyan)" }}>
            ГОТОВ СТАТЬ ЛЕГЕНДОЙ?
          </div>
          <p className="font-rajdhani text-lg mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Регистрация занимает 30 секунд. Стартовый бонус — 24,500 NEKOTOKEN.
          </p>
          <button className="btn-cyber" onClick={() => setMode("register")} style={{ padding: "1rem 3rem", fontSize: "1rem" }}>
            <span>⚡ ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center" style={{ borderTop: "1px solid rgba(0,255,255,0.06)" }}>
        <div className="font-mono text-xs" style={{ color: "rgba(0,255,255,0.2)" }}>
          NEKOCYBER v0.1.0 · BLOCKCHAIN NETWORK: ETH · © 2026
          <span className="blink ml-1">_</span>
        </div>
      </footer>
    </div>
  );
}