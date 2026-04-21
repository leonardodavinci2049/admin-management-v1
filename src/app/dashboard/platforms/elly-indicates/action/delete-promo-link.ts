"use server";

import { updateTag } from "next/cache";
import { envs } from "@/core/config";
import { createLogger } from "@/core/logger";
import { CACHE_TAGS } from "@/lib/cache-config";
import { triggerRevalidateWebhook } from "@/lib/webhook-revalidate";
import { getAuthContext } from "@/server/auth-context";
import promoLinkService from "@/services/db/promo-link/promo-link.service";
import type { ActionState } from "@/types/action-types";

const logger = createLogger("deletePromoLinkAction:elly-indicates");

const APP_ID = 2;

function getPromoLinkCacheTags(typeId: number, appId: number): string[] {
  const clientId = String(envs.CLIENT_ID);

  return [
    CACHE_TAGS.promoLinks,
    CACHE_TAGS.promoLinksByClient(clientId),
    CACHE_TAGS.promoLinksByApp(clientId, String(appId)),
    CACHE_TAGS.promoLinksByType(clientId, String(typeId)),
    CACHE_TAGS.promoLinksByAppAndType(clientId, String(appId), String(typeId)),
  ];
}

export async function deletePromoLinkAction(
  id: number,
  typeId: number,
): Promise<ActionState> {
  try {
    await getAuthContext();
  } catch {
    return { success: false, message: "Acesso não autorizado." };
  }

  if (!Number.isInteger(id) || id < 1) {
    return { success: false, message: "ID inválido." };
  }

  try {
    const result = await promoLinkService.execPromoLinkDeleteQuery({
      PE_ID: id,
      PE_CLIENT_ID: envs.CLIENT_ID,
    });

    if (result.statusCode !== 100200) {
      logger.error("Erro ao excluir link promocional", {
        message: result.message,
        id,
      });
      return {
        success: false,
        message: result.message || "Erro ao excluir link.",
      };
    }

    for (const cacheTag of getPromoLinkCacheTags(typeId, APP_ID)) {
      updateTag(cacheTag);
    }

    await triggerRevalidateWebhook(APP_ID);

    return { success: true, message: "Link excluído com sucesso!" };
  } catch (error) {
    logger.error("Failed to delete promo link", { error });
    return { success: false, message: "Erro inesperado ao excluir link." };
  }
}
