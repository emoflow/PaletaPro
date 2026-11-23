
import type { Metadata } from "next";
import "./globals.css";
import MainNav from "../components/MainNav";

export const metadata: Metadata = {
  title: "PaletaPro | Pelota Paleta Argentina",
  description:
    "El ecosistema digital de la pelota paleta argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <MainNav />
        {children}
      </body>
    </html>
  );
}
