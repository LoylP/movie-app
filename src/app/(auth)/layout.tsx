import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";
import Providers from "../Providers";
import { Suspense } from "react"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "MFilm",
  description: "This is a movie-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
