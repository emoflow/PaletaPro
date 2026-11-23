
"use client";

import { useState } from "react";

type RankingPlayer = {
  id: string;
  name: string;
  club: string;
  city: string;
  category: string;
  points: number;
  wins: number;
  losses: number;
};

const initialRanking: RankingPlayer[] = [
  {
    id: "RP-001",
    name: "Jugador Ejemplo 1",
    club: "Club Ejemplo",
    city: "Santa Fe",
    category: "Primera",
    points: 1250,
    wins: 18,
    losses: 3,
  },
  {
    id: "RP-002",
    name: "Jugador Ejemplo 2",
    club: "Club Demo",
    city: "Rosario",
    category: "Primera",
    points: 1120,
    wins: 15,
    losses: 5,
  },
  {
    id: "RP-003",
    name: "Jugador Ejemplo 3",
    club: "Club Regional",
    city: "Paraná",
    category: "Primera",
    points: 980,
    wins: 12,
    losses: 7,
  },
  {
    id: "RP-004",
    name: "Jugador Ejemplo 4",
    club: "Club Ejemplo",
    city: "Santa Fe",
    category: "Segunda",
    points: 850,
    wins: 11,
    losses: 8,
  },
  {
    id: "RP-005",
    name: "Jugador Ejemplo 5",
    club: "Club Demo",
    city: "Rosario",
    category: "Segunda",
    points: 720,
    wins: 9,
    losses: 9,
  },
];

export default function RankingsPage() {
  const [ranking] = useState<RankingPlayer[]>(initialRanking);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredRanking = ranking
    .filter((player) => {
      const matchesSearch =
        `${player.name} ${player.club} ${player.city}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "Todas" || player.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => b.points - a.points);

  const categories = [
    "Todas",
    "Primera",
    "Segunda",
    "Tercera",
    "Cuarta",
    "Quinta",
    "Juvenil",
    "Infantil",
    "Veteranos",
  ];

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
          <span>PALETA PRO / RANKINGS</span>
          <h1>El lugar se gana en la cancha.</h1>
          <p>
            Seguimiento del rendimiento y clasificación
            competitiva de los pelotaris.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>{ranking.length}</strong>
            <small>JUGADORES</small>
          </div>
          <div>
            <strong>{ranking[0].points}</strong>
            <small>PUNTAJE LÍDER</small>
          </div>
          <div>
            <strong>
              {ranking.reduce((total, p) => total + p.wins, 0)}
            </strong>
            <small>VICTORIAS</small>
          </div>
        </div>

        <div style={{ margin: "30px 0", display: "grid", gap: "14px" }}>
          <input
            placeholder="Buscar jugador, club o ciudad..."
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

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#151515",
              color: "white",
            }}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="section-heading">
          <span>CLASIFICACIÓN OFICIAL</span>
          <h2>Ranking de pelotaris</h2>
        </div>

        <div className="module-grid">
          {filteredRanking.map((player, index) => (
            <article className="module-card" key={player.id}>
              <div className="card-top">
                <span>POSICIÓN #{index + 1}</span>
                <span className="module-icon">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏓"}
                </span>
              </div>

              <h3>{player.name}</h3>
              <p>{player.club}</p>
              <p>{player.city}</p>
              <p>Categoría: {player.category}</p>

              <div style={{ marginTop: "15px" }}>
                <strong style={{ fontSize: "25px" }}>
                  {player.points.toLocaleString("es-AR")}
                </strong>
                <small style={{ display: "block" }}>PUNTOS</small>
              </div>

              <p style={{ marginTop: "12px" }}>
                Victorias: {player.wins} · Derrotas: {player.losses}
              </p>
            </article>
          ))}

          {filteredRanking.length === 0 && (
            <p>No se encontraron jugadores.</p>
          )}
        </div>

        <p style={{ marginTop: "25px", opacity: 0.6 }}>
          Ranking de demostración. Los puntajes no representan
          resultados oficiales ni están conectados todavía
          a los torneos.
        </p>
      </section>
    </main>
  );
}
