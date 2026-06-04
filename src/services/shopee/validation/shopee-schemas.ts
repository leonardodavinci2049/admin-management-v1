/**
 * Schemas de validação Zod para o serviço Shopee
 */

import { z } from "zod";

import { envs } from "@/core/config";

/**
 * Schema para gerar link de afiliado
 */
export const GenerateAffiliateLinkSchema = z.object({
  originUrl: z.string().url({ message: "originUrl deve ser uma URL válida" }),
  credential: z.string().min(1, { message: "credential é obrigatório" }),
  secretKey: z.string().min(1, { message: "secretKey é obrigatório" }),
  affiliateEndpoint: z
    .string()
    .min(1, { message: "affiliateEndpoint é obrigatório" }),
  affiliateSubids: z
    .string()
    .min(1, { message: "affiliateSubids é obrigatório" }),
  affiliateTimeout: z.string().optional().default("5000"),
});

export type GenerateAffiliateLinkInput = z.infer<
  typeof GenerateAffiliateLinkSchema
>;

/**
 * Schema para buscar ofertas de produtos
 */
export const GetProductOffersSchema = z
  .object({
    credential: z.string().min(1, { message: "credential é obrigatório" }),
    secretKey: z.string().min(1, { message: "secretKey é obrigatório" }),
    affiliateEndpoint: z
      .string()
      .min(1, { message: "affiliateEndpoint é obrigatório" }),
    affiliateSubids: z.string().optional(),
    keyword: z.string().optional(),
    shopId: z.string().optional(),
    itemId: z.string().optional(),
    productCatId: z.number().optional(),
    listType: z.number().optional(),
    sortType: z.number().optional().default(envs.SHOPEE.SORTTYPE),
    page: z.number().min(1).optional().default(envs.SHOPEE.PAGE),
    limit: z.number().min(1).max(50).optional().default(envs.SHOPEE.LIMIT),
    isAMSOffer: z.boolean().optional(),
    isKeySeller: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.keyword !== undefined ||
      data.shopId !== undefined ||
      data.itemId !== undefined ||
      data.productCatId !== undefined,
    {
      message:
        "Pelo menos um critério de busca deve ser fornecido: keyword, shopId, itemId ou productCatId",
      path: ["keyword"],
    },
  );

export type GetProductOffersInput = z.infer<typeof GetProductOffersSchema>;

/**
 * Schema para buscar ofertas/campanhas da Shopee
 */
export const GetShopeeOffersSchema = z.object({
  credential: z.string().min(1, { message: "credential é obrigatório" }),
  secretKey: z.string().min(1, { message: "secretKey é obrigatório" }),
  affiliateEndpoint: z
    .string()
    .min(1, { message: "affiliateEndpoint é obrigatório" }),
  affiliateSubids: z.string().optional(),
  affiliateTimeout: z.string().optional(),
  keyword: z.string().optional(),
  sortType: z
    .union([z.literal(1), z.literal(2)])
    .optional()
    .default(envs.SHOPEE.SORTTYPE as 1 | 2),
  page: z.number().min(1).optional().default(envs.SHOPEE.PAGE),
  limit: z.number().min(1).max(50).optional().default(envs.SHOPEE.LIMIT),
});

export type GetShopeeOffersInput = z.infer<typeof GetShopeeOffersSchema>;
