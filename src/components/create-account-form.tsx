"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { createAccount } from "@/app/actions/create-account";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function CreateAccount() {
  const [formState, action, isPending] = useActionState(
    createAccount,
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
    <form className="flex flex-col gap-4" action={action}>
      <div>
        <Label htmlFor="firstName">nome:</Label>
        <Input
          type="text"
          id="firstName"
          placeholder="Insira seu nome"
          name="firstName"
          defaultValue={formState.payload?.get("firstName") as string}
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
          id="lastName"
          placeholder="Insira seu Sobrenome"
          name="lastName"
          defaultValue={formState.payload?.get("lastName") as string}
        />
        {formState.fieldErrors.lastName && (
          <span className="text-red-400 text-xs block mt-1">
            {formState.fieldErrors.lastName}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          placeholder="exemplo@email.com"
          name="email"
          defaultValue={formState.payload?.get("email") as string}
        />
        {formState.fieldErrors.email && (
          <span className="text-red-400 text-xs block mt-1">
            {formState.fieldErrors.email}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="password">Senha:</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="sua senha"
          defaultValue={formState.payload?.get("password") as string}
        />
        {formState.fieldErrors.password && (
          <span className="text-red-400 text-xs block mt-1">
            {formState.fieldErrors.password}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="matchingPassword">Confirmar senha:</Label>
        <Input
          type="password"
          name="matchingPassword"
          id="matchingPassword"
          placeholder="confirmar senha"
          defaultValue={formState.payload?.get("matchingPassword") as string}
        />
        {formState.fieldErrors.matchingPassword && (
          <span className="text-red-400 text-xs block mt-1">
            {formState.fieldErrors.matchingPassword}
          </span>
        )}
      </div>

      <Button disabled={isPending} type="submit">
        Criar conta
      </Button>
    </form>
  );
}
