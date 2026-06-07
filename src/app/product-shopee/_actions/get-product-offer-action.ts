"use server";

import { z } from "zod";
import {
  getProductOfferList,
  ProductOfferV2Schema,
} from "@/services/api-shopee-affiliate";
import type { ActionState } from "@/types/action-types";

function createSubmissionId() {
  return crypto.randomUUID();
}

const formSchema = z
  .object({
    itemId: z.string().optional(),
    shopId: z.string().optional(),
    keyword: z.string().optional(),
    sortType: z.string().optional(),
    page: z.string().optional(),
    isAMSOffer: z.string().optional(),
    isKeySeller: z.string().optional(),
    limit: z.string().optional(),
  })
  .transform((data) => {
    const toOptionalNumber = (value: string | undefined) => {
      if (value === undefined || value.trim() === "") {
        return undefined;
      }

      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : Number.NaN;
    };

    const toOptionalBoolean = (value: string | undefined) => {
      if (value === undefined) {
        return undefined;
      }

      return value === "on" || value === "true";
    };

    return {
      itemId: toOptionalNumber(data.itemId),
      shopId: toOptionalNumber(data.shopId),
      keyword: data.keyword?.trim() ? data.keyword.trim() : undefined,
      sortType: toOptionalNumber(data.sortType),
      page: toOptionalNumber(data.page),
      isAMSOffer: toOptionalBoolean(data.isAMSOffer),
      isKeySeller: toOptionalBoolean(data.isKeySeller),
      limit: toOptionalNumber(data.limit),
    };
  });

export type GetProductOfferFormValues = z.input<typeof formSchema>;
export type GetProductOfferPayload = z.output<typeof formSchema>;

export async function getProductOfferAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawData: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      rawData[key] = value;
    }
  }

  const fieldValues: Record<string, string> = {
    itemId: rawData.itemId ?? "",
    shopId: rawData.shopId ?? "",
    keyword: rawData.keyword ?? "",
    sortType: rawData.sortType ?? "",
    page: rawData.page ?? "",
    isAMSOffer: rawData.isAMSOffer ?? "",
    isKeySeller: rawData.isKeySeller ?? "",
    limit: rawData.limit ?? "",
  };

  const parsed = formSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString() ?? "form";
      errors[field] = issue.message;
    }
    return {
      success: false,
      message: "Verifique os campos do formulário.",
      submissionId: createSubmissionId(),
      errors,
      fieldValues,
    };
  }

  const hasInvalidNumber = Object.values(parsed.data).some(
    (value) => typeof value === "number" && Number.isNaN(value),
  );

  if (hasInvalidNumber) {
    return {
      success: false,
      message: "Informe apenas números válidos nos campos numéricos.",
      submissionId: createSubmissionId(),
      fieldValues,
    };
  }

  const validated = ProductOfferV2Schema.safeParse(parsed.data);
  if (!validated.success) {
    const errors: Record<string, string> = {};
    for (const issue of validated.error.issues) {
      const field = issue.path[0]?.toString() ?? "form";
      errors[field] = issue.message;
    }
    return {
      success: false,
      message: "Verifique os campos do formulário.",
      submissionId: createSubmissionId(),
      errors,
      fieldValues,
    };
  }

  try {
    const response = await getProductOfferList(validated.data);
    return {
      success: true,
      message: "Consulta realizada com sucesso.",
      submissionId: createSubmissionId(),
      fieldValues,
      data: response as unknown as Record<string, unknown>,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido.",
      submissionId: createSubmissionId(),
      fieldValues,
    };
  }
}
