"use client";

import { RefreshCcw, Sparkles, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  MODEL_CONTENT,
  OFFER_MODELS,
  type ShopeeOfferFormValues,
} from "../../Mock/mock-data";

type InAppCouponOfferFormProps = {
  formValues: ShopeeOfferFormValues;
  hasAttemptedSubmit: boolean;
  hasErrors: boolean;
  validationErrors: Record<string, string>;
  onGeneratePreview: () => void;
  onResetExample: () => void;
  onValueChange: (
    field: keyof ShopeeOfferFormValues,
    value: ShopeeOfferFormValues[keyof ShopeeOfferFormValues],
  ) => void;
};

export function InAppCouponOfferForm({
  formValues,
  hasAttemptedSubmit,
  hasErrors,
  validationErrors,
  onGeneratePreview,
  onResetExample,
  onValueChange,
}: InAppCouponOfferFormProps) {
  const fields = MODEL_CONTENT[OFFER_MODELS.couponInApp].fields;

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
          {fields.map((field) => {
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
