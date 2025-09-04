// src/components/ProjectCard.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectCard({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="project-card">
        {item.thumb && (
          <div className="thumb">
            <img src={item.thumb} alt={item.title} loading="lazy" />
          </div>
        )}

        <div className="body">
          <div className="project-header">
            <h3 className="project-title">{item.title}</h3>
            {item.year && <span className="project-year">{item.year}</span>}
          </div>

          <p className="project-tech">{item.tech}</p>

          <div className="actions">
            <button
              className="project-long-description"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-controls={`proj-${item.id}-modal`}
            >
              See more
            </button>
          </div>
        </div>
      </div>

      {open && (
        <ProjectModal
          id={`proj-${item.id}-modal`}
          item={item}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function ProjectModal({ id, item, onClose }) {
  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        id={id}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3>{item.title}</h3>
          <button className="modal-close" onClick={onClose} autoFocus>
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
            <i className="fi fi-rs-settings"></i>
            <p>{item.techLong}</p>
          </div>
        )}


        {(item.github || item.paper || item.video || item.isometric) && (
          <div className="modal-actions">
            {item.github && (
              <a
                className="modal-btn"
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
            )}
            {item.paper && (
              <a
                className="modal-btn"
                href={item.paper}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Paper →
              </a>
            )}
            {item.video && (
              <a
                className="modal-btn"
                href={item.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Video →
              </a>
            )}
            {item.isometric && (
              <a
                className="modal-btn"
                href={item.isometric}
                target="_blank"
                rel="noopener noreferrer"
              >
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
