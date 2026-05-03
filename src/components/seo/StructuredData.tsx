import { SITE_URL } from "@/config/urls";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Site-wide JSON-LD for Organization + WebSite (helps rich results eligibility).
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "HabiMate",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.png`,
        },
        description:
          "HabiMate helps households split expenses fairly with AI receipt scanning, vacation-aware splits, and a shared house wall.",
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "HabiMate",
        url: SITE_URL,
        description:
          "Shared living, simplified — fair bill splitting and settlements for roommates and households.",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "HabiMate",
        applicationCategory: "FinanceApplication",
        operatingSystem: "iOS, Android, Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: SITE_URL,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
