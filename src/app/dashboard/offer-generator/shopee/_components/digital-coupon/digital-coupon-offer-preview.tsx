"use client";

import { Copy, Link2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  SHOPEE_AFFILIATE_ID,
  type ShopeeOfferFormValues,
} from "../../Mock/mock-data";
import {
  applyMockShopeeAffiliateId,
  isShopeeShortLink,
} from "../shopee-offer-utils";

type DigitalCouponOfferPreviewProps = {
  formValues: ShopeeOfferFormValues;
  generatedPreview: string;
  previewId: string;
  onCopyOffer: () => void;
};

export function DigitalCouponOfferPreview({
  formValues,
  generatedPreview,
  previewId,
  onCopyOffer,
}: DigitalCouponOfferPreviewProps) {
  const productLinkPreview = applyMockShopeeAffiliateId(formValues.productLink);
  const couponLinkPreview = applyMockShopeeAffiliateId(formValues.couponLink);

  return (
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
                <p>
                  Cupom:{" "}
                  <span className="break-all text-foreground">
                    {couponLinkPreview || "Informe um link de cupom."}
                  </span>
                </p>
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
            onClick={onCopyOffer}
          >
            <Copy />
            Copiar oferta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
