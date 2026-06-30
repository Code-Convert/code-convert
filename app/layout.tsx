import type { Metadata } from 'next';
import './globals.css';

<meta name="apple-mobile-web-app-title" content="Code & Convert" />

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
