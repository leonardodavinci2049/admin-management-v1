"use client";

import { useId, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  MODEL_CONTENT,
  OFFER_MODELS,
  type OfferModel,
  type ShopeeOfferFormValues,
} from "../Mock/mock-data";
import { DigitalCouponOfferForm } from "./digital-coupon/digital-coupon-offer-form";
import { DigitalCouponOfferPreview } from "./digital-coupon/digital-coupon-offer-preview";
import { InAppCouponOfferForm } from "./in-app-coupon/in-app-coupon-offer-form";
import { InAppCouponOfferPreview } from "./in-app-coupon/in-app-coupon-offer-preview";
import { NoCouponOfferForm } from "./no-coupon/no-coupon-offer-form";
import { NoCouponOfferPreview } from "./no-coupon/no-coupon-offer-preview";
import {
  buildShopeeOfferText,
  getModelMocks,
  validateShopeeOfferFields,
} from "./shopee-offer-utils";

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

  const formProps = {
    formValues,
    hasAttemptedSubmit,
    hasErrors,
    validationErrors,
    onGeneratePreview: handleGeneratePreview,
    onResetExample: handleResetExample,
    onValueChange: handleValueChange,
  };

  const previewProps = {
    formValues,
    generatedPreview,
    previewId,
    onCopyOffer: handleCopyOffer,
  };

  function renderOfferForm() {
    if (activeModel === OFFER_MODELS.couponCode) {
      return <DigitalCouponOfferForm {...formProps} />;
    }

    if (activeModel === OFFER_MODELS.couponInApp) {
      return <InAppCouponOfferForm {...formProps} />;
    }

    return <NoCouponOfferForm {...formProps} />;
  }

  function renderOfferPreview() {
    if (activeModel === OFFER_MODELS.couponCode) {
      return <DigitalCouponOfferPreview {...previewProps} />;
    }

    if (activeModel === OFFER_MODELS.couponInApp) {
      return <InAppCouponOfferPreview {...previewProps} />;
    }

    return <NoCouponOfferPreview {...previewProps} />;
  }

  return (
    <section className="min-w-0 space-y-4 sm:space-y-6">
      <Card className="min-w-0 border border-border/60 bg-card/95 shadow-sm">
        <CardHeader className="gap-3 px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle>Modelo da oferta</CardTitle>
            </div>
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
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

      <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-start">
        <div className="min-w-0">{renderOfferForm()}</div>
        {renderOfferPreview()}
      </div>
    </section>
  );
}
