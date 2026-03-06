"use client";

import { useRouter } from "next/navigation";

export default function AccessPage() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "380px",
          padding: "2.2rem",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          textAlign: "center",
          animation: "popIn 0.25s ease-out",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          Access Required
        </h2>
        <p
          style={{ fontSize: "0.95rem", color: "#666", marginBottom: "1.5rem" }}
        >
          Your Subscription is ended. Please purchase to continue
        </p>

        <button
          style={{
            width: "100%",
            padding: "0.8rem",
            borderRadius: "10px",
            border: "none",
            background: "#6366f1",
            color: "white",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#4f46e5")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#6366f1")}
          onClick={() => router.push("/checkout?type=kent-access")}
        >
          Pay for access
        </button>
      </div>

      {/* Inline keyframes animation */}
      <style>
        {`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
