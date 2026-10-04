<script setup>
import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import FormularioLibro from '@/components/FormularioLibro.vue'
import LibroItem from '@/components/LibroItem.vue'
import imagenBiblioteca from '@/assets/images/biblioteca.jpg'

const store = useStore()

const totalLibros = computed(() => store.getters['productos/totalLibros'])
const publicados = computed(() => store.getters['productos/librosPublicados'])
const enRevision = computed(() => store.getters['productos/librosEnRevision'])
const libros = computed(() => store.getters['productos/libros'])
const loading = computed(() => store.getters['productos/loading'])
const errorCarga = computed(() => store.getters['productos/error'])
const idsFavoritos = computed(() => store.getters['favoritos/ids'])

const busqueda = computed({
  get: () => store.getters['filtros/busqueda'],
  set: valor => store.commit('filtros/SET_BUSQUEDA', valor)
})
const categoriaSeleccionada = computed({
  get: () => store.getters['filtros/categoria'],
  set: valor => store.commit('filtros/SET_CATEGORIA', valor)
})
const soloFavoritos = computed({
  get: () => store.getters['filtros/soloFavoritos'],
  set: valor => store.commit('filtros/SET_SOLO_FAVORITOS', valor)
})
const libroEditar = ref(null)

const categorias = ['Novela', 'Ciencia ficción', 'Fantasía', 'Historia', 'Biografía']

const librosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()
  return libros.value.filter(libro => {
    const coincideBusqueda = !texto || libro.titulo.toLowerCase().includes(texto) || libro.autor.toLowerCase().includes(texto)
    const coincideCategoria = !categoriaSeleccionada.value || libro.categoria === categoriaSeleccionada.value
    const coincideFavorito = !soloFavoritos.value || idsFavoritos.value.includes(libro.id)
    return coincideBusqueda && coincideCategoria && coincideFavorito
  })
})

async function agregarLibro(libro) { await store.dispatch('productos/agregarLibro', libro) }
async function eliminarLibro(id) {
  await store.dispatch('productos/eliminarLibro', id)
  if (libroEditar.value?.id === id) libroEditar.value = null
}
async function alternarPublicado(id) { await store.dispatch('productos/alternarPublicado', id) }
function toggleFavorito(id) { store.commit('favoritos/TOGGLE_FAVORITO', id) }
function limpiarFiltros() { busqueda.value = ''; categoriaSeleccionada.value = ''; soloFavoritos.value = false }

async function comenzarEdicion(libro) {
  libroEditar.value = { ...libro }
  await nextTick()
  document.getElementById('formulario-libro')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
async function guardarEdicion(libro) { await store.dispatch('productos/editarLibro', libro); libroEditar.value = null }
function cancelarEdicion() { libroEditar.value = null }
</script>

<template>
  <main class="pagina-libros">

    <!-- HERO: MIS LIBROS Y FOTO DE LA BIBLIOTECA -->

    <section class="biblioteca-hero">
      <div class="biblioteca-hero__contenido">
        <p class="eyebrow">TU BIBLIOTECA PERSONAL</p>

        <h1>Mis libros</h1>

        <p class="biblioteca-hero__descripcion">
          Organiza tu colección, descubre tus libros y mantén
          tus lecturas favoritas siempre a mano.
        </p>
      </div>

      <div class="biblioteca-hero__imagen">
        <img
          :src="imagenBiblioteca"
          alt="Biblioteca y rincón acogedor de lectura"
        >

        <div class="biblioteca-hero__frase">
          <small>BOOKLIST</small>
          <p>Un lugar para cada historia.</p>
        </div>
      </div>
    </section>

    <!-- RESUMEN DE LIBROS -->

    <section class="biblioteca-resumen" aria-label="Resumen de tu colección">

      <article class="estadistica">
        <span class="estadistica__icono">📚</span>

        <div>
          <strong>{{ totalLibros }}</strong>
          <p>Libros en tu colección</p>
        </div>
      </article>

      <article class="estadistica">
        <span class="estadistica__icono">✓</span>

        <div>
          <strong>{{ publicados }}</strong>
          <p>Publicados</p>
        </div>
      </article>

      <article class="estadistica">
        <span class="estadistica__icono">◷</span>

        <div>
          <strong>{{ enRevision }}</strong>
          <p>En revisión</p>
        </div>
      </article>

    </section>

    <!-- COLECCIÓN Y FILTROS -->

    <section class="seccion-coleccion">

      <div class="coleccion__encabezado">
        <div>
          <p class="eyebrow">MI COLECCIÓN</p>

          <h2>Tu biblioteca</h2>

          <p class="coleccion__subtitulo">
            Explora, organiza y administra tus libros.
          </p>
        </div>

        <span class="contador-libros">
          {{ librosFiltrados.length }}
          {{ librosFiltrados.length === 1 ? 'libro' : 'libros' }}
        </span>
      </div>

      <div class="filtros">
        <label class="filtros__busqueda">
          <span class="sr-only">Buscar libros</span>

          <input
            v-model="busqueda"
            type="search"
            placeholder="Buscar por título o autor..."
          >
        </label>

        <label class="filtros__categoria">
          <span class="sr-only">Filtrar por categoría</span>

          <select v-model="categoriaSeleccionada">
            <option value="">Todas las categorías</option>

            <option
              v-for="categoria in categorias"
              :key="categoria"
              :value="categoria"
            >
              {{ categoria }}
            </option>
          </select>
        </label>

        <button
          v-if="busqueda || categoriaSeleccionada || soloFavoritos"
          type="button"
          class="boton-limpiar"
          @click="limpiarFiltros"
        >
          Limpiar filtros
        </button>
      </div>

      <label class="filtro-favoritos">
        <input v-model="soloFavoritos" type="checkbox">
        Ver solo favoritos
      </label>

      <p v-if="loading" class="estado-carga">Cargando biblioteca...</p>
      <p v-else-if="errorCarga" class="estado-error">{{ errorCarga }}</p>

      <!-- TARJETAS DE LIBROS -->

      <div
        v-if="!loading && !errorCarga && librosFiltrados.length"
        class="grilla-libros"
      >
        <LibroItem
          v-for="libro in librosFiltrados"
          :key="libro.id"
          :libro="libro"
          :es-favorito="idsFavoritos.includes(libro.id)"
          @favorito="toggleFavorito"
          @editar="comenzarEdicion"
          @eliminar="eliminarLibro"
          @alternar-publicado="alternarPublicado"
        />
      </div>

      <div
        v-else-if="!loading && !errorCarga"
        class="estado-vacio"
      >
        <span>📖</span>

        <h3>No encontramos libros</h3>

        <p>
          Prueba con otra búsqueda o cambia la categoría seleccionada.
        </p>

        <button
          type="button"
          @click="limpiarFiltros"
        >
          Ver todos los libros
        </button>
      </div>

    </section>

    <!-- FORMULARIO: DESPUÉS DE LA COLECCIÓN -->

    <section
      id="formulario-libro"
      class="seccion-formulario"
    >
      <div class="formulario__encabezado">
        <p class="eyebrow">
          {{ libroEditar ? 'EDITAR LIBRO' : 'NUEVA HISTORIA' }}
        </p>

        <h2>
          {{ libroEditar ? 'Editar mi libro' : 'Agregar un libro' }}
        </h2>

        <p>
          {{
            libroEditar
              ? 'Actualiza la información de tu libro.'
              : 'Cada libro merece un lugar en tu colección.'
          }}
        </p>
      </div>

      <FormularioLibro
        :libro-editar="libroEditar"
        @agregar="agregarLibro"
        @guardar-edicion="guardarEdicion"
        @cancelar-edicion="cancelarEdicion"
      />
    </section>

  </main>
</template>

<style scoped>
/* ESTRUCTURA GENERAL */

.pagina-libros {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 30px 70px;
  box-sizing: border-box;
}

.eyebrow {
  margin: 0 0 10px;
  color: #c66a4a;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
}

/* HERO CON FOTO DE LA BIBLIOTECA */

.biblioteca-hero {
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  min-height: 305px;
  overflow: hidden;
  background: #f8f3ec;
  border: 1px solid #eadedc;
  border-radius: 26px;
  box-shadow: 0 8px 28px rgba(64, 35, 51, 0.05);
}

.biblioteca-hero__contenido {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 38px 42px;
}

.biblioteca-hero h1 {
  margin: 0 0 17px;
  color: #402333;
  font-family: Georgia, serif;
  font-size: clamp(2.5rem, 4vw, 3.7rem);
  line-height: 1.1;
}

.biblioteca-hero__descripcion {
  max-width: 410px;
  margin: 0;
  color: #75676d;
  font-size: 0.97rem;
  line-height: 1.75;
}

.biblioteca-hero__imagen {
  position: relative;
  min-height: 305px;
  overflow: hidden;
}

.biblioteca-hero__imagen img {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
}

.biblioteca-hero__imagen::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  background: linear-gradient(
    90deg,
    #f8f3ec 0%,
    rgba(248, 243, 236, 0) 32%
  );
}

.biblioteca-hero__imagen::after {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(40, 25, 33, 0.55),
    transparent 45%
  );
}

.biblioteca-hero__frase {
  position: absolute;
  z-index: 2;
  right: 26px;
  bottom: 23px;
  color: white;
  text-align: right;
}

.biblioteca-hero__frase small {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.biblioteca-hero__frase p {
  margin: 5px 0 0;
  font-size: 0.95rem;
}

/* ESTADÍSTICAS */

.biblioteca-resumen {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 20px 0 38px;
}

.estadistica {
  display: flex;
  align-items: center;
  gap: 17px;
  min-width: 0;
  padding: 22px;
  background: #fff;
  border: 1px solid #eadedc;
  border-radius: 18px;
  box-shadow: 0 5px 18px rgba(64, 35, 51, 0.04);
}

.estadistica__icono {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: #f8eeee;
  border-radius: 50%;
  color: #63304a;
  font-size: 1.5rem;
}

.estadistica strong {
  display: block;
  color: #402333;
  font-size: 1.85rem;
  line-height: 1.1;
}

.estadistica p {
  margin: 5px 0 0;
  color: #75676d;
  font-size: 0.84rem;
}

/* COLECCIÓN */

.seccion-coleccion {
  margin-top: 10px;
}

.coleccion__encabezado {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.coleccion__encabezado h2,
.formulario__encabezado h2 {
  margin: 0 0 8px;
  color: #402333;
  font-family: Georgia, serif;
  font-size: 2rem;
}

.coleccion__subtitulo,
.formulario__encabezado > p:last-child {
  margin: 0;
  color: #75676d;
  font-size: 0.93rem;
  line-height: 1.6;
}

.contador-libros {
  flex-shrink: 0;
  padding: 9px 15px;
  background: #f8eeee;
  border: 1px solid #eadedc;
  border-radius: 999px;
  color: #63304a;
  font-size: 0.83rem;
  font-weight: 700;
}

/* FILTROS */

.filtros {
  display: flex;
  align-items: center;
  gap: 13px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}

.filtros__busqueda {
  flex: 1 1 280px;
}

.filtros__categoria {
  flex: 0 1 230px;
}

.filtros input,
.filtros select {
  width: 100%;
  min-height: 46px;
  box-sizing: border-box;
  padding: 11px 15px;
  background: #fff;
  border: 1px solid #e4d8d9;
  border-radius: 12px;
  color: #402333;
  font: inherit;
  font-size: 0.9rem;
  outline: none;
}

.filtros input:focus,
.filtros select:focus {
  border-color: #63304a;
  box-shadow: 0 0 0 3px rgba(99, 48, 74, 0.1);
}

.boton-limpiar {
  padding: 11px 15px;
  background: transparent;
  border: none;
  color: #63304a;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

/* TARJETAS: SE CONSERVA LIBROITEM */

.grilla-libros {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 24px;
}

/* SIN RESULTADOS */

.estado-vacio {
  padding: 55px 25px;
  background: #f8f3ec;
  border: 1px dashed #dcc8ce;
  border-radius: 20px;
  text-align: center;
}

.estado-vacio > span {
  font-size: 2.5rem;
}

.estado-vacio h3 {
  margin: 15px 0 8px;
  color: #402333;
  font-family: Georgia, serif;
  font-size: 1.5rem;
}

.estado-vacio p {
  color: #75676d;
  font-size: 0.9rem;
}

.estado-vacio button {
  margin-top: 13px;
  padding: 12px 20px;
  background: #63304a;
  border: none;
  border-radius: 999px;
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

/* FORMULARIO */

.seccion-formulario {
  margin-top: 65px;
  padding-top: 35px;
  border-top: 1px solid #eadedc;
  scroll-margin-top: 90px;
}

.formulario__encabezado {
  margin-bottom: 27px;
}

/* ACCESIBILIDAD */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* TABLET */

@media (max-width: 850px) {
  .pagina-libros {
    padding: 20px 18px 55px;
  }

  .biblioteca-hero {
    grid-template-columns: 1fr;
  }

  .biblioteca-hero__contenido {
    padding: 38px 35px;
  }

  .biblioteca-hero__imagen {
    min-height: 275px;
  }

  .biblioteca-hero__imagen::before {
    background: linear-gradient(
      180deg,
      #f8f3ec 0%,
      transparent 35%
    );
  }

  .grilla-libros {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .estadistica {
    gap: 10px;
    padding: 16px 12px;
  }

  .estadistica__icono {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .estadistica strong {
    font-size: 1.5rem;
  }

  .estadistica p {
    font-size: 0.74rem;
  }
}

/* CELULAR */

@media (max-width: 520px) {
  .pagina-libros {
    padding: 16px 14px 45px;
  }

  .biblioteca-hero__contenido {
    padding: 34px 24px;
  }

  .biblioteca-hero h1 {
    font-size: 2.5rem;
  }

  .biblioteca-hero__descripcion {
    font-size: 0.9rem;
  }

  .biblioteca-hero__imagen {
    min-height: 230px;
  }

  .biblioteca-resumen {
    gap: 8px;
    margin-bottom: 32px;
  }

  .estadistica {
    flex-direction: column;
    gap: 9px;
    padding: 15px 6px;
    text-align: center;
  }

  .estadistica__icono {
    width: 38px;
    height: 38px;
  }

  .estadistica strong {
    font-size: 1.4rem;
  }

  .estadistica p {
    font-size: 0.68rem;
  }

  .coleccion__encabezado {
    align-items: flex-start;
  }

  .coleccion__encabezado h2,
  .formulario__encabezado h2 {
    font-size: 1.6rem;
  }

  .filtros {
    flex-direction: column;
    align-items: stretch;
  }

  .filtros__busqueda,
  .filtros__categoria {
    flex: auto;
    width: 100%;
  }

  .grilla-libros {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .seccion-formulario {
    margin-top: 48px;
  }
}

.filtro-favoritos {
  display: inline-flex; align-items: center; gap: .5rem; margin: .75rem 0 1rem;
  color: var(--texto-suave); font-weight: 600;
}
.filtro-favoritos input { width: auto; accent-color: var(--vino); }
.estado-carga, .estado-error { padding: 1rem; border-radius: 10px; background: var(--crema); }
.estado-error { color: #9b2c2c; }
</style>