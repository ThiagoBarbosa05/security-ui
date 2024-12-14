"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useActionState, useEffect } from "react";
import { login } from "@/app/actions/login";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { toast } from "sonner";

export function LoginForm() {
  const [formState, action, isPending] = useActionState(
    login,
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
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          placeholder="exemplo@email.com"
          name="email"
          defaultValue={formState.payload?.get("email") as string}
        />
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
        <Link
          className="underline text-xs mt-2 inline-block text-zinc-300"
          href="/auth/reset/password"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <Button disabled={isPending}>Entrar</Button>
    </form>
  );
}
