"use client";

import { ArrowRight, ExternalLink, Eye, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PromoLinkListItem } from "@/services/db/promo-link";
import type { ActionState } from "@/types/action-types";

type PromoLinkTableProps = {
  links: PromoLinkListItem[];
  typeName: string;
  typeId: number;
  deleteAction: (id: number, typeId: number) => Promise<ActionState>;
};

function formatDate(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function truncateUrl(url: string | null, maxLength = 35): string {
  if (!url) return "—";
  if (url.length <= maxLength) return url;
  return `${url.slice(0, maxLength)}…`;
}

export function PromoLinkTable({
  links,
  typeName,
  typeId,
  deleteAction,
}: PromoLinkTableProps) {
  const [selectedLink, setSelectedLink] = useState<PromoLinkListItem | null>(
    null,
  );
  const [linkToDelete, setLinkToDelete] = useState<PromoLinkListItem | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleConfirmDelete() {
    if (!linkToDelete) return;
    const id = linkToDelete.id;
    setLinkToDelete(null);
    startTransition(async () => {
      const result = await deleteAction(id, typeId);
      if (result?.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result?.message ?? "Erro ao excluir link.");
      }
    });
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Nenhum link cadastrado para {typeName}.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {links.map((link) => (
          <div
            key={link.id}
            className="relative rounded-xl border bg-card p-3.5 ring-1 ring-foreground/5"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-primary/80">#{link.id}</span>
              <span>{formatDate(link.createdAt)}</span>
            </div>

            <p className="mb-1.5 line-clamp-1 text-sm font-semibold">
              {link.linkName1 || "Sem nome"}
            </p>

            {link.link1 && (
              <a
                href={link.link1}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 inline-flex max-w-full items-center gap-1 text-xs text-primary underline-offset-4 hover:underline"
                title={link.link1}
              >
                <span className="truncate">{truncateUrl(link.link1, 40)}</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            )}

            <button
              type="button"
              onClick={() => setSelectedLink(link)}
              className="absolute right-12 bottom-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
              title="Ver detalhes"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Ver detalhes</span>
            </button>

            <button
              type="button"
              onClick={() => setLinkToDelete(link)}
              disabled={isPending}
              className="absolute right-3.5 bottom-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50"
              title="Excluir"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Excluir</span>
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden overflow-hidden rounded-lg border sm:block">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="max-w-[200px]">Nome</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="hidden md:table-cell">Criado em</TableHead>
              <TableHead className="w-24 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium tabular-nums">
                  {link.id}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <span className="line-clamp-1">{link.linkName1 || "—"}</span>
                </TableCell>
                <TableCell>
                  {link.link1 ? (
                    <a
                      href={link.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                      title={link.link1}
                    >
                      <span className="line-clamp-1">
                        {truncateUrl(link.link1, 120)}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="hidden tabular-nums md:table-cell">
                  {formatDate(link.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedLink(link)}
                      title="Ver detalhes"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalhes</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setLinkToDelete(link)}
                      disabled={isPending}
                      title="Excluir"
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={selectedLink !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedLink(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do link</DialogTitle>
            <DialogDescription>
              Informações completas do link promocional.
            </DialogDescription>
          </DialogHeader>

          {selectedLink && (
            <div className="space-y-4">
              <div className="grid gap-3 text-sm">
                <DetailRow label="ID" value={String(selectedLink.id)} inline />
                <DetailRow label="Nome" value={selectedLink.linkName1 || "—"} />

                <div className="space-y-1">
                  <span className="font-medium text-muted-foreground">
                    Link:
                  </span>
                  <br />
                  {selectedLink.link1 ? (
                    <a
                      href={selectedLink.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1 break-all text-primary underline-offset-4 hover:underline"
                    >
                      <span className="break-all">{selectedLink.link1}</span>
                      <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    <p>—</p>
                  )}
                </div>

                {selectedLink.notes && (
                  <DetailRow label="Observações" value={selectedLink.notes} />
                )}

                <div className="flex flex-wrap gap-4 pt-2">
                  <Badge variant="outline">
                    Criado em: {formatDate(selectedLink.createdAt)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={linkToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setLinkToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir link</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o link{" "}
              <strong>
                {linkToDelete?.linkName1 || `#${linkToDelete?.id}`}
              </strong>
              ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function DetailRow({
  label,
  value,
  inline,
}: {
  label: string;
  value: string;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "flex items-center gap-2" : "space-y-1"}>
      <span className="font-medium text-muted-foreground">{label}</span>
      <p className="break-all">{value}</p>
    </div>
  );
}
