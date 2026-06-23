import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Into the AI Jungle",
  description: "An interactive journey about artificial intelligence as a friend or a threat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
