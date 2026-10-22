import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProvider from "@/providers/query-provider";

const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NanoMail - Disposable. Private. Fast.",
  description: "Built by Zeus NotFound",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <SpeedInsights/>
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
