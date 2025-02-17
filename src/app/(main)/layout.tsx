import type { Metadata } from "next";
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: "Inicio",
  description: "Página de inicio",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="main-section antialiased relative font-nunito text-sm font-normal">
        {children}
      </main>
    </div>
  );
}