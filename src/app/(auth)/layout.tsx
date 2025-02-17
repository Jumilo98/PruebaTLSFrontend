import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bienvenido",
  description: "Bienvenido a la aplicación",
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
