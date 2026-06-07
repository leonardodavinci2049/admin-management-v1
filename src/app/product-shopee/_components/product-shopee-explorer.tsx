"use client";

import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useActionState, useEffect, useId, useRef } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ActionState } from "@/types/action-types";

import { getProductOfferAction } from "../_actions/get-product-offer-action";

const SORT_TYPE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "1", label: "1 — RELEVANCE_DESC" },
  { value: "2", label: "2 — ITEM_SOLD_DESC" },
  { value: "3", label: "3 — PRICE_DESC" },
  { value: "4", label: "4 — PRICE_ASC" },
  { value: "5", label: "5 — COMMISSION_DESC" },
];

const DEFAULT_SORT_TYPE = "2";

function getFieldValue(
  fieldValues: Record<string, string> | undefined,
  key: string,
  fallback: string,
) {
  const value = fieldValues?.[key];
  if (value === undefined || value === "") {
    return fallback;
  }
  return value;
}

function isChecked(
  fieldValues: Record<string, string> | undefined,
  key: string,
) {
  return fieldValues?.[key] === "on" || fieldValues?.[key] === "true";
}

export function ProductShopeeExplorer() {
  const formId = useId();
  const responseId = useId();
  const processedSubmissionIdRef = useRef<string | null>(null);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    getProductOfferAction,
    null,
  );

  useEffect(() => {
    if (!state?.submissionId) {
      return;
    }

    if (processedSubmissionIdRef.current === state.submissionId) {
      return;
    }

    processedSubmissionIdRef.current = state.submissionId;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (!state?.success || !state.data) {
      return;
    }

    const responseSection = document.getElementById(responseId);
    responseSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [responseId, state]);

  const fieldErrors = state?.errors ?? {};
  const fieldValues = state?.fieldValues;

  return (
    <main className="mx-auto flex w-full max-w-350 min-w-0 flex-1 flex-col gap-4 p-3 sm:gap-6 sm:p-4 md:p-6 lg:p-8">
      <section className="relative min-w-0 overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-card via-card to-orange-500/8 p-4 shadow-sm sm:rounded-4xl sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-48 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.16),transparent_65%)] lg:block" />

        <div className="relative flex flex-col gap-3">
          <Badge
            variant="outline"
            className="w-fit rounded-full border-orange-500/40 px-3 py-1 text-orange-600 dark:text-orange-300"
          >
            Shopee Affiliate · Product Offer v2
          </Badge>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Consulta de ofertas de produtos
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Preencha os parâmetros abaixo e clique em consultar para carregar
            ofertas de produtos diretamente da API da Shopee.
          </p>
        </div>
      </section>

      <section className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-start">
        <Card className="min-w-0 border border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="px-4 sm:px-6">
            <div className="space-y-1">
              <CardTitle>Parâmetros da consulta</CardTitle>
              <CardDescription>
                Apenas um identificador deve ser enviado por requisição (itemId,
                shopId ou keyword).
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-4 sm:px-6">
            {!state?.success && state?.message ? (
              <Alert
                variant={
                  state.errors && Object.keys(state.errors).length > 0
                    ? "default"
                    : "destructive"
                }
                className={
                  state.errors && Object.keys(state.errors).length > 0
                    ? "border-amber-500/35 bg-amber-500/8 text-amber-950 dark:text-amber-100"
                    : undefined
                }
              >
                <AlertTitle>Não foi possível realizar a consulta</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            ) : null}

            <form id={formId} action={formAction} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="itemId">itemId</Label>
                  <Input
                    id="itemId"
                    name="itemId"
                    inputMode="numeric"
                    placeholder="Ex.: 17979995178"
                    defaultValue={getFieldValue(fieldValues, "itemId", "")}
                    disabled={isPending}
                    aria-invalid={Boolean(fieldErrors.itemId)}
                  />
                  {fieldErrors.itemId ? (
                    <p className="text-xs text-destructive">
                      {fieldErrors.itemId}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shopId">shopId</Label>
                  <Input
                    id="shopId"
                    name="shopId"
                    inputMode="numeric"
                    placeholder="Ex.: 84499012"
                    defaultValue={getFieldValue(fieldValues, "shopId", "")}
                    disabled={isPending}
                    aria-invalid={Boolean(fieldErrors.shopId)}
                  />
                  {fieldErrors.shopId ? (
                    <p className="text-xs text-destructive">
                      {fieldErrors.shopId}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="keyword">keyword</Label>
                  <Input
                    id="keyword"
                    name="keyword"
                    placeholder="Ex.: fone bluetooth"
                    defaultValue={getFieldValue(fieldValues, "keyword", "")}
                    disabled={isPending}
                    aria-invalid={Boolean(fieldErrors.keyword)}
                  />
                  {fieldErrors.keyword ? (
                    <p className="text-xs text-destructive">
                      {fieldErrors.keyword}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortType">sortType</Label>
                  <Select
                    name="sortType"
                    defaultValue={getFieldValue(
                      fieldValues,
                      "sortType",
                      DEFAULT_SORT_TYPE,
                    )}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      id="sortType"
                      className="w-full"
                      aria-invalid={Boolean(fieldErrors.sortType)}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.sortType ? (
                    <p className="text-xs text-destructive">
                      {fieldErrors.sortType}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="limit">limit</Label>
                  <Input
                    id="limit"
                    name="limit"
                    type="number"
                    min={1}
                    max={50}
                    placeholder="10"
                    defaultValue={getFieldValue(fieldValues, "limit", "10")}
                    disabled={isPending}
                    aria-invalid={Boolean(fieldErrors.limit)}
                  />
                  {fieldErrors.limit ? (
                    <p className="text-xs text-destructive">
                      {fieldErrors.limit}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page">page</Label>
                  <Input
                    id="page"
                    name="page"
                    type="number"
                    min={1}
                    placeholder="1"
                    defaultValue={getFieldValue(fieldValues, "page", "1")}
                    disabled={isPending}
                    aria-invalid={Boolean(fieldErrors.page)}
                  />
                  {fieldErrors.page ? (
                    <p className="text-xs text-destructive">
                      {fieldErrors.page}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-3 sm:col-span-2">
                  <Label>Filtros extras</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 px-3 py-2.5">
                      <Checkbox
                        id="isAMSOffer"
                        name="isAMSOffer"
                        defaultChecked={isChecked(fieldValues, "isAMSOffer")}
                        disabled={isPending}
                      />
                      <Label
                        htmlFor="isAMSOffer"
                        className="text-sm font-normal text-foreground"
                      >
                        isAMSOffer — filtrar ofertas com comissão AMS
                      </Label>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 px-3 py-2.5">
                      <Checkbox
                        id="isKeySeller"
                        name="isKeySeller"
                        defaultChecked={isChecked(fieldValues, "isKeySeller")}
                        disabled={isPending}
                      />
                      <Label
                        htmlFor="isKeySeller"
                        className="text-sm font-normal text-foreground"
                      >
                        isKeySeller — filtrar apenas sellers chave
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isPending}
                >
                  <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
                  {isPending ? "Consultando..." : "Consultar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card
          id={responseId}
          className="min-w-0 border border-border/60 bg-card/95 shadow-sm"
        >
          <CardHeader className="px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle>Resposta da API</CardTitle>
                <CardDescription>
                  JSON bruto retornado pelo método
                  <code className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    getProductOfferList
                  </code>
                  .
                </CardDescription>
              </div>
              {state?.success ? (
                <Badge className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-700 dark:text-emerald-300">
                  Sucesso
                </Badge>
              ) : state && !state.success ? (
                <Badge
                  variant="outline"
                  className="rounded-full border-destructive/40 px-3 py-1 text-destructive"
                >
                  Erro
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 sm:px-6">
            <div className="max-h-150 overflow-auto rounded-2xl border border-border/70 bg-zinc-950 p-4 shadow-inner">
              <pre className="font-mono text-xs leading-6 whitespace-pre-wrap text-zinc-100 wrap-anywhere">
                {state?.data
                  ? JSON.stringify(state.data, null, 2)
                  : isPending
                    ? "Aguardando resposta da Shopee..."
                    : "Nenhuma consulta realizada ainda."}
              </pre>
            </div>
            {state?.success && state.data ? (
              <p className="text-xs text-muted-foreground">
                role a caixa acima para visualizar a resposta completa.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
