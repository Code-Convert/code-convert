import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Code & Convert - We Build, Market & Scale Digital Brands',
    template: '%s | Code & Convert'
  },
  description: 'We Build, Market & Scale Digital Brands. Expert web design, e-commerce solutions, and digital marketing services.',
  keywords: ['web design', 'e-commerce', 'digital marketing', 'web development', 'branding'],
  authors: [{ name: 'Code & Convert' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Code & Convert',
    title: 'Code & Convert - We Build, Market & Scale Digital Brands',
    description: 'We Build, Market & Scale Digital Brands.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code & Convert',
    description: 'We Build, Market & Scale Digital Brands.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
      name: 'Code & Convert',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icon1.png`,
      description: 'We Build, Market & Scale Digital Brands. Expert web design, e-commerce solutions, and digital marketing services.',
      email: 'hello@codeandconvert.co.za',
      sameAs: [],
      areaServed: 'Worldwide',
      serviceType: ['Web Design', 'Web Development', 'Digital Marketing', 'SEO', 'E-commerce'],
    },
    {
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      name: 'Code & Convert',
      publisher: { '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.NEXT_PUBLIC_SITE_URL}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`overflow-x-hidden ${inter.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Code & Convert" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
