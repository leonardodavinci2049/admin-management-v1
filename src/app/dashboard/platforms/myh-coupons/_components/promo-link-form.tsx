"use client";

import { Loader2 } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/types/action-types";

import { createPromoLinkAction } from "../action/create-promo-link";

type PromoLinkFormProps = {
  typeId: number;
  appId: number;
};

export function PromoLinkForm({ typeId, appId }: PromoLinkFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createPromoLinkAction,
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Form ref={formRef} action={formAction} className="space-y-4">
      <input type="hidden" name="typeId" value={typeId} />
      <input type="hidden" name="appId" value={appId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`linkName-${typeId}`}>Nome do link *</Label>
          <Input
            id={`linkName-${typeId}`}
            name="linkName"
            placeholder="Ex: Promoção de verão"
            required
            maxLength={100}
            disabled={isPending}
            defaultValue={state?.fieldValues?.linkName}
          />
          {state?.errors?.linkName && (
            <p className="text-xs text-destructive">{state.errors.linkName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`linkUrl-${typeId}`}>URL do link *</Label>
          <Input
            id={`linkUrl-${typeId}`}
            name="linkUrl"
            type="url"
            placeholder="https://exemplo.com/promo"
            required
            maxLength={500}
            disabled={isPending}
            defaultValue={state?.fieldValues?.linkUrl}
          />
          {state?.errors?.linkUrl && (
            <p className="text-xs text-destructive">{state.errors.linkUrl}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} className="min-w-[140px]">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar link
        </Button>
      </div>
    </Form>
  );
}
