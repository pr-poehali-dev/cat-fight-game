import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS, CAT_IMAGE } from "./game/constants";
import { HomeSection, ProfileSection } from "./game/GameSections";
import { ScanLine, ShopSection, LeaderboardSection, QuestsSection, SettingsSection } from "./game/GameSections2";
import Landing from "./Landing";
import { User, getToken, clearToken, apiMe, apiLogout } from "@/lib/auth";

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthChecked(true);
      return;
    }
    apiMe(token).then((res) => {
      if (res.user) setUser(res.user);
      else clearToken();
      setAuthChecked(true);
    });
  }, []);

  const handleLogout = async () => {
    const token = getToken();
    if (token) await apiLogout(token);
    clearToken();
    setUser(null);
    setActive("home");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-dark)" }}>
        <div className="text-center space-y-4">
          <div className="font-orbitron font-black text-2xl flicker" style={{ color: "var(--neon-cyan)" }}>
            NEKO<span style={{ color: "var(--neon-magenta)" }}>CYBER</span>
          </div>
          <div className="flex justify-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full neon-pulse" style={{ background: "var(--neon-cyan)", animationDelay: `${i * 0.2}s`, boxShadow: "0 0 6px var(--neon-cyan)" }} />
            ))}
          </div>
          <div className="font-mono text-xs" style={{ color: "rgba(0,255,255,0.4)" }}>ПОДКЛЮЧЕНИЕ К СЕТИ...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Landing onAuth={(u) => setUser(u)} />;
  }

  const renderSection = () => {
    switch (active) {
      case "home": return <HomeSection onNavigate={setActive} />;
      case "profile": return <ProfileSection onNavigate={setActive} />;
      case "shop": return <ShopSection />;
      case "leaderboard": return <LeaderboardSection />;
      case "quests": return <QuestsSection />;
      case "settings": return <SettingsSection onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <ScanLine />

      <header className="sticky top-0 z-40" style={{ background: "rgba(2,0,16,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,255,0.15)", boxShadow: "0 0 20px rgba(0,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="font-orbitron font-black text-lg flicker" style={{ color: "var(--neon-cyan)", textShadow: "0 0 10px rgba(0,255,255,0.8)" }}>
            NEKO<span style={{ color: "var(--neon-magenta)" }}>CYBER</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`nav-item font-orbitron text-xs font-bold py-1 ${active === item.id ? "active" : ""}`}
                style={{ color: active === item.id ? "var(--neon-cyan)" : "rgba(0,255,255,0.4)", textShadow: active === item.id ? "0 0 10px rgba(0,255,255,0.6)" : "none" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="font-mono text-xs px-2 py-1" style={{ background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.15)", color: "var(--neon-cyan)" }}>
              {user.nkt_balance.toLocaleString()} NKT
            </div>
            <button
              onClick={() => setActive("profile")}
              className="flex items-center gap-2"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <div className="w-8 h-8 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,255,255,0.3)" }}>
                <img src={CAT_IMAGE} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="hidden md:block font-orbitron text-xs" style={{ color: "var(--neon-cyan)" }}>{user.username}</span>
            </button>
            <button
              onClick={handleLogout}
              title="Выйти"
              className="hidden md:flex items-center"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            >
              <Icon name="LogOut" size={14} style={{ color: "rgba(255,80,80,0.6)" }} />
            </button>
          </div>
        </div>
      </header>

      <nav className="md:hidden sticky top-14 z-30 overflow-x-auto" style={{ background: "rgba(2,0,16,0.98)", borderBottom: "1px solid rgba(0,255,255,0.1)" }}>
        <div className="flex px-2 py-2 gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 flex-shrink-0 transition-all"
              style={{
                borderBottom: active === item.id ? "2px solid var(--neon-cyan)" : "2px solid transparent",
                color: active === item.id ? "var(--neon-cyan)" : "rgba(0,255,255,0.35)",
                background: "none",
              }}
            >
              <Icon name={item.icon} size={14} />
              <span className="font-orbitron" style={{ fontSize: "0.55rem" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderSection()}
      </main>

      <footer className="mt-12 py-4 text-center" style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}>
        <div className="font-mono text-xs" style={{ color: "rgba(0,255,255,0.2)" }}>
          NEKOCYBER v0.1.0 · {user.username} · ОНЛАЙН
          <span className="blink ml-1">_</span>
        </div>
      </footer>
    </div>
  );
}
