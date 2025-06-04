
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
  title: 'Марк Богданов | TheMarkest',
  description: 'Марк Богданов - Руководитель IT-проектов, сооснователь itis.team, Such.Digital, DataSuite. Лектор в СПБГЭУ.',
  keywords: 'Марк Богданов, Mark Bogdanov, IT проекты, разработка, full-stack, CTO, TheMarkest, themarkest.me, портфолио',
  openGraph: {
    title: 'Марк Богданов | TheMarkest',
    description: 'Портфолио Марка Богданова: проекты, компетенции, история.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    url: 'https://themarkest.me', 
    siteName: 'TheMarkest',
    images: [ { url: 'https://placehold.co/1200x630.png?text=Mark+Bogdanov', width: 1200, height: 630, alt: 'Mark Bogdanov Portfolio' } ],
  },
  twitter: { 
    card: 'summary_large_image', 
    title: 'Марк Богданов | TheMarkest', 
    description: 'Портфолио Марка Богданова: проекты, компетенции, история.', 
    images: ['https://placehold.co/1200x630.png?text=Mark+Bogdanov'],
    url: 'https://themarkest.me'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head />
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
