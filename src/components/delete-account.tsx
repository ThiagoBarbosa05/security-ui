"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { deleteAccount } from "@/app/actions/delete-account";
import { useTransition } from "react";

interface DeleteAccountProps {
  userId: string;
}
export function DeleteAccount({ userId }: DeleteAccountProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDeleteAccount() {
    startTransition(async () => {
      const response = await deleteAccount(userId);

      if (response.status === "ERROR") {
        toast.error(response.message, {
          duration: Number.POSITIVE_INFINITY,
          cancel: {
            label: "Fechar",
            onClick: () => {},
          },
        });
      }
    });
  }

  return (
    <Button
      className="text-sm border-red-500 text-red-500 hover:text-red-500 hover:bg-transparent"
      variant="outline"
      onClick={handleDeleteAccount}
      disabled={isPending}
    >
      {!isPending && <Trash2 className="w-4 h-4" />}
      {isPending ? "Deletando conta" : "Deletar conta"}
    </Button>
  );
}
