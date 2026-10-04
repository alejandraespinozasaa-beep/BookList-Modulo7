<template>
  <section class="no-encontrado">
    <div class="contenido">
      <span class="numero">404</span>

      <h1>Página no encontrada</h1>

      <p>
        Parece que esta página se perdió entre los libros.
      </p>

      <router-link
        to="/"
        class="boton"
      >
        Volver al inicio
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.no-encontrado {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.contenido {
  max-width: 520px;
  text-align: center;
}

.numero {
  display: block;
  margin-bottom: 0.5rem;
  color: #5b4b8a;
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
}

h1 {
  margin-bottom: 0.8rem;
  color: #1e2749;
  font-size: 2rem;
}

p {
  margin-bottom: 2rem;
  color: #687394;
  font-size: 1.05rem;
}

.boton {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  background: #5b4b8a;
  color: white;
  font-weight: 700;
  text-decoration: none;
}

.boton:hover {
  background: #493b72;
}
</style>
