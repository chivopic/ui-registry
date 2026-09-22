import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Component Registry",
    template: "%s · Component Registry",
  },
  description:
    "A small open UI registry — browse, preview, and install accessible components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
