"use server";

import { z } from "zod";
import { ActionsResponse, type FormState } from "./error-handler";
import { redirect } from "next/navigation";

const createAccountSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Por favor insira um email válido" })
      .toLowerCase(),
    password: z
      .string()
      .min(1, { message: "Preencha esse campo com sua senha" }),
    firstName: z
      .string()
      .min(2, { message: "Preencha esse campo com seu nome" }),
    lastName: z
      .string()
      .min(2, { message: "Preencha esse campo com seu sobrenome" }),
    matchingPassword: z.string().min(1, { message: "confirme sua senha" }),
  })
  .refine(({ password, matchingPassword }) => password === matchingPassword, {
    message: "As senhas precisam ser iguais",
    path: ["matchingPassword"],
  });

export async function createAccount(formState: FormState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const matchingPassword = formData.get("matchingPassword");

  try {
    const account = createAccountSchema.parse({
      email,
      password,
      firstName,
      lastName,
      matchingPassword,
    });

    const response = await fetch(
      `${process.env.API_URL}/api/users/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      }
    );

    if (response.status === 409) {
      throw new Error("Usuário já cadastrado");
    }

    if (!response.ok) {
      throw new Error("Não foi possível criar a conta");
    }
  } catch (err) {
    return ActionsResponse.onError({ err, status: "ERROR", payload: formData });
  }

  redirect("/");
}
