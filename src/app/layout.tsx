import type { Metadata, Viewport } from "next";
import "./globals.css";
import { marck, pacifico, neue, caveat, lobster, menuFont } from "@/lib/fonts";
import { site, SITE_URL, mapsHref } from "@/lib/site";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import ScrollTopButton from "@/components/ScrollTopButton";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: SITE_URL,
    siteName: site.name,
    title: site.title,
    description: site.shareDescription,
    images: [{
      url: "/assets/social/miller-og-v1.jpg",
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: "Кулинарен магазин Миллер — храна за вкъщи в Пловдив",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
    images: [{ url: "/assets/social/miller-x-v1.jpg", alt: "Кулинарен магазин Миллер — храна за вкъщи в Пловдив" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#110e0c",
  width: "device-width",
  initialScale: 1,
};

// Shop structured data for search engines (JSON-LD).
const shopJsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": `${SITE_URL}/#shop`,
  name: `Кулинарен Магазин ${site.name}`,
  description: site.description,
  url: SITE_URL,
  telephone: "+359876042408",
  image: [`${SITE_URL}/assets/social/miller-og-v1.jpg`, `${SITE_URL}/assets/social/miller-square-v1.jpg`],
  logo: `${SITE_URL}/icons/android-chrome-512x512.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  hasMap: mapsHref,
  areaServed: { "@type": "City", name: site.address.locality },
  servesCuisine: ["Българска кухня", "Домашна кухня"],
  priceRange: "$",
  currenciesAccepted: "EUR",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...site.hours.days],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  ...(site.facebook ? { sameAs: [site.facebook] } : {}),
  hasMenu: `${SITE_URL}/#menu`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bg"
      className={`${marck.variable} ${caveat.variable} ${pacifico.variable} ${neue.variable} ${lobster.variable} ${menuFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-neutral-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [shopJsonLd, {
            "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL,
            name: site.title, alternateName: "miller-bg.com", inLanguage: "bg-BG",
            publisher: { "@id": `${SITE_URL}/#shop` },
          }] }).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}
