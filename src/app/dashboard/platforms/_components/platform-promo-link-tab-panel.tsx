import type { PromoLinkListItem } from "@/services/db/promo-link";
import type { ActionState } from "@/types/action-types";

import { PromoLinkForm } from "./platform-promo-link-form";
import { PromoLinkTable } from "./platform-promo-link-table";

type PromoLinkTabPanelProps = {
  typeId: number;
  typeName: string;
  appId: number;
  links: PromoLinkListItem[];
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
};

export function PromoLinkTabPanel({
  typeId,
  typeName,
  appId,
  links,
  action,
}: PromoLinkTabPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4 sm:p-6">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Cadastrar novo link — {typeName}
        </h3>
        <PromoLinkForm typeId={typeId} appId={appId} action={action} />
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
