import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const argesta = localFont({ 
  src: '../argestadisplay-regular-webfont.woff2', 
  variable: '--font-argesta' })

export const metadata: Metadata = {
  title: "Patrick's Secret Diary",
  description: "No peeking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${argesta.variable} font-title`}>{children}
        <footer className="flex justify-center p-8 text-sm">
          <p>&copy;{new Date().getFullYear()} Patrick J. Wahl</p>
        </footer>
      </body>
    </html>
  );
}
