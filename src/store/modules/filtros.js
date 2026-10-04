export default {
  namespaced: true,
  state: () => ({ busqueda: '', categoria: '', soloFavoritos: false }),
  mutations: {
    SET_BUSQUEDA(state, valor) { state.busqueda = valor },
    SET_CATEGORIA(state, valor) { state.categoria = valor },
    SET_SOLO_FAVORITOS(state, valor) { state.soloFavoritos = valor }
  },
  getters: { busqueda: s => s.busqueda, categoria: s => s.categoria, soloFavoritos: s => s.soloFavoritos }
}
