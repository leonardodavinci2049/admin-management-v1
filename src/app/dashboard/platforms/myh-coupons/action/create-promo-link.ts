"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { envs } from "@/core/config";
import { createLogger } from "@/core/logger";
import { CACHE_TAGS } from "@/lib/cache-config";
import promoLinkService from "@/services/db/promo-link/promo-link.service";
import type { ActionState } from "@/types/action-types";

const logger = createLogger("createPromoLinkAction");

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

const promoLinkFormSchema = z.object({
  linkName: z
    .string()
    .trim()
    .min(1, "Nome do link é obrigatório.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  linkUrl: z
    .string()
    .trim()
    .min(1, "URL do link é obrigatória.")
    .max(500, "URL deve ter no máximo 500 caracteres.")
    .url("Informe uma URL válida."),
  typeId: z.coerce
    .number()
    .int()
    .refine((v) => v === 1 || v === 2, "Tipo inválido."),
  appId: z.coerce.number().int().positive("App ID inválido."),
});

export async function createPromoLinkAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawData = {
    linkName: (formData.get("linkName") as string) ?? "",
    linkUrl: (formData.get("linkUrl") as string) ?? "",
    typeId: (formData.get("typeId") as string) ?? "",
    appId: (formData.get("appId") as string) ?? "",
  };

  const parsed = promoLinkFormSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString() ?? "form";
      errors[field] = issue.message;
    }
    return {
      success: false,
      message: "Verifique os campos do formulário.",
      errors,
      fieldValues: rawData,
    };
  }

  try {
    const result = await promoLinkService.execPromoLinkCreateQuery({
      PE_APP_ID: parsed.data.appId,
      PE_TYPE_ID: parsed.data.typeId,
      PE_LINK_NAME1: parsed.data.linkName,
      PE_LINK1: parsed.data.linkUrl,
    });

    if (result.statusCode !== 100200) {
      logger.error("Erro ao criar link promocional", {
        message: result.message,
      });
      return {
        success: false,
        message: result.message || "Erro ao cadastrar link.",
        fieldValues: rawData,
      };
    }

    for (const cacheTag of getPromoLinkCacheTags(
      parsed.data.typeId,
      parsed.data.appId,
    )) {
      updateTag(cacheTag);
    }

    return { success: true, message: "Link cadastrado com sucesso!" };
  } catch (error) {
    logger.error("Failed to create promo link", { error });
    return {
      success: false,
      message: "Erro inesperado ao cadastrar link.",
      fieldValues: rawData,
    };
  }
}
