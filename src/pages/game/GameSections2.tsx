import { useState } from "react";
import { LEADERBOARD, QUESTS, SHOP_ITEMS } from "./constants";

export function ScanLine() {
  return <div className="scanline" />;
}

export function ShopSection() {
  const [filter, setFilter] = useState("ALL");
  const [boughtId, setBoughtId] = useState<number | null>(null);
  const filters = ["ALL", "NFT", "ОРУЖИЕ", "БРОНЯ", "ИМПЛАНТ"];

  const filterMap: Record<string, string[]> = {
    ALL: [],
    NFT: ["NFT"],
    ОРУЖИЕ: ["Оружие"],
    БРОНЯ: ["Броня"],
    ИМПЛАНТ: ["Имплант", "Щит"],
  };

  const filtered = filter === "ALL"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => filterMap[filter]?.includes(item.type));

  const handleBuy = (id: number) => {
    setBoughtId(id);
    setTimeout(() => setBoughtId(null), 2000);
  };

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

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="font-orbitron text-sm" style={{ color: "rgba(0,255,255,0.3)" }}>НЕТ ТОВАРОВ В ЭТОЙ КАТЕГОРИИ</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const justBought = boughtId === item.id;
          return (
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
                      border: `1px solid ${justBought ? "var(--neon-green)" : item.color}`,
                      color: justBought ? "var(--bg-dark)" : item.color,
                      background: justBought ? "var(--neon-green)" : "transparent",
                      clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                    }}
                    onClick={() => handleBuy(item.id)}
                  >
                    {justBought ? "✓ КУПЛЕНО" : "КУПИТЬ"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LeaderboardSection() {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof LEADERBOARD[0] | null>(null);

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
            <div
              key={p.rank}
              className={`relative flex flex-col items-center justify-end ${height} rounded-sm overflow-hidden cursor-pointer`}
              style={{ background: `linear-gradient(to top, ${p.color}15, transparent)`, border: `1px solid ${p.color}33` }}
              onClick={() => setSelectedPlayer(p)}
            >
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
            onClick={() => setSelectedPlayer(p)}
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

      {/* Player detail modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(10px)" }} onClick={() => setSelectedPlayer(null)}>
          <div className="cyber-card p-6 max-w-xs w-full mx-4 space-y-4 fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="font-orbitron font-black text-lg" style={{ color: selectedPlayer.color }}>{selectedPlayer.name}</div>
              <div className="font-rajdhani text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{selectedPlayer.cat}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "РАНГ", value: `#${selectedPlayer.rank}` },
                { label: "СЧЁТ", value: selectedPlayer.score.toLocaleString() },
                { label: "ПОБЕДЫ", value: `${selectedPlayer.win}%` },
                { label: "СЕЗОН", value: "S7" },
              ].map((item) => (
                <div key={item.label} className="text-center p-2" style={{ background: `${selectedPlayer.color}11`, border: `1px solid ${selectedPlayer.color}22` }}>
                  <div className="font-orbitron font-bold text-sm" style={{ color: selectedPlayer.color }}>{item.value}</div>
                  <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button className="btn-cyber w-full" onClick={() => setSelectedPlayer(null)}>
              <span>ЗАКРЫТЬ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function QuestsSection() {
  const [questStates, setQuestStates] = useState(
    QUESTS.map((q) => ({ ...q }))
  );

  const completeQuest = (id: number) => {
    setQuestStates((prev) =>
      prev.map((q) => q.id === id ? { ...q, done: true, progress: 100 } : q)
    );
  };

  const doneCount = questStates.filter((q) => q.done).length;

  return (
    <div className="space-y-5 fade-in-up">
      <div className="cyber-card p-4 flex justify-between items-center">
        <div>
          <div className="font-orbitron font-black text-xl neon-cyan">КВЕСТЫ</div>
          <div className="font-rajdhani text-sm" style={{ color: "rgba(0,255,255,0.5)" }}>Выполняй задания · Получай награды</div>
        </div>
        <div className="text-right">
          <div className="font-orbitron font-bold text-lg" style={{ color: "var(--neon-yellow)" }}>{doneCount}/{questStates.length}</div>
          <div className="font-rajdhani text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>ВЫПОЛНЕНО</div>
        </div>
      </div>

      <div className="space-y-3">
        {questStates.map((q, i) => (
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
                  <button
                    className="font-orbitron text-xs px-3 py-1.5 transition-all"
                    style={{ border: `1px solid ${q.color}`, color: q.color, clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                    onClick={() => completeQuest(q.id)}
                  >
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

export function SettingsSection() {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [nftVisible, setNftVisible] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
          <button className="btn-cyber-magenta w-full" onClick={() => setConfirmReset(true)}>
            <span>СБРОСИТЬ ПРОГРЕСС</span>
          </button>
          <button
            className="font-orbitron text-xs w-full px-4 py-2.5 transition-all"
            style={{ border: "1px solid rgba(255,0,0,0.4)", color: "rgba(255,80,80,0.9)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            onClick={() => setConfirmDelete(true)}
          >
            УДАЛИТЬ АККАУНТ
          </button>
        </div>
      </div>

      {/* Reset confirm modal */}
      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(10px)" }} onClick={() => setConfirmReset(false)}>
          <div className="cyber-card p-6 max-w-sm w-full mx-4 text-center space-y-4 fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="font-orbitron font-black text-lg" style={{ color: "var(--neon-yellow)" }}>⚠ СБРОС ПРОГРЕССА</div>
            <p className="font-rajdhani text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Весь прогресс, уровень и ресурсы будут удалены. Это действие необратимо.</p>
            <div className="flex gap-3">
              <button className="flex-1 btn-cyber" onClick={() => setConfirmReset(false)}>
                <span>ОТМЕНА</span>
              </button>
              <button
                className="flex-1 font-orbitron text-xs px-4 py-2.5 transition-all"
                style={{ border: "1px solid var(--neon-magenta)", color: "var(--neon-magenta)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                onClick={() => setConfirmReset(false)}
              >
                СБРОСИТЬ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(2,0,16,0.9)", backdropFilter: "blur(10px)" }} onClick={() => setConfirmDelete(false)}>
          <div className="cyber-card p-6 max-w-sm w-full mx-4 text-center space-y-4 fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="font-orbitron font-black text-lg" style={{ color: "rgba(255,80,80,1)" }}>☠ УДАЛЕНИЕ АККАУНТА</div>
            <p className="font-rajdhani text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Аккаунт, все NFT-коты и история будут удалены навсегда. Отменить невозможно.</p>
            <div className="flex gap-3">
              <button className="flex-1 btn-cyber" onClick={() => setConfirmDelete(false)}>
                <span>ОТМЕНА</span>
              </button>
              <button
                className="flex-1 font-orbitron text-xs px-4 py-2.5 transition-all"
                style={{ border: "1px solid rgba(255,0,0,0.6)", color: "rgba(255,80,80,0.9)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                onClick={() => setConfirmDelete(false)}
              >
                УДАЛИТЬ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
