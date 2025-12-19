import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://BDJHelper.com"),
  title: {
    default: "BDJHelper - Assignment Help, Dissertation Writing & Research Paper Service",
    template: "%s | BDJHelper",
  },
  description:
    "BDJHelper provides expert assignment help, dissertation writing, research papers, proposals, posters, case studies, and reports. Free Turnitin AI & similarity reports. 15+ expert writers serving 1400+ students across Bangladesh, UK, Australia, USA, Canada, and Austria. CSE, BBA, BSS, MSS, BA, MA, MSC assignments.",
  keywords: [
    // Core Services
    "assignment help",
    "assignment helper",
    "assignment writing service",
    "online assignment help",
    "assignment help online",
    "do my assignment",
    "assignment writing help",
    "assignment assistance",
    "assignment service",
    "help with assignments",
    "assignment help service",
    
    // Dissertation & Thesis
    "dissertation help",
    "dissertation writing service",
    "dissertation writing help",
    "thesis help",
    "thesis writing service",
    "dissertation assistance",
    "PhD dissertation help",
    "master dissertation help",
    "dissertation writing",
    "thesis writing",
    
    // Research Papers
    "research paper help",
    "research paper writing service",
    "research paper writing",
    "research paper assistance",
    "academic research paper",
    "research paper writer",
    "write my research paper",
    "research paper service",
    
    // Reports & Case Studies
    "report writing service",
    "report writing help",
    "academic report writing",
    "case study help",
    "case study writing service",
    "case study analysis",
    "case study writing",
    "business case study help",
    
    // Proposals
    "research proposal help",
    "research proposal writing",
    "proposal writing service",
    "project proposal help",
    "grant proposal writing",
    "research proposal assistance",
    "proposal writing help",
    
    // Posters & Presentations
    "poster presentation help",
    "academic poster design",
    "poster making service",
    "presentation help",
    "PowerPoint presentation help",
    "academic poster service",
    "poster design help",
    "presentation writing service",
    
    // Essays
    "essay writing service",
    "essay help",
    "essay writing help",
    "academic essay writing",
    "essay writer",
    "write my essay",
    "essay assistance",
    "essay writing service online",
    
    // Proofreading & Editing
    "proofreading service",
    "editing service",
    "academic editing",
    "proofreading help",
    "paper editing service",
    "document editing",
    "academic proofreading",
    
    // Turnitin & Plagiarism
    "Turnitin report",
    "Turnitin similarity report",
    "plagiarism check",
    "plagiarism free",
    "similarity report",
    "AI detection report",
    "free Turnitin report",
    "plagiarism checker",
    
    // Subject-Specific
    "CSE assignment help",
    "Computer Science assignment help",
    "BBA assignment help",
    "Business assignment help",
    "BSS assignment help",
    "Social Science assignment help",
    "MSS assignment help",
    "BA assignment help",
    "MA assignment help",
    "MSC assignment help",
    "Engineering assignment help",
    "BSE assignment help",
    
    // Location-Based
    "assignment help Bangladesh",
    "assignment help UK",
    "assignment help Australia",
    "assignment help USA",
    "assignment help Canada",
    "assignment help Austria",
    "assignment help London",
    "assignment help Sydney",
    "assignment help Dhaka",
    
    // Academic Levels
    "undergraduate assignment help",
    "graduate assignment help",
    "PhD assignment help",
    "university assignment help",
    "college assignment help",
    "student assignment help",
    
    // Features & Benefits
    "plagiarism free assignments",
    "original assignment writing",
    "expert assignment writers",
    "professional assignment help",
    "affordable assignment help",
    "24/7 assignment help",
    "on-time delivery",
    "revision service",
    "three revisions",
    
    // Brand
    "BDJHelper",
    "BDJHelper assignment help",
    "BDJHelper reviews",
  ],
  authors: [{ name: "BDJHelper Team" }],
  creator: "BDJHelper",
  publisher: "BDJHelper",
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
  openGraph: {
    title: "BDJHelper - Expert Assignment Help, Dissertation & Research Paper Writing Service",
    description:
      "Get professional assignment help, dissertation writing, research papers, proposals, posters, and reports. Free Turnitin AI & similarity reports. 15+ expert writers. 1400+ satisfied students. Operating in Bangladesh, UK, Australia, USA, Canada, and Austria.",
    url: "https://BDJHelper.com",
    siteName: "BDJHelper",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BDJHelper - Assignment Help & Academic Writing Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BDJHelper - Assignment Help, Dissertation & Research Paper Service",
    description:
      "Expert assignment help, dissertation writing, research papers, proposals, and posters. Free Turnitin reports. 15+ expert writers. 1400+ satisfied students.",
    images: ["/og-image.jpg"],
    creator: "@BDJHelper",
  },
  alternates: {
    canonical: "https://BDJHelper.com",
  },
  category: "Education",
  classification: "Academic Writing Service",
  other: {
    "application-name": "BDJHelper",
    "apple-mobile-web-app-title": "BDJHelper",
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    "theme-color": "#21616A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://BDJHelper.com/#organization",
              name: "BDJHelper",
              alternateName: "BDJHelper Assignment Helper",
              description:
                "Professional academic writing service providing assignment help, dissertation writing, research papers, proposals, posters, case studies, and reports. Free Turnitin AI & similarity reports included.",
              url: "https://BDJHelper.com",
              logo: "https://BDJHelper.com/logo.png",
              image: "https://BDJHelper.com/og-image.jpg",
              foundingDate: "2020",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: "15+",
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Bangladesh",
                },
                {
                  "@type": "Country",
                  name: "United Kingdom",
                },
                {
                  "@type": "Country",
                  name: "Australia",
                },
                {
                  "@type": "Country",
                  name: "United States",
                },
                {
                  "@type": "Country",
                  name: "Canada",
                },
                {
                  "@type": "Country",
                  name: "Austria",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: ["English"],
              },
              sameAs: [],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1400",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* Service Schema - Assignment Help */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://BDJHelper.com/#assignment-help-service",
              serviceType: "Assignment Writing Service",
              name: "Assignment Help Service",
              description:
                "Professional assignment writing and completion service for university and college students across all academic disciplines including CSE, BBA, BSS, MSS, BA, MA, MSC, and BSE.",
              provider: {
                "@id": "https://BDJHelper.com/#organization",
              },
              areaServed: [
                "Bangladesh",
                "United Kingdom",
                "Australia",
                "United States",
                "Canada",
                "Austria",
              ],
              offers: {
                "@type": "Offer",
                description: "Assignment writing service with free Turnitin AI & similarity reports, 3 revisions included, and 24/7 support.",
              },
            }),
          }}
        />

        {/* Service Schema - Dissertation Help */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://BDJHelper.com/#dissertation-help-service",
              serviceType: "Dissertation Writing Service",
              name: "Dissertation & Thesis Writing Service",
              description:
                "Expert dissertation and thesis writing assistance for undergraduate, graduate, and PhD students. Comprehensive research, writing, and formatting support.",
              provider: {
                "@id": "https://BDJHelper.com/#organization",
              },
              areaServed: [
                "Bangladesh",
                "United Kingdom",
                "Australia",
                "United States",
                "Canada",
                "Austria",
              ],
            }),
          }}
        />

        {/* Service Schema - Research Paper */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://BDJHelper.com/#research-paper-service",
              serviceType: "Research Paper Writing Service",
              name: "Research Paper Writing Service",
              description:
                "Academic research paper writing service with in-depth research, proper citations, and academic formatting. Includes free Turnitin similarity reports.",
              provider: {
                "@id": "https://BDJHelper.com/#organization",
              },
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What services does BDJHelper offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "BDJHelper offers comprehensive academic writing services including assignment help, dissertation writing, research papers, proposals, posters, case studies, reports, essays, and proofreading services. We also provide free Turnitin AI & similarity reports with all orders.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you provide Turnitin reports?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, BDJHelper provides free Turnitin AI & similarity reports with all assignments upon request. This helps ensure your work is original and plagiarism-free.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many revisions are included?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "BDJHelper includes up to three revisions with every order to ensure your complete satisfaction with the final work.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which countries do you serve?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "BDJHelper operates in Bangladesh, UK, Australia, USA, Canada, and Austria, serving students worldwide.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What subjects do you cover?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We cover all major academic fields including CSE (Computer Science), BBA (Business Administration), BSS/MSS (Social Sciences), BA/MA (Arts), MSC (Master of Science), BSE (Engineering), and many more.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the content plagiarism-free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all work provided by BDJHelper is 100% original and plagiarism-free. We provide free Turnitin similarity reports to verify originality.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I contact BDJHelper?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can contact BDJHelper via WhatsApp at 01896094070 or 01857290212. We offer 24/7 customer support.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://BDJHelper.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: "https://BDJHelper.com#services",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "About Us",
                  item: "https://BDJHelper.com#about",
                },
              ],
            }),
          }}
        />

        {/* Review Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              itemReviewed: {
                "@type": "Service",
                name: "BDJHelper Assignment Help Service",
              },
              author: {
                "@type": "Organization",
                name: "BDJHelper",
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: "4.9",
                bestRating: "5",
                worstRating: "1",
              },
              reviewBody:
                "BDJHelper has helped over 1400+ students with their academic assignments, dissertations, and research papers. With 15+ expert writers and a 98% success rate, we provide quality academic writing services with free Turnitin reports and three revisions included.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
