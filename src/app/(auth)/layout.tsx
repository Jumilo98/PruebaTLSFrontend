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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
