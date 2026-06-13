"use client";

import { RefreshCcw, Sparkles, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DigitalCouponOfferFormValues = {
  emoji: string;
  productName: string;
  price: string;
  priceDetails: string;
  productLink: string;
  couponCode: string;
  discountLabel: string;
  couponLink: string;
};

type DigitalCouponFieldConfig = {
  name: keyof DigitalCouponOfferFormValues;
  label: string;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
};

const DIGITAL_COUPON_FIELDS: DigitalCouponFieldConfig[] = [
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
  },
];

type DigitalCouponOfferFormProps = {
  formValues: DigitalCouponOfferFormValues;
  hasAttemptedSubmit: boolean;
  hasErrors: boolean;
  validationErrors: Record<string, string>;
  onGeneratePreview: () => void;
  onResetExample: () => void;
  onValueChange: (
    field: keyof DigitalCouponOfferFormValues,
    value: DigitalCouponOfferFormValues[keyof DigitalCouponOfferFormValues],
  ) => void;
};

export function DigitalCouponOfferForm({
  formValues,
  hasAttemptedSubmit,
  hasErrors,
  validationErrors,
  onGeneratePreview,
  onResetExample,
  onValueChange,
}: DigitalCouponOfferFormProps) {
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
          {DIGITAL_COUPON_FIELDS.map((field) => {
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
                className={cn("space-y-2", isWideField && "sm:col-span-2")}
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
                    onValueChange(field.name, event.target.value)
                  }
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errorMessage)}
                />
                {errorMessage ? (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                ) : null}
              </div>
            );
          })}
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
