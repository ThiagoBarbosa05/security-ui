"use server";

import { z } from "zod";
import { ActionsResponse, type FormState } from "./error-handler";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Por favor preencha esse campo com seu nome" }),
  lastName: z
    .string()
    .min(2, { message: "Por favor preencha esse campo com seu sobrenome" }),
});

export async function updateProfile(formState: FormState, formData: FormData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  try {
    const accessToken = (await cookies()).get("access_token");

    const userInfoToUpdate = updateProfileSchema.parse({
      firstName,
      lastName,
    });

    const response = await fetch(
      `${process.env.API_URL}/api/users/update/profile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userInfoToUpdate),
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao atualizar o seu perfil");
    }
  } catch (err) {
    return ActionsResponse.onError({ err, status: "ERROR", payload: formData });
  }

  revalidatePath("/profile");
  redirect("/profile");
}
