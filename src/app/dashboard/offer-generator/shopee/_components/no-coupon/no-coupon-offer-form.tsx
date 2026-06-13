"use client";

import { RefreshCcw, Sparkles, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NoCouponOfferFormValues = {
  emoji: string;
  productName: string;
  price: string;
  priceDetails: string;
  productLink: string;
};

type NoCouponOfferFormProps = {
  formValues: NoCouponOfferFormValues;
  hasAttemptedSubmit: boolean;
  hasErrors: boolean;
  validationErrors: Record<string, string>;
  onGeneratePreview: () => void;
  onResetExample: () => void;
  onValueChange: (
    field: keyof NoCouponOfferFormValues,
    value: NoCouponOfferFormValues[keyof NoCouponOfferFormValues],
  ) => void;
};

export function NoCouponOfferForm({
  formValues,
  hasAttemptedSubmit,
  hasErrors,
  validationErrors,
  onGeneratePreview,
  onResetExample,
  onValueChange,
}: NoCouponOfferFormProps) {
  const productLinkError = hasAttemptedSubmit
    ? validationErrors.productLink
    : undefined;
  const emojiError = hasAttemptedSubmit ? validationErrors.emoji : undefined;
  const productNameError = hasAttemptedSubmit
    ? validationErrors.productName
    : undefined;
  const priceError = hasAttemptedSubmit ? validationErrors.price : undefined;
  const priceDetailsError = hasAttemptedSubmit
    ? validationErrors.priceDetails
    : undefined;

  return (
    <Card className="min-w-0 border border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle>Dados da oferta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-4 sm:px-6">
        {hasAttemptedSubmit && hasErrors ? (
          <Alert className="border-amber-500/35 bg-amber-500/8 text-amber-950 dark:text-amber-100">
            <TriangleAlert className="text-amber-600 dark:text-amber-300" />
            <AlertTitle>Há campos pendentes para concluir a oferta.</AlertTitle>
            <AlertDescription className="text-amber-900/85 dark:text-amber-100/85">
              Revise os campos marcados abaixo antes de gerar ou copiar a
              prévia.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="productLink" className="min-w-0 flex-wrap">
              Link do produto
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="productLink"
              className="min-w-0"
              value={formValues.productLink}
              onChange={(event) =>
                onValueChange("productLink", event.target.value)
              }
              placeholder="Cole o link do produto Shopee"
              aria-invalid={Boolean(productLinkError)}
            />
            {productLinkError ? (
              <p className="text-sm text-destructive">{productLinkError}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emoji" className="min-w-0 flex-wrap">
              Emoji
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="emoji"
              className="min-w-0"
              value={formValues.emoji}
              onChange={(event) => onValueChange("emoji", event.target.value)}
              placeholder="Ex.: 🧺"
              aria-invalid={Boolean(emojiError)}
            />
            {emojiError ? (
              <p className="text-sm text-destructive">{emojiError}</p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="productName" className="min-w-0 flex-wrap">
              Nome do produto
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="productName"
              className="min-w-0"
              value={formValues.productName}
              onChange={(event) =>
                onValueChange("productName", event.target.value)
              }
              placeholder="Digite o nome do produto"
              aria-invalid={Boolean(productNameError)}
            />
            {productNameError ? (
              <p className="text-sm text-destructive">{productNameError}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="min-w-0 flex-wrap">
              Valor do produto
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              className="min-w-0"
              value={formValues.price}
              onChange={(event) => onValueChange("price", event.target.value)}
              placeholder="Ex.: R$ 29,90"
              aria-invalid={Boolean(priceError)}
            />
            {priceError ? (
              <p className="text-sm text-destructive">{priceError}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceDetails" className="min-w-0 flex-wrap">
              Informação complementar do preço
              <span className="text-xs font-normal text-muted-foreground">
                Opcional
              </span>
            </Label>
            <Input
              id="priceDetails"
              className="min-w-0"
              value={formValues.priceDetails}
              onChange={(event) =>
                onValueChange("priceDetails", event.target.value)
              }
              placeholder="Ex.: no pix"
              aria-invalid={Boolean(priceDetailsError)}
            />
            {priceDetailsError ? (
              <p className="text-sm text-destructive">{priceDetailsError}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            type="button"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onGeneratePreview}
          >
            <Sparkles />
            Gerar prévia
          </Button>
          <Button
            type="button"
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={onResetExample}
          >
            <RefreshCcw />
            Restaurar exemplo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
