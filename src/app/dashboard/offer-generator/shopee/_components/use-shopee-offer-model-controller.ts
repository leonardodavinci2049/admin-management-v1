"use client";

import { useId, useState } from "react";
import { toast } from "sonner";

import {
  buildShopeeOfferText,
  getModelMocks,
  type OfferModel,
  type ShopeeOfferFormValues,
  validateShopeeOfferFields,
} from "./shopee-offer-utils";

export function useShopeeOfferModelController(model: OfferModel) {
  const previewId = useId();
  const [formValues, setFormValues] = useState<ShopeeOfferFormValues>(() =>
    getModelMocks(model),
  );
  const [generatedPreview, setGeneratedPreview] = useState<string>(() =>
    buildShopeeOfferText(model, getModelMocks(model)),
  );
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const validationErrors = validateShopeeOfferFields(model, formValues);
  const hasErrors = Object.keys(validationErrors).length > 0;

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
    const errors = validateShopeeOfferFields(model, formValues);

    setHasAttemptedSubmit(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Preencha os campos obrigatórios para gerar a prévia.");
      return;
    }

    setGeneratedPreview(buildShopeeOfferText(model, formValues));

    const previewSection = document.getElementById(previewId);
    previewSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleResetExample() {
    const nextValues = getModelMocks(model);

    setFormValues(nextValues);
    setGeneratedPreview(buildShopeeOfferText(model, nextValues));
    setHasAttemptedSubmit(false);
    toast.success("Exemplo restaurado com dados fictícios.");
  }

  async function handleCopyOffer() {
    const errors = validateShopeeOfferFields(model, formValues);

    setHasAttemptedSubmit(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Preencha os campos obrigatórios antes de copiar a oferta.");
      return;
    }

    const previewText = buildShopeeOfferText(model, formValues);

    try {
      await navigator.clipboard.writeText(previewText);
      setGeneratedPreview(previewText);
      toast.success("Oferta copiada com sucesso.");
    } catch {
      toast.error("Não foi possível copiar a oferta agora.");
    }
  }

  return {
    formProps: {
      formValues,
      hasAttemptedSubmit,
      hasErrors,
      validationErrors,
      onGeneratePreview: handleGeneratePreview,
      onResetExample: handleResetExample,
      onValueChange: handleValueChange,
    },
    previewProps: {
      formValues,
      generatedPreview,
      previewId,
      onCopyOffer: handleCopyOffer,
    },
  };
}
