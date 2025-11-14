import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comms Helper - AI Personalized Communication Demo",
  description: "Demonstracja personalizacji komunikacji firmowej z wykorzystaniem AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
