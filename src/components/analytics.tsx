"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CONSENT_KEY = "cookie-consent";

export function Analytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    if (!GTM_ID) return;
    function checkConsent() {
      setConsentGiven(localStorage.getItem(CONSENT_KEY) === "accepted");
    }
    checkConsent();
    window.addEventListener("storage", checkConsent);
    window.addEventListener("cookie-consent-update", checkConsent);
    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener("cookie-consent-update", checkConsent);
    };
  }, []);

  if (!GTM_ID || !consentGiven) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}
