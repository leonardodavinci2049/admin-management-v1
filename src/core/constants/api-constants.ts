/**
 * Constantes da API para endpoints e configurações
 */

import { envs } from "@/core/config";

export const EXTERNAL_API_BASE_URL = envs.EXTERNAL_API_MAIN_URL;

export const API_TIMEOUTS = {
  CLIENT_DEFAULT: 15000,
  CLIENT_UPLOAD: 60000,
  SERVER_DEFAULT: 30000,
  SERVER_LONG_RUNNING: 120000,
  SERVER_UPLOAD: 180000,
} as const;

export const SHOPEE_ENDPOINTS = {
  GENERATE_AFFILIATE_LINK: "/shopee-operation/v1/generate-affiliate-link",
  GET_PRODUCT_OFFERS: "/shopee-operation/v1/get-product-offers",
  GET_SHOPEE_OFFERS: "/shopee-operation/v1/get-shopee-offers",
} as const;

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
} as const;

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  RETRY_CODES: [408, 429, 500, 502, 503, 504],
} as const;

export const API_STATUS_CODES = {
  SUCCESS: 100200,
  EMPTY_RESULT: 100204,
  ERROR: 100400,
  NOT_FOUND: 100404,
  UNPROCESSABLE: 100422,
} as const;

export function isApiSuccess(apiStatus: number): boolean {
  return (
    apiStatus === API_STATUS_CODES.SUCCESS ||
    apiStatus === API_STATUS_CODES.EMPTY_RESULT
  );
}
