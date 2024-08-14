import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { LibraryProvider } from "@/context/LibraryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "2024 compilation of cheminformatics tools, softwares and platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <LibraryProvider>
          <div>
            {children}
          </div>
         
        </LibraryProvider>

        <Footer></Footer>
      </body>
    </html>
  );
}
