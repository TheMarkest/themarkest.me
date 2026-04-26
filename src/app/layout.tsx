import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontDisplay = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themarkest.me"),
  title: {
    default: "Mark Bogdanov | TheMarkest",
    template: "%s | TheMarkest",
  },
  description:
    "Serial CTO, engineering bureau founder, and technical creativity advocate. Turning complex technologies into products, prototypes, and spectacular projects.",
  openGraph: {
    type: "website",
    siteName: "TheMarkest",
    url: "https://themarkest.me",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
