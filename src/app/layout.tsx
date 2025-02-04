import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Security APP",
  description: "Authentication App",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased dark`}>
        <main className="flex flex-col min-h-screen md:py-5">{children}</main>
        <Toaster
          toastOptions={{
            classNames: {
              error: "bg-red-400 border-red-800",
            },
          }}
        />
      </body>
    </html>
  );
}
