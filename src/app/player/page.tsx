
"use client";

import { useState } from "react";

type Player = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  city: string;
  province: string;
  category: string;
  modality: string;
  active: boolean;
};

const initialPlayers: Player[] = [
  {
    id: "PP-0001",
    firstName: "Jugador",
    lastName: "Ejemplo",
    nickname: "",
    city: "Santa Fe",
    province: "Santa Fe",
    category: "Primera",
    modality: "Paleta goma",
    active: true,
  },
];

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    city: "",
    province: "",
    category: "Primera",
    modality: "Paleta goma",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPlayer: Player = {
      ...form,
      id: `PP-${String(players.length + 1).padStart(4, "0")}`,
      active: true,
    };

    setPlayers((current) => [...current, newPlayer]);

    setForm({
      firstName: "",
      lastName: "",
      nickname: "",
      city: "",
      province: "",
      category: "Primera",
      modality: "Paleta goma",
    });

    setShowForm(false);
  }

  const filteredPlayers = players.filter((player) =>
    `${player.firstName} ${player.lastName} ${player.province}`
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
          <span>PALETA PRO / JUGADORES</span>
          <h1>Comunidad de pelotaris.</h1>
          <p>
            Identidad deportiva y desarrollo de los
            jugadores de pelota paleta.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>{players.length}</strong>
            <small>JUGADORES</small>
          </div>
          <div>
            <strong>
              {players.filter((p) => p.active).length}
            </strong>
            <small>ACTIVOS</small>
          </div>
        </div>

        <div style={{ margin: "30px 0" }}>
          <input
            type="text"
            placeholder="Buscar jugador o provincia..."
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
          {showForm ? "Cerrar formulario" : "+ Registrar jugador"}
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
            <h2>Inscripción de pelotari</h2>

            <input
              placeholder="Nombre"
              required
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />

            <input
              placeholder="Apellido"
              required
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />

            <input
              placeholder="Apodo (opcional)"
              value={form.nickname}
              onChange={(e) =>
                setForm({ ...form, nickname: e.target.value })
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

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              {[
                "Primera",
                "Segunda",
                "Tercera",
                "Cuarta",
                "Quinta",
                "Juvenil",
                "Infantil",
                "Veteranos",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

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
              <option>Otra</option>
            </select>

            <button
              type="submit"
              className="main-button"
              style={{ cursor: "pointer", border: "none" }}
            >
              Guardar jugador
            </button>
          </form>
        )}

        <div className="section-heading" style={{ marginTop: "45px" }}>
          <span>BASE DE JUGADORES</span>
          <h2>Pelotaris registrados</h2>
        </div>

        <div className="module-grid">
          {filteredPlayers.map((player) => (
            <article className="module-card" key={player.id}>
              <div className="card-top">
                <span>{player.id}</span>
                <span className="module-icon">🏓</span>
              </div>

              <h3>{player.firstName} {player.lastName}</h3>
              <p>{player.nickname}</p>
              <p>{player.city}, {player.province}</p>
              <p>{player.category}</p>
              <p>{player.modality}</p>
              <small>Jugador activo</small>
            </article>
          ))}

          {filteredPlayers.length === 0 && (
            <p>No se encontraron jugadores.</p>
          )}
        </div>
      </section>
    </main>
  );
            } 
