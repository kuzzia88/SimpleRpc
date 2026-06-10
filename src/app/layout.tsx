import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimpleRpc",
  description: "Next.js and Electron workspace"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
