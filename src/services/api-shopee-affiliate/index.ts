import "server-only";

// Funções públicas do serviço
export {
  generateShortLink,
  getItemFeedData,
  getProductOfferList,
  listItemFeeds,
} from "./api-shopee-affiliate.service";

// Tipos de resposta da API
export type {
  FeedMode,
  GenerateShortLinkResponse,
  ItemFeed,
  ItemFeedDataConnection,
  ItemFeedDataRow,
  ItemFeedListConnection,
  ItemFeedPageInfo,
  PageInfo,
  ProductOfferConnectionV2,
  ProductOfferV2,
  ShopeeGraphQLResponse,
  ShortLinkResult,
} from "./types/shopee-affiliate.types";

// Schema e tipo inferido (fonte única de verdade para GenerateShortLinkInput)
export {
  type GenerateShortLinkInput,
  GenerateShortLinkSchema,
  type GetItemFeedDataInput,
  GetItemFeedDataSchema,
  type ListItemFeedsInput,
  ListItemFeedsSchema,
  type ProductOfferV2Input,
  ProductOfferV2Schema,
} from "./validation/shopee-affiliate.schema";

// generateShopeeAuthHeader é um detalhe de implementação interno — não exportar
