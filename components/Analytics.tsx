'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GA_MEASUREMENT_ID, pageview } from '@/lib/analytics';

export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        // Check if consent is stored
        if (localStorage.getItem('cookie_consent') === 'accepted') {
            setConsentGiven(true);
        }
    }, []);

    useEffect(() => {
        if (consentGiven) {
            const url = pathname + searchParams.toString();
            pageview(url);
        }
    }, [pathname, searchParams, consentGiven]);

    if (!consentGiven) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}
