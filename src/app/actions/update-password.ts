"use server";

import { z } from "zod";
import { ActionsResponse, type FormState } from "./error-handler";
import { redirect } from "next/navigation";

const updatePasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Por favor insira sua nova senha" }),
    matchingPassword: z.string().min(1, { message: "confirme sua senha" }),
  })
  .refine(({ password, matchingPassword }) => password === matchingPassword, {
    message: "As senhas precisam ser iguais",
    path: ["matchingPassword"],
  });

export async function updatePassword(
  token: string,
  formState: FormState,
  formData: FormData
) {
  const password = formData.get("password");
  const matchingPassword = formData.get("matchingPassword");

  try {
    const updatePasswordParsed = updatePasswordSchema.parse({
      password,
      matchingPassword,
    });

    const updatePasswordRequest = {
      token,
      password: updatePasswordParsed.password,
      matchingPassword: updatePasswordParsed.matchingPassword,
    };

    const response = await fetch(
      `${process.env.API_URL}/api/users/update-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatePasswordRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao atualizar a senha");
    }
  } catch (error) {
    return ActionsResponse.onError({
      err: error,
      status: "ERROR",
      payload: formData,
    });
  }
  return ActionsResponse.onSuccess({message: "Senha alterada com sucesso", status: "SUCCESS"});
}
