export const SHOPEE_AFFILIATE_ID = "poc-shopee-id";
export const SHOPEE_PRODUCT_PLACEHOLDER_IMAGE = "/images/product/no-image.jpeg";

export const OFFER_MODELS = {
  withoutCoupon: "withoutCoupon",
  couponCode: "couponCode",
  couponInApp: "couponInApp",
} as const;

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

export type FieldConfig = {
  name: keyof ShopeeOfferFormValues;
  label: string;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  helper?: string;
};

export const MODEL_CONTENT: Record<
  OfferModel,
  {
    label: string;
    shortLabel: string;
    description: string;
    previewHint: string;
    mocks: ShopeeOfferFormValues;
    fields: FieldConfig[];
  }
> = {
  withoutCoupon: {
    label: "Sem cupom",
    shortLabel: "Sem cupom",
    description:
      "Publicação simples com preço e link final já preparado para divulgação.",
    previewHint: "Modelo ideal para ofertas diretas, sem resgate adicional.",
    mocks: {
      emoji: "🧺",
      productName: "Escorredor retrátil de silicone para pia",
      price: "R$ 29,90",
      priceDetails: "no pix",
      productLink: "https://shopee.com.br/product/123456/987654321",
      couponCode: "",
      discountLabel: "",
      couponLink: "",
    },
    fields: [
      {
        name: "productLink",
        label: "Link do produto",
        placeholder: "Cole o link do produto Shopee",
        required: true,
        helper: "O ID de afiliado será aplicado de forma simulada na prévia.",
      },
      {
        name: "emoji",
        label: "Emoji",
        placeholder: "Ex.: 🧺",
        required: true,
      },
      {
        name: "productName",
        label: "Nome do produto",
        placeholder: "Digite o nome do produto",
        required: true,
      },
      {
        name: "price",
        label: "Valor do produto",
        placeholder: "Ex.: R$ 29,90",
        required: true,
      },
      {
        name: "priceDetails",
        label: "Informação complementar do preço",
        placeholder: "Ex.: no pix",
        optional: true,
      },
    ],
  },
  couponCode: {
    label: "Cupom digitável",
    shortLabel: "Cupom digitável",
    description:
      "Oferta com cupom para copiar e colar, destacando o código de resgate.",
    previewHint:
      "Ideal quando o cupom precisa ser digitado manualmente pelo cliente.",
    mocks: {
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
    fields: [
      {
        name: "productLink",
        label: "Link do produto",
        placeholder: "Cole o link do produto Shopee",
        required: true,
      },
      {
        name: "emoji",
        label: "Emoji",
        placeholder: "Ex.: 🍳",
        required: true,
      },
      {
        name: "productName",
        label: "Nome do produto",
        placeholder: "Digite o nome do produto",
        required: true,
      },
      {
        name: "price",
        label: "Valor final com desconto",
        placeholder: "Ex.: R$ 189,90",
        required: true,
      },
      {
        name: "priceDetails",
        label: "Informação complementar do preço",
        placeholder: "Ex.: com frete grátis",
        optional: true,
      },
      {
        name: "couponCode",
        label: "Código do cupom",
        placeholder: "Ex.: COZINHA20",
        required: true,
      },
      {
        name: "discountLabel",
        label: "Tipo ou valor do desconto",
        placeholder: "Ex.: R$ 20 OFF",
        required: true,
      },
      {
        name: "couponLink",
        label: "Link para copiar e colar o cupom",
        placeholder: "Cole o link do cupom",
        required: true,
        helper:
          "Use um link fictício da Shopee para simular a jornada completa.",
      },
    ],
  },
  couponInApp: {
    label: "Cupom no app",
    shortLabel: "Cupom no app",
    description:
      "Oferta com cupom resgatado dentro do app da Shopee antes da compra.",
    previewHint:
      "Bom para fluxos em que o cliente precisa resgatar o desconto no app.",
    mocks: {
      emoji: "🎧",
      productName: "Fone bluetooth gamer com baixa latência",
      price: "R$ 79,90",
      priceDetails: "na oferta relâmpago",
      productLink: "https://shp.ee/abc123z",
      couponCode: "",
      discountLabel: "R$ 15",
      couponLink: "https://shopee.com.br/m/resgate-cupom-gamer",
    },
    fields: [
      {
        name: "productLink",
        label: "Link do produto",
        placeholder: "Cole o link do produto Shopee",
        required: true,
      },
      {
        name: "emoji",
        label: "Emoji",
        placeholder: "Ex.: 🎧",
        required: true,
      },
      {
        name: "productName",
        label: "Nome do produto",
        placeholder: "Digite o nome do produto",
        required: true,
      },
      {
        name: "price",
        label: "Valor final com desconto",
        placeholder: "Ex.: R$ 79,90",
        required: true,
      },
      {
        name: "priceDetails",
        label: "Informação complementar do preço",
        placeholder: "Ex.: na oferta relâmpago",
        optional: true,
      },
      {
        name: "discountLabel",
        label: "Valor ou percentual do desconto",
        placeholder: "Ex.: R$ 15",
        required: true,
      },
      {
        name: "couponLink",
        label: "Link para resgatar o cupom",
        placeholder: "Cole o link de resgate do cupom",
        required: true,
        helper: "Links curtos também recebem uma simulação visual de afiliado.",
      },
    ],
  },
};

export const REQUIRED_FIELDS: Record<
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
