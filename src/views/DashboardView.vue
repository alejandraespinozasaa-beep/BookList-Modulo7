<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { sesion } from '@/data/sesion'
import imagenBiblioteca from '@/assets/images/biblioteca.jpg'

const store = useStore()

const totalLibros = computed(() => store.getters['productos/totalLibros'])
const publicados = computed(() => store.getters['productos/librosPublicados'])
const enRevision = computed(() => store.getters['productos/librosEnRevision'])
</script>

<template>
  <section class="dashboard">

    <!-- HERO -->
    <section class="hero">

      <!-- TEXTO -->
      <div class="hero__contenido">

        <div class="hero__texto">

          <p class="eyebrow">
            TU BIBLIOTECA PERSONAL
          </p>

          <h1>
            Hola, {{ sesion.usuario }}.
          </h1>

          <h2>
            Tu próxima historia<br>
            comienza aquí.
          </h2>

          <p class="descripcion">
            Organiza tu colección, descubre tus libros
            y mantén tus lecturas favoritas siempre a mano.
          </p>

          <!-- BOTONES -->
          <div class="acciones-hero">

            <router-link
              to="/libros"
              class="boton-principal"
            >
              Ver mis libros
              <span>→</span>
            </router-link>

            <router-link
              to="/libros#formulario-libro"
              class="boton-agregar"
            >
              <span>+</span>
              Agregar un libro
            </router-link>

          </div>

        </div>

      </div>


      <!-- FOTO -->
      <div class="hero__imagen">

        <img
          :src="imagenBiblioteca"
          alt="Rincón acogedor de lectura"
        >

        <div class="frase-foto">

          <small>
            BOOKLIST
          </small>

          <p>
            Un lugar para cada historia.
          </p>

        </div>

      </div>

    </section>


    <!-- RESUMEN -->
    <section class="resumen">

      <div class="estadistica">

        <strong>
          {{ totalLibros }}
        </strong>

        <span>
          Libros en tu colección
        </span>

      </div>


      <div class="estadistica">

        <strong>
          {{ publicados }}
        </strong>

        <span>
          Publicados
        </span>

      </div>


      <div class="estadistica">

        <strong>
          {{ enRevision }}
        </strong>

        <span>
          En revisión
        </span>

      </div>

    </section>


    <!-- BLOQUE INFERIOR -->
    <section class="coleccion">

      <div>

        <p class="eyebrow">
          MI COLECCIÓN
        </p>

        <h3>
          Tus libros favoritos,
          <span>siempre a mano.</span>
        </h3>

        <p class="coleccion__descripcion">
          Consulta tus títulos, revisa sus detalles
          y agrega nuevas historias a tu biblioteca.
        </p>

      </div>

    </section>

  </section>
</template>


<style scoped>

/* ========================================
   DASHBOARD
======================================== */

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 30px 60px;
}


/* ========================================
   HERO
======================================== */

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;

  height: 450px;

  overflow: hidden;

  background: var(--crema);

  border: 1px solid var(--borde);
  border-radius: 28px;

  box-shadow:
    0 10px 30px rgba(64, 35, 51, 0.06);
}


/* ========================================
   CONTENIDO IZQUIERDO
======================================== */

.hero__contenido {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 42px 42px;
}

.hero__texto {
  width: 100%;
  max-width: 500px;
}


/* ETIQUETA */

.eyebrow {
  margin: 0 0 12px;

  color: var(--terracota);

  font-size: 0.7rem;
  font-weight: 800;

  letter-spacing: 2.5px;
}


/* SALUDO */

.hero h1 {
  margin: 0 0 10px;

  color: var(--texto);

  font-size: 2rem;
  font-weight: 700;

  line-height: 1.1;
}


/* TÍTULO */

.hero h2 {
  margin: 0;

  color: var(--vino);

  font-size: 2.55rem;
  font-weight: 750;

  line-height: 1.08;
  letter-spacing: -1px;
}


/* DESCRIPCIÓN */

.descripcion {
  max-width: 450px;

  margin: 20px 0 25px;

  color: var(--texto-suave);

  font-size: 0.96rem;
  line-height: 1.65;
}


/* ========================================
   BOTONES HERO
======================================== */

.acciones-hero {
  display: flex;
  align-items: center;

  gap: 10px;

  flex-wrap: wrap;
}


/* BOTÓN VER MIS LIBROS */

.boton-principal {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  min-height: 42px;

  box-sizing: border-box;

  padding: 11px 18px;

  background: var(--vino);

  border: 1.5px solid var(--vino);
  border-radius: 999px;

  color: #ffffff;

  font-size: 0.84rem;
  font-weight: 700;

  text-decoration: none;

  box-shadow:
    0 7px 18px rgba(99, 48, 74, 0.15);

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.boton-principal:hover {
  background: var(--vino-oscuro);
  border-color: var(--vino-oscuro);

  transform: translateY(-2px);
}


/* BOTÓN AGREGAR */

.boton-agregar {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  min-height: 42px;

  box-sizing: border-box;

  padding: 11px 18px;

  background: #ffffff;

  border: 1.5px solid var(--vino);
  border-radius: 999px;

  color: var(--vino);

  font-size: 0.84rem;
  font-weight: 700;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.boton-agregar:hover {
  background: var(--rosa-suave);

  transform: translateY(-2px);
}


/* ========================================
   IMAGEN
======================================== */

.hero__imagen {
  position: relative;

  height: 450px;

  overflow: hidden;
}

.hero__imagen img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
}


/* SOMBRA SOBRE FOTO */

.hero__imagen::after {
  content: "";

  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      to bottom,
      transparent 68%,
      rgba(40, 25, 33, 0.58)
    );
}


/* TEXTO SOBRE FOTO */

.frase-foto {
  position: absolute;

  left: 28px;
  bottom: 24px;

  z-index: 2;

  color: #ffffff;
}

.frase-foto small {
  font-size: 0.62rem;
  font-weight: 800;

  letter-spacing: 2px;
}

.frase-foto p {
  margin: 5px 0 0;

  font-size: 0.95rem;
  font-weight: 600;
}


/* ========================================
   ESTADÍSTICAS
======================================== */

.resumen {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  margin-top: 20px;

  background: var(--crema);

  border: 1px solid var(--borde);
  border-radius: 20px;

  overflow: hidden;

  box-shadow:
    0 7px 22px rgba(64, 35, 51, 0.04);
}

.estadistica {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;

  text-align: center;
}

.estadistica:not(:last-child)::after {
  content: "";

  position: absolute;

  right: 0;
  top: 25%;

  width: 1px;
  height: 50%;

  background: var(--borde);
}

.estadistica strong {
  color: var(--vino);

  font-size: 1.75rem;
  font-weight: 800;
}

.estadistica span {
  margin-top: 3px;

  color: var(--texto-suave);

  font-size: 0.78rem;
}


/* ========================================
   BLOQUE INFERIOR
======================================== */

.coleccion {
  margin-top: 20px;

  padding: 28px 35px;

  background: var(--rosa-suave);

  border-radius: 22px;
}

.coleccion .eyebrow {
  margin-bottom: 6px;
}

.coleccion h3 {
  margin: 0 0 8px;

  color: var(--texto);

  font-size: 1.55rem;
  font-weight: 750;
}

.coleccion h3 span {
  color: var(--vino);
}

.coleccion__descripcion {
  margin: 0;

  color: var(--texto-suave);

  font-size: 0.9rem;
  line-height: 1.55;
}


/* ========================================
   TABLET
======================================== */

@media (max-width: 850px) {

  .dashboard {
    padding: 20px 18px 50px;
  }

  .hero {
    grid-template-columns: 1fr;

    height: auto;
  }

  .hero__contenido {
    padding: 45px 35px;
  }

  .hero__texto {
    max-width: 560px;

    margin: 0 auto;
  }

  .hero__imagen {
    height: 340px;
  }
}


/* ========================================
   CELULAR
======================================== */

@media (max-width: 520px) {

  .dashboard {
    padding: 16px 14px 40px;
  }

  .hero__contenido {
    padding: 35px 23px;
  }

  .hero h1 {
    font-size: 1.65rem;
  }

  .hero h2 {
    font-size: 2rem;
  }

  .descripcion {
    font-size: 0.9rem;
  }

  .acciones-hero {
    flex-direction: column;
    align-items: stretch;
  }

  .boton-principal,
  .boton-agregar {
    width: 100%;
  }

  .hero__imagen {
    height: 270px;
  }

  .resumen {
    grid-template-columns:
      repeat(3, 1fr);
  }

  .estadistica {
    padding: 17px 5px;
  }

  .estadistica strong {
    font-size: 1.45rem;
  }

  .estadistica span {
    font-size: 0.65rem;
  }

  .coleccion {
    padding: 25px 22px;
  }

  .coleccion h3 {
    font-size: 1.35rem;
  }
}

</style>