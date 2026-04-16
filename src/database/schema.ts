export type OrganizationMemberRole =
  | "owner"
  | "manager"
  | "salesperson"
  | "operator"
  | "cashier"
  | "finance"
  | "shipping"
  | "customer";

export type TblConfig = {
  CONFIG_ID: number;
  PROJECT_ID?: number | null;
  UUID?: string | null;
  CUSTOMER_NAME?: string | null;
  TELEGRAM_BOT_NAME?: string | null;
  TELEGRAM_BOT_LINK?: string | null;
  TELEGRAM_BOT_TOKEN?: string | null;
  TELEGRAM_BOT_CHATID?: string | null;
  WEBHOOK_URL?: string | null;
  WEBHOOK_LOCAL_PORT?: number | null;
  OPENAI_API_KEY?: string | null;
  SHOPEE_CREDENTIAL?: string | null;
  SHOPEE_SECRET_KEY?: string | null;
  SHOPEE_AFFILIATE_ENDPOINT?: string | null;
  SHOPEE_AFFILIATE_TIMEOUT?: string | null;
  SHOPEE_AFFILIATE_SUBIDS?: string | null;
  CREATEDAT?: Date | null;
  UPDATEDAT?: Date | null;
};

export type TblLinkGeneration = {
  ID: number;
  UUID?: string | null;
  APP_ID?: number | null;
  CLIENT_ID?: number | null;
  LINK_DESTINATION?: string | null;
  AFFILIATE_LINK?: string | null;
  FLAG_CLICK?: number | null;
  ITEM_ID?: number | null;
  PRODUCT_NAME?: string | null;
  SHOP_NAME?: string | null;
  SHOP_ID?: number | null;
  PRICE_MIN?: number | null;
  PRICE_MAX?: number | null;
  COMMISSION_RATE?: number | null;
  COMMISSION?: number | null;
  SALES?: number | null;
  RATING_STAR?: number | null;
  IMAGE_URL?: string | null;
  PRODUCT_LINK?: string | null;
  OFFER_LINK?: string | null;
  CURRENCY?: string | null;
  DISCOUNT_PERCENT?: number | null;
  ORIGINAL_PRICE?: number | null;
  CATEGORY?: string | null;
  CATEGORY_ID?: number | null;
  BRAND_NAME?: string | null;
  IS_OFFICIAL?: boolean | null;
  FREE_SHIPPING?: boolean | null;
  LOCATION?: string | null;
  CREATEDAT?: Date | null;
  UPDATEDAT?: Date | null;
};

export type TblLogOperation = {
  ID_LOG: number;
  UUID?: string | null;
  MODULE_ID?: number | null;
  RECORD_ID?: number | null;
  LOG?: string | null;
  NOTE?: string | null;
  CREATEDAT?: Date | null;
};

export type TblMetadata = {
  ID: number;
  APP_ID?: number | null;
  META_KEY?: string | null;
  META_VALUE?: string | null;
  CREATEDAT?: Date | null;
};

export type TblPromoLink = {
  ID: number;
  UUID?: string | null;
  CLIENT_ID?: number | null;
  APP_ID?: number | null;
  LINK1?: string | null;
  LINK2?: string | null;
  LINK3?: string | null;
  LINK_NAME1?: string | null;
  LINK_NAME2?: string | null;
  LINK_NAME3?: string | null;
  SECRET_KEY1?: string | null;
  SECRET_KEY2?: string | null;
  SECRET_KEY3?: string | null;
  NOTES?: string | null;
  CREATEDAT?: Date | null;
  UPDATEDAT?: Date | null;
};

export type TblTelegramChat = {
  ID: number;
  UUID?: string | null;
  PROJECT_ID?: number | null;
  CONFIG_ID?: number | null;
  CHAT_ID?: string | null;
  MESSAGE_RECEIVED?: string | null;
  MESSAGE_SENT?: string | null;
  JSON_OBJECT?: string | null;
  UPDATEDAT?: Date | null;
  CREATEDAT?: Date | null;
};

export type LogLogin = TblLogLogin;
export type LogOperation = TblLogOperation;
