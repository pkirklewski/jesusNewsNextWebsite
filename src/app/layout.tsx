import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import ChunkErrorListener from '@/components/ChunkErrorListener'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jesusnews.pl'),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  title: 'JesusNews — Wiadomości chrześcijańskie w Polsce',
  description:
    'Codzienne wiadomości chrześcijańskie z perspektywy Słowa Bożego. Artykuły, świadectwa, wiadomości ze świata wiary. Newsletter codziennie o 7:00 rano.',
  keywords: [
    'wiadomości chrześcijańskie',
    'chrześcijaństwo Polska',
    'Biblia',
    'newsletter chrześcijański',
    'jesusnews',
    'świadectwa wiary',
    'prześladowania chrześcijan',
    'Słowo Boże',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JesusNews — Wiadomości chrześcijańskie w Polsce',
    description:
      'Codzienne wiadomości chrześcijańskie z perspektywy Słowa Bożego. Newsletter o 7:00 rano.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'JesusNews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JesusNews — Wiadomości chrześcijańskie w Polsce',
    description:
      'Codzienne wiadomości chrześcijańskie z perspektywy Słowa Bożego.',
  },
  other: {
    'theme-color': '#17233A',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JesusNews',
  url: 'https://jesusnews.pl',
  description: 'Codzienne wiadomości chrześcijańskie z perspektywy Słowa Bożego',
  inLanguage: 'pl',
  publisher: {
    '@type': 'Organization',
    name: 'JesusNews',
    url: 'https://jesusnews.pl',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary font-sans min-h-screen flex flex-col antialiased">
        <ChunkErrorListener />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
