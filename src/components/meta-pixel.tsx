"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelComponent() {
  const pixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID || "7599687236717915";
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer Meta Pixel loading until the page is interactive/idle.
  useEffect(() => {
    let idleCallbackId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const loadPixel = () => setShouldLoad(true);

    if ("requestIdleCallback" in window) {
      idleCallbackId = (window as any).requestIdleCallback(loadPixel, {
        timeout: 3000,
      });
    } else {
      timeoutId = setTimeout(loadPixel, 1500);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Apply previously stored consent once Pixel bootstraps.
  useEffect(() => {
    if (!shouldLoad || typeof window === "undefined") return;

    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("gdpr-consent="));
    const hasConsent = consentCookie?.split("=")[1] === "true";

    if (window.fbq) {
      window.fbq("consent", hasConsent ? "grant" : "revoke");
    }
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
