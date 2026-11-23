
"use client";

import Link from "next/link";

const experiences = [
  {
    number: "01",
    icon: "🎮",
    title: "Paleta Virtual",
    description:
      "Experiencias digitales inspiradas en la pelota paleta.",
    status: "EN DESARROLLO",
  },
  {
    number: "02",
    icon: "🏆",
    title: "Torneos Gaming",
    description:
      "Competencias virtuales entre jugadores y comunidades.",
    status: "PRÓXIMAMENTE",
  },
  {
    number: "03",
    icon: "📊",
    title: "Ranking Digital",
    description:
      "Clasificaciones y rendimiento dentro del entorno virtual.",
    status: "PRÓXIMAMENTE",
  },
  {
    number: "04",
    icon: "🕹️",
    title: "Desafíos",
    description:
      "Retos, participación y nuevas formas de competir.",
    status: "VISIÓN FUTURA",
  },
];

export default function GamingPage() {
  return (
    <main className="page">
      <section className="ecosystem">
        <div
          style={{
            padding: "45px 25px",
            borderRadius: "18px",
            border: "1px solid #35452a",
            background:
              "linear-gradient(135deg, #172018, #101010 75%)",
            marginBottom: "45px",
          }}
        >
          <span
            style={{
              color: "#b7e36b",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            PALETA PRO / GAMING
          </span>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 65px)",
              lineHeight: 1.05,
              margin: "22px 0",
            }}
          >
            La cancha
            <br />
            <span style={{ color: "#b7e36b" }}>
              también es digital.
            </span>
          </h1>

          <p style={{ maxWidth: "600px", lineHeight: 1.8 }}>
            Un nuevo territorio para la pelota paleta.
            Tecnología, videojuegos, desafíos y
            competencias digitales conectadas con
            la cultura del deporte.
          </p>

          <div
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "10px 16px",
              border: "1px solid #536b35",
              borderRadius: "8px",
              color: "#b7e36b",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            ● PROYECTO EN DESARROLLO
          </div>
        </div>

        <div className="section-heading">
          <span>EL UNIVERSO GAMING</span>
          <h2>Nuevas formas de jugar.</h2>
          <p>
            Cuatro líneas de desarrollo para
            expandir la pelota paleta al mundo digital.
          </p>
        </div>

        <div className="module-grid">
          {experiences.map((item) => (
            <article className="module-card" key={item.number}>
              <div className="card-top">
                <span>{item.number}</span>
                <span className="module-icon">{item.icon}</span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <small>{item.status}</small>
            </article>
          ))}
        </div>

        <div
          className="module-card"
          style={{ marginTop: "35px" }}
        >
          <span className="nav-label">
            VISIÓN DE FUTURO
          </span>

          <h2 style={{ marginTop: "15px" }}>
            Del deporte tradicional al universo digital.
          </h2>

          <p>
            PALETA PRO busca conectar generaciones,
            abrir nuevas audiencias y llevar la
            identidad de la pelota paleta a nuevas
            experiencias tecnológicas.
          </p>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link
            href="/dashboard"
            className="main-button"
            style={{ textDecoration: "none" }}
          >
            ← Volver al panel central
          </Link>
        </div>
      </section>
    </main>
  );
              }
