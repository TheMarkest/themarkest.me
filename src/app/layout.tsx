import type { Metadata } from "next";
import "./globals.css";

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
  return children;
}
