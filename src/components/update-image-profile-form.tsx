"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { updateProfileImage } from "@/app/actions/update-profile-image";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { toast } from "sonner";
import uploadIcon from "../../public/upload.svg";

interface UpdateImageProfileFormProps {
  profileImage: string;
  userId: string;
}

export function UpdateImageProfileForm({
  profileImage,
  userId,
}: UpdateImageProfileFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const [formState, action, isPending] = useActionState(
    updateProfileImage.bind(null, userId),
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (formState.status === "ERROR") {
      toast.error(formState.message, {
        duration: Number.POSITIVE_INFINITY,
        cancel: {
          label: "Fechar",
          onClick: () => {},
        },
      });
    }
  }, [formState.status, formState.message]);

  return (
    <form action={action} className="flex flex-col items-center gap-6 mt-5">
      <label
        htmlFor="file"
        className="relative cursor-pointer transition duration-300"
      >
        <div className="absolute inset-0 bg-zinc-950 opacity-0 transition-opacity duration-300 hover:opacity-45 flex items-center justify-center rounded-full">
          <Image src={uploadIcon} alt="" className="w-[90px]" />
        </div>
        {!imagePreview ? (
          <div className="w-[180px] h-[180px] rounded-full">
            <Image
              src={profileImage}
              width={240}
              height={240}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>
        ) : (
          <div className="w-[180px] h-[180px] rounded-full">
            <Image
              src={imagePreview}
              className="w-full h-full object-cover rounded-full"
              width={240}
              height={240}
              alt="preview"
            />
          </div>
        )}
        <input
          onChange={handleFileChange}
          type="file"
          id="file"
          name="file"
          accept="image/*"
          className="sr-only"
          required
        />
      </label>

      <Button disabled={isPending || !imagePreview}>Salvar imagem</Button>
    </form>
  );
}
