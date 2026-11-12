interface IconProps {
  className?: string;
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.031 2C6.51 2 2.016 6.494 2.016 12.016c0 1.768.462 3.495 1.341 5.016L2 22l5.106-1.339a9.978 9.978 0 0 0 4.925 1.298h.004c5.52 0 10.015-4.494 10.015-10.015C22.05 6.494 17.551 2 12.031 2Zm5.829 14.242c-.248.698-1.454 1.335-2.018 1.416-.515.075-1.168.106-1.884-.122-.434-.138-.991-.322-1.703-.629-2.996-1.294-4.953-4.316-5.103-4.516-.15-.2-1.219-1.622-1.219-3.095 0-1.473.77-2.196 1.044-2.495.274-.299.598-.374.797-.374.2 0 .399.002.573.01.184.009.431-.07.674.514.249.6.847 2.072.922 2.222.075.15.125.324.025.524-.1.2-.15.324-.299.499-.15.174-.315.39-.449.524-.15.15-.306.312-.131.611.174.299.776 1.281 1.667 2.075 1.145 1.021 2.111 1.338 2.41 1.487.299.15.474.125.649-.075.175-.2.748-.873.947-1.172.2-.299.399-.249.673-.15.274.1 1.745.823 2.044.972.299.15.498.224.573.349.075.125.075.723-.173 1.421Z" />
    </svg>
  );
}
