
const modules = [
  {
    number: "01",
    name: "Jugadores",
    description: "Perfiles e identidad deportiva",
    icon: "🏓",
    status: "Próximamente",
  },
  {
    number: "02",
    name: "Clubes",
    description: "Instituciones y comunidad",
    icon: "🏟️",
    status: "Próximamente",
  },
  {
    number: "03",
    name: "Torneos",
    description: "Competencias y calendarios",
    icon: "🏆",
    status: "Próximamente",
  },
  {
    number: "04",
    name: "Rankings",
    description: "Clasificaciones deportivas",
    icon: "📊",
    status: "Próximamente",
  },
  {
    number: "05",
    name: "Streaming",
    description: "Partidos y transmisiones",
    icon: "📺",
    status: "En desarrollo",
  },
  {
    number: "06",
    name: "Gaming",
    description: "La paleta en el mundo virtual",
    icon: "🎮",
    status: "Visión futura",
  },
];

export default function Home() {
  return (
    <main className="page">
      <nav className="navbar">
        <a className="brand" href="#">
          PALETA<span>PRO</span>
        </a>
        <span className="nav-label">ARGENTINA · DEPORTE DIGITAL</span>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <span className="dot" />
          UN NUEVO ECOSISTEMA DEPORTIVO
        </div>

        <h1>
          La pelota paleta,
          <br />
          <span>en otra dimensión.</span>
        </h1>

        <p>
          Tradición, tecnología y pasión.
          El futuro de la pelota paleta argentina
          comienza acá.
        </p>

        <a className="main-button" href="#ecosistema">
          Explorar PaletaPro ↓
        </a>

        <div className="hero-stats">
          <div><strong>01</strong><small>DEPORTE</small></div>
          <div><strong>06</strong><small>ETAPAS</small></div>
          <div><strong>∞</strong><small>POSIBILIDADES</small></div>
        </div>
      </section>

      <section className="ecosystem" id="ecosistema">
        <div className="section-heading">
          <span>EL ECOSISTEMA</span>
          <h2>Todo el deporte conectado.</h2>
          <p>Seis áreas para transformar la experiencia de la pelota paleta.</p>
        </div>

        <div className="module-grid">
          {modules.map((item) => (
            <article className="module-card" key={item.number}>
              <div className="card-top">
                <span>{item.number}</span>
                <span className="module-icon">{item.icon}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <small>{item.status}</small>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <strong>PALETA<span>PRO</span></strong>
        <p>Tradición que se juega. Innovación que se vive.</p>
        <small>Un proyecto nacido en Argentina.</small>
      </footer>
    </main>
  );
              }
