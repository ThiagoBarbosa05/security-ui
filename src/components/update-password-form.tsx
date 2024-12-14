"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updatePassword } from "@/app/actions/update-password";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { toast } from "sonner";
import Link from "next/link";

interface UpdatePasswordFormProps {
  token: string;
}

export function UpdatePasswordForm({ token }: UpdatePasswordFormProps) {
  const [formState, action, isPending] = useActionState(
    updatePassword.bind(null, token),
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
    <div>
      {formState.status === "SUCCESS" ? (
        <div>
          <p className="text-sm">
            {formState.message}, <Link className="underline" href="/">acesse sua conta aqui.</Link>
          </p>
        </div>
      ) : (
        <form className="flex flex-col gap-4" action={action}>
          <div>
            <Label htmlFor="password">Nova senha:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="sua nova senha"
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
              placeholder="confirme sua nova senha"
              defaultValue={
                formState.payload?.get("matchingPassword") as string
              }
            />
            {formState.fieldErrors.matchingPassword && (
              <span className="text-red-400 text-xs block mt-1">
                {formState.fieldErrors.matchingPassword}
              </span>
            )}
          </div>
          <Button disabled={isPending}>
            {isPending ? "Enviando" : "Enviar"}
          </Button>
        </form>
      )}
    </div>
  );
}
