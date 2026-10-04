<script setup>
import {
  reactive,
  ref,
  computed,
  watch
} from 'vue'

import LibroItem from '@/components/LibroItem.vue'


const props = defineProps({

  libroEditar: {
    type: Object,
    default: null
  }

})


const emit = defineEmits([
  'agregar',
  'guardar-edicion',
  'cancelar-edicion'
])


const categorias = [
  'Novela',
  'Ciencia ficción',
  'Fantasía',
  'Historia',
  'Biografía'
]


const error = ref('')


const nuevoLibro = reactive({
  titulo: '',
  autor: '',
  categoria: 'Novela',
  descripcion: '',
  imagen: ''
})


const modoEdicion = computed(() =>
  Boolean(props.libroEditar)
)


const libroVistaPrevia = computed(() => ({

  id:
    props.libroEditar?.id || 0,

  titulo:
    nuevoLibro.titulo ||
    'Título del libro',

  autor:
    nuevoLibro.autor ||
    'Autor',

  categoria:
    nuevoLibro.categoria,

  descripcion:
    nuevoLibro.descripcion ||
    'Aquí aparecerá la descripción del libro.',

  imagen:
    nuevoLibro.imagen,

  publicado:
    props.libroEditar?.publicado || false

}))


/* =========================================
   CUANDO PULSAMOS EDITAR
   ========================================= */

watch(
  () => props.libroEditar,

  (libro) => {

    if (libro) {

      nuevoLibro.titulo =
        libro.titulo

      nuevoLibro.autor =
        libro.autor

      nuevoLibro.categoria =
        libro.categoria

      nuevoLibro.descripcion =
        libro.descripcion

      nuevoLibro.imagen =
        libro.imagen || ''

      error.value = ''

    } else {

      limpiarFormulario()

    }

  },

  { immediate: true }
)


function limpiarFormulario() {

  nuevoLibro.titulo = ''
  nuevoLibro.autor = ''
  nuevoLibro.categoria = 'Novela'
  nuevoLibro.descripcion = ''
  nuevoLibro.imagen = ''

  error.value = ''

}


function enviar() {

  if (
    !nuevoLibro.titulo.trim() ||
    !nuevoLibro.autor.trim()
  ) {

    error.value =
      'Completa el título y el autor.'

    return
  }


  const datos = {

    titulo:
      nuevoLibro.titulo.trim(),

    autor:
      nuevoLibro.autor.trim(),

    categoria:
      nuevoLibro.categoria,

    descripcion:
      nuevoLibro.descripcion.trim(),

    imagen:
      typeof nuevoLibro.imagen === 'string'
        ? nuevoLibro.imagen.trim()
        : nuevoLibro.imagen

  }


  /* EDITAR */

  if (modoEdicion.value) {

    emit(
      'guardar-edicion',
      {
        id: props.libroEditar.id,
        ...datos
      }
    )

  }

  /* AGREGAR */

  else {

    emit(
      'agregar',
      datos
    )

  }


  limpiarFormulario()
}


function cancelar() {

  limpiarFormulario()

  emit('cancelar-edicion')

}
</script>


<template>
  <section class="formulario-libro">

    <!-- FORMULARIO -->

    <div class="formulario-columna">

      <div class="encabezado">

        <p class="eyebrow">
          {{
            modoEdicion
              ? 'EDITAR LIBRO'
              : 'NUEVO LIBRO'
          }}
        </p>


        <h2>
          {{
            modoEdicion
              ? 'Actualiza esta historia'
              : 'Agrega una historia'
          }}
        </h2>


        <p
          v-if="modoEdicion"
          class="editando"
        >
          Editando:
          <strong>
            {{ libroEditar.titulo }}
          </strong>
        </p>


        <p
          v-else
          class="subtitulo"
        >
          Completa los datos para incorporar
          un nuevo libro a tu colección.
        </p>

      </div>


      <form
        class="formulario"
        @submit.prevent="enviar"
      >

        <!-- TÍTULO -->

        <div class="campo">

          <label for="titulo">
            Título
          </label>

          <input
            id="titulo"
            v-model="nuevoLibro.titulo"
            type="text"
            placeholder="Ej: Cien años de soledad"
            @keyup.enter.prevent="enviar"
          >

        </div>


        <!-- AUTOR -->

        <div class="campo">

          <label for="autor">
            Autor
          </label>

          <input
            id="autor"
            v-model="nuevoLibro.autor"
            type="text"
            placeholder="Ej: Gabriel García Márquez"
          >

        </div>


        <!-- CATEGORÍA -->

        <div class="campo">

          <label for="categoria">
            Categoría
          </label>

          <select
            id="categoria"
            v-model="nuevoLibro.categoria"
          >

            <option
              v-for="categoria in categorias"
              :key="categoria"
              :value="categoria"
            >
              {{ categoria }}
            </option>

          </select>

        </div>


        <!-- PORTADA -->

        <div class="campo">

          <label for="imagen">
            URL de portada
          </label>

          <input
            id="imagen"
            v-model="nuevoLibro.imagen"
            type="text"
            placeholder="https://..."
          >

        </div>


        <!-- DESCRIPCIÓN -->

        <div class="campo campo-completo">

          <label for="descripcion">
            Descripción
          </label>

          <textarea
            id="descripcion"
            v-model="nuevoLibro.descripcion"
            rows="4"
            placeholder="Escribe una breve descripción..."
          ></textarea>

        </div>


        <!-- ERROR -->

        <p
          v-if="error"
          class="mensaje-error"
        >
          {{ error }}
        </p>


        <!-- BOTONES -->

        <div class="acciones-formulario">

          <button
            type="submit"
            class="btn-principal"
          >
            {{
              modoEdicion
                ? 'Guardar cambios'
                : 'Agregar libro'
            }}

            <span>
              {{ modoEdicion ? '✓' : '＋' }}
            </span>
          </button>


          <button
            v-if="modoEdicion"
            type="button"
            class="btn-cancelar"
            @click="cancelar"
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>


    <!-- VISTA PREVIA -->

    <aside class="preview-columna">

      <div class="preview-encabezado">

        <p class="eyebrow">
          VISTA PREVIA
        </p>

        <h3>
          Así se verá tu libro
        </h3>

      </div>


      <div class="preview-card">

        <LibroItem
          :libro="libroVistaPrevia"
          :vista-previa="true"
        />

      </div>

    </aside>

  </section>
</template>


<style scoped>

.formulario-libro {
  width: 100%;

  display: grid;

  grid-template-columns:
    minmax(0, 1.65fr)
    minmax(280px, 0.75fr);

  gap: 38px;

  align-items: start;
}


/* FORMULARIO */

.formulario-columna {
  min-width: 0;

  padding: 30px;

  background: #fffcf8;

  border: 1px solid #e8ddd7;
  border-radius: 18px;
}


/* ENCABEZADO */

.encabezado {
  margin-bottom: 25px;
}

.eyebrow {
  margin: 0 0 7px;

  color: #c66a4a;

  font-size: 0.68rem;
  font-weight: 800;

  letter-spacing: 2.5px;
}

.encabezado h2 {
  margin: 0 0 8px;

  color: #402333;

  font-size: 1.65rem;
}

.subtitulo {
  margin: 0;

  color: #746d70;

  font-size: 0.88rem;

  line-height: 1.55;
}


/* EDITANDO */

.editando {
  display: inline-block;

  margin: 4px 0 0;

  padding: 8px 12px;

  border-radius: 8px;

  background: #f6e4dc;

  color: #a8563e;

  font-size: 0.8rem;
}


/* FORM */

.formulario {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 18px;
}

.campo {
  display: flex;
  flex-direction: column;

  gap: 7px;
}

.campo-completo {
  grid-column: 1 / -1;
}

.campo label {
  color: #402333;

  font-size: 0.79rem;
  font-weight: 700;
}


/* INPUTS */

.campo input,
.campo select,
.campo textarea {
  width: 100%;

  box-sizing: border-box;

  border: 1px solid #e3d7d1;
  border-radius: 10px;

  background: #fbf7f2;

  color: #29252a;

  font-family: inherit;
  font-size: 0.86rem;

  outline: none;
}

.campo input,
.campo select {
  height: 44px;

  padding: 0 13px;
}

.campo textarea {
  min-height: 100px;

  padding: 12px 13px;

  resize: vertical;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
  border-color: #9b6075;

  background: #ffffff;

  box-shadow:
    0 0 0 3px
    rgba(99, 48, 74, 0.08);
}


/* ERROR */

.mensaje-error {
  grid-column: 1 / -1;

  margin: 0;

  padding: 11px 14px;

  border-radius: 9px;

  background: #f8e4e2;

  color: #a84b42;

  font-size: 0.8rem;
}


/* ACCIONES */

.acciones-formulario {
  grid-column: 1 / -1;

  display: flex;
  align-items: center;

  gap: 10px;
}


.btn-principal,
.btn-cancelar {
  height: 42px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  padding: 0 22px;

  border-radius: 999px;

  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;

  cursor: pointer;
}


.btn-principal {
  border: none;

  background: #63304a;

  color: #ffffff;
}

.btn-principal:hover {
  background: #402333;
}


.btn-cancelar {
  border: 1px solid #d9c9c4;

  background: transparent;

  color: #63304a;
}

.btn-cancelar:hover {
  background: #f3e8e5;
}


/* PREVIEW */

.preview-columna {
  min-width: 0;

  align-self: start;

  height: auto !important;
  min-height: 0 !important;

  padding: 24px;

  background: #f8f3ec;

  border: 1px solid #e8ddd7;
  border-radius: 18px;
}

.preview-encabezado {
  margin-bottom: 17px;
}

.preview-encabezado h3 {
  margin: 0;

  color: #402333;

  font-size: 1rem;
}

.preview-card {
  width: 100%;

  height: auto !important;
  min-height: 0 !important;
}

.preview-card :deep(.libro-card) {
  height: auto !important;
  min-height: 0 !important;
}


/* RESPONSIVE */

@media (max-width: 900px) {

  .formulario-libro {
    grid-template-columns: 1fr;
  }

  .preview-columna {
    width: 100%;
    max-width: 430px;

    justify-self: center;
  }

}


@media (max-width: 600px) {

  .formulario-columna {
    padding: 22px 18px;
  }

  .formulario {
    grid-template-columns: 1fr;
  }

  .campo-completo,
  .mensaje-error,
  .acciones-formulario {
    grid-column: auto;
  }

  .acciones-formulario {
    flex-direction: column;
  }

  .btn-principal,
  .btn-cancelar {
    width: 100%;
  }

}

</style>