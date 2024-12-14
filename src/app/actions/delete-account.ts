"use server";

import { cookies } from "next/headers";
import { ActionsResponse } from "./error-handler";
import { redirect } from "next/navigation";

export async function deleteAccount(userId: string) {
  try {
    const accessToken = (await cookies()).get("access_token");
    const response = await fetch(`${process.env.API_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível deletar essa conta no momento.");
    }
  } catch (error) {
    return ActionsResponse.onError({ err: error, status: "ERROR" });
  }

  redirect("/");
}
