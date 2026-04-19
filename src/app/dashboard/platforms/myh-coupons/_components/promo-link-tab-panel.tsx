import type { PromoLinkListItem } from "@/services/db/promo-link";

import { PromoLinkForm } from "./promo-link-form";
import { PromoLinkTable } from "./promo-link-table";

type PromoLinkTabPanelProps = {
  typeId: number;
  typeName: string;
  links: PromoLinkListItem[];
};

export function PromoLinkTabPanel({
  typeId,
  typeName,
  links,
}: PromoLinkTabPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4 sm:p-6">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Cadastrar novo link — {typeName}
        </h3>
        <PromoLinkForm typeId={typeId} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Últimos links cadastrados
        </h3>
        <PromoLinkTable links={links} typeName={typeName} />
      </div>
    </div>
  );
}
