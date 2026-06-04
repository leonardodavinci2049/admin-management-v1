import "server-only";

import { envs } from "@/core/config";
import { SHOPEE_ENDPOINTS } from "@/core/constants/api-constants";
import { createLogger } from "@/core/logger";
import { BaseApiService } from "@/lib/axios/base-api-service";

import type {
  GenerateAffiliateLinkResponse,
  GetProductOffersResponse,
  GetShopeeOffersResponse,
  PageInfo,
  ShopeeOffer,
  ShopeeProduct,
} from "./types/shopee-types";
import { ShopeeError } from "./types/shopee-types";
import type {
  GetProductOffersInput,
  GetShopeeOffersInput,
} from "./validation/shopee-schemas";
import {
  GenerateAffiliateLinkSchema,
  GetProductOffersSchema,
  GetShopeeOffersSchema,
} from "./validation/shopee-schemas";

const logger = createLogger("ShopeeServiceApi");

export class ShopeeServiceApi extends BaseApiService {
  /**
   * Constrói credenciais Shopee a partir das variáveis de ambiente
   */
  private static buildShopeeCredentials(): Record<string, string> {
    return {
      credential: envs.SHOPEE.CREDENTIAL,
      secretKey: envs.SHOPEE.SECRETKEY,
      affiliateEndpoint: envs.SHOPEE.AFFILIATEENDPOINT,
      affiliateSubids: envs.SHOPEE.AFFILIATESUBIDS,
      affiliateTimeout: String(envs.SHOPEE.AFFILIATETIMEOUT),
    };
  }

  /**
   * Constrói headers de autenticação com API Key
   */
  private static buildAuthHeaders(): { headers: { "x-api-key": string } } {
    return {
      headers: {
        "x-api-key": envs.API_KEY,
      },
    };
  }

  /**
   * Gera link de afiliado Shopee a partir de uma URL de produto original
   *
   * @param params - Parâmetros da requisição
   * @param params.originUrl - URL original do produto na Shopee
   * @returns Objeto com o link de afiliado gerado
   *
   * @example
   * ```typescript
   * const result = await ShopeeServiceApi.generateAffiliateLink({
   *   originUrl: "https://shopee.com.br/produto-exemplo-i.123.456"
   * });
   * console.log(result.affiliateLink); // https://s.shopee.com.br/xxx
   * ```
   */
  static async generateAffiliateLink(params: {
    originUrl: string;
  }): Promise<GenerateAffiliateLinkResponse> {
    try {
      const credentials = ShopeeServiceApi.buildShopeeCredentials();

      const validatedParams = GenerateAffiliateLinkSchema.parse({
        ...credentials,
        originUrl: params.originUrl,
      });

      const instance = new ShopeeServiceApi();
      const authHeaders = ShopeeServiceApi.buildAuthHeaders();

      const response = await instance.post<GenerateAffiliateLinkResponse>(
        SHOPEE_ENDPOINTS.GENERATE_AFFILIATE_LINK,
        validatedParams,
        authHeaders,
      );

      return response;
    } catch (error) {
      logger.error("Erro ao gerar link de afiliado", error);

      if (error instanceof ShopeeError) {
        throw error;
      }

      throw new ShopeeError(
        error instanceof Error
          ? error.message
          : "Erro ao gerar link de afiliado",
        "SHOPEE_GENERATE_LINK_ERROR",
      );
    }
  }

  /**
   * Busca ofertas de produtos na Shopee com critérios flexíveis
   *
   * @param params - Parâmetros da requisição (ao menos um critério de busca obrigatório)
   * @returns Objeto com lista de produtos e informações de paginação
   *
   * @example
   * ```typescript
   * // Buscar por palavra-chave
   * const result = await ShopeeServiceApi.getProductOffers({
   *   keyword: "fone bluetooth",
   *   page: 1,
   *   limit: 10,
   * });
   *
   * // Buscar por ID do produto
   * const result = await ShopeeServiceApi.getProductOffers({
   *   itemId: "18699601619",
   * });
   * ```
   */
  static async getProductOffers(
    params: GetProductOffersInput,
  ): Promise<GetProductOffersResponse> {
    try {
      const credentials = ShopeeServiceApi.buildShopeeCredentials();

      const validatedParams = GetProductOffersSchema.parse({
        ...credentials,
        ...params,
      });

      const instance = new ShopeeServiceApi();
      const authHeaders = ShopeeServiceApi.buildAuthHeaders();

      const response = await instance.post<GetProductOffersResponse>(
        SHOPEE_ENDPOINTS.GET_PRODUCT_OFFERS,
        validatedParams,
        authHeaders,
      );

      return response;
    } catch (error) {
      logger.error("Erro ao buscar ofertas de produtos", error);

      if (error instanceof ShopeeError) {
        throw error;
      }

      throw new ShopeeError(
        error instanceof Error
          ? error.message
          : "Erro ao buscar ofertas de produtos",
        "SHOPEE_GET_PRODUCT_OFFERS_ERROR",
      );
    }
  }

  /**
   * Busca ofertas/campanhas promocionais ativas da Shopee
   *
   * @param params - Parâmetros opcionais da requisição
   * @returns Objeto com lista de ofertas e informações de paginação
   *
   * @example
   * ```typescript
   * // Buscar todas as ofertas
   * const result = await ShopeeServiceApi.getShopeeOffers();
   *
   * // Buscar ofertas com filtro
   * const result = await ShopeeServiceApi.getShopeeOffers({
   *   keyword: "eletrônicos",
   *   sortType: 2, // Maior comissão
   *   page: 1,
   *   limit: 20,
   * });
   * ```
   */
  static async getShopeeOffers(
    params?: GetShopeeOffersInput,
  ): Promise<GetShopeeOffersResponse> {
    try {
      const credentials = ShopeeServiceApi.buildShopeeCredentials();

      const validatedParams = GetShopeeOffersSchema.parse({
        ...credentials,
        ...params,
      });

      const instance = new ShopeeServiceApi();
      const authHeaders = ShopeeServiceApi.buildAuthHeaders();

      const response = await instance.post<GetShopeeOffersResponse>(
        SHOPEE_ENDPOINTS.GET_SHOPEE_OFFERS,
        validatedParams,
        authHeaders,
      );

      return response;
    } catch (error) {
      logger.error("Erro ao buscar ofertas da Shopee", error);

      if (error instanceof ShopeeError) {
        throw error;
      }

      throw new ShopeeError(
        error instanceof Error
          ? error.message
          : "Erro ao buscar ofertas da Shopee",
        "SHOPEE_GET_OFFERS_ERROR",
      );
    }
  }

  // ─── Métodos Utilitários (Helpers) ──────────────────────────────────────────

  /**
   * Extrai array de produtos da resposta de getProductOffers
   *
   * @param response - Resposta do endpoint get-product-offers
   * @returns Array de produtos
   */
  static extractProducts(response: GetProductOffersResponse): ShopeeProduct[] {
    return response.data?.products ?? [];
  }

  /**
   * Extrai array de ofertas da resposta de getShopeeOffers
   *
   * @param response - Resposta do endpoint get-shopee-offers
   * @returns Array de ofertas
   */
  static extractOffers(response: GetShopeeOffersResponse): ShopeeOffer[] {
    return response.data?.offers ?? [];
  }

  /**
   * Extrai informações de paginação de respostas paginadas
   *
   * @param response - Resposta paginada (getProductOffers ou getShopeeOffers)
   * @returns Objeto PageInfo com page, limit e hasNextPage
   */
  static extractPageInfo(
    response: GetProductOffersResponse | GetShopeeOffersResponse,
  ): PageInfo {
    return (
      response.data?.pageInfo ?? {
        page: 1,
        limit: 10,
        hasNextPage: false,
      }
    );
  }

  /**
   * Verifica se a resposta indica sucesso
   *
   * @param response - Resposta da API (getProductOffers ou getShopeeOffers)
   * @returns true se response.success === true
   */
  static isSuccessResponse(
    response: GetProductOffersResponse | GetShopeeOffersResponse,
  ): boolean {
    return response.success === true;
  }
}
