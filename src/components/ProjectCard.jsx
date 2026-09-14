// src/components/ProjectCard.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GearIcon } from "./icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectCard({ item }) {
  const [open, setOpen] = useState(false);
  // stable identity so the modal's effect doesn't re-run (and re-lock scroll)
  // every time this card happens to re-render
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="project-card">
        <div className="thumb">
          {item.thumb ? (
            <img
              src={item.thumb}
              alt={item.title}
              /* thumbs are pre-cropped to the 16/10 box the CSS renders them in,
                 so the browser reserves exact space and nothing shifts on load */
              width="840"
              height="525"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="thumb-placeholder" aria-hidden="true">
              <span className="thumb-placeholder-label">{item.tech}</span>
            </div>
          )}
        </div>
        <div className="body">
          <div className="project-header">
            <h3 className="project-title">{item.title}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              {item.year && <span className="project-year">{item.year}</span>}
              {item.category && (
                <span className={`project-category-badge cat-${item.category.toLowerCase()}`}>
                  {item.category}
                </span>
              )}
            </div>
          </div>
          <p className="project-tech">{item.tech}</p>
          <div className="actions">
            <button
              className="project-long-description"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-controls={`proj-${item.id}-modal`}
            >
              View Project →
            </button>
            {item.github && (
              <a
                className="project-github-link"
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>

      {open && (
        <ProjectModal id={`proj-${item.id}-modal`} item={item} onClose={close} />
      )}
    </>
  );
}

function ProjectModal({ id, item, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;

    // Lock the page behind the dialog. Padding compensates for the scrollbar
    // we just removed, so the page doesn't jump sideways as the modal opens.
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // keep Tab inside the dialog
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      // send focus back to the card button that opened this
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        id={id}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3 id={`${id}-title`}>{item.title}</h3>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close project details"
            ref={closeRef}
          >
            ✕
          </button>
        </div>

        <div className="modal-meta">
          {item.year && <span>{item.year}</span>}
          {item.category && <span>• {item.category}</span>}
        </div>

        {item.description && (
          <div className="modal-desc">
            {item.description.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        )}

        {item.techLong && (
          <div className="modal-techlong">
            <GearIcon size="small" />
            <p>{item.techLong}</p>
          </div>
        )}

        {(item.github || item.paper || item.video || item.isometric) && (
          <div className="modal-actions">
            {item.github && (
              <a className="modal-btn" href={item.github} target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            )}
            {item.paper && (
              <a className="modal-btn" href={item.paper} target="_blank" rel="noopener noreferrer">
                View Paper →
              </a>
            )}
            {item.video && (
              <a className="modal-btn" href={item.video} target="_blank" rel="noopener noreferrer">
                View Video →
              </a>
            )}
            {item.isometric && (
              <a className="modal-btn" href={item.isometric} target="_blank" rel="noopener noreferrer">
                View Blueprint →
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
