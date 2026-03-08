import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeProvider } from "@/components/ModeProvider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gaurav Shetty | AI Engineer & Data Scientist",
  description:
    "Portfolio of Gaurav Shetty — AI Engineer and Data Scientist with expertise in machine learning, NLP, and statistical modeling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <ModeProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
