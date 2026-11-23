
"use client";

import { useState } from "react";

type Club = {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  active: boolean;
};

const initialClubs: Club[] = [
  {
    id: "CL-0001",
    name: "Club Ejemplo",
    city: "Santa Fe",
    province: "Santa Fe",
    address: "Dirección de demostración",
    active: true,
  },
  {
    id: "CL-0002",
    name: "Institución Deportiva Demo",
    city: "Rosario",
    province: "Santa Fe",
    address: "Dirección de demostración",
    active: true,
  },
];

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    city: "",
    province: "",
    address: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newClub: Club = {
      id: `CL-${String(clubs.length + 1).padStart(4, "0")}`,
      ...form,
      active: true,
    };

    setClubs((current) => [...current, newClub]);

    setForm({
      name: "",
      city: "",
      province: "",
      address: "",
    });

    setShowForm(false);
  }

  const filteredClubs = clubs.filter((club) =>
    `${club.name} ${club.city} ${club.province}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <nav className="navbar">
        <a className="brand" href="/">
          PALETA<span>PRO</span>
        </a>
        <a href="/" className="nav-label">
          VOLVER AL INICIO
        </a>
      </nav>

      <section className="ecosystem">
        <div className="section-heading">
          <span>PALETA PRO / CLUBES</span>
          <h1>Instituciones conectadas.</h1>
          <p>
            Una red digital para clubes, instituciones
            y comunidades de pelota paleta.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>{clubs.length}</strong>
            <small>CLUBES</small>
          </div>
          <div>
            <strong>
              {clubs.filter((club) => club.active).length}
            </strong>
            <small>ACTIVOS</small>
          </div>
        </div>

        <div style={{ margin: "30px 0" }}>
          <input
            type="text"
            placeholder="Buscar club, ciudad o provincia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#151515",
              color: "white",
            }}
          />
        </div>

        <button
          className="main-button"
          onClick={() => setShowForm(!showForm)}
          style={{ cursor: "pointer", border: "none" }}
        >
          {showForm ? "Cerrar formulario" : "+ Registrar club"}
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "14px",
              marginTop: "25px",
              padding: "22px",
              border: "1px solid #444",
              borderRadius: "14px",
            }}
          >
            <h2>Registro de institución</h2>

            <input
              placeholder="Nombre del club"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Ciudad"
              required
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <input
              placeholder="Provincia"
              required
              value={form.province}
              onChange={(e) =>
                setForm({ ...form, province: e.target.value })
              }
            />

            <input
              placeholder="Dirección (opcional)"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <button
              type="submit"
              className="main-button"
              style={{ cursor: "pointer", border: "none" }}
            >
              Guardar club
            </button>
          </form>
        )}

        <div className="section-heading" style={{ marginTop: "45px" }}>
          <span>RED INSTITUCIONAL</span>
          <h2>Clubes registrados</h2>
        </div>

        <div className="module-grid">
          {filteredClubs.map((club) => (
            <article className="module-card" key={club.id}>
              <div className="card-top">
                <span>{club.id}</span>
                <span className="module-icon">🏟️</span>
              </div>

              <h3>{club.name}</h3>
              <p>{club.city}, {club.province}</p>
              <p>{club.address}</p>
              <small>
                {club.active ? "Institución activa" : "Inactiva"}
              </small>
            </article>
          ))}

          {filteredClubs.length === 0 && (
            <p>No se encontraron clubes.</p>
          )}
        </div>

        <p style={{ marginTop: "25px", opacity: 0.6 }}>
          Datos de demostración. Los registros todavía
          no se guardan permanentemente.
        </p>
      </section>
    </main>
  );
              }
