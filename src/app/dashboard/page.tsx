
"use client";

import Link from "next/link";

const modules = [
  {
    number: "01",
    name: "Jugadores",
    description: "Perfiles e identidad deportiva",
    icon: "🏓",
    path: "/players",
  },
  {
    number: "02",
    name: "Clubes",
    description: "Instituciones y comunidad",
    icon: "🏟️",
    path: "/clubs",
  },
  {
    number: "03",
    name: "Torneos",
    description: "Competencias y calendarios",
    icon: "🏆",
    path: "/tournaments",
  },
  {
    number: "04",
    name: "Rankings",
    description: "Clasificaciones deportivas",
    icon: "📊",
    path: "/rankings",
  },
];

const indicators = [
  { label: "MÓDULOS PRINCIPALES", value: "04", icon: "◈" },
  { label: "ECOSISTEMA", value: "ACTIVO", icon: "●" },
  { label: "PROYECCIÓN", value: "NACIONAL", icon: "↗" },
];

export default function DashboardPage() {
  return (
    <main className="page">
      <nav className="navbar">
        <Link href="/" className="brand">
          PALETA<span>PRO</span>
        </Link>

        <span className="nav-label">
          CENTRO DE CONTROL
        </span>
      </nav>

      <section className="ecosystem">

        <div className="section-heading">
          <span>PALETA PRO / DASHBOARD</span>
          <h1>El deporte, conectado.</h1>
          <p>
            Bienvenido al centro de gestión del
            ecosistema digital de pelota paleta.
          </p>
        </div>

        <div className="hero-stats">
          {indicators.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <small>{item.label}</small>
            </div>
          ))}
        </div>

        <div className="section-heading" style={{ marginTop: "55px" }}>
          <span>ADMINISTRACIÓN</span>
          <h2>Explorar módulos</h2>
          <p>
            Seleccioná un área para ingresar a su
            espacio de gestión.
          </p>
        </div>

        <div className="module-grid">
          {modules.map((item) => (
            <Link
              href={item.path}
              key={item.number}
              className="module-card"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div className="card-top">
                <span>{item.number}</span>
                <span className="module-icon">{item.icon}</span>
              </div>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <small>INGRESAR AL MÓDULO →</small>
            </Link>
          ))}
        </div>

        <div
          className="module-card"
          style={{ marginTop: "35px" }}
        >
          <span className="nav-label">
            VISIÓN PALETA PRO
          </span>

          <h2 style={{ marginTop: "15px" }}>
            Una nueva dimensión deportiva.
          </h2>

          <p>
            Conectar jugadores, clubes, competencias
            y resultados en una única plataforma.
          </p>

          <p style={{ marginTop: "20px", opacity: 0.6 }}>
            Tradición que se juega. Innovación que se vive.
          </p>
        </div>

      </section>

      <footer>
        <strong>PALETA<span>PRO</span></strong>
        <p>Centro de gestión deportiva</p>
        <small>Proyecto digital argentino</small>
      </footer>
    </main>
  );
      }
