"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/logout";

export function Logout() {
  async function handleLogout() {
    await logout();
  }

  return (
    <Button
      onClick={handleLogout}
      className="absolute right-5 top-5"
      variant="link"
    >
      Sair
      <LogOut />
    </Button>
  );
}
