
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { iniciarSesion } from '@/data/sesion'

const nombre = ref('')
const error = ref('')

const router = useRouter()
const route = useRoute()

function ingresar() {
  if (!iniciarSesion(nombre.value)) {
    error.value = 'Escribe tu nombre para continuar.'
    return
  }

  error.value = ''

  // Si venías de una ruta protegida, vuelve a ella.
  // Si ingresaste normalmente, abre Inicio.
  const destino = route.query.redirect

  router.push(
    typeof destino === 'string' &&
    destino.startsWith('/') &&
    !destino.startsWith('//')
      ? destino
      : { name: 'inicio' }
  )
}
</script>

<template>
  <main class="login">

    <!-- PANEL IZQUIERDO -->

    <section class="login__presentacion">

      <div class="marca-login">
        <div class="logo-libro-login" aria-hidden="true">
          <span class="pagina-login pagina-login--izquierda"></span>
          <span class="pagina-login pagina-login--derecha"></span>
        </div>

        <span class="marca-login__nombre">
          BookList
        </span>
      </div>

      <div class="presentacion__contenido">
        <p class="eyebrow">
          TU BIBLIOTECA PERSONAL
        </p>

        <h1>
          Tus historias,<br>
          siempre contigo.
        </h1>

        <p class="descripcion">
          Organiza tus libros, consulta tu colección y descubre
          fácilmente tu próxima lectura.
        </p>

        <div class="beneficios">
          <span>Organiza</span>
          <span>Consulta</span>
          <span>Descubre</span>
        </div>
      </div>

      <p class="frase">
        Cada libro guarda una historia.
      </p>

    </section>

    <!-- PANEL DERECHO -->

    <section class="login__acceso">
      <div class="tarjeta">

        <p class="eyebrow eyebrow--form">
          ACCESO
        </p>

        <h2>
          Bienvenida a BookList
        </h2>

        <p class="tarjeta__descripcion">
          Ingresa tu nombre para acceder a tu biblioteca.
        </p>

        <form @submit.prevent="ingresar">
          <div class="campo">
            <label for="nombre">
              Nombre
            </label>

            <input
              id="nombre"
              v-model="nombre"
              type="text"
              placeholder="Ej: Alejandra"
              autocomplete="name"
            >
          </div>

          <p
            v-if="error"
            class="error"
            role="alert"
          >
            {{ error }}
          </p>

          <button
            type="submit"
            class="boton-ingresar"
          >
            Ingresar a BookList
            <span>→</span>
          </button>
        </form>

        <p class="mensaje">
          Acceso a tu biblioteca personal
        </p>

        <div class="separador"></div>

        <RouterLink
          to="/"
          class="volver"
        >
          ← Volver al inicio
        </RouterLink>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* =========================================
   LOGIN
   ========================================= */

.login {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--marfil);
}

/* PANEL IZQUIERDO */

.login__presentacion {
  min-height: 100vh;
  padding: 55px 6vw 42px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    145deg,
    #8b6071 0%,
    #a87582 55%,
    #b98b91 100%
  );
  color: #fffaf4;
}

/* LOGO */

.marca-login {
  display: flex;
  align-items: center;
  gap: 13px;
  color: #fffaf4;
}

.marca-login__nombre {
  color: #fffaf4;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.logo-libro-login {
  position: relative;
  width: 45px;
  height: 35px;
  flex-shrink: 0;
}

.pagina-login {
  position: absolute;
  top: 2px;
  width: 21px;
  height: 29px;
  background: #fffaf4;
  border-radius: 5px 5px 2px 2px;
}

.pagina-login--izquierda {
  left: 0;
  transform: skewY(6deg);
}

.pagina-login--derecha {
  right: 0;
  transform: skewY(-6deg);
}

.logo-libro-login::before {
  content: '';
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 0;
  height: 5px;
  background: #d97c5d;
  border-radius: 0 0 5px 5px;
}

.logo-libro-login::after {
  content: '';
  position: absolute;
  z-index: 2;
  left: 21px;
  top: 4px;
  width: 3px;
  height: 27px;
  background: #d97c5d;
  border-radius: 4px;
}

/* CONTENIDO IZQUIERDO */

.presentacion__contenido {
  width: 100%;
  max-width: 580px;
  margin: auto 0;
}

.eyebrow {
  margin: 0 0 20px;
  color: #ffe1d4;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 3px;
}

.presentacion__contenido h1 {
  margin: 0;
  color: #fffaf4;
  font-size: clamp(3rem, 5vw, 5.1rem);
  line-height: 0.98;
  letter-spacing: -3px;
}

.descripcion {
  max-width: 530px;
  margin: 30px 0 32px;
  color: rgba(255, 250, 244, 0.9);
  font-size: 1.05rem;
  line-height: 1.7;
}

/* BENEFICIOS */

.beneficios {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.beneficios span {
  padding: 9px 17px;
  border: 1px solid rgba(255, 250, 244, 0.45);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  color: #fffaf4;
  font-size: 0.82rem;
  font-weight: 600;
}

.beneficios span::before {
  content: '✓';
  margin-right: 7px;
  color: #ffd3c2;
}

.frase {
  margin: 0;
  color: rgba(255, 250, 244, 0.7);
  font-size: 0.78rem;
}

/* PANEL DERECHO */

.login__acceso {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 55px;
  background: linear-gradient(
    135deg,
    #f8f3ec,
    #f4ede7
  );
}

/* TARJETA */

.tarjeta {
  width: 100%;
  max-width: 520px;
  padding: 52px 48px;
  background: #fffcf8;
  border: 1px solid #e8ddd7;
  border-radius: 28px;
  box-shadow: 0 20px 55px rgba(64, 35, 51, 0.07);
}

.eyebrow--form {
  margin-bottom: 13px;
  color: #c66a4a;
}

.tarjeta h2 {
  margin: 0;
  color: #29252a;
  font-size: 2rem;
  letter-spacing: -0.8px;
}

.tarjeta__descripcion {
  margin: 13px 0 34px;
  color: #746d70;
  line-height: 1.55;
}

/* FORMULARIO */

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo label {
  color: #29252a;
  font-size: 0.84rem;
  font-weight: 700;
}

.campo input {
  width: 100%;
  padding: 15px 16px;
  background: #f8f3ec;
  border: 1px solid #e4d7cf;
  border-radius: 12px;
  color: #29252a;
  font-size: 1rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.campo input::placeholder {
  color: #968b8d;
}

.campo input:focus {
  border-color: #8b6071;
  box-shadow: 0 0 0 3px rgba(139, 96, 113, 0.12);
}

/* ERROR */

.error {
  margin: 12px 0 0;
  color: #c66a4a;
  font-size: 0.82rem;
}

/* BOTÓN */

.boton-ingresar {
  width: 100%;
  margin-top: 28px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: none;
  border-radius: 999px;
  background: #74445a;
  color: white;
  font-size: 0.92rem;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(99, 48, 74, 0.12);
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.boton-ingresar:hover {
  background: #63304a;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(99, 48, 74, 0.17);
}

/* PIE DE TARJETA */

.mensaje {
  margin: 20px 0 0;
  text-align: center;
  color: #746d70;
  font-size: 0.78rem;
}

.separador {
  height: 1px;
  margin: 28px 0 22px;
  background: #e8ddd7;
}

.volver {
  display: block;
  text-align: center;
  color: #74445a;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 700;
  transition: color 0.2s ease;
}

.volver:hover {
  color: #c66a4a;
}

/* RESPONSIVE */

@media (max-width: 850px) {
  .login {
    grid-template-columns: 1fr;
  }

  .login__presentacion {
    min-height: auto;
    padding: 38px 28px 45px;
  }

  .presentacion__contenido {
    margin: 65px 0 55px;
  }

  .presentacion__contenido h1 {
    font-size: 3.3rem;
  }

  .login__acceso {
    padding: 35px 20px 55px;
  }
}

@media (max-width: 520px) {
  .tarjeta {
    padding: 34px 24px;
  }

  .presentacion__contenido h1 {
    font-size: 2.7rem;
    letter-spacing: -2px;
  }

  .beneficios {
    gap: 8px;
  }

  .beneficios span {
    padding: 8px 13px;
  }
}
</style>