import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import CoverImage from "@/public/2.png"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Slate",
  description: "Your efficient calendar scheduler",
  openGraph : {
    title : "Slatee",
    description : "Schedule, Cancel and Book meetings effortlessly",
    url : "https://www.slatee.xyz",
    siteName : "Slatee",
    images : [
      {
        url : "/public/2.png",
        width : 1200,
        height : 630
      }
    ],
    locale : "en-IN",
    type : "website"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
  <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
