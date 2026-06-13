"use client";

import { OFFER_MODELS } from "../shopee-offer-utils";
import { useShopeeOfferModelController } from "../use-shopee-offer-model-controller";
import { DigitalCouponOfferForm } from "./digital-coupon-offer-form";
import { DigitalCouponOfferPreview } from "./digital-coupon-offer-preview";

export function DigitalCouponOfferGenerator() {
  const { formProps, previewProps } = useShopeeOfferModelController(
    OFFER_MODELS.couponCode,
  );

  return (
    <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-start">
      <div className="min-w-0">
        <DigitalCouponOfferForm {...formProps} />
      </div>
      <DigitalCouponOfferPreview {...previewProps} />
    </div>
  );
}
