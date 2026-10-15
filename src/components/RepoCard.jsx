import './RepoCard.css'

// Componente que muestra un repositorio obtenido de la API pública de GitHub.
// Campos mostrados: nombre, descripción, lenguaje, estrellas e imagen (avatar del owner).
function RepoCard({ repo }) {
  return (
    <a
      className="repo-card"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="repo-card-header">
        <img src={repo.owner.avatar_url} alt={`Avatar de ${repo.owner.login}`} loading="lazy" />
        <h3>{repo.name}</h3>
      </div>

      <p className="repo-desc">{repo.description || 'Sin descripción disponible.'}</p>

      <div className="repo-meta">
        <span>⭐ {repo.stargazers_count.toLocaleString('es-AR')}</span>
        <span>{repo.language || 'N/D'}</span>
        <span>🍴 {repo.forks_count.toLocaleString('es-AR')}</span>
      </div>
    </a>
  )
}

export default RepoCard
