export const OFFER_MODELS = {
  withoutCoupon: "withoutCoupon",
  couponCode: "couponCode",
  couponInApp: "couponInApp",
} as const;

const SHOPEE_AFFILIATE_ID = "poc-shopee-id";

export type OfferModel = (typeof OFFER_MODELS)[keyof typeof OFFER_MODELS];

export type ShopeeOfferFormValues = {
  emoji: string;
  productName: string;
  price: string;
  priceDetails: string;
  productLink: string;
  couponCode: string;
  discountLabel: string;
  couponLink: string;
};

const MODEL_EXAMPLES: Record<OfferModel, ShopeeOfferFormValues> = {
  withoutCoupon: {
    emoji: "🧺",
    productName: "Escorredor retrátil de silicone para pia",
    price: "R$ 29,90",
    priceDetails: "no pix",
    productLink: "https://shopee.com.br/product/123456/987654321",
    couponCode: "",
    discountLabel: "",
    couponLink: "",
  },
  couponCode: {
    emoji: "🍳",
    productName: "Air fryer compacta 4L antiaderente",
    price: "R$ 189,90",
    priceDetails: "com frete grátis",
    productLink:
      "https://shopee.com.br/product/445566/9988776655?from=flash-sale",
    couponCode: "COZINHA20",
    discountLabel: "R$ 20 OFF",
    couponLink: "https://shopee.com.br/m/cupom-cozinha20",
  },
  couponInApp: {
    emoji: "🎧",
    productName: "Fone bluetooth gamer com baixa latência",
    price: "R$ 79,90",
    priceDetails: "na oferta relâmpago",
    productLink: "https://shp.ee/abc123z",
    couponCode: "",
    discountLabel: "R$ 15",
    couponLink: "https://shopee.com.br/m/resgate-cupom-gamer",
  },
};

const REQUIRED_FIELDS: Record<
  OfferModel,
  Array<keyof ShopeeOfferFormValues>
> = {
  withoutCoupon: ["emoji", "productName", "price", "productLink"],
  couponCode: [
    "emoji",
    "productName",
    "price",
    "couponCode",
    "discountLabel",
    "productLink",
    "couponLink",
  ],
  couponInApp: [
    "emoji",
    "productName",
    "price",
    "discountLabel",
    "productLink",
    "couponLink",
  ],
};

const FIELD_LABELS: Record<keyof ShopeeOfferFormValues, string> = {
  emoji: "Emoji",
  productName: "Nome do produto",
  price: "Valor do produto",
  priceDetails: "Informação complementar do preço",
  productLink: "Link do produto",
  couponCode: "Código do cupom",
  discountLabel: "Tipo ou valor do desconto",
  couponLink: "Link do cupom",
};

export function getModelMocks(model: OfferModel) {
  return { ...MODEL_EXAMPLES[model] };
}

export function isShopeeShortLink(link: string) {
  return /shp\.ee/i.test(link);
}

export function applyMockShopeeAffiliateId(link: string) {
  const trimmedLink = link.trim();

  if (!trimmedLink) {
    return "";
  }

  try {
    const url = new URL(trimmedLink);
    url.searchParams.set("affiliate_id", SHOPEE_AFFILIATE_ID);
    return url.toString();
  } catch {
    const separator = trimmedLink.includes("?") ? "&" : "?";
    return `${trimmedLink}${separator}affiliate_id=${SHOPEE_AFFILIATE_ID}`;
  }
}

function formatPriceLine(price: string, priceDetails: string) {
  const suffix = priceDetails.trim();

  return suffix ? `💸 ${price.trim()} ${suffix}` : `💸 ${price.trim()}`;
}

export function validateShopeeOfferFields(
  model: OfferModel,
  values: ShopeeOfferFormValues,
) {
  return REQUIRED_FIELDS[model].reduce<Record<string, string>>(
    (errors, field) => {
      if (!values[field].trim()) {
        errors[field] = `${FIELD_LABELS[field]} é obrigatório.`;
      }

      return errors;
    },
    {},
  );
}

export function buildShopeeOfferText(
  model: OfferModel,
  values: ShopeeOfferFormValues,
) {
  const productLinkWithAffiliateId = applyMockShopeeAffiliateId(
    values.productLink,
  );
  const couponLinkWithAffiliateId = applyMockShopeeAffiliateId(
    values.couponLink,
  );
  const header = `${values.emoji.trim()} ${values.productName.trim()}`.trim();
  const priceLine = formatPriceLine(values.price, values.priceDetails);

  if (model === OFFER_MODELS.withoutCoupon) {
    return [
      header,
      "",
      priceLine,
      `🛒 COMPRE AQUI: ${productLinkWithAffiliateId}`,
    ].join("\n");
  }

  if (model === OFFER_MODELS.couponCode) {
    return [
      header,
      "",
      priceLine,
      "",
      `🎟 CUPOM: ${values.couponCode.trim()}`,
      `🛒 COMPRE AQUI: ${productLinkWithAffiliateId}`,
      "",
      `🔗 COPIE E COLE O CUPOM AQUI: ${couponLinkWithAffiliateId}`,
    ].join("\n");
  }

  return [
    header,
    "",
    priceLine,
    `🎟 Use o cupom de ${values.discountLabel.trim()}`,
    `🛒 COMPRE AQUI: ${productLinkWithAffiliateId}`,
    "",
    `🎟 Resgate o cupom de ${values.discountLabel.trim()} off aqui: ${couponLinkWithAffiliateId}`,
  ].join("\n");
}
