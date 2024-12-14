"use server";

import { string, z } from "zod";
import { ActionsResponse, type FormState } from "./error-handler";

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
});

export async function resetPassword(formState: FormState, formData: FormData) {
  const email = formData.get("email");

  try {
    const requestResetPassword = resetPasswordSchema.parse({
      email,
    });

    const response = await fetch(
      `${process.env.API_URL}/api/users/recovery-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestResetPassword),
      }
    );

    if (response.status === 404) {
      throw new Error("Email não cadastrado");
    }

    if (!response.ok) {
      throw new Error("Não foi possível enviar sua solicitação no momento");
    }
  } catch (error) {
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }

  return ActionsResponse.onSuccess({
    message:
      "Solicitação enviada com sucesso. Verifique seu email para seguir as instruções.",
    status: "SUCCESS",
  });
}
