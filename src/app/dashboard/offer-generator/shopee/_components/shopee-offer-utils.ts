import {
  MODEL_CONTENT,
  OFFER_MODELS,
  type OfferModel,
  REQUIRED_FIELDS,
  SHOPEE_AFFILIATE_ID,
  type ShopeeOfferFormValues,
} from "../Mock/mock-data";

export function getModelMocks(model: OfferModel) {
  return { ...MODEL_CONTENT[model].mocks };
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
        const label = MODEL_CONTENT[model].fields.find(
          (item) => item.name === field,
        )?.label;
        errors[field] = `${label ?? "Campo"} é obrigatório.`;
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
