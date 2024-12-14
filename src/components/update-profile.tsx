"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { updateProfile } from "@/app/actions/update-profile";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { toast } from "sonner";

interface UpdateProfileProps {
  children: React.ReactNode;
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export function UpdateProfile({ children, userInfo }: UpdateProfileProps) {
  const [formState, action, isPending] = useActionState(
    updateProfile,
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
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetTitle>Editar perfil</SheetTitle>
        <SheetDescription>
          Atualize as informações da sua conta preenchendo os campos abaixo com
          os dados atualizados.
        </SheetDescription>

        <form className="flex flex-col gap-4 mt-6" action={action}>
          <div>
            <Label htmlFor="firstName">Nome:</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Seu nome"
              defaultValue={userInfo.firstName}
            />
            {formState.fieldErrors.firstName && (
              <span className="text-red-400 text-xs block mt-1">
                {formState.fieldErrors.firstName}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Sobrenome:</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Seu sobrenome"
              defaultValue={userInfo.lastName}
            />
            {formState.fieldErrors.firstName && (
              <span className="text-red-400 text-xs block mt-1">
                {formState.fieldErrors.lastName}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="email">email:</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="example@email.com"
              className="cursor-not-allowed outline-none"
              defaultValue={userInfo.email}
              disabled
            />
          </div>

          <Button disabled={isPending}>Salvar alterações</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
