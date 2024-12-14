import { Pencil } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { UpdateImageProfileForm } from "./update-image-profile-form";

interface ImageProfileProps {
  imageUrl: string;
  userId: string;
}

export function ImageProfile({ userId, imageUrl }: ImageProfileProps) {
  return (
    <div className="w-[120px] h-[120px] flex shrink-0 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border">
      <div className="w-full">
        <Image
          src={imageUrl}
          width={480}
          height={480}
          className="w-full h-full object-cover rounded-full"
          quality={100}
          alt=""
        />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="absolute right-0 bottom-0 rounded-full text-blue-400"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-center">
            Editar imagem de perfil
          </DialogTitle>
          <DialogDescription className="text-center">
            Selecione uma nova foto de perfil clicando na imagem abaixo
          </DialogDescription>
          <UpdateImageProfileForm userId={userId} profileImage={imageUrl} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
