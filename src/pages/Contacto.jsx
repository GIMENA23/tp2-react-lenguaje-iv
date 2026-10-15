import ContactForm from '../components/ContactForm.jsx'
import MapaContacto from '../components/MapaContacto.jsx'

function Contacto() {
  return (
    <section className="page page-contacto">
      <h1>Página de Contacto</h1>
      <p>Completá el formulario y nos pondremos en contacto con vos.</p>

      <div className="contacto-layout">
        <ContactForm />
        <MapaContacto />
      </div>
    </section>
  )
}

export default Contacto
