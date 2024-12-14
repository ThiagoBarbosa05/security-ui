import { ZodError } from "zod";

export type FormState = {
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  status: "UNSET" | "SUCCESS" | "ERROR" | "VALIDATION_ERROR";
  payload?: FormData;
};

export const EMPTY_FORM_STATE: FormState = {
  message: "",
  fieldErrors: {},
  status: "UNSET" as const,
};

type OnSuccessParams = {
  status: FormState["status"];
  message: string;
};

type OnErrorParams = {
  status: FormState["status"];
  payload?: FormData;
  err: unknown;
};

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ActionsResponse {
  static onSuccess({ message, status }: OnSuccessParams): FormState {
    return {
      status,
      message,
      fieldErrors: {},
    };
  }

  static onError({ status, err, payload }: OnErrorParams) {
    if (err instanceof ZodError) {
      return {
        status: "VALIDATION_ERROR" as FormState["status"],
        message: "Erro de validação",
        fieldErrors: err.flatten().fieldErrors,
        payload,
      };
    }

    if (err instanceof Error) {
      return {
        status,
        message: err.message,
        fieldErrors: {},
        payload,
      };
    }
    return {
      status,
      message: "Erro desconhecido",
      fieldErrors: {},
    };
  }
}
