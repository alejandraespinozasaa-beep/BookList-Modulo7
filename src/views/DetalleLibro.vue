<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()

const libro = computed(() => {
  return store.getters['productos/libroPorId'](props.id)
})

const imagenPorDefecto =
  'https://placehold.co/300x420/f1efff/5b4b8a?text=BookList'

const publicPath = process.env.BASE_URL

const imagenLibro = computed(() => {
  if (!libro.value?.imagen) {
    return imagenPorDefecto
  }

  return `${publicPath}${libro.value.imagen.replace(/^\//, '')}`
})
</script>

<template>
  <section class="detalle">

    <router-link
      to="/libros"
      class="volver"
    >
      ← Volver a mi biblioteca
    </router-link>

    <article
      v-if="libro"
      class="detalle__tarjeta"
    >

      <div class="detalle__portada">
        <img
          :src="imagenLibro"
          :alt="`Portada de ${libro.titulo}`"
        >
      </div>

      <div class="detalle__contenido">

        <div class="detalle__cabecera">

          <span class="categoria">
            {{ libro.categoria }}
          </span>

          <span
            class="estado"
            :class="{ publicado: libro.publicado }"
          >
            {{ libro.publicado ? 'Publicado' : 'En revisión' }}
          </span>

        </div>

        <h1>{{ libro.titulo }}</h1>

        <p class="autor">
          {{ libro.autor }}
        </p>

        <div class="separador"></div>

        <h2>Descripción</h2>

        <p class="descripcion">
          {{ libro.descripcion || 'Este libro todavía no tiene descripción.' }}
        </p>

        <router-link
          to="/libros"
          class="boton-biblioteca"
        >
          Ver todos mis libros
        </router-link>

      </div>

    </article>

    <div
      v-else
      class="no-encontrado"
    >
      <div class="no-encontrado__icono">
        📖
      </div>

      <h1>Libro no encontrado</h1>

      <p>
        El libro que buscas no está disponible en tu biblioteca.
      </p>

      <router-link
        to="/libros"
        class="boton-biblioteca"
      >
        Volver a la biblioteca
      </router-link>
    </div>

  </section>
</template>

<style scoped>
.detalle {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.volver {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #5b4b8a;
  font-weight: 700;
  text-decoration: none;
}

.volver:hover {
  color: #493b72;
}

.detalle__tarjeta {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2.5rem;
  padding: 2.5rem;
  background: white;
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(30, 39, 73, 0.08);
}

.detalle__portada {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f7f5f2;
  border-radius: 14px;
}

.detalle__portada img {
  width: 100%;
  max-width: 260px;
  height: 370px;
  object-fit: contain;
  object-position: center;
}

.detalle__contenido {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.detalle__cabecera {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.categoria,
.estado {
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.categoria {
  background: #efedff;
  color: #5b4b8a;
}

.estado {
  background: #fff4e0;
  color: #b45309;
}

.estado.publicado {
  background: #dcfce7;
  color: #15803d;
}

.detalle h1 {
  margin: 0 0 0.5rem;
  color: #1e2749;
  font-size: 2.5rem;
  line-height: 1.2;
}

.autor {
  margin: 0;
  color: #687394;
  font-size: 1.15rem;
}

.separador {
  width: 100%;
  height: 1px;
  margin: 1.8rem 0;
  background: #e8eaf2;
}

.detalle h2 {
  margin: 0 0 0.8rem;
  color: #1e2749;
  font-size: 1.2rem;
}

.descripcion {
  margin: 0 0 2rem;
  color: #4b5878;
  line-height: 1.7;
}

.boton-biblioteca {
  width: fit-content;
  padding: 0.75rem 1.2rem;
  border-radius: 10px;
  background: #5b4b8a;
  color: white;
  font-weight: 700;
  text-decoration: none;
}

.boton-biblioteca:hover {
  background: #493b72;
}

.no-encontrado {
  padding: 4rem 1.5rem;
  text-align: center;
}

.no-encontrado__icono {
  margin-bottom: 1rem;
  font-size: 4rem;
}

.no-encontrado h1 {
  margin-bottom: 1rem;
}

.no-encontrado p {
  margin-bottom: 2rem;
  color: #687394;
}

.no-encontrado .boton-biblioteca {
  display: inline-block;
}

@media (max-width: 760px) {
  .detalle {
    padding: 2rem 1rem;
  }

  .detalle__tarjeta {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .detalle__portada img {
    max-width: 220px;
    height: 320px;
  }

  .detalle h1 {
    font-size: 2rem;
  }
}
</style>