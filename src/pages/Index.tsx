import { useState } from "react";
import Icon from "@/components/ui/icon";

const CAT_IMAGE = "https://cdn.poehali.dev/projects/365b343e-ad43-44b4-81c2-bc783b204014/files/a009f3f4-a8c8-4f2d-b42c-3bb60fc03dd8.jpg";
const CATS_IMAGE = "https://cdn.poehali.dev/projects/365b343e-ad43-44b4-81c2-bc783b204014/files/d6035564-68f5-4242-b46a-1f03648ea720.jpg";

type Section = "home" | "profile" | "shop" | "leaderboard" | "quests" | "settings";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "ГЛАВНАЯ", icon: "Zap" },
  { id: "profile", label: "ПРОФИЛЬ", icon: "User" },
  { id: "shop", label: "МАГАЗИН", icon: "ShoppingBag" },
  { id: "leaderboard", label: "ЛИДЕРБОРД", icon: "Trophy" },
  { id: "quests", label: "КВЕСТЫ", icon: "Crosshair" },
  { id: "settings", label: "НАСТРОЙКИ", icon: "Settings" },
];

const LEADERBOARD = [
  { rank: 1, name: "SHADOWPAW_9X", cat: "Киберкот Α", score: 98420, win: 94, color: "#ffff00" },
  { rank: 2, name: "NEO_PURR", cat: "Призрачный Β", score: 87310, win: 88, color: "#00ffff" },
  { rank: 3, name: "GLITCH_MEOW", cat: "Плазменный Γ", score: 75680, win: 81, color: "#ff00ff" },
  { rank: 4, name: "VOIDCAT_7", cat: "Нейро Δ", score: 61200, win: 73, color: "#00ff88" },
  { rank: 5, name: "CRYPTOKITTY", cat: "Квантовый Ε", score: 54990, win: 68, color: "#ff6600" },
];

const QUESTS = [
  { id: 1, title: "Первая кровь", desc: "Победи в 3 сражениях подряд", reward: 500, progress: 67, done: false, color: "var(--neon-cyan)" },
  { id: 2, title: "Коллекционер", desc: "Собери 5 NFT-котов редкости SR+", reward: 1200, progress: 40, done: false, color: "var(--neon-magenta)" },
  { id: 3, title: "Богатый кот", desc: "Накопи 10,000 NEKOTOKEN", reward: 800, progress: 100, done: true, color: "var(--neon-yellow)" },
  { id: 4, title: "Мастер клана", desc: "Вступи в клан и выиграй 10 клановых битв", reward: 2500, progress: 20, done: false, color: "var(--neon-green)" },
];

const SHOP_ITEMS = [
  { id: 1, name: "Плазма-броня", type: "Броня", rarity: "SR", price: 1200, currency: "NKT", bonus: "+30 Защита", color: "var(--neon-cyan)", glow: "rgba(0,255,255,0.3)" },
  { id: 2, name: "Лазерные когти", type: "Оружие", rarity: "SSR", price: 3500, currency: "NKT", bonus: "+75 Атака", color: "var(--neon-magenta)", glow: "rgba(255,0,255,0.3)" },
  { id: 3, name: "Нейро-имплант", type: "Имплант", rarity: "UR", price: 9999, currency: "NKT", bonus: "+50 Ловкость", color: "var(--neon-yellow)", glow: "rgba(255,255,0,0.3)" },
  { id: 4, name: "Квантовый щит", type: "Щит", rarity: "R", price: 650, currency: "NKT", bonus: "+15 Скорость", color: "var(--neon-green)", glow: "rgba(0,255,136,0.3)" },
  { id: 5, name: "Голо-плащ", type: "Броня", rarity: "SR", price: 1800, currency: "NKT", bonus: "+45 Стелс", color: "var(--neon-orange)", glow: "rgba(255,102,0,0.3)" },
  { id: 6, name: "NFT: Демон-кот", type: "NFT", rarity: "LEGEND", price: 0.05, currency: "ETH", bonus: "Уникальный кот", color: "var(--neon-magenta)", glow: "rgba(255,0,255,0.5)" },
];

function ScanLine() {
  return <div className="scanline" />;
}

function HomeSection() {
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
              <button className="btn-cyber-magenta">
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
              className="float relative z-10 rounded-sm object-cover"
              style={{ width: 200, height: 200, border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(0,255,255,0.1)" }}
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
          { label: "Сражений", value: "1,247", icon: "Swords", color: "var(--neon-cyan)" },
          { label: "Побед", value: "89%", icon: "Trophy", color: "var(--neon-yellow)" },
          { label: "NEKOTOKEN", value: "24,500", icon: "Coins", color: "var(--neon-magenta)" },
          { label: "NFT Котов", value: "7", icon: "Layers", color: "var(--neon-green)" },
        ].map((stat) => (
          <div key={stat.label} className="cyber-card p-4 text-center">
            <Icon name={stat.icon} size={20} style={{ color: stat.color, margin: "0 auto 8px", filter: `drop-shadow(0 0 6px ${stat.color})` }} />
            <div className="font-orbitron font-bold text-xl" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-rajdhani text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Battle modal */}
      {battleActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(10px)" }}>
          <div className="cyber-card p-8 max-w-sm w-full mx-4 text-center space-y-6 fade-in-up">
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
              <button className="btn-cyber-magenta">
                <span>ТОРГОВЛЯ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
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
            <div key={cat.name} className="aspect-square relative overflow-hidden rounded-sm cursor-pointer group" style={{ background: "var(--bg-card2)", border: `1px solid ${cat.color}33` }}>
              <img src={CAT_IMAGE} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cat.color}40 0%, transparent 60%)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-1 text-center">
                <div className="font-orbitron font-bold" style={{ color: cat.color, fontSize: "0.55rem" }}>{cat.name}</div>
                <div className="font-mono" style={{ color: cat.color, fontSize: "0.5rem", opacity: 0.7 }}>{cat.rarity}</div>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 4px ${cat.color}` }} />
            </div>
          ))}
          <div className="aspect-square border border-dashed flex flex-col items-center justify-center gap-1 rounded-sm cursor-pointer hover:border-solid transition-all" style={{ borderColor: "rgba(0,255,255,0.2)" }}>
            <Icon name="Plus" size={16} style={{ color: "rgba(0,255,255,0.4)" }} />
            <span className="font-orbitron" style={{ color: "rgba(0,255,255,0.4)", fontSize: "0.5rem" }}>МИНТ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopSection() {
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "NFT", "ОРУЖИЕ", "БРОНЯ", "ИМПЛАНТ"];

  return (
    <div className="space-y-5 fade-in-up">
      <div className="cyber-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="font-orbitron font-black text-xl neon-cyan">КИБЕР-МАРКЕТ</div>
          <div className="font-rajdhani text-sm" style={{ color: "rgba(0,255,255,0.5)" }}>Снаряди своего кота для битвы</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-orbitron font-bold text-lg" style={{ color: "var(--neon-yellow)" }}>
            24,500 <span className="text-sm">NKT</span>
          </div>
          <div className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-green)" }}>
            0.35 <span className="text-xs">ETH</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="font-orbitron text-xs px-3 py-1.5 whitespace-nowrap transition-all flex-shrink-0"
            style={{
              border: `1px solid ${filter === f ? "var(--neon-cyan)" : "rgba(0,255,255,0.2)"}`,
              color: filter === f ? "var(--bg-dark)" : "rgba(0,255,255,0.6)",
              background: filter === f ? "var(--neon-cyan)" : "transparent",
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SHOP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-sm cursor-pointer transition-transform hover:-translate-y-1"
            style={{ background: "var(--bg-card2)", border: `1px solid ${item.color}33`, boxShadow: `0 4px 20px ${item.glow}` }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-orbitron font-bold text-sm" style={{ color: item.color }}>{item.name}</div>
                  <div className="font-rajdhani text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{item.type}</div>
                </div>
                <span className="font-orbitron font-black text-xs px-2 py-0.5" style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44`, letterSpacing: "0.05em" }}>
                  {item.rarity}
                </span>
              </div>
              <div className="font-mono text-xs mb-4 px-3 py-2" style={{ background: "rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {item.bonus}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-orbitron font-bold text-base" style={{ color: item.color }}>
                  {item.price} <span className="text-xs opacity-70">{item.currency}</span>
                </div>
                <button
                  className="font-orbitron text-xs px-3 py-1.5 transition-all"
                  style={{
                    border: `1px solid ${item.color}`,
                    color: item.color,
                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  КУПИТЬ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardSection() {
  return (
    <div className="space-y-5 fade-in-up">
      <div className="cyber-card p-4">
        <div className="font-orbitron font-black text-xl neon-cyan">ЛИДЕРБОРД</div>
        <div className="font-rajdhani text-sm" style={{ color: "rgba(0,255,255,0.5)" }}>Сезон 7 · Топ бойцов нейросети</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((p, i) => {
          const pos = [2, 1, 3][i];
          const height = ["h-28", "h-36", "h-24"][i];
          return (
            <div key={p.rank} className={`relative flex flex-col items-center justify-end ${height} rounded-sm overflow-hidden`} style={{ background: `linear-gradient(to top, ${p.color}15, transparent)`, border: `1px solid ${p.color}33` }}>
              <div className="absolute top-2 w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-black text-xs" style={{ background: `${p.color}22`, border: `2px solid ${p.color}`, color: p.color }}>
                #{pos}
              </div>
              <div className="p-2 text-center">
                <div className="font-orbitron font-bold" style={{ color: p.color, fontSize: "0.6rem" }}>{p.name.substring(0, 8)}</div>
                <div className="font-orbitron font-black text-sm" style={{ color: p.color }}>{(p.score / 1000).toFixed(0)}K</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cyber-card overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 font-mono text-xs" style={{ color: "rgba(0,255,255,0.4)", borderBottom: "1px solid rgba(0,255,255,0.1)", textTransform: "uppercase" }}>
          <div className="col-span-1">#</div>
          <div className="col-span-4">Игрок</div>
          <div className="col-span-3">Кот</div>
          <div className="col-span-2 text-right">Счёт</div>
          <div className="col-span-2 text-right">Победы</div>
        </div>
        {LEADERBOARD.map((p, i) => (
          <div
            key={p.rank}
            className="grid grid-cols-12 gap-2 px-4 py-3 fade-in-up items-center hover:bg-white hover:bg-opacity-5 transition-all cursor-pointer"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0, borderBottom: "1px solid rgba(255,255,255,0.03)" }}
          >
            <div className="col-span-1">
              <div className="w-6 h-6 flex items-center justify-center font-orbitron font-black text-xs" style={{ color: p.color, border: `1px solid ${p.color}44`, background: `${p.color}11` }}>
                {p.rank}
              </div>
            </div>
            <div className="col-span-4 font-orbitron font-bold text-xs" style={{ color: p.color }}>{p.name}</div>
            <div className="col-span-3 font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{p.cat}</div>
            <div className="col-span-2 text-right font-mono text-xs" style={{ color: p.color }}>{p.score.toLocaleString()}</div>
            <div className="col-span-2 text-right font-mono text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{p.win}%</div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="font-mono text-xs" style={{ color: "rgba(0,255,255,0.3)" }}>
          ВАШ РАНГ: <span style={{ color: "var(--neon-cyan)" }}>#247</span> · СЧЁТ: <span style={{ color: "var(--neon-cyan)" }}>12,450</span>
        </div>
      </div>
    </div>
  );
}

function QuestsSection() {
  return (
    <div className="space-y-5 fade-in-up">
      <div className="cyber-card p-4 flex justify-between items-center">
        <div>
          <div className="font-orbitron font-black text-xl neon-cyan">КВЕСТЫ</div>
          <div className="font-rajdhani text-sm" style={{ color: "rgba(0,255,255,0.5)" }}>Выполняй задания · Получай награды</div>
        </div>
        <div className="text-right">
          <div className="font-orbitron font-bold text-lg" style={{ color: "var(--neon-yellow)" }}>3/4</div>
          <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>ВЫПОЛНЕНО</div>
        </div>
      </div>

      <div className="space-y-3">
        {QUESTS.map((q, i) => (
          <div
            key={q.id}
            className="relative overflow-hidden fade-in-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0, background: "var(--bg-card2)", border: `1px solid ${q.color}22` }}
          >
            {q.done && <div className="absolute inset-0 opacity-5" style={{ background: q.color }} />}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${q.color}, transparent)`, opacity: q.done ? 1 : 0.3 }} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-orbitron font-bold text-sm" style={{ color: q.color }}>{q.title}</div>
                    {q.done && (
                      <span className="font-orbitron text-xs px-1.5 py-0.5" style={{ background: `${q.color}22`, color: q.color, border: `1px solid ${q.color}44` }}>
                        ✓ ВЫПОЛНЕНО
                      </span>
                    )}
                  </div>
                  <div className="font-rajdhani text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{q.desc}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="font-orbitron font-bold text-sm" style={{ color: "var(--neon-yellow)" }}>+{q.reward}</div>
                  <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>NKT</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>ПРОГРЕСС</span>
                  <span style={{ color: q.color }}>{q.progress}%</span>
                </div>
                <div className="progress-neon">
                  <div className="progress-neon-fill" style={{ width: `${q.progress}%`, background: `linear-gradient(90deg, ${q.color}, ${q.color}80)`, boxShadow: `0 0 8px ${q.color}` }} />
                </div>
              </div>
              {!q.done && (
                <div className="mt-3">
                  <button className="font-orbitron text-xs px-3 py-1.5 transition-all" style={{ border: `1px solid ${q.color}`, color: q.color, clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
                    ВЫПОЛНИТЬ
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [nftVisible, setNftVisible] = useState(false);

  return (
    <div className="space-y-5 fade-in-up">
      <div className="cyber-card p-4">
        <div className="font-orbitron font-black text-xl neon-cyan">НАСТРОЙКИ</div>
        <div className="font-rajdhani text-sm" style={{ color: "rgba(0,255,255,0.5)" }}>Конфигурация системы</div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-5" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 6px var(--neon-cyan)" }} />
          <span className="font-orbitron font-bold text-xs" style={{ color: "var(--neon-cyan)" }}>АККАУНТ</span>
        </div>
        <div className="cyber-card overflow-hidden">
          {[
            { label: "Никнейм", value: "SHADOWPAW_9X" },
            { label: "Кошелёк", value: "0x7f3a...9b2c" },
            { label: "Email", value: "shadow@neko.io" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span className="font-rajdhani text-sm" style={{ color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
              <span className="font-mono text-xs" style={{ color: "var(--neon-cyan)" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-5" style={{ background: "var(--neon-magenta)", boxShadow: "0 0 6px var(--neon-magenta)" }} />
          <span className="font-orbitron font-bold text-xs" style={{ color: "var(--neon-magenta)" }}>ИГРА</span>
        </div>
        <div className="cyber-card overflow-hidden">
          {[
            { label: "Уведомления", value: notifications, onChange: () => setNotifications(!notifications) },
            { label: "Звук", value: sound, onChange: () => setSound(!sound) },
            { label: "NFT публичны", value: nftVisible, onChange: () => setNftVisible(!nftVisible) },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span className="font-rajdhani text-sm" style={{ color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
              <button
                onClick={item.onChange}
                className="relative w-12 h-6 rounded-full transition-all"
                style={{ background: item.value ? "var(--neon-magenta)" : "rgba(255,255,255,0.1)", boxShadow: item.value ? "0 0 10px var(--neon-magenta)" : "none" }}
              >
                <div className="absolute top-1 w-4 h-4 rounded-full transition-all" style={{ background: item.value ? "#000" : "rgba(255,255,255,0.4)", left: item.value ? "28px" : "4px" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-5" style={{ background: "var(--neon-yellow)", boxShadow: "0 0 6px var(--neon-yellow)" }} />
          <span className="font-orbitron font-bold text-xs" style={{ color: "var(--neon-yellow)" }}>ОПАСНАЯ ЗОНА</span>
        </div>
        <div className="cyber-card-magenta p-4 space-y-3">
          <button className="btn-cyber-magenta w-full">
            <span>СБРОСИТЬ ПРОГРЕСС</span>
          </button>
          <button className="font-orbitron text-xs w-full px-4 py-2.5 transition-all" style={{ border: "1px solid rgba(255,0,0,0.4)", color: "rgba(255,80,80,0.9)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
            УДАЛИТЬ АККАУНТ
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");

  const renderSection = () => {
    switch (active) {
      case "home": return <HomeSection />;
      case "profile": return <ProfileSection />;
      case "shop": return <ShopSection />;
      case "leaderboard": return <LeaderboardSection />;
      case "quests": return <QuestsSection />;
      case "settings": return <SettingsSection />;
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
              24,500 NKT
            </div>
            <div className="w-8 h-8 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(0,255,255,0.3)" }}>
              <img src={CAT_IMAGE} alt="Avatar" className="w-full h-full object-cover" />
            </div>
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
          NEKOCYBER v0.1.0 · BLOCKCHAIN NETWORK: ETH · СИСТЕМА ОНЛАЙН
          <span className="blink ml-1">_</span>
        </div>
      </footer>
    </div>
  );
}