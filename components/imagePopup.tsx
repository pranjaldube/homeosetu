'use client';

import { useEffect, useRef, useState } from 'react';

export default function ImagePopup() {
  const hasShownRef = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!hasShownRef.current) {
      setOpen(true);
      hasShownRef.current = true;
    }
  }, []);

  if (!open) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <button
            className="popup-close"
            onClick={() => setOpen(false)}
            aria-label="Close popup"
          >
            ✕
          </button>

          <img
            src="/discountPopup.jpeg"
            alt="Popup"
            className="popup-image"
          />
        </div>
      </div>

      {/* CSS IN SAME FILE */}
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in-out;
        }

        .popup-container {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          max-width: 420px;
          width: 92%;
          padding: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: scaleIn 0.3s ease-in-out;
        }

        .popup-image {
          width: 100%;
          height: auto;
          border-radius: 12px;
          display: block;
        }

        .popup-close {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.65);
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .popup-close:hover {
          background: rgba(0, 0, 0, 0.85);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.92);
          }
          to {
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          .popup-container {
            max-width: 95%;
            border-radius: 12px;
          }
        }
      `}</style>
    </>
  );
}
