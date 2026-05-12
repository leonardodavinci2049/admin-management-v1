/**
 * Tipos, interfaces e enums utilizados pelo ShopeeServiceApi
 * Baseado nos endpoints /shopee-operation/v1/*
 */

// ─── Enums ──────────────────────────────────────────────────────────────────────

/**
 * Tipo de listagem de produtos
 */
export enum ListType {
  General = 1,
  Promotion = 2,
  FlashSale = 3,
  Voucher = 4,
}

/**
 * Tipo de ordenação para busca de produtos
 */
export enum SortType {
  Relevance = 1,
  PriceAsc = 2,
  PriceDesc = 3,
  Latest = 4,
  Popular = 5,
  Sales = 6,
  CommissionDesc = 7,
  CommissionAsc = 8,
}

/**
 * Tipo de ordenação para busca de ofertas Shopee
 */
export enum ShopeeOfferSortType {
  MostRecent = 1,
  HighestCommission = 2,
}

// ─── Generate Affiliate Link ────────────────────────────────────────────────────

/**
 * Request para gerar link de afiliado
 */
export interface GenerateAffiliateLinkRequest {
  originUrl: string;
  credential: string;
  secretKey: string;
  affiliateEndpoint: string;
  affiliateSubids: string;
  affiliateTimeout?: string;
}

/**
 * Response da geração de link de afiliado
 */
export interface GenerateAffiliateLinkResponse {
  affiliateLink: string;
}

// ─── Get Product Offers ─────────────────────────────────────────────────────────

/**
 * Request para buscar ofertas de produtos
 */
export interface GetProductOffersRequest {
  credential: string;
  secretKey: string;
  affiliateEndpoint: string;
  affiliateSubids?: string;
  keyword?: string;
  shopId?: string;
  itemId?: string;
  productCatId?: number;
  listType?: number;
  sortType?: number;
  page?: number;
  limit?: number;
  isAMSOffer?: boolean;
  isKeySeller?: boolean;
}

/**
 * Produto retornado pela API Shopee
 */
export interface ShopeeProduct {
  itemId: string;
  productName: string;
  shopName: string;
  shopId: string;
  priceMin: string;
  priceMax: string;
  commissionRate: string;
  commission: string;
  sales: number;
  ratingStar: string;
  imageUrl: string;
  productLink: string;
  offerLink: string;
  currency: string;
  discountPercent: number;
  originalPrice: string;
  category: string;
  categoryId: number;
  brandName: string;
  isOfficial: boolean;
  freeShipping: boolean;
  location: string;
}

/**
 * Informações de paginação
 */
export interface PageInfo {
  page: number;
  limit: number;
  hasNextPage: boolean;
}

/**
 * Response da busca de ofertas de produtos
 */
export interface GetProductOffersResponse {
  success: boolean;
  data: {
    products: ShopeeProduct[];
    pageInfo: PageInfo;
  };
}

// ─── Get Shopee Offers ──────────────────────────────────────────────────────────

/**
 * Request para buscar ofertas/campanhas da Shopee
 */
export interface GetShopeeOffersRequest {
  credential: string;
  secretKey: string;
  affiliateEndpoint: string;
  affiliateSubids?: string;
  affiliateTimeout?: string;
  keyword?: string;
  sortType?: number;
  page?: number;
  limit?: number;
}

/**
 * Oferta/campanha retornada pela API Shopee
 */
export interface ShopeeOffer {
  commissionRate: string;
  imageUrl: string;
  offerLink: string;
  originalLink: string;
  offerName: string;
  offerType: number;
  categoryId: number;
  collectionId: number;
  periodStartTime: number;
  periodEndTime: number;
}

/**
 * Response da busca de ofertas/campanhas da Shopee
 */
export interface GetShopeeOffersResponse {
  success: boolean;
  data: {
    offers: ShopeeOffer[];
    pageInfo: PageInfo;
  };
}

// ─── Erro Customizado ───────────────────────────────────────────────────────────

/**
 * Erro base para operações Shopee
 */
export class ShopeeError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "ShopeeError";
    Object.setPrototypeOf(this, ShopeeError.prototype);
  }
}
