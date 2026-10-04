<script setup>
import { ref } from 'vue'

const publicPath = process.env.BASE_URL

const props = defineProps({
  libro: {
    type: Object,
    required: true
  },

  vistaPrevia: {
    type: Boolean,
    default: false
  },

  esFavorito: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'eliminar',
  'alternar-publicado',
  'editar',
  'favorito'
])

const mostrarDescripcion = ref(props.vistaPrevia)

const imagenPorDefecto =
  'https://placehold.co/300x420/F8F3EC/63304A?text=BookList'

function alternarDescripcion() {
  mostrarDescripcion.value = !mostrarDescripcion.value
}
</script>

<template>
  <article class="libro-card">

    <!-- PORTADA -->
    <div class="portada">
      <img
        :src="
          libro.imagen
            ? `${publicPath}${libro.imagen.replace(/^\//, '')}`
            : imagenPorDefecto
        "
        :alt="`Portada de ${libro.titulo}`"
      >
    </div>

    <!-- CONTENIDO -->
    <div class="contenido">

      <!-- TÍTULO -->
      <RouterLink
        v-if="!vistaPrevia"
        :to="`/libros/${libro.id}`"
        class="titulo"
      >
        {{ libro.titulo }}
      </RouterLink>

      <h3
        v-else
        class="titulo"
      >
        {{ libro.titulo }}
      </h3>

      <!-- AUTOR -->
      <p class="autor">
        {{ libro.autor }}
      </p>

      <!-- FAVORITO -->
      <button
        v-if="!vistaPrevia"
        type="button"
        class="boton-favorito"
        :aria-label="
          esFavorito
            ? 'Quitar de favoritos'
            : 'Agregar a favoritos'
        "
        @click="emit('favorito', libro.id)"
      >
        {{ esFavorito ? '★ Favorito' : '☆ Favorito' }}
      </button>

      <!-- CATEGORÍA + ESTADO -->
      <div class="info-libro">

        <span class="categoria">
          {{ libro.categoria }}
        </span>

        <span class="separador">
          •
        </span>

        <span
          class="estado"
          :class="
            libro.publicado
              ? 'estado-publicado'
              : 'estado-revision'
          "
        >
          {{
            libro.publicado
              ? 'Publicado'
              : 'En revisión'
          }}
        </span>

      </div>

      <!-- DESCRIPCIÓN -->
      <p
        v-show="mostrarDescripcion"
        class="descripcion"
      >
        {{ libro.descripcion }}
      </p>

      <!-- MOSTRAR / OCULTAR DESCRIPCIÓN -->
      <button
        v-if="!vistaPrevia"
        type="button"
        class="link-descripcion"
        @click="alternarDescripcion"
      >
        {{
          mostrarDescripcion
            ? 'Ocultar descripción'
            : 'Descripción'
        }}

        <span>
          {{ mostrarDescripcion ? '↑' : '→' }}
        </span>
      </button>

      <!-- ACCIONES -->
      <div
        v-if="!vistaPrevia"
        class="acciones"
      >

        <button
          type="button"
          class="btn btn-editar"
          @click="emit('editar', libro)"
        >
          Editar
        </button>

        <button
          type="button"
          class="btn btn-revisar"
          @click="
            emit(
              'alternar-publicado',
              libro.id
            )
          "
        >
          {{
            libro.publicado
              ? 'Revisar'
              : 'Publicar'
          }}
        </button>

        <button
          type="button"
          class="btn btn-eliminar"
          @click.once="emit('eliminar', libro.id)"
        >
          Eliminar
        </button>

      </div>

    </div>
  </article>
</template>

<style scoped>

/* ==========================================
   TARJETA
   ========================================== */

.libro-card {
  width: 100%;
  height: auto !important;
  min-height: 0 !important;
  align-self: start !important;
  overflow: hidden;
  background: #fffcf8;
  border: 1px solid #e8ddd7;
  border-radius: 18px;

  box-shadow:
    0 7px 22px rgba(64, 35, 51, 0.07);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.libro-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 11px 27px rgba(64, 35, 51, 0.11);
}

/* ==========================================
   PORTADA
   ========================================== */

.portada {
  height: 285px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;
  box-sizing: border-box;

  background: #f8f3ec;
}

.portada img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;

  border-radius: 6px;
}

/* ==========================================
   CONTENIDO
   ========================================== */

.contenido {
  height: auto !important;
  min-height: 0 !important;

  padding: 20px 19px 21px;
}

/* ==========================================
   TÍTULO
   ========================================== */

.titulo {
  display: block;

  margin: 0 0 6px;

  color: #402333;

  font-size: 1.08rem;
  font-weight: 800;

  line-height: 1.3;

  text-decoration: none;
}

a.titulo:hover {
  color: #c66a4a;
}

/* ==========================================
   AUTOR
   ========================================== */

.autor {
  margin: 0 0 12px;

  color: #746d70;

  font-size: 0.88rem;

  line-height: 1.4;
}

/* ==========================================
   FAVORITO
   ========================================== */

.boton-favorito {
  align-self: flex-start;

  border: 0;

  background: transparent;

  color: #c66a4a;

  font-weight: 700;

  cursor: pointer;

  padding: 0;

  margin-bottom: 10px;
}

.boton-favorito:hover {
  color: #63304a;
}

/* ==========================================
   CATEGORÍA + ESTADO
   ========================================== */

.info-libro {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 7px;

  margin-bottom: 16px;

  font-size: 0.76rem;
  font-weight: 700;
}

.categoria {
  color: #746d70;
}

.separador {
  color: #c8b8b4;

  font-size: 0.7rem;
}

.estado {
  font-weight: 700;
}

.estado-publicado {
  color: #397052;
}

.estado-revision {
  color: #b06349;
}

/* ==========================================
   DESCRIPCIÓN ABIERTA
   ========================================== */

.descripcion {
  margin: 0 0 11px;

  padding: 12px 13px;

  border-left: 3px solid #ead8d4;
  border-radius: 0 8px 8px 0;

  background: #faf5f1;

  color: #746d70;

  font-size: 0.8rem;

  line-height: 1.55;
}

/* ==========================================
   LINK DESCRIPCIÓN
   ========================================== */

.link-descripcion {
  display: inline-flex;
  align-items: center;

  gap: 6px;

  margin: 0 0 17px;
  padding: 0;

  border: none;

  background: transparent;

  color: #63304a;

  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    color 0.18s ease,
    gap 0.18s ease;
}

.link-descripcion:hover {
  color: #c66a4a;

  gap: 9px;
}

.link-descripcion span {
  font-size: 0.9rem;
}

/* ==========================================
   BOTONES DE ACCIÓN
   ========================================== */

.acciones {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 8px;

  width: 100%;
}

/* BASE BOTONES */

.btn {
  width: 100%;
  height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  padding: 0 8px;

  border-radius: 9px;

  font-family: inherit;

  font-size: 0.71rem;
  font-weight: 700;

  line-height: 1;

  white-space: nowrap;

  cursor: pointer;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.btn:hover {
  transform: translateY(-1px);

  box-shadow:
    0 4px 10px rgba(64, 35, 51, 0.08);
}

/* EDITAR */

.btn-editar {
  border: 1px solid #63304a;

  background: #63304a;

  color: #ffffff;
}

.btn-editar:hover {
  background: #402333;
}

/* REVISAR / PUBLICAR */

.btn-revisar {
  border: 1px solid #d5e7dc;

  background: #edf6f0;

  color: #397052;
}

.btn-revisar:hover {
  background: #e1efe6;
}

/* ELIMINAR */

.btn-eliminar {
  border: 1px solid #eed7d5;

  background: #fff7f6;

  color: #b64d48;
}

.btn-eliminar:hover {
  background: #fbe8e6;
}

/* ==========================================
   VISTA PREVIA
   ========================================== */

.libro-card:has(.titulo:not(a)) {
  height: auto !important;
  min-height: 0 !important;

  box-shadow: none;
}

.libro-card:has(.titulo:not(a)):hover {
  transform: none;
}

/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 600px) {

  .portada {
    height: 260px;
  }

  .contenido {
    padding: 17px;
  }

  .acciones {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    gap: 6px;
  }

  .btn {
    height: 37px;

    padding: 0 5px;

    font-size: 0.68rem;
  }
}

@media (max-width: 390px) {

  .acciones {
    grid-template-columns: 1fr;
  }

  .btn {
    font-size: 0.72rem;
  }
}

</style>