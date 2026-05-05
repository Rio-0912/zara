import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "ZARA | New Collection",
  description: "Discover the latest Zara collections for Woman, Man, Kids and Perfumes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-black antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
