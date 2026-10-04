import { reactive } from 'vue'

export const sesion = reactive({
  usuario: localStorage.getItem('booklistUsuario')
})

export function iniciarSesion(nombre) {
  const nombreLimpio = nombre.trim()

  if (!nombreLimpio) {
    return false
  }

  sesion.usuario =
    nombreLimpio.charAt(0).toUpperCase() +
    nombreLimpio.slice(1)

  localStorage.setItem(
    'booklistUsuario',
    sesion.usuario
  )

  return true
}

export function cerrarSesion() {
  sesion.usuario = null
  localStorage.removeItem('booklistUsuario')
}