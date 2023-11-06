import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilRootProvider from "./utils/recoilRootProvider";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ToasterContext from "./utils/ToasterContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aucation",
  description: "중고 경매 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <RecoilRootProvider>
        <body className={inter.className}>
          <Navbar />
          <ToasterContext />
          {children}
          <Footer />
        </body>
      </RecoilRootProvider>
    </html>
  );
}
