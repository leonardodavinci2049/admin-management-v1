import { Bot } from "grammy";
import { getTelegramBotDbConfig } from "@/services/db/load-settings/config-cached.service";
import { setupMessageHandler } from "./messages/message.handler";

const BOT5_CONFIG_ID = 10;

let bot: Bot | null = null;
let botConfigCache: Awaited<ReturnType<typeof getTelegramBotDbConfig>> | null =
  null;

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms}ms`)),
      ms,
    );
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

async function ensureBot(): Promise<Bot> {
  if (!bot) {
    const botConfig = await getTelegramBotDbConfig(BOT5_CONFIG_ID);
    botConfigCache = botConfig;

    bot = new Bot(botConfig.TELEGRAM_BOT_TOKEN);

    await setupMessageHandler(bot, botConfig);

    await withTimeout(bot.init(), 10_000, "bot.init");

    console.log(`[telegram] Bot initialized: @${bot.botInfo.username}`);
  }

  return bot;
}

export async function registerWebhook(): Promise<void> {
  const b = await ensureBot();
  const botConfig =
    botConfigCache ?? (await getTelegramBotDbConfig(BOT5_CONFIG_ID));
  const webhookUrl = `${botConfig.WEBHOOK_URL}/api/bot-telegram/webhook`;

  try {
    await withTimeout(b.api.setWebhook(webhookUrl), 10_000, "setWebhook");
    console.log(`[telegram:bot] Webhook registered: ${webhookUrl}`);
  } catch (error) {
    console.error("[telegram:bot] Failed to register webhook:", error);
    throw error;
  }
}

export async function handleUpdate(body: unknown): Promise<void> {
  const b = await ensureBot();
  await b.handleUpdate(body as Parameters<Bot["handleUpdate"]>[0]);
}
