import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hello World",
  description: "Default description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full bg-gray-50" lang="en">
      <body className={`${inter.className} h-full`}>
        {children}
      </body>
    </html>
  );
}
