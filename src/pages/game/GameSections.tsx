import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CAT_IMAGE, CATS_IMAGE, Section } from "./constants";

interface NavProps {
  onNavigate: (section: Section) => void;
}

export function HomeSection({ onNavigate }: NavProps) {
  const [battleActive, setBattleActive] = useState(false);

  return (
    <div className="space-y-6 fade-in-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-sm" style={{ background: "linear-gradient(135deg, #020010 0%, #0a0020 50%, #020010 100%)", border: "1px solid rgba(0,255,255,0.2)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,255,255,0.03) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,255,255,0.03) 20px)" }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #00ffff 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full neon-pulse" style={{ background: "var(--neon-green)", boxShadow: "0 0 8px var(--neon-green)" }} />
              <span className="font-mono text-xs" style={{ color: "var(--neon-green)" }}>СИСТЕМА ОНЛАЙН</span>
            </div>
            <h1 className="font-orbitron font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--neon-cyan)", textShadow: "0 0 20px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.2)" }}>
              NEKO<br />
              <span style={{ color: "var(--neon-magenta)", textShadow: "0 0 20px rgba(255,0,255,0.6)" }}>CYBER</span>
            </h1>
            <p className="font-rajdhani text-lg" style={{ color: "rgba(0,255,255,0.7)" }}>
              Сражайся. Прокачивай. Доминируй.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="btn-cyber" onClick={() => setBattleActive(true)}>
                <span>⚔ БИТВА</span>
              </button>
              <button className="btn-cyber-magenta" onClick={() => onNavigate("profile")}>
                <span>🐱 МОЙ КОТ</span>
              </button>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full ring-pulse" style={{ border: "1px solid rgba(0,255,255,0.3)" }} />
            <div className="absolute inset-0 rounded-full ring-pulse" style={{ border: "1px solid rgba(255,0,255,0.2)", animationDelay: "1s" }} />
            <img
              src={CAT_IMAGE}
              alt="Cyber Cat"
              className="float relative z-10 rounded-sm object-cover cursor-pointer"
              style={{ width: 200, height: 200, border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(0,255,255,0.1)" }}
              onClick={() => onNavigate("profile")}
            />
            <div className="absolute -top-2 -right-2 font-orbitron font-black text-xs px-2 py-1" style={{ background: "var(--neon-yellow)", color: "#000", clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}>
              LVL 42
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 fade-in-up fade-in-up-2">
        {[
          { label: "Сражений", value: "1,247", icon: "Swords", color: "var(--neon-cyan)", section: null },
          { label: "Побед", value: "89%", icon: "Trophy", color: "var(--neon-yellow)", section: "leaderboard" as Section },
          { label: "NEKOTOKEN", value: "24,500", icon: "Coins", color: "var(--neon-magenta)", section: "shop" as Section },
          { label: "NFT Котов", value: "7", icon: "Layers", color: "var(--neon-green)", section: "profile" as Section },
        ].map((stat) => (
          <div
            key={stat.label}
            className="cyber-card p-4 text-center"
            style={{ cursor: stat.section ? "pointer" : "default" }}
            onClick={() => stat.section && onNavigate(stat.section)}
          >
            <Icon name={stat.icon} size={20} style={{ color: stat.color, margin: "0 auto 8px", filter: `drop-shadow(0 0 6px ${stat.color})` }} />
            <div className="font-orbitron font-bold text-xl" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-rajdhani text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Battle modal */}
      {battleActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(10px)" }} onClick={() => setBattleActive(false)}>
          <div className="cyber-card p-8 max-w-sm w-full mx-4 text-center space-y-6 fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="font-orbitron font-black text-2xl neon-cyan glitch">ПОИСК ВРАГА</div>
            <div className="flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full neon-pulse" style={{ background: "var(--neon-cyan)", animationDelay: `${i * 0.2}s`, boxShadow: "0 0 6px var(--neon-cyan)" }} />
              ))}
            </div>
            <p className="font-rajdhani" style={{ color: "rgba(0,255,255,0.6)" }}>Сканирую нейросеть противника...</p>
            <button className="btn-cyber w-full" onClick={() => setBattleActive(false)}>
              <span>ОТМЕНА</span>
            </button>
          </div>
        </div>
      )}

      {/* NFT showcase */}
      <div className="fade-in-up fade-in-up-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6" style={{ background: "var(--neon-magenta)", boxShadow: "0 0 8px var(--neon-magenta)" }} />
          <span className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-magenta)" }}>NFT КОЛЛЕКЦИЯ</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,0,255,0.3), transparent)" }} />
        </div>
        <div className="relative overflow-hidden rounded-sm">
          <img src={CATS_IMAGE} alt="NFT Cats" className="w-full object-cover" style={{ height: 200, border: "1px solid rgba(255,0,255,0.2)", boxShadow: "0 0 20px rgba(255,0,255,0.2)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,0,16,0.9) 0%, transparent 60%)" }}>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <div className="font-orbitron font-bold text-sm neon-magenta">7 NFT КОТОВ</div>
                <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Общая стоимость: 0.35 ETH</div>
              </div>
              <button className="btn-cyber-magenta" onClick={() => onNavigate("shop")}>
                <span>ТОРГОВЛЯ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection({ onNavigate }: NavProps) {
  const [selectedCat, setSelectedCat] = useState<{ name: string; rarity: string; color: string } | null>(null);

  const stats = [
    { name: "АТАКА", value: 87, color: "var(--neon-magenta)" },
    { name: "ЗАЩИТА", value: 64, color: "var(--neon-cyan)" },
    { name: "ЛОВКОСТЬ", value: 92, color: "var(--neon-yellow)" },
    { name: "ИНТЕЛЛЕКТ", value: 78, color: "var(--neon-green)" },
    { name: "УДАЧА", value: 55, color: "var(--neon-orange)" },
  ];

  const cats = [
    { name: "Α-Демон", rarity: "LEGEND", color: "#ff6600" },
    { name: "Β-Призрак", rarity: "SSR", color: "#ff00ff" },
    { name: "Γ-Плазма", rarity: "SR", color: "#00ffff" },
    { name: "Δ-Нейро", rarity: "SR", color: "#00ffff" },
    { name: "Ε-Квант", rarity: "R", color: "#00ff88" },
    { name: "Ζ-Киборг", rarity: "R", color: "#00ff88" },
    { name: "Η-Хаос", rarity: "UR", color: "#ffff00" },
  ];

  return (
    <div className="space-y-5 fade-in-up">
      <div className="cyber-card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img src={CAT_IMAGE} alt="Profile Cat" className="rounded-sm object-cover" style={{ width: 120, height: 120, border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 20px rgba(0,255,255,0.2)" }} />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-orbitron font-bold text-xs px-3 py-0.5" style={{ background: "var(--neon-cyan)", color: "#000" }}>
                LVL 42
              </div>
            </div>
            <div className="text-center">
              <div className="font-orbitron font-bold text-sm neon-cyan">SHADOWPAW</div>
              <div className="font-mono text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>0x7f3a...9b2c</div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              {["ЛЕГЕНДА", "ТОП-10", "NFT МАСТЕР"].map((badge) => (
                <span key={badge} className="font-orbitron text-xs px-2 py-1" style={{ border: "1px solid var(--neon-yellow)", color: "var(--neon-yellow)", clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
                  {badge}
                </span>
              ))}
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span style={{ color: "rgba(0,255,255,0.6)" }}>ОПЫТ</span>
                <span style={{ color: "var(--neon-cyan)" }}>84,200 / 100,000 XP</span>
              </div>
              <div className="progress-neon">
                <div className="progress-neon-fill" style={{ width: "84%" }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Сезон", value: "S7" },
                { label: "Клан", value: "VOID_9" },
                { label: "Ранг", value: "★★★★☆" },
              ].map((item) => (
                <div key={item.label} className="text-center p-2" style={{ background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.1)" }}>
                  <div className="font-orbitron font-bold text-sm neon-cyan">{item.value}</div>
                  <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 8px var(--neon-cyan)" }} />
          <span className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-cyan)" }}>ХАРАКТЕРИСТИКИ</span>
        </div>
        <div className="cyber-card p-5 space-y-3">
          {stats.map((stat) => (
            <div key={stat.name}>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{stat.name}</span>
                <span style={{ color: stat.color }}>{stat.value}/100</span>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${stat.value}%`, background: stat.color, boxShadow: `0 0 6px ${stat.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6" style={{ background: "var(--neon-magenta)", boxShadow: "0 0 8px var(--neon-magenta)" }} />
          <span className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-magenta)" }}>NFT ИНВЕНТАРЬ</span>
          <span className="font-orbitron text-xs px-2 py-0.5" style={{ background: "rgba(255,0,255,0.1)", color: "var(--neon-magenta)", border: "1px solid rgba(255,0,255,0.3)" }}>7 КОТОВ</span>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
          {cats.map((cat) => (
            <div
              key={cat.name}
              className="aspect-square relative overflow-hidden rounded-sm cursor-pointer group"
              style={{ background: "var(--bg-card2)", border: `1px solid ${cat.color}33` }}
              onClick={() => setSelectedCat(cat)}
            >
              <img src={CAT_IMAGE} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cat.color}40 0%, transparent 60%)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-1 text-center">
                <div className="font-orbitron font-bold" style={{ color: cat.color, fontSize: "0.55rem" }}>{cat.name}</div>
                <div className="font-mono" style={{ color: cat.color, fontSize: "0.5rem", opacity: 0.7 }}>{cat.rarity}</div>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 4px ${cat.color}` }} />
            </div>
          ))}
          <div
            className="aspect-square border border-dashed flex flex-col items-center justify-center gap-1 rounded-sm cursor-pointer hover:border-solid transition-all"
            style={{ borderColor: "rgba(0,255,255,0.2)" }}
            onClick={() => onNavigate("shop")}
          >
            <Icon name="Plus" size={16} style={{ color: "rgba(0,255,255,0.4)" }} />
            <span className="font-orbitron" style={{ color: "rgba(0,255,255,0.4)", fontSize: "0.5rem" }}>МИНТ</span>
          </div>
        </div>
      </div>

      {/* Cat detail modal */}
      {selectedCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(10px)" }} onClick={() => setSelectedCat(null)}>
          <div className="cyber-card p-6 max-w-xs w-full mx-4 text-center space-y-4 fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="font-orbitron font-black text-lg" style={{ color: selectedCat.color }}>{selectedCat.name}</div>
            <img src={CAT_IMAGE} alt={selectedCat.name} className="w-32 h-32 object-cover rounded-sm mx-auto" style={{ border: `2px solid ${selectedCat.color}`, boxShadow: `0 0 20px ${selectedCat.color}44` }} />
            <div className="font-orbitron font-black text-sm px-3 py-1 mx-auto inline-block" style={{ background: `${selectedCat.color}22`, color: selectedCat.color, border: `1px solid ${selectedCat.color}44` }}>
              {selectedCat.rarity}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 btn-cyber" onClick={() => setSelectedCat(null)}>
                <span>ЗАКРЫТЬ</span>
              </button>
              <button className="flex-1 btn-cyber-magenta" onClick={() => { setSelectedCat(null); onNavigate("shop"); }}>
                <span>ПРОДАТЬ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
