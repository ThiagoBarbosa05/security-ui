import { Button } from "@/components/ui/button";
import { Calendar, LogOut, Pencil, Trash } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UpdateProfile } from "@/components/update-profile";
import { ImageProfile } from "@/components/image-profile";
import { redirect } from "next/navigation";
import coverPic from "../../../public/cover.jpg";
import { Logout } from "@/components/logout";
import { DeleteAccount } from "@/components/delete-account";

type UserProfileResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  createdAt: Date;
};

async function getUserProfile(): Promise<UserProfileResponse> {
  const accessToken = (await cookies()).get("access_token");

  const response = await fetch(`${process.env.API_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
    cache: "force-cache",
    next: {
      tags: ["profile"],
    },
  });

  if (!response.ok) {
    redirect("/");
  }

  return response.json();
}

export default async function Page() {
  const profile = await getUserProfile();

  const imageUrl = profile.avatar?.startsWith("https://")
    ? profile.avatar
    : `https://d22efsvwonsuxn.cloudfront.net/${profile.avatar}`;

  const imageProfile = profile.avatar ? imageUrl : "/avatar.png";

  return (
    <div className="w-full max-w-[768px] md:rounded-md md:my-5 flex-1 md:border mx-auto flex flex-col items-center">
      <div className="w-full rounded-md  min-h-[540px] flex flex-col items-center overflow-hidden">
        <div className="relative w-full">
          <Logout />
          <div className="w-full h-64">
            <Image
              src={coverPic}
              className="h-full object-cover"
              priority
              alt=""
            />
          </div>

          <ImageProfile userId={profile.id} imageUrl={imageProfile} />
        </div>

        <div className="mt-20 px-5">
          <p className="font-bold text-xl text-center">
            {profile.firstName} {profile.lastName}
          </p>
          <span className="text-sm text-center block text-zinc-400">
            {profile.email}
          </span>
        </div>

        <div className="px-5 mt-5 text-zinc-400 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm ">
            Criado em{" "}
            {format(profile.createdAt, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </span>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4 mt-5">
          <UpdateProfile
            userInfo={{
              email: profile.email,
              firstName: profile.firstName,
              lastName: profile.lastName,
            }}
          >
            <Button variant="secondary" className="text-sm">
              <Pencil className="w-4 h-4" />
              Editar perfil
            </Button>
          </UpdateProfile>
          <DeleteAccount userId={profile.id} />
        </div>
      </div>
    </div>
  );
}
