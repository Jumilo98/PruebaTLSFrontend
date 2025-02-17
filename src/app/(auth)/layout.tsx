import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Inicia sesión en tu cuenta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="main-section antialiased relative font-nunito text-sm font-normal">
        {children}
      </body>
    </html>
  );
}
