import { ResetPasswordForm } from "@/components/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card>
        <CardHeader>
          <CardTitle>Redefina sua senha</CardTitle>
          <CardDescription>
            Insira seu email abaixo para receber um link de redefinição de
            senha.
          </CardDescription>
          <CardContent className="p-0 pt-6">
            <ResetPasswordForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
