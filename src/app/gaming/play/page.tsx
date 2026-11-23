
"use client";

import Trinquete3D from "./Trinquete3D";

export default function PlayPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#101510",
        color: "white",
        padding: "24px 15px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        <p
          style={{
            color: "#b7e36b",
            letterSpacing: "3px",
            fontWeight: 700,
          }}
        >
          PALETA PRO GAMING
        </p>

        <h1 style={{ fontSize: "clamp(30px, 6vw, 48px)" }}>
          DESAFÍO TRINQUETE
        </h1>

        <p style={{ color: "#b8c2b8" }}>
          La pelota paleta entra en una nueva dimensión.
        </p>

        <Trinquete3D />

        <p
          style={{
            color: "#b7e36b",
            marginTop: 18,
            fontWeight: 700,
          }}
        >
          PROTOTIPO 3D — PRIMERA ESCENA
        </p>
      </div>
    </main>
  );
}
