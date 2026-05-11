import { ShopeeOfferGenerator } from "./_components/shopee-offer-generator";
import { SiteHeaderWithBreadcrumb } from "../../_components/header/site-header-with-breadcrumb";

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
      <ShopeeOfferGenerator />
    </>
  );
};

export default ShopeeOfferGenerationPage;
