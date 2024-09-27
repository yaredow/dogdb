import { Inter, League_Spartan, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import QueryProviders from "@/components/providers/query-provider";
import { Metadata } from "next";
import { getTokens } from "@/lib/cookie";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const league_spartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-league-spartan",
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Doggo",
  description: "description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${league_spartan.variable} ${plus_jakarta_sans.variable} relative flex min-h-screen flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            <NextTopLoader />
            <Header />
            <div className="m-6 md:mx-12 md:my-6">{children}</div>
            <Toaster />
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
