import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { PlausibleScript } from "@/components/analytics/PlausibleScript";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE_URL } from "@/config/urls";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HabiMate — Shared living, simplified",
    template: "%s | HabiMate",
  },
  description:
    "Split bills fairly, scan receipts with AI, and settle up—like Airbnb meets Revolut for your household.",
  openGraph: {
    title: "HabiMate — Shared living, simplified",
    description:
      "Fair splits, vacation-aware logic, and a house wall that actually feels human.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HabiMate",
    description: "Shared living, simplified.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors duration-300">
        <ThemeProvider>
          <PlausibleScript />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
