"use client";

import { OFFER_MODELS } from "../shopee-offer-utils";
import { useShopeeOfferModelController } from "../use-shopee-offer-model-controller";
import { InAppCouponOfferForm } from "./in-app-coupon-offer-form";
import { InAppCouponOfferPreview } from "./in-app-coupon-offer-preview";

export function InAppCouponOfferGenerator() {
  const { formProps, previewProps } = useShopeeOfferModelController(
    OFFER_MODELS.couponInApp,
  );

  return (
    <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-start">
      <div className="min-w-0">
        <InAppCouponOfferForm {...formProps} />
      </div>
      <InAppCouponOfferPreview {...previewProps} />
    </div>
  );
}
