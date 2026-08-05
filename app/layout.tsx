import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ChatBot = dynamic(() => import("./components/ChatBot"), { ssr: false });

export const metadata: Metadata = {
  title: "GreenGarden GmbH | Ihre Garten-Experten",
  description: "Hochwertige Gartengeräte, Rasensamen, Dünger und Bewässerungssysteme für Ihren perfekten Garten.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-white text-gray-900">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
