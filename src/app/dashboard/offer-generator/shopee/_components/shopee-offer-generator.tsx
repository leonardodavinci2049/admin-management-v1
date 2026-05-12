"use client";

import { Copy, Link2, RefreshCcw, Sparkles, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const SHOPEE_AFFILIATE_ID = "poc-shopee-id";
const SHOPEE_PRODUCT_PLACEHOLDER_IMAGE = "/images/product/no-image.jpeg";

const OFFER_MODELS = {
  withoutCoupon: "withoutCoupon",
  couponCode: "couponCode",
  couponInApp: "couponInApp",
} as const;

type OfferModel = (typeof OFFER_MODELS)[keyof typeof OFFER_MODELS];

type ShopeeOfferFormValues = {
  emoji: string;
  productName: string;
  price: string;
  priceDetails: string;
  productLink: string;
  couponCode: string;
  discountLabel: string;
  couponLink: string;
};

type FieldConfig = {
  name: keyof ShopeeOfferFormValues;
  label: string;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  helper?: string;
};

const MODEL_CONTENT: Record<
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

function getModelMocks(model: OfferModel) {
  return { ...MODEL_CONTENT[model].mocks };
}

function isShopeeShortLink(link: string) {
  return /shp\.ee/i.test(link);
}

function applyMockShopeeAffiliateId(link: string) {
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

function validateShopeeOfferFields(
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

function buildShopeeOfferText(
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

export function ShopeeOfferGenerator() {
  const previewId = useId();
  const [activeModel, setActiveModel] = useState<OfferModel>(
    OFFER_MODELS.withoutCoupon,
  );
  const [formValues, setFormValues] = useState<ShopeeOfferFormValues>(
    getModelMocks(OFFER_MODELS.withoutCoupon),
  );
  const [generatedPreview, setGeneratedPreview] = useState<string>(() =>
    buildShopeeOfferText(
      OFFER_MODELS.withoutCoupon,
      getModelMocks(OFFER_MODELS.withoutCoupon),
    ),
  );
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const modelConfig = MODEL_CONTENT[activeModel];
  const validationErrors = validateShopeeOfferFields(activeModel, formValues);
  const hasErrors = Object.keys(validationErrors).length > 0;
  const productLinkPreview = applyMockShopeeAffiliateId(formValues.productLink);
  const couponLinkPreview = applyMockShopeeAffiliateId(formValues.couponLink);
  const shouldShowProductImagePreview =
    activeModel === OFFER_MODELS.withoutCoupon;

  function handleModelChange(nextModel: string) {
    const typedModel = nextModel as OfferModel;
    const nextValues = getModelMocks(typedModel);

    setActiveModel(typedModel);
    setFormValues(nextValues);
    setGeneratedPreview(buildShopeeOfferText(typedModel, nextValues));
    setHasAttemptedSubmit(false);
  }

  function handleValueChange(
    field: keyof ShopeeOfferFormValues,
    value: ShopeeOfferFormValues[keyof ShopeeOfferFormValues],
  ) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleGeneratePreview() {
    const errors = validateShopeeOfferFields(activeModel, formValues);

    setHasAttemptedSubmit(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Preencha os campos obrigatórios para gerar a prévia.");
      return;
    }

    setGeneratedPreview(buildShopeeOfferText(activeModel, formValues));

    const previewSection = document.getElementById(previewId);
    previewSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleResetExample() {
    const nextValues = getModelMocks(activeModel);

    setFormValues(nextValues);
    setGeneratedPreview(buildShopeeOfferText(activeModel, nextValues));
    setHasAttemptedSubmit(false);
    toast.success("Exemplo restaurado com dados fictícios.");
  }

  async function handleCopyOffer() {
    const errors = validateShopeeOfferFields(activeModel, formValues);

    setHasAttemptedSubmit(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Preencha os campos obrigatórios antes de copiar a oferta.");
      return;
    }

    const previewText = buildShopeeOfferText(activeModel, formValues);

    try {
      await navigator.clipboard.writeText(previewText);
      setGeneratedPreview(previewText);
      toast.success("Oferta copiada com sucesso.");
    } catch {
      toast.error("Não foi possível copiar a oferta agora.");
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-350 min-w-0 flex-1 flex-col gap-4 p-3 sm:gap-6 sm:p-4 md:p-6 lg:p-8">
      <section className="relative min-w-0 overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-card via-card to-orange-500/8 p-4 shadow-sm sm:rounded-4xl sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-48 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.16),transparent_65%)] lg:block" />

        <div className="relative flex flex-col gap-5">
   
          <div className="space-y-3">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Gerador de ofertas Shopee
            </h1>
    
          </div>

   
        </div>
      </section>

      <section className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-start">
        <div className="min-w-0 space-y-4 sm:space-y-6">
          <Card className="min-w-0 border border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="gap-3 px-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <CardTitle>Modelo da oferta</CardTitle>
           
                </div>
                <Badge
                  variant="outline"
                  className="w-fit rounded-full px-3 py-1"
                >
                  {modelConfig.shortLabel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <Tabs
                value={activeModel}
                onValueChange={handleModelChange}
                className="w-full min-w-0"
              >
                <div className="min-w-0 sm:px-0">
                  <TabsList
                    variant="brand"
                    className="flex! h-auto! w-full! max-w-full! min-w-0 flex-col! items-stretch! justify-start! gap-2.5 rounded-3xl p-2 sm:grid! sm:grid-cols-3! sm:items-center! sm:justify-center! sm:rounded-full sm:p-1"
                  >
                    <TabsTrigger
                      value={OFFER_MODELS.withoutCoupon}
                      className="h-auto min-h-12 w-full min-w-0 rounded-2xl px-3 py-3 text-center leading-snug whitespace-normal sm:min-h-11 sm:px-3 sm:py-2"
                    >
                      Sem cupom
                    </TabsTrigger>
                    <TabsTrigger
                      value={OFFER_MODELS.couponCode}
                      className="h-auto min-h-12 w-full min-w-0 rounded-2xl px-3 py-3 text-center leading-snug whitespace-normal sm:min-h-11 sm:px-3 sm:py-2"
                    >
                      Cupom digitável
                    </TabsTrigger>
                    <TabsTrigger
                      value={OFFER_MODELS.couponInApp}
                      className="h-auto min-h-12 w-full min-w-0 rounded-2xl px-3 py-3 text-center leading-snug whitespace-normal sm:min-h-11 sm:px-3 sm:py-2"
                    >
                      Cupom no app
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>

 
            </CardContent>
          </Card>

          <Card className="min-w-0 border border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle>Dados da oferta</CardTitle>
     
            </CardHeader>
            <CardContent className="space-y-5 px-4 sm:px-6">
              {hasAttemptedSubmit && hasErrors ? (
                <Alert className="border-amber-500/35 bg-amber-500/8 text-amber-950 dark:text-amber-100">
                  <TriangleAlert className="text-amber-600 dark:text-amber-300" />
                  <AlertTitle>
                    Há campos pendentes para concluir a oferta.
                  </AlertTitle>
                  <AlertDescription className="text-amber-900/85 dark:text-amber-100/85">
                    Revise os campos marcados abaixo antes de gerar ou copiar a
                    prévia.
                  </AlertDescription>
                </Alert>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                {modelConfig.fields.map((field) => {
                  const errorMessage = hasAttemptedSubmit
                    ? validationErrors[field.name]
                    : undefined;
                  const isWideField =
                    field.name === "productName" ||
                    field.name === "productLink" ||
                    field.name === "couponLink";

                  return (
                    <div
                      key={field.name}
                      className={cn(
                        "space-y-2",
                        isWideField && "sm:col-span-2",
                      )}
                    >
                      <Label htmlFor={field.name} className="min-w-0 flex-wrap">
                        {field.label}
                        {field.required ? (
                          <span className="text-destructive">*</span>
                        ) : null}
                        {field.optional ? (
                          <span className="text-xs font-normal text-muted-foreground">
                            Opcional
                          </span>
                        ) : null}
                      </Label>
                      <Input
                        id={field.name}
                        className="min-w-0"
                        value={formValues[field.name]}
                        onChange={(event) =>
                          handleValueChange(field.name, event.target.value)
                        }
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(errorMessage)}
                      />
                      {errorMessage ? (
                        <p className="text-sm text-destructive">
                          {errorMessage}
                        </p>
                      )  : null}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleGeneratePreview}
                >
                  <Sparkles />
                  Gerar prévia
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={handleResetExample}
                >
                  <RefreshCcw />
                  Restaurar exemplo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="min-w-0 xl:sticky xl:top-6">
          <Card
            id={previewId}
            className="min-w-0 border border-border/60 bg-linear-to-br from-card via-card to-muted/30 shadow-sm"
          >
            <CardHeader className="gap-3 px-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle>Prévia da oferta</CardTitle>
          
                </div>
                <Badge
                  variant="outline"
                  className="max-w-full rounded-full px-3 py-1 break-all"
                >
                  affiliate_id={SHOPEE_AFFILIATE_ID}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              {shouldShowProductImagePreview ? (
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/80 sm:rounded-3xl">
          

                  <div className="relative aspect-square w-full bg-muted/30">
                    <Image
                      src={SHOPEE_PRODUCT_PLACEHOLDER_IMAGE}
                      alt={`Imagem simbólica de ${formValues.productName}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                  </div>
                </div>
              ) : null}

              <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-inner sm:rounded-3xl">
                {generatedPreview ? (
                  <pre className="font-sans text-sm leading-6 whitespace-pre-wrap text-foreground wrap-anywhere">
                    {generatedPreview}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Gere a prévia para visualizar o texto final da oferta.
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 text-sm sm:rounded-3xl">
                  <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                    <Link2 className="size-4" />
                    Simulação de links com afiliado
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      Produto:{" "}
                      <span className="break-all text-foreground">
                        {productLinkPreview || "Informe um link do produto."}
                      </span>
                    </p>
                    {activeModel !== OFFER_MODELS.withoutCoupon ? (
                      <p>
                        Cupom:{" "}
                        <span className="break-all text-foreground">
                          {couponLinkPreview || "Informe um link de cupom."}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>

                {isShopeeShortLink(formValues.productLink) ? (
                  <Alert>
                    <Link2 />
                    <AlertTitle>Link curto detectado</AlertTitle>
                    <AlertDescription>
                      A POC mantém o link visualmente parecido e adiciona o ID
                      fictício apenas para demonstrar a regra futura.
                    </AlertDescription>
                  </Alert>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/60 px-4 pt-4 sm:px-6">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleCopyOffer}
              >
                <Copy />
                Copiar oferta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
