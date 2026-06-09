const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let gaInitialized = false;

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || gaInitialized) return;
  gaInitialized = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });
}

export function trackEvent(eventName, params = {}) {
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, params);
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// Convenience wrappers for common events
export const analytics = {
  // Navigation
  navClick: (link) => trackEvent('nav_click', { link_target: link }),
  mobileMenuOpen: () => trackEvent('mobile_menu_open'),
  mobileMenuCta: () => trackEvent('mobile_menu_cta_click'),

  // Hero
  heroCta: (button) => trackEvent('hero_cta_click', { button }),

  // Pricing
  pricingSectionView: () => trackEvent('pricing_section_view'),
  pricingTierView: (tier) => trackEvent('pricing_tier_view', { tier }),
  pricingFormSubmit: (tier, hasRole) =>
    trackEvent('pricing_form_submit', { tier, has_role: hasRole }),
  waitlistSuccess: () => trackEvent('waitlist_signup_success'),
  checkoutRedirect: (tier, price) =>
    trackEvent('checkout_redirect', { tier, price }),
  paymentSuccess: (tier) => trackEvent('payment_success', { tier }),

  // Social / footer
  whatsappClick: (group) => trackEvent('whatsapp_click', { group }),
  emailClick: (location) => trackEvent('email_click', { location }),
  linkedinClick: () => trackEvent('linkedin_click'),

  // Scroll depth
  scrollDepth: (percent) => trackEvent('scroll_depth', { percent }),
};
