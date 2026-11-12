export function scrollToSection(href: string) {
  if (typeof window === "undefined") return;

  if (!href.startsWith("#")) {
    return;
  }

  const targetId = href.slice(1);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Release any drawer scroll-lock synchronously before scrolling
  document.body.style.overflow = "";

  if (!targetId || targetId === "home") {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "#home");
    return;
  }

  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  }
}
