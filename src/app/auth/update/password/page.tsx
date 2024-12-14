import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdatePasswordForm } from "@/components/update-password-form";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ token: string | undefined }>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full sm:max-w-[479px]">
        <CardHeader>
          <CardTitle>Nova senha</CardTitle>
          <CardDescription>Insira sua nova senha</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm token={token ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
