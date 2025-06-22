require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once("ready", () => {
  console.log(`🎉 AuraBot 起動完了: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();

  // 🎮 おみくじ
  if (msg === "!omikuji") {
    const result = ["大吉", "中吉", "小吉", "末吉", "凶", "大凶"];
    const picked = result[Math.floor(Math.random() * result.length)];
    return message.reply(`🎯 今日の運勢は… **${picked}** です！`);
  }

  // 🎲 ダイス
  if (msg === "!dice") {
    const dice = Math.floor(Math.random() * 6) + 1;
    return message.reply(`🎲 サイコロの出目は: **${dice}**`);
  }

  // ✊ じゃんけん
  if (msg.startsWith("!janken")) {
    const choices = ["✊", "✌️", "✋"];
    const botChoice = choices[Math.floor(Math.random() * 3)];
    return message.reply(`🖐 あなたの手：${msg.split(" ")[1] || "？"}\nBotの手：${botChoice}`);
  }

  // 🌦 天気検索（東京など）
  if (msg.startsWith("!weather")) {
    const city = msg.split(" ")[1] || "Tokyo";
    return message.reply(`🔍 仮の天気情報：${city} は晴れ（本機能はAPI連携可能）`);
  }

  // 🔍 Google検索リンク生成
  if (msg.startsWith("!google ")) {
    const query = encodeURIComponent(message.content.slice(8));
    return message.reply(`🔎 検索リンク: https://www.google.com/search?q=${query}`);
  }

  // ⏰ 現在時刻
  if (msg === "!time") {
    const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    return message.reply(`🕒 現在の時刻は: ${now}`);
  }

  // 🧠 ChatGPT風（OpenAI API対応可）
  if (msg.startsWith("!ask ")) {
    return message.reply("🧠 AI応答はまだ準備中ですが、将来的にChatGPTと接続できます！");
  }

  // 💬 自動応答
  if (msg.includes("こんにちは")) {
    return message.reply("こんにちは！AuraBotです🌈");
  }

  // 📘 ヘルプ
  if (msg === "!help") {
    return message.reply(`
🧰 **AuraBotコマンド一覧**
- !omikuji → おみくじ
- !dice → サイコロを振る
- !janken ✊✌️✋ → Botとじゃんけん
- !weather 東京 → 天気を確認（仮）
- !google キーワード → Google検索リンク生成
- !time → 現在時刻を表示
- !ask 質問 → AI応答（準備中）
- !help → このヘルプを表示
    `);
  }
});
client.login(process.env.TOKEN);
