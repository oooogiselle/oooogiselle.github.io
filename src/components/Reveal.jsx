// src/components/Reveal.jsx
// The site's one entrance primitive: fade + rise, once, when the element first
// scrolls into view.
//
// Deliberately not scroll-linked. Scroll-linked transforms need measured pixel
// ranges, and those go stale the moment an image loads, a font swaps, or a
// filtered grid changes height — which is exactly what used to happen here.
//
// The transition itself lives in CSS (.reveal / .reveal.is-visible), so
// prefers-reduced-motion is handled by the stylesheet and this file stays
// dependency-free.
import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer (or no JS reaching this) must never mean invisible content.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      // threshold 0 + a bottom inset fires as soon as the element crosses
      // slightly into view — and unlike a ratio, it still works for elements
      // taller than the viewport (the About column on a phone).
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", shown && "is-visible", className]
        .filter(Boolean)
        .join(" ")}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
    >
      {children}
    </Tag>
  );
}
