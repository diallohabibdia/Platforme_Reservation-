"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Myheader from "@/components/myheader/Myheader";
import Myfooter from "@/components/myfooter/Myfooter";
import { usePathname } from 'next/navigation';
import { SessionProvider } from "next-auth/react"; // ✅ Ajout de SessionProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== "/" && pathname !== "/login"; 

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Ajout de SessionProvider pour éviter l'erreur `useSession` */}
        <SessionProvider>
          <div>
            {showHeaderFooter && <Myheader />}
            <div className="content">{children}</div>
            {showHeaderFooter && <Myfooter />}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
