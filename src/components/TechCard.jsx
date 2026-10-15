import './TechCard.css'

// Componente que recibe un objeto del array local de tecnologías (src/data/tecnologias.js)
// y lo muestra como una card.
function TechCard({ tecnologia }) {
  const { nombre, categoria, nivel, descripcion, imagen } = tecnologia

  return (
    <article className="tech-card">
      <img src={imagen} alt={`Logo de ${nombre}`} loading="lazy" />
      <span className="tech-categoria">{categoria}</span>
      <h3>{nombre}</h3>
      <span className="tech-nivel">Nivel: {nivel}</span>
      <p>{descripcion}</p>
    </article>
  )
}

export default TechCard
