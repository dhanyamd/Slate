import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";


const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Slate",
  description: "Your efficient calendar scheduler",
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
