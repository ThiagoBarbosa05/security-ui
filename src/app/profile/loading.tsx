import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <LoaderCircle className="text-zinc-50 w-10 h-10 animate-spin" />
    </div>
  );
}
