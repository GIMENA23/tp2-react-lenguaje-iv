import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './ContactForm.css'

// Datos de la cuenta de EmailJS (https://www.emailjs.com).
// Reemplazar por los valores propios obtenidos en el panel de EmailJS.
const SERVICE_ID = 'service_p5sqovp'
const TEMPLATE_ID = 'template_xpdpcw6'
const PUBLIC_KEY = 'GfpKpplS7URt66spP'

const MAX_MENSAJE = 300

const valoresIniciales = { nombre: '', email: '', mensaje: '' }

// Valida un campo y devuelve el mensaje de error personalizado
// (cadena vacía si el valor es correcto).
function validarCampo(campo, valor) {
  const texto = valor.trim()

  switch (campo) {
    case 'nombre':
      if (!texto) return 'El nombre y apellido es obligatorio.'
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(texto))
        return 'El nombre solo puede contener letras y espacios.'
      if (texto.split(/\s+/).length < 2)
        return 'Ingresá tu nombre y tu apellido separados por un espacio.'
      if (texto.length < 5) return 'El nombre y apellido es demasiado corto.'
      if (texto.length > 60) return 'El nombre y apellido no puede superar los 60 caracteres.'
      return ''

    case 'email':
      if (!texto) return 'El correo electrónico es obligatorio.'
      if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(texto))
        return 'Ingresá un correo válido, por ejemplo: nombre@dominio.com'
      return ''

    case 'mensaje':
      if (!texto) return 'El mensaje es obligatorio.'
      if (texto.length < 10) return 'El mensaje debe tener al menos 10 caracteres.'
      if (valor.length > MAX_MENSAJE)
        return `El mensaje no puede superar los ${MAX_MENSAJE} caracteres.`
      return ''

    default:
      return ''
  }
}

function ContactForm() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [estado, setEstado] = useState(null) // { tipo: 'ok' | 'error', texto }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValores({ ...valores, [name]: value })
    // Si el campo ya fue tocado, se revalida mientras se escribe
    if (tocados[name]) {
      setErrores({ ...errores, [name]: validarCampo(name, value) })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTocados({ ...tocados, [name]: true })
    setErrores({ ...errores, [name]: validarCampo(name, value) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstado(null)

    // Validación de todos los campos antes de enviar
    const nuevosErrores = {}
    Object.keys(valores).forEach((campo) => {
      const error = validarCampo(campo, valores[campo])
      if (error) nuevosErrores[campo] = error
    })
    setErrores(nuevosErrores)
    setTocados({ nombre: true, email: true, mensaje: true })

    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          nombre: valores.nombre.trim(),
          email: valores.email.trim(),
          mensaje: valores.mensaje.trim(),
        },
        { publicKey: PUBLIC_KEY }
      )
      setEstado({ tipo: 'ok', texto: '¡Mensaje enviado correctamente! Te responderemos a la brevedad.' })
      setValores(valoresIniciales)
      setTocados({})
      setErrores({})
    } catch (err) {
      console.error('Error al enviar con EmailJS:', err)
      setEstado({ tipo: 'error', texto: 'No se pudo enviar el mensaje. Intentá nuevamente más tarde.' })
    } finally {
      setEnviando(false)
    }
  }

  const restantes = MAX_MENSAJE - valores.mensaje.length

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className={`form-group ${errores.nombre ? 'has-error' : ''}`}>
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Ej: María Pérez"
          value={valores.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errores.nombre}
        />
        {errores.nombre && <span className="error-msg">{errores.nombre}</span>}
      </div>

      <div className={`form-group ${errores.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Ej: nombre@dominio.com"
          value={valores.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errores.email}
        />
        {errores.email && <span className="error-msg">{errores.email}</span>}
      </div>

      <div className={`form-group ${errores.mensaje ? 'has-error' : ''}`}>
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          maxLength={MAX_MENSAJE}
          placeholder="Escribí tu consulta (máximo 300 caracteres)"
          value={valores.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errores.mensaje}
        />
        <div className="form-footer-line">
          {errores.mensaje ? <span className="error-msg">{errores.mensaje}</span> : <span />}
          <span className={`contador ${restantes <= 20 ? 'contador-alerta' : ''}`}>
            {valores.mensaje.length}/{MAX_MENSAJE}
          </span>
        </div>
      </div>

      <button type="submit" className="btn-enviar" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {estado && <p className={`estado estado-${estado.tipo}`}>{estado.texto}</p>}
    </form>
  )
}

export default ContactForm
