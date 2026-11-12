import { siteConfig } from "./site-config";

export type WhatsAppInquiryType =
  | "general"
  | "service"
  | "deal"
  | "package"
  | "location";

export interface WhatsAppInquiryOptions {
  type?: WhatsAppInquiryType;
  name?: string;
  price?: string | number;
}

export function getWhatsAppMessage(
  options: WhatsAppInquiryOptions = {}
): string {
  const { type = "general", name, price } = options;

  if (type === "deal" && name && price !== undefined) {
    return `Hi Walk N Trim! I would like to book an appointment for ${name} priced at Rs. ${price}. Please let me know the available timings.`;
  }

  if (type === "package" && name && price !== undefined) {
    return `Hi Walk N Trim! I am interested in the ${name} priced at Rs. ${price}. Please share the available dates and booking details.`;
  }

  if (type === "service" && name) {
    return `Hi Walk N Trim! I would like to book an appointment for ${name}. Please share the available timings.`;
  }

  if (type === "location") {
    return "Hi Walk N Trim! I would like to know your exact directions and today's opening hours.";
  }

  return "Hi Walk N Trim! I would like to book an appointment. Please share the available timings.";
}

export function getWhatsAppUrl(options: WhatsAppInquiryOptions = {}): string {
  const number = siteConfig.contact.whatsappNumber;
  const text = encodeURIComponent(getWhatsAppMessage(options));
  return `https://wa.me/${number}?text=${text}`;
}

export type AnalyticsEventName =
  | "whatsapp_click"
  | "deal_booking_click"
  | "package_booking_click"
  | "service_booking_click"
  | "directions_click"
  | "phone_click"
  | "instagram_click"
  | "facebook_click";

/**
 * Optional conversion tracking hook.
 * Only dispatches when analytics tracking is explicitly configured in environment variables.
 */
export function trackConversionEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string>
): void {
  if (!siteConfig.analytics.enabled || typeof window === "undefined") {
    return;
  }
  const win = window as Window & {
    gtag?: (
      command: string,
      name: string,
      eventParams?: Record<string, string>
    ) => void;
  };
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  }
}
