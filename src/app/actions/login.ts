"use server";

import { z } from "zod";
import { ActionsResponse, type FormState } from "./error-handler";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email({ message: "Insira seu email" }).toLowerCase(),
  password: z.string().min(1, { message: "Preencha esse campo com sua senha" }),
});

export async function login(formState: FormState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const credentials = loginSchema.parse({
      email,
      password,
    });

    const response = await fetch(
      `${process.env.API_URL}/api/users/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (response.status === 401) {
      throw new Error("E-mail/senha incorretos");
    }

    if (!response.ok) {
      throw new Error("Falha na autenticação");
    }

    const loginResponse = await response.json();

    (await cookies()).set("access_token", loginResponse.accessToken);
  } catch (err) {
    return ActionsResponse.onError({
      err: err,
      status: "ERROR",
      payload: formData,
    });
  }
  redirect("/profile");
}
