<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { sesion, cerrarSesion } from '@/data/sesion'

const router = useRouter()
const store = useStore()

onMounted(() => {
  store.dispatch('productos/cargarLibros')
})

function salir() {
  cerrarSesion()
  router.push('/')
}
</script>

<template>
  <div id="app">

    <header class="header">
      <div class="header__contenido">

        <!-- LOGO -->
        <RouterLink
          to="/"
          class="marca"
          aria-label="BookList - Inicio"
        >
          <div class="logo-libro" aria-hidden="true">
            <span class="pagina pagina--izquierda"></span>
            <span class="pagina pagina--derecha"></span>
          </div>

          <span class="marca__nombre">
            BookList
          </span>
        </RouterLink>

        <!-- NAVEGACIÓN -->
        <nav class="nav">

          <RouterLink
            to="/"
            class="nav__link"
          >
            Inicio
          </RouterLink>

          <RouterLink
            v-if="sesion.usuario"
            to="/libros"
            class="nav__link"
          >
            Mis libros
          </RouterLink>

          <button
            v-if="sesion.usuario"
            class="nav__sesion"
            type="button"
            @click="salir"
          >
            Cerrar sesión
          </button>

          <RouterLink
            v-else
            to="/login"
            class="nav__sesion"
          >
            Ingresar
          </RouterLink>

        </nav>

      </div>
    </header>

    <main class="contenido">
      <RouterView />
    </main>

  </div>
</template>

<style>
/* =========================================
   VARIABLES GLOBALES
   ========================================= */

:root {
  --vino: #63304a;
  --vino-oscuro: #402333;
  --terracota: #c66a4a;

  --marfil: #f8f3ec;
  --crema: #fffcf8;
  --rosa-suave: #ead8d4;

  --texto: #29252a;
  --texto-suave: #746d70;

  --borde: #e8ddd7;
}


/* =========================================
   RESET
   ========================================= */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;

  background: var(--marfil);

  color: var(--texto);

  font-family:
    Inter,
    Avenir,
    Helvetica,
    Arial,
    sans-serif;
}

body {
  min-height: 100vh;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

a {
  color: inherit;
}


/* =========================================
   APP
   ========================================= */

#app {
  min-height: 100vh;
}

.contenido {
  min-height: calc(100vh - 78px);
}


/* =========================================
   HEADER
   ========================================= */

.header {
  position: relative;
  z-index: 20;

  height: 78px;

  display: flex;
  align-items: center;

  background: rgba(255, 252, 248, 0.97);

  border-bottom: 1px solid var(--borde);
}

.header__contenido {
  width: 100%;

  margin: 0 auto;
  padding: 0 38px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;
}


/* =========================================
   MARCA / LOGO
   ========================================= */

.marca {
  display: inline-flex;
  align-items: center;

  gap: 12px;

  color: var(--vino-oscuro);

  text-decoration: none;
}


/* LIBRO */

.logo-libro {
  position: relative;

  width: 43px;
  height: 34px;

  flex-shrink: 0;
}

.pagina {
  position: absolute;
  top: 2px;

  width: 21px;
  height: 29px;

  background: var(--vino);

  border-radius: 5px 5px 2px 2px;
}

.pagina--izquierda {
  left: 0;

  transform: skewY(6deg);

  border-right: 1px solid rgba(255, 255, 255, 0.35);
}

.pagina--derecha {
  right: 0;

  transform: skewY(-6deg);
}

.logo-libro::before {
  content: '';

  position: absolute;

  left: 4px;
  right: 4px;
  bottom: 0;

  height: 5px;

  background: var(--terracota);

  border-radius: 0 0 5px 5px;
}

.logo-libro::after {
  content: '';

  position: absolute;

  z-index: 2;

  left: 20px;
  top: 4px;

  width: 3px;
  height: 27px;

  background: var(--marfil);

  border-radius: 4px;
}

.marca__nombre {
  font-size: 1.45rem;
  font-weight: 800;

  letter-spacing: -0.8px;
}


/* =========================================
   NAVEGACIÓN
   ========================================= */

.nav {
  display: flex;
  align-items: center;

  gap: 32px;
}

.nav__link {
  position: relative;

  padding: 9px 0;

  color: var(--texto);

  font-size: 0.88rem;
  font-weight: 700;

  text-decoration: none;

  transition: color 0.2s ease;
}

.nav__link:hover {
  color: var(--vino);
}

.nav__link.router-link-exact-active {
  color: var(--vino);
}

.nav__link.router-link-exact-active::after {
  content: '';

  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  height: 2px;

  background: var(--terracota);

  border-radius: 2px;
}


/* LOGIN / LOGOUT */

.nav__sesion {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 125px;

  padding: 10px 20px;

  border: 1px solid var(--vino);
  border-radius: 999px;

  background: transparent;

  color: var(--vino);

  font-size: 0.84rem;
  font-weight: 750;

  text-decoration: none;

  cursor: pointer;

  transition:
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.nav__sesion:hover {
  background: var(--vino);

  color: white;

  transform: translateY(-1px);
}


/* =========================================
   RESPONSIVE
   ========================================= */

@media (max-width: 700px) {

  .header {
    height: auto;
    min-height: 70px;
  }

  .header__contenido {
    padding: 14px 20px;

    gap: 15px;
  }

  .nav {
    gap: 15px;
  }

  .nav__link {
    font-size: 0.78rem;
  }

  .nav__sesion {
    min-width: auto;

    padding: 8px 13px;

    font-size: 0.76rem;
  }

  .logo-libro {
    width: 35px;
    height: 29px;
  }

  .pagina {
    width: 17px;
    height: 25px;
  }

  .logo-libro::after {
    left: 16px;

    height: 23px;
  }

  .marca__nombre {
    font-size: 1.15rem;
  }

}


@media (max-width: 500px) {

  .header__contenido {
    align-items: flex-start;
  }

  .nav {
    justify-content: flex-end;

    flex-wrap: wrap;

    gap: 7px 13px;
  }

  .marca__nombre {
    display: none;
  }

}
</style>