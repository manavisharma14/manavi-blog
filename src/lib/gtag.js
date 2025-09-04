// lib/gtag.js
export const GA_TRACKING_ID = 'G-1WCE70TMP0';

// Standard pageview tracking
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};