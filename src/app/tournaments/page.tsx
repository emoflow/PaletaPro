
"use client";

import { useState } from "react";

type Tournament = {
  id: string;
  name: string;
  modality: string;
  category: string;
  city: string;
  province: string;
  startDate: string;
  status: "Próximo" | "En curso" | "Finalizado";
};

const initialTournaments: Tournament[] = [
  {
    id: "TOR-001",
    name: "Abierto de Santa Fe",
    modality: "Paleta goma",
    category: "Primera",
    city: "Santa Fe",
    province: "Santa Fe",
    startDate: "2026-12-12",
    status: "Próximo",
  },
  {
    id: "TOR-002",
    name: "Copa Regional",
    modality: "Paleta cuero",
    category: "Segunda",
    city: "Rosario",
    province: "Santa Fe",
    startDate: "2026-11-10",
    status: "Finalizado",
  },
];

export default function TournamentsPage() {
  const [tournaments, setTournaments] =
    useState<Tournament[]>(initialTournaments);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    modality: "Paleta goma",
    category: "Primera",
    city: "",
    province: "",
    startDate: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTournament: Tournament = {
      id: `TOR-${String(tournaments.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Próximo",
    };

    setTournaments((current) => [...current, newTournament]);

    setForm({
      name: "",
      modality: "Paleta goma",
      category: "Primera",
      city: "",
      province: "",
      startDate: "",
    });

    setShowForm(false);
  }

  const filteredTournaments = tournaments.filter((tournament) =>
    `${tournament.name} ${tournament.city} ${tournament.province}`
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
          <span>PALETA PRO / TORNEOS</span>
          <h1>La competencia comienza acá.</h1>
          <p>
            Organización, calendario y seguimiento
            de torneos de pelota paleta.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>{tournaments.length}</strong>
            <small>TORNEOS</small>
          </div>
          <div>
            <strong>
              {tournaments.filter((t) => t.status === "Próximo").length}
            </strong>
            <small>PRÓXIMOS</small>
          </div>
          <div>
            <strong>
              {tournaments.filter((t) => t.status === "Finalizado").length}
            </strong>
            <small>FINALIZADOS</small>
          </div>
        </div>

        <div style={{ margin: "30px 0" }}>
          <input
            placeholder="Buscar torneo o localidad..."
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
          {showForm ? "Cerrar formulario" : "+ Crear torneo"}
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
            <h2>Nuevo torneo</h2>

            <input
              placeholder="Nombre del torneo"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              value={form.modality}
              onChange={(e) =>
                setForm({ ...form, modality: e.target.value })
              }
            >
              <option>Paleta goma</option>
              <option>Paleta cuero</option>
              <option>Trinquete</option>
              <option>Frontón</option>
            </select>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Primera</option>
              <option>Segunda</option>
              <option>Tercera</option>
              <option>Cuarta</option>
              <option>Quinta</option>
              <option>Juvenil</option>
              <option>Infantil</option>
              <option>Veteranos</option>
            </select>

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

            <label>Fecha de inicio</label>
            <input
              type="date"
              required
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
            />

            <button
              type="submit"
              className="main-button"
              style={{ cursor: "pointer", border: "none" }}
            >
              Guardar torneo
            </button>
          </form>
        )}

        <div className="section-heading" style={{ marginTop: "45px" }}>
          <span>CALENDARIO DEPORTIVO</span>
          <h2>Competencias registradas</h2>
        </div>

        <div className="module-grid">
          {filteredTournaments.map((tournament) => (
            <article className="module-card" key={tournament.id}>
              <div className="card-top">
                <span>{tournament.id}</span>
                <span className="module-icon">🏆</span>
              </div>

              <h3>{tournament.name}</h3>
              <p>{tournament.modality} · {tournament.category}</p>
              <p>{tournament.city}, {tournament.province}</p>
              <p>Fecha: {tournament.startDate}</p>
              <small>{tournament.status}</small>
            </article>
          ))}

          {filteredTournaments.length === 0 && (
            <p>No se encontraron torneos.</p>
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
