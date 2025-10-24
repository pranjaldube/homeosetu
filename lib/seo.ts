import { Metadata } from "next";

// SEO Configuration
export const SEO_CONFIG = {
  siteName: "Homeosetu",
  siteUrl: "https://www.homeosetu.com", // Update with your actual domain
  defaultTitle: "Homeosetu — Homeopathy Courses & Clinical Resources",
  defaultDescription: "Structured homeopathy education for students and clinicians: modular courses, interactive repertory tools, materia medica lessons, notes, live webinars.",
  keywords: [
    "homeopathic repertory",
    "homeopathic repertory study",
    "homeopathic repertory online",
    "materia medica",
    "materia medica study",
    "homeopathic materia medica pdf",
    "homeopathic therapeutics",
    "homeopathic therapeutics cough",
    "homeopathic therapeutics fever",
    "homeopathic therapeutics allergies",
    "homeopathic remedies list",
    "homeopathic remedy search",
    "homeopathy course online",
    "classical homeopathy course",
    "homeopathy for beginners",
    "homeopathy case taking",
    "homeopathy clinical training",
    "online homeopathy classes",
    "homeopathic prescribing guidelines",
    "homeopathic study materials",
    "homeopathy webinars",
    "homeopathy lectures PDF",
    "homeopathy practice management",
    "homeopathic repertorisation software",
    
  ],
  author: "Homeosetu Team",
  socialMedia: {
    youtube: "https://www.youtube.com/@homeosetu",
    facebook: "https://www.facebook.com/homeosetu",
    instagram: "https://www.instagram.com/homeosetu",
    whatsapp: "https://whatsapp.com/channel/0029Vb1nEJT0VycIU60Buo0K",
    x: "https://x.com/homeosetu",
  },
};

// Generate metadata for different page types
export function generateMetadata({
  title,
  description,
  keywords = [],
  image = "/logo.png",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags = [],
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "course" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}): Metadata {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
  const fullDescription = description || SEO_CONFIG.defaultDescription;
  const fullKeywords = [...SEO_CONFIG.keywords, ...keywords];
  const fullUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl;
  const fullImage = image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: authors ? authors.map(name => ({ name })) : [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: type === "course" ? "website" : type,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  // Add article-specific metadata
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      section,
      tags,
      authors: authors?.map(name => name),
    };
  }

  return metadata;
}

// Generate structured data for different content types
export function generateStructuredData({
  type,
  data,
}: {
  type: "Organization" | "Course" | "Article" | "FAQPage";
  data: any;
}) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseStructuredData,
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        logo: `${SEO_CONFIG.siteUrl}/logo.png`,
        description: SEO_CONFIG.defaultDescription,
        sameAs: [
          SEO_CONFIG.socialMedia.youtube,
          SEO_CONFIG.socialMedia.facebook,
          SEO_CONFIG.socialMedia.instagram,
          SEO_CONFIG.socialMedia.x,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "homeosetu@gmail.com",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+91-9975461833",
            contactOption: "TollFree",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN", // Update with actual country
        },
      };

    case "Course":
      return {
        ...baseStructuredData,
        name: data.title,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.siteUrl,
        },
        courseMode: "online",
        educationalLevel: "professional",
        inLanguage: "en",
        isAccessibleForFree: data.isFree || false,
        offers: data.price ? {
          "@type": "Offer",
          price: data.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        } : undefined,
        image: data.imageUrl ? `${SEO_CONFIG.siteUrl}${data.imageUrl}` : `${SEO_CONFIG.siteUrl}/logo.png`,
        url: `${SEO_CONFIG.siteUrl}/courses/${data.id}`,
        dateCreated: data.createdAt,
        dateModified: data.updatedAt,
      };

    case "Article":
      return {
        ...baseStructuredData,
        headline: data.title,
        description: data.description,
        image: data.image ? `${SEO_CONFIG.siteUrl}${data.image}` : `${SEO_CONFIG.siteUrl}/logo.png`,
        author: {
          "@type": "Person",
          name: data.author || SEO_CONFIG.author,
        },
        publisher: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          logo: {
            "@type": "ImageObject",
            url: `${SEO_CONFIG.siteUrl}/logo.png`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SEO_CONFIG.siteUrl}${data.url}`,
        },
      };

    case "FAQPage":
      return {
        ...baseStructuredData,
        mainEntity: data.faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

    default:
      return baseStructuredData;
  }
}

// Generate sitemap data
export function generateSitemapData() {
  return {
    siteUrl: SEO_CONFIG.siteUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  };
}

