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
      <body className={`${argesta.variable} font-title`}>{children}
        <footer className="flex justify-center p-8 text-sm">
          <p>&copy;{new Date().getFullYear()} Patrick J. Wahl</p>
        </footer>
      </body>
    </html>
  );
}
