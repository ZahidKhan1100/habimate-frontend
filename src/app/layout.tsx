import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { PlausibleScript } from "@/components/analytics/PlausibleScript";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL } from "@/config/urls";
import { SITE_KEYWORDS } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: true,
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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "HabiMate",
  title: {
    default: "HabiMate — Shared living, simplified",
    template: "%s | HabiMate",
  },
  description:
    "Split household bills fairly with AI receipt scanning, vacation-aware splits, karma, and a shared house wall—roommate expense app for iOS, Android, and web.",
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: "HabiMate", url: SITE_URL }],
  creator: "HabiMate",
  publisher: "HabiMate",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "HabiMate",
    statusBarStyle: "black-translucent",
  },
  category: "finance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "HabiMate — Shared living, simplified",
    description:
      "Fair splits, vacation-aware logic, AI receipt capture, and a house wall that feels human.",
    type: "website",
    locale: "en_US",
    siteName: "HabiMate",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "HabiMate — Shared living, simplified",
    description:
      "Roommate expense splitting, receipt scanning, and fair settlements.",
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors duration-300">
        <StructuredData />
        <ThemeProvider>
          <PlausibleScript />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
