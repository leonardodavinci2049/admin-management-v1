"use client";

import { OFFER_MODELS } from "../shopee-offer-utils";
import { useShopeeOfferModelController } from "../use-shopee-offer-model-controller";
import { NoCouponOfferForm } from "./no-coupon-offer-form";
import { NoCouponOfferPreview } from "./no-coupon-offer-preview";

export function NoCouponOfferGenerator() {
  const { formProps, previewProps } = useShopeeOfferModelController(
    OFFER_MODELS.withoutCoupon,
  );

  return (
    <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-start">
      <div className="min-w-0">
        <NoCouponOfferForm {...formProps} />
      </div>
      <NoCouponOfferPreview {...previewProps} />
    </div>
  );
}
