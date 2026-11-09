import type { Metadata, Viewport } from "next";
import "./globals.css";
import { marck, pacifico, neue, caveat, lobster, menuFont } from "@/lib/fonts";
import { site, SITE_URL, mapsHref } from "@/lib/site";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import ScrollTopButton from "@/components/ScrollTopButton";

// TODO: add an Open Graph share image (1200×630 JPEG) once the branding is ready.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
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
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.shareDescription,
  },
  robots: {
    index: true,
    follow: true,
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
  telephone: site.phoneDisplay,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}
