export const CAT_IMAGE = "https://cdn.poehali.dev/projects/365b343e-ad43-44b4-81c2-bc783b204014/files/a009f3f4-a8c8-4f2d-b42c-3bb60fc03dd8.jpg";
export const CATS_IMAGE = "https://cdn.poehali.dev/projects/365b343e-ad43-44b4-81c2-bc783b204014/files/d6035564-68f5-4242-b46a-1f03648ea720.jpg";

export type Section = "home" | "profile" | "shop" | "leaderboard" | "quests" | "settings";

export const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "ГЛАВНАЯ", icon: "Zap" },
  { id: "profile", label: "ПРОФИЛЬ", icon: "User" },
  { id: "shop", label: "МАГАЗИН", icon: "ShoppingBag" },
  { id: "leaderboard", label: "ЛИДЕРБОРД", icon: "Trophy" },
  { id: "quests", label: "КВЕСТЫ", icon: "Crosshair" },
  { id: "settings", label: "НАСТРОЙКИ", icon: "Settings" },
];

export const LEADERBOARD = [
  { rank: 1, name: "SHADOWPAW_9X", cat: "Киберкот Α", score: 98420, win: 94, color: "#ffff00" },
  { rank: 2, name: "NEO_PURR", cat: "Призрачный Β", score: 87310, win: 88, color: "#00ffff" },
  { rank: 3, name: "GLITCH_MEOW", cat: "Плазменный Γ", score: 75680, win: 81, color: "#ff00ff" },
  { rank: 4, name: "VOIDCAT_7", cat: "Нейро Δ", score: 61200, win: 73, color: "#00ff88" },
  { rank: 5, name: "CRYPTOKITTY", cat: "Квантовый Ε", score: 54990, win: 68, color: "#ff6600" },
];

export const QUESTS = [
  { id: 1, title: "Первая кровь", desc: "Победи в 3 сражениях подряд", reward: 500, progress: 67, done: false, color: "var(--neon-cyan)" },
  { id: 2, title: "Коллекционер", desc: "Собери 5 NFT-котов редкости SR+", reward: 1200, progress: 40, done: false, color: "var(--neon-magenta)" },
  { id: 3, title: "Богатый кот", desc: "Накопи 10,000 NEKOTOKEN", reward: 800, progress: 100, done: true, color: "var(--neon-yellow)" },
  { id: 4, title: "Мастер клана", desc: "Вступи в клан и выиграй 10 клановых битв", reward: 2500, progress: 20, done: false, color: "var(--neon-green)" },
];

export const SHOP_ITEMS = [
  { id: 1, name: "Плазма-броня", type: "Броня", rarity: "SR", price: 1200, currency: "NKT", bonus: "+30 Защита", color: "var(--neon-cyan)", glow: "rgba(0,255,255,0.3)" },
  { id: 2, name: "Лазерные когти", type: "Оружие", rarity: "SSR", price: 3500, currency: "NKT", bonus: "+75 Атака", color: "var(--neon-magenta)", glow: "rgba(255,0,255,0.3)" },
  { id: 3, name: "Нейро-имплант", type: "Имплант", rarity: "UR", price: 9999, currency: "NKT", bonus: "+50 Ловкость", color: "var(--neon-yellow)", glow: "rgba(255,255,0,0.3)" },
  { id: 4, name: "Квантовый щит", type: "Щит", rarity: "R", price: 650, currency: "NKT", bonus: "+15 Скорость", color: "var(--neon-green)", glow: "rgba(0,255,136,0.3)" },
  { id: 5, name: "Голо-плащ", type: "Броня", rarity: "SR", price: 1800, currency: "NKT", bonus: "+45 Стелс", color: "var(--neon-orange)", glow: "rgba(255,102,0,0.3)" },
  { id: 6, name: "NFT: Демон-кот", type: "NFT", rarity: "LEGEND", price: 0.05, currency: "ETH", bonus: "Уникальный кот", color: "var(--neon-magenta)", glow: "rgba(255,0,255,0.5)" },
];
