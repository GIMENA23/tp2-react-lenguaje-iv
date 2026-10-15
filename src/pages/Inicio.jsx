import { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard.jsx'

// Se consume la API pública y gratuita de GitHub (no requiere API key)
// para traer los repositorios de JavaScript más populares del momento.
// Documentación: https://docs.github.com/en/rest/search/search
const API_URL =
  'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=6'

function Inicio() {
  const [repos, setRepos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function obtenerRepos() {
      try {
        const respuesta = await fetch(API_URL)

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al consultar la API`)
        }

        const datos = await respuesta.json()
        setRepos(datos.items || [])
      } catch (err) {
        console.error('Error al obtener los repositorios:', err)
        setError('No se pudieron cargar los datos en este momento. Intentá más tarde.')
      } finally {
        setCargando(false)
      }
    }

    obtenerRepos()
  }, [])

  return (
    <section className="page">
      <h1>Página de Inicio</h1>
      <p>Repositorios de JavaScript más populares en este momento (datos obtenidos desde la API de GitHub).</p>

      {cargando && <p className="estado-carga">Cargando repositorios…</p>}
      {error && <p className="estado-error">{error}</p>}

      {!cargando && !error && (
        <div className="repo-grid">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Inicio
