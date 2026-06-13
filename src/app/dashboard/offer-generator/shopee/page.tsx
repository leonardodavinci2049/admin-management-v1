import { SiteHeaderWithBreadcrumb } from "../../_components/header/site-header-with-breadcrumb";

import { ShopeeOfferGenerator } from "./_components/shopee-offer-generator";

const ShopeeOfferGenerationPage = () => {
  return (
    <>
      <SiteHeaderWithBreadcrumb
        title="Gerador de Ofertas"
        breadcrumbItems={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Gerador de Ofertas",
            href: "/dashboard/offer-generator/shopee",
          },
          { label: "Shopee", isActive: true },
        ]}
      />
      <main className="mx-auto flex w-full max-w-350 min-w-0 flex-1 flex-col gap-4 p-3 sm:gap-6 sm:p-4 md:p-6 lg:p-8">
        <section className="relative min-w-0 overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-card via-card to-orange-500/8 p-4 shadow-sm sm:rounded-4xl sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-48 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.16),transparent_65%)] lg:block" />

          <div className="relative flex flex-col gap-5">
            <div className="space-y-3">
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Gerador de ofertas Shopee
              </h1>
            </div>
          </div>
        </section>

        <ShopeeOfferGenerator />
      </main>
    </>
  );
};

export default ShopeeOfferGenerationPage;
