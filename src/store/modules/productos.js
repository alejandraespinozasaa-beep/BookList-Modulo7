import api from '@/api'

export default {
  namespaced: true,
  state: () => ({ libros: [], loading: false, error: null }),
  mutations: {
    SET_LIBROS(state, libros) { state.libros = libros },
    AGREGAR_LIBRO(state, libro) { state.libros.push(libro) },
    EDITAR_LIBRO(state, libroActualizado) {
      const i = state.libros.findIndex(libro => String(libro.id) === String(libroActualizado.id))
      if (i !== -1) state.libros[i] = libroActualizado
    },
    ELIMINAR_LIBRO(state, id) { state.libros = state.libros.filter(libro => String(libro.id) !== String(id)) },
    SET_LOADING(state, valor) { state.loading = valor },
    SET_ERROR(state, valor) { state.error = valor }
  },
  actions: {
    async cargarLibros({ commit }) {
      commit('SET_LOADING', true); commit('SET_ERROR', null)
      try { const { data } = await api.get('/libros'); commit('SET_LIBROS', data) }
      catch (e) { commit('SET_ERROR', 'No se pudieron cargar los libros. Comprueba que json-server esté ejecutándose.') }
      finally { commit('SET_LOADING', false) }
    },
    async agregarLibro({ commit }, datos) {
      const { data } = await api.post('/libros', { ...datos, publicado: false })
      commit('AGREGAR_LIBRO', data)
    },
    async editarLibro({ commit, state }, datos) {
      const anterior = state.libros.find(l => String(l.id) === String(datos.id)) || {}
      const { data } = await api.put(`/libros/${datos.id}`, { ...anterior, ...datos })
      commit('EDITAR_LIBRO', data)
    },
    async eliminarLibro({ commit }, id) { await api.delete(`/libros/${id}`); commit('ELIMINAR_LIBRO', id) },
    async alternarPublicado({ commit, state }, id) {
      const libro = state.libros.find(l => String(l.id) === String(id)); if (!libro) return
      const { data } = await api.put(`/libros/${id}`, { ...libro, publicado: !libro.publicado })
      commit('EDITAR_LIBRO', data)
    }
  },
  getters: {
    libros: state => state.libros,
    loading: state => state.loading,
    error: state => state.error,
    libroPorId: state => id => state.libros.find(l => String(l.id) === String(id)),
    totalLibros: state => state.libros.length,
    librosPublicados: state => state.libros.filter(l => l.publicado).length,
    librosEnRevision: state => state.libros.filter(l => !l.publicado).length
  }
}
