"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DigitalCouponOfferGenerator } from "./digital-coupon/digital-coupon-offer-generator";
import { InAppCouponOfferGenerator } from "./in-app-coupon/in-app-coupon-offer-generator";
import { NoCouponOfferGenerator } from "./no-coupon/no-coupon-offer-generator";

const OFFER_MODELS = {
  withoutCoupon: "withoutCoupon",
  couponCode: "couponCode",
  couponInApp: "couponInApp",
} as const;

type OfferModel = (typeof OFFER_MODELS)[keyof typeof OFFER_MODELS];

const MODEL_SHORT_LABELS: Record<OfferModel, string> = {
  withoutCoupon: "Sem cupom",
  couponCode: "Cupom digitável",
  couponInApp: "Cupom no app",
};

export function ShopeeOfferGenerator() {
  const [activeModel, setActiveModel] = useState<OfferModel>(
    OFFER_MODELS.withoutCoupon,
  );

  function handleModelChange(nextModel: string) {
    setActiveModel(nextModel as OfferModel);
  }

  return (
    <section className="min-w-0 space-y-4 sm:space-y-6">
      <Tabs
        value={activeModel}
        onValueChange={handleModelChange}
        className="w-full min-w-0 gap-4 sm:gap-6"
      >
        <Card className="min-w-0 border border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="gap-3 px-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <CardTitle>Modelo da oferta</CardTitle>
              </div>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
                {MODEL_SHORT_LABELS[activeModel]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
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
          </CardContent>
        </Card>

        <TabsContent value={OFFER_MODELS.withoutCoupon} className="mt-0">
          <NoCouponOfferGenerator />
        </TabsContent>
        <TabsContent value={OFFER_MODELS.couponCode} className="mt-0">
          <DigitalCouponOfferGenerator />
        </TabsContent>
        <TabsContent value={OFFER_MODELS.couponInApp} className="mt-0">
          <InAppCouponOfferGenerator />
        </TabsContent>
      </Tabs>
    </section>
  );
}
