import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const cookieStore = await cookies();
  if (token) {
    cookieStore.set("access_token", token);
  }

  redirect("/profile");
}
