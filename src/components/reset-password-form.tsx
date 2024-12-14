"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { resetPassword } from "@/app/actions/reset-password";
import { EMPTY_FORM_STATE } from "@/app/actions/error-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";

export function ResetPasswordForm() {
  const [formState, action, isPending] = useActionState(
    resetPassword,
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
          <p className="flex items-center gap-2">
            <CircleCheck className="w-4 h-4 text-lime-500" />
            Link enviado para o seu email.
          </p>
        </div>
      ) : (
        <form className="w-full" action={action}>
          <Input
            type="email"
            placeholder="Insira seu email"
            name="email"
            defaultValue={formState.payload?.get("email") as string}
          />
          {formState.fieldErrors.email && (
            <span className="text-red-400 text-xs block mt-1">
              {formState.fieldErrors.email}
            </span>
          )}
          <Button disabled={isPending} className="mt-4" type="submit">
            {isPending ? "Enviando" : "Redefinir senha"}
          </Button>
        </form>
      )}
    </div>
  );
}
