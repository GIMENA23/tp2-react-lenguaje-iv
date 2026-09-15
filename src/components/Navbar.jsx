import { NavLink } from 'react-router-dom'
import './Navbar.css'

// Componente de navegación reutilizable, usado en App.jsx
// para moverse entre las 3 páginas del sitio.
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mi Sitio</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/servicios" className={({ isActive }) => (isActive ? 'active' : '')}>
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
