import './MapaContacto.css'

// Mapa embebido con OpenStreetMap (gratuito, no requiere API key).
// Ubicación: Universidad Católica de Salta (UCASAL), Salta, Argentina.
const BBOX = '-65.4217,-24.8183,-65.4017,-24.7983'
const MARKER = '-24.8083,-65.4117'

function MapaContacto() {
  return (
    <div className="mapa-contacto">
      <iframe
        title="Ubicación en el mapa"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${MARKER}`}
        loading="lazy"
      />
    </div>
  )
}

export default MapaContacto
