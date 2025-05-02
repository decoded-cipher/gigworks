import "./globals.css";
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google'; 

export const metadata: Metadata = {
    metadataBase: new URL('https://gigwork.co.in'),
    title: 'GigWork - Find Verified Professionals & Skilled Service Providers',
    description: 'GigWork is a trusted directory platform that helps you discover verified professionals and skilled service providers across various fields. Easily find and connect with the right expert for your task — anytime, anywhere.',
    keywords: 'Gigwork, WhatsApp business, Kerala business, customer communication, business growth, digital transformation, service providers, plumbers',
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://gigwork.co.in',
        siteName: 'Gigwork',
        title: 'GigWork - Find Verified Professionals & Skilled Service Providers',
        description: 'Transform your business with WhatsApp integration. Connect with customers seamlessly on India\'s growing business platform.',
        images: [
            {
                url: 'https://gigwork.co.in/assets/og-image.png',
                width: 1200,
                height: 630,
                alt: 'GigWork - Find Verified Professionals & Skilled Service Providers',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gigwork - WhatsApp Business Integration Platform',
        description: 'Transform your business with WhatsApp integration. Connect with customers seamlessly on India\'s growing business platform.',
        images: ['https://gigwork.co.in/assets/og-image.png'],
        creator: '@DevMorphix',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://gigwork.co.in',
        languages: {
            'en-IN': 'https://gigwork.co.in'
        },
    },
    authors: [{ name: 'DevMorphix', url: 'https://devmorphix.com' }],
    applicationName: 'Gigwork',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    creator: 'DevMorphix',
    publisher: 'Gigwork',
    category: 'Business',
    formatDetection: {
        email: false,
        address: true,
        telephone: true,
    },
    other: {
        'theme-color': '#00A651',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-title': 'Gigwork',
        'format-detection': 'telephone=no',
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>

                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />

                <meta property="og:image:url" content="https://gigwork.co.in/assets/og-image.png" />
                <meta property="og:image:secure_url" content="https://gigwork.co.in/assets/og-image.png" />
                <meta property="og:image:alt" content="Gigwork - WhatsApp Business Integration Platform" />
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "Gigwork",
                            "applicationCategory": "BusinessApplication",
                            "operatingSystem": "Web",
                            "description": "Connect, communicate, and grow your business with WhatsApp integration on Gigwork",
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "ratingCount": "1000"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "INR"
                            }
                        })
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    )
}