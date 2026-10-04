<script setup>
import { computed } from 'vue'
import { sesion } from '@/data/sesion'
import libro3d from '@/assets/images/libro-3d.png'

const destino = computed(() =>
  sesion.usuario ? '/libros' : '/login'
)

const textoBoton = computed(() =>
  sesion.usuario ? 'Ver mis libros' : 'Comenzar'
)
</script>

<template>
  <main class="inicio">

    <section class="hero">

      <!-- TEXTO -->
      <div class="hero__contenido">

        <p class="eyebrow">
          TU BIBLIOTECA PERSONAL
        </p>

        <h1>
          Cada libro abre
          <span>una nueva historia.</span>
        </h1>

        <p class="descripcion">
          Organiza tu colección, guarda tus próximas lecturas
          y encuentra tus historias favoritas en un solo lugar.
        </p>


        <!-- BOTONES -->
        <div class="acciones">

          <RouterLink
            :to="destino"
            class="boton"
          >
            {{ textoBoton }}
            <span>→</span>
          </RouterLink>

          <RouterLink
            v-if="sesion.usuario"
            to="/libros#formulario-libro"
            class="boton boton--secundario"
          >
            <span class="signo-mas">+</span>
            Nuevo libro
          </RouterLink>

        </div>


        <!-- BENEFICIOS -->
        <div class="beneficios">

          <!-- ORGANIZA -->
          <div class="beneficio">

            <div class="icono">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 4h4v16H4V4Zm6 3h4v13h-4V7Zm6-2 4-1v16l-4 1V5Z"
                />
              </svg>
            </div>

            <div>
              <strong>Organiza</strong>
              <span>tu colección</span>
            </div>

          </div>


          <!-- CONSULTA -->
          <div class="beneficio">

            <div class="icono">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                />

                <path
                  d="m15.5 15.5 4.5 4.5"
                />
              </svg>
            </div>

            <div>
              <strong>Consulta</strong>
              <span>tus libros</span>
            </div>

          </div>


          <!-- DESCUBRE -->
          <div class="beneficio">

            <div class="icono">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
                />
              </svg>
            </div>

            <div>
              <strong>Descubre</strong>
              <span>nuevas historias</span>
            </div>

          </div>

        </div>


        <p class="frase">
          <span></span>
          Los libros nos llevan más lejos.
        </p>

      </div>


      <!-- IMAGEN DEL LIBRO -->
      <div class="hero__visual">

        <div class="circulo"></div>

        <img
          :src="libro3d"
          alt="Libro abierto del que emerge un mundo de historias"
          class="libro"
        >

      </div>

    </section>

  </main>
</template>


<style scoped>

/* =========================================
   FONDO
========================================= */

.inicio {
  min-height: calc(100vh - 78px);

  display: flex;
  align-items: center;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 85% 40%,
      rgba(225, 188, 184, 0.32) 0%,
      rgba(242, 218, 211, 0.20) 30%,
      transparent 55%
    ),
    linear-gradient(
      135deg,
      #fffaf5 0%,
      #fbf3ed 45%,
      #f7eae5 100%
    );
}


/* =========================================
   HERO
========================================= */

.hero {
  width: 100%;
  max-width: 1450px;

  margin: 0 auto;

  padding: 55px 6% 50px;

  display: grid;
  grid-template-columns: 0.95fr 1.05fr;

  align-items: center;

  gap: 35px;
}


/* =========================================
   TEXTO
========================================= */

.hero__contenido {
  position: relative;

  z-index: 5;

  max-width: 650px;
}

.eyebrow {
  margin: 0 0 20px;

  color: #c66a4a;

  font-size: 0.74rem;
  font-weight: 800;

  letter-spacing: 3px;
}

h1 {
  margin: 0;

  color: #30252b;

  font-family: Georgia, 'Times New Roman', serif;

  font-size: clamp(3.3rem, 5vw, 5.4rem);

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -3px;
}

h1 span {
  display: block;

  color: #8a4962;
}

.descripcion {
  max-width: 570px;

  margin: 28px 0 30px;

  color: #6f686b;

  font-size: 1.02rem;

  line-height: 1.7;
}


/* =========================================
   BOTONES
========================================= */

.acciones {
  display: flex;
  align-items: center;

  gap: 12px;

  flex-wrap: wrap;
}

.boton {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 14px;

  min-width: 190px;

  box-sizing: border-box;

  padding: 14px 26px;

  border: 1.5px solid transparent;
  border-radius: 999px;

  background:
    linear-gradient(
      135deg,
      #74344f,
      #8c405b
    );

  color: #ffffff;

  font-size: 0.9rem;
  font-weight: 700;

  text-decoration: none;

  box-shadow:
    0 10px 25px rgba(116, 52, 79, 0.15);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.boton:hover {
  transform: translateY(-2px);

  box-shadow:
    0 13px 30px rgba(116, 52, 79, 0.22);
}


/* BOTÓN NUEVO LIBRO */

.boton--secundario {
  min-width: 165px;

  background: transparent;

  border-color: #8a4962;

  color: #8a4962;

  box-shadow: none;
}

.boton--secundario:hover {
  background: rgba(138, 73, 98, 0.08);

  box-shadow: none;
}

.signo-mas {
  font-size: 1.15rem;
  line-height: 1;
}


/* =========================================
   BENEFICIOS
========================================= */

.beneficios {
  margin-top: 48px;

  display: flex;

  gap: 45px;
}

.beneficio {
  display: flex;
  flex-direction: column;

  gap: 11px;
}

.icono {
  width: 54px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #f0deda;

  color: #7b3853;
}

.icono svg {
  width: 25px;
  height: 25px;

  fill: none;

  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.beneficio:first-child .icono svg {
  fill: none;
}

.beneficio strong {
  display: block;

  margin-bottom: 3px;

  color: #33282d;

  font-size: 0.88rem;
}

.beneficio span {
  color: #81777a;

  font-size: 0.76rem;
}


/* =========================================
   FRASE
========================================= */

.frase {
  margin: 42px 0 0;

  display: flex;
  align-items: center;

  gap: 14px;

  color: #9a5267;

  font-family: Georgia, 'Times New Roman', serif;

  font-size: 0.9rem;
  font-style: italic;
}

.frase span {
  display: block;

  width: 50px;
  height: 1px;

  background: #d8a89c;
}


/* =========================================
   LIBRO
========================================= */

.hero__visual {
  position: relative;

  min-height: 570px;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* CÍRCULO ROSADO */

.circulo {
  position: absolute;

  width: 490px;
  height: 490px;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  border-radius: 50%;

  background:
    linear-gradient(
      145deg,
      rgba(232, 200, 194, 0.78),
      rgba(243, 219, 211, 0.58)
    );
}


/* IMAGEN */

.libro {
  position: relative;

  z-index: 2;

  width: min(620px, 100%);

  max-height: 590px;

  object-fit: contain;

  filter:
    drop-shadow(
      0 25px 25px rgba(91, 55, 65, 0.13)
    );
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 1050px) {

  .hero {
    padding-left: 5%;
    padding-right: 5%;

    gap: 10px;
  }

  .beneficios {
    gap: 25px;
  }

  .hero__visual {
    min-height: 500px;
  }

  .circulo {
    width: 420px;
    height: 420px;
  }

}


@media (max-width: 850px) {

  .hero {
    grid-template-columns: 1fr;

    padding-top: 50px;

    text-align: center;
  }

  .hero__contenido {
    margin: 0 auto;
  }

  .descripcion {
    margin-left: auto;
    margin-right: auto;
  }

  .acciones {
    justify-content: center;
  }

  .beneficios {
    justify-content: center;
  }

  .beneficio {
    align-items: center;
  }

  .frase {
    justify-content: center;
  }

  .hero__visual {
    min-height: 480px;
  }

}


@media (max-width: 550px) {

  .hero {
    padding:
      42px
      22px
      25px;
  }

  h1 {
    font-size: 3rem;

    letter-spacing: -2px;
  }

  .descripcion {
    font-size: 0.93rem;
  }

  .acciones {
    flex-direction: column;
    align-items: stretch;
  }

  .boton {
    width: 100%;
  }

  .beneficios {
    gap: 15px;
  }

  .icono {
    width: 46px;
    height: 46px;
  }

  .beneficio strong {
    font-size: 0.78rem;
  }

  .beneficio span {
    font-size: 0.68rem;
  }

  .hero__visual {
    min-height: 380px;
  }

  .circulo {
    width: 330px;
    height: 330px;
  }

  .libro {
    width: 390px;
  }

  .frase {
    margin-top: 32px;
  }

}

</style>