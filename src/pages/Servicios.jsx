import tecnologias from '../data/tecnologias.js'
import TechCard from '../components/TechCard.jsx'

function Servicios() {
  return (
    <section className="page">
      <h1>Página de Servicios</h1>
      <p>Tecnologías y habilidades que utilizamos en nuestros desarrollos.</p>

      <div className="tech-grid">
        {tecnologias.map((tec) => (
          <TechCard key={tec.id} tecnologia={tec} />
        ))}
      </div>
    </section>
  )
}

export default Servicios
