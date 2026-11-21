
const players = [
  {
    id: "PP-0001",
    name: "Jugador de ejemplo",
    club: "Club Demo",
    province: "Santa Fe",
    category: "Primera",
    modality: "Paleta goma",
    active: true,
  },
  {
    id: "PP-0002",
    name: "Segundo jugador",
    club: "Club Demo",
    province: "Buenos Aires",
    category: "Segunda",
    modality: "Paleta cuero",
    active: true,
  },
];

export default function PlayersPage() {
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
            Identidad deportiva, perfiles y desarrollo
            de los jugadores de pelota paleta.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>{players.length}</strong>
            <small>JUGADORES</small>
          </div>
          <div>
            <strong>
              {players.filter((player) => player.active).length}
            </strong>
            <small>ACTIVOS</small>
          </div>
          <div>
            <strong>08</strong>
            <small>CATEGORÍAS</small>
          </div>
        </div>

        <div className="section-heading">
          <span>REGISTRO DEPORTIVO</span>
          <h2>Pelotaris registrados</h2>
        </div>

        <div className="module-grid">
          {players.map((player) => (
            <article className="module-card" key={player.id}>
              <div className="card-top">
                <span>{player.id}</span>
                <span className="module-icon">🏓</span>
              </div>

              <h3>{player.name}</h3>

              <p>{player.club}</p>
              <p>{player.province}</p>
              <p>{player.category}</p>
              <p>{player.modality}</p>

              <small>
                {player.active ? "Jugador activo" : "Inactivo"}
              </small>
            </article>
          ))}
        </div>

        <div style={{ marginTop: "32px" }}>
          <a className="main-button" href="/">
            Volver al ecosistema
          </a>
        </div>
      </section>
    </main>
  );
}
