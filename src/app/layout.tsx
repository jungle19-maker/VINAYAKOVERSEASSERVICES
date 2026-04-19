import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const BASE_URL = 'https://www.vinayakoverseasservices.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Vinayak Overseas Services | MEA Approved Global Manpower Recruitment',
    template: '%s | Vinayak Overseas Services',
  },
  description:
    'Vinayak Overseas Services (VCS) is an MEA-approved, Government of India licensed overseas manpower recruitment agency. We connect skilled Indian professionals with trusted international employers across Gulf, Middle East, Asia & Europe.',
  keywords: [
    'overseas recruitment India',
    'manpower agency India',
    'MEA approved recruitment',
    'overseas jobs India',
    'gulf recruitment agency',
    'international manpower consultancy',
    'Vinayak Overseas Services',
    'overseas staffing India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Vinayak Overseas Services',
    title: 'Vinayak Overseas Services | MEA Approved Global Manpower Recruitment',
    description:
      'Connecting skilled Indian talent with trusted international employers. MEA Registered | 100% Legal Recruitment | Global Placements.',
    images: [
      {
        url: '/images/hero_city_buildings.png',
        width: 1200,
        height: 630,
        alt: 'Vinayak Overseas Services — Global Recruitment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinayak Overseas Services | Global Manpower Recruitment',
    description:
      'MEA approved overseas recruitment agency. Connecting skilled Indian professionals with global employers.',
    images: ['/images/hero_city_buildings.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vinayak Overseas Services',
  alternateName: 'VCS',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.jpeg`,
  description:
    'MEA approved overseas manpower recruitment agency connecting skilled Indian professionals with international employers across Gulf, Middle East, Asia and Europe.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No 5, Ground & First Floor, Old Hoshiarpur Road',
    addressLocality: 'Una',
    addressRegion: 'Himachal Pradesh',
    postalCode: '174303',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-8894412776',
      contactType: 'customer service',
      availableLanguage: ['Hindi', 'English'],
    },
  ],
  email: 'vinayakoverseas90@gmail.com',
  foundingDate: '2014',
  numberOfEmployees: '10-50',
  sameAs: [
    'https://www.facebook.com/vinayakoverseasservices',
    'https://www.linkedin.com/company/vinayakoverseasservices',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-[#F8FAFC] text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
