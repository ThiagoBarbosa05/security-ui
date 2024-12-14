"use server";

import sharp from "sharp";
import { ActionsResponse, type FormState } from "./error-handler";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfileImage(
  userId: string,
  formState: FormState,
  formData: FormData
) {
  const file = formData.get("file") as File;

  try {
    const image = await file.arrayBuffer();

    const resizedImage = await sharp(image)
      .resize(240, 240, {
        fit: "cover",
      })
      .webp()
      .toBuffer();

    const fileName = file.name.split(".")[0].concat(".webp");

    const formDataToSend = new FormData();
    const resizedImageBlob = new Blob([resizedImage], { type: "image/webp" });
    formDataToSend.append("file", resizedImageBlob, fileName);

    const token = (await cookies()).get("access_token");

    const response = await fetch(
      `${process.env.API_URL}/api/users/update/avatar/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: formDataToSend,
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao atualizar a imagem do perfil");
    }
  } catch (err) {
    return ActionsResponse.onError({ err, status: "ERROR" });
  }

  revalidateTag("profile");
  redirect("/profile");

  return ActionsResponse.onSuccess({ message: "", status: "SUCCESS" });
}
