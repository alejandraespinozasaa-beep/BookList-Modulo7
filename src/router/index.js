
import { createRouter, createWebHashHistory } from 'vue-router'

import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'
import LoginView from '../views/LoginView.vue'
import NoEncontradoView from '../views/NoEncontradoView.vue'

import { sesion } from '@/data/sesion'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    redirect: '/libros'
  },
  {
    path: '/libros',
    name: 'libros',
    component: ListaLibros,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/libros/:id',
    name: 'detalleLibro',
    component: DetalleLibro,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'noEncontrado',
    component: NoEncontradoView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,

  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }

    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !sesion.usuario) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  if (to.name === 'login' && sesion.usuario) {
    return {
      name: 'inicio'
    }
  }
})

export default router