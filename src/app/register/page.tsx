import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CreateAccount } from "@/components/create-account-form";

export default function Page() {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen p-5">
      <Card>
        <CardHeader>
          <CardTitle>Crie uma conta</CardTitle>
          <CardDescription>
            Preencha os campos para criar uma conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="sm:min-w-[375px]">
          <CreateAccount />

          <div>
            <div className="flex items-center gap-2 my-5">
              <Separator />
              <span className="whitespace-nowrap text-sm text-zinc-400 ">
                ou continue com
              </span>
              <Separator />
            </div>
            <Link
              href={`${process.env.API_URL}/oauth2/authorization/google`}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full text-secondary-foreground flex items-center rounded-md h-10 px-4 py-2 justify-center text-sm gap-2"
            >
              <Image src="/google.svg" width={18} height={18} alt="" />
              Google
            </Link>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Link className="underline text-sm text-zinc-300" href="/">
            Já possui uma conta? acesse aqui
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
