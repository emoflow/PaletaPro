
import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
