import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllPromoLinks } from "@/services/db/promo-link";

import { SiteHeaderWithBreadcrumb } from "../../_components/header/site-header-with-breadcrumb";
import {
  TelegramIcon,
  WhatsAppIcon,
} from "../myh-coupons/_components/brand-icons";
import { PromoLinkTabPanel } from "../myh-coupons/_components/promo-link-tab-panel";

const LINK_LIMIT = 20;
const APP_ID = 2;
const WHATSAPP_TYPE_ID = 1;
const TELEGRAM_TYPE_ID = 2;

async function PromoLinkContent() {
  const [whatsappLinks, telegramLinks] = await Promise.all([
    getAllPromoLinks(WHATSAPP_TYPE_ID, { appId: APP_ID, limit: LINK_LIMIT }),
    getAllPromoLinks(TELEGRAM_TYPE_ID, { appId: APP_ID, limit: LINK_LIMIT }),
  ]);

  return (
    <Tabs defaultValue="whatsapp" className="w-full">
      <TabsList variant="brand" className="w-full sm:w-auto">
        <TabsTrigger value="whatsapp">
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </TabsTrigger>
        <TabsTrigger value="telegram">
          <TelegramIcon className="size-4" />
          Telegram
        </TabsTrigger>
      </TabsList>

      <TabsContent value="whatsapp" className="mt-4">
        <PromoLinkTabPanel
          typeId={WHATSAPP_TYPE_ID}
          typeName="WhatsApp"
          appId={APP_ID}
          links={whatsappLinks}
        />
      </TabsContent>

      <TabsContent value="telegram" className="mt-4">
        <PromoLinkTabPanel
          typeId={TELEGRAM_TYPE_ID}
          typeName="Telegram"
          appId={APP_ID}
          links={telegramLinks}
        />
      </TabsContent>
    </Tabs>
  );
}

function PromoLinkSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-56" />
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

const EllyIndicatesPage = () => {
  return (
    <>
      <SiteHeaderWithBreadcrumb
        title="Dashboard"
        breadcrumbItems={[
          { label: "Dashboard", href: "#" },
          { label: "Plataformas", href: "/dashboard/platforms" },
          { label: "Elly Indica", isActive: true },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 px-4 py-4 lg:px-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Links Promocionais - Elly Indica
          </h2>
          <p className="text-sm text-muted-foreground">
            Cadastre e gerencie links promocionais para WhatsApp e Telegram.
          </p>
        </div>

        <Suspense fallback={<PromoLinkSkeleton />}>
          <PromoLinkContent />
        </Suspense>
      </div>
    </>
  );
};

export default EllyIndicatesPage;
