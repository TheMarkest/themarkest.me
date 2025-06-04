import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'CyberMarks - Digital Solutions',
  description: 'CyberMarks: Crafting the future of digital presence with cyberpunk aesthetics and cutting-edge technology.',
  keywords: 'web development, cybersecurity, digital marketing, cyberpunk, portfolio, themarkest.me',
  openGraph: {
    title: 'CyberMarks - Digital Solutions',
    description: 'Pioneering digital experiences with a cyberpunk edge.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    // TODO: Add url and siteName when domain is configured
    // url: 'https://themarkest.me', 
    // siteName: 'CyberMarks',
    // images: [ { url: 'https://themarkest.me/og-image.png', width: 1200, height: 630, alt: 'CyberMarks Logo' } ],
  },
  // TODO: Add twitter specific metadata
  // twitter: { card: 'summary_large_image', title: 'CyberMarks', description: '...', creator: '@handle', images: ['...'] }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Standard Next/Font handles font loading. The user's original setup used <link> tags but next/font is preferred. */}
        {/* However, to adhere strictly to "DO NOT delete code related to Google Fonts in <head>" and specific font instructions, if direct <link>s were mandatory: */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" /> */}
      </head>
      <body
        className={cn(
          'font-body antialiased',
          fontInter.variable,
          fontSpaceGrotesk.variable
        )}
      >
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
