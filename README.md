# 📚 BookList

BookList es una aplicación web desarrollada con **Vue 3** para gestionar una biblioteca personal de libros.

El proyecto corresponde a la evolución de una SPA desarrollada durante el curso de **Desarrollo Front End**, incorporando en el Módulo 7 gestión de estado con **Vuex**, consumo de API mediante **Axios**, persistencia de datos con **JSON Server**, operaciones CRUD, filtros y favoritos.

---

## 🚀 Tecnologías utilizadas

- Vue 3
- Composition API
- JavaScript
- Vue Router
- Vuex
- Axios
- JSON Server
- HTML5
- CSS3
- LocalStorage
- Git / GitHub

---

## 📖 Funcionalidades

BookList permite:

- Visualizar una colección de libros.
- Consultar el detalle de cada libro.
- Agregar nuevos libros.
- Editar libros existentes.
- Eliminar libros.
- Cambiar el estado de un libro entre **Publicado** y **En revisión**.
- Buscar libros por título o autor.
- Filtrar libros por categoría.
- Marcar y desmarcar libros como favoritos.
- Mostrar únicamente los libros favoritos.
- Mantener los cambios realizados mediante JSON Server.
- Gestionar estados de carga y errores durante las solicitudes a la API.
- Navegar entre distintas vistas mediante Vue Router.
- Utilizar rutas dinámicas para acceder al detalle de cada libro.
- Mostrar una página 404 para rutas inexistentes.
- Iniciar y cerrar sesión.
- Proteger determinadas rutas de la aplicación.

---

## 🧩 Arquitectura del proyecto

El proyecto utiliza **Vue 3 con Composition API** y una estructura basada en componentes reutilizables y vistas.

Se utilizan herramientas como:

- `<script setup>`
- `ref()`
- `computed()`
- `defineProps()`
- `defineEmits()`

Esta estructura permite separar las responsabilidades de la aplicación y mantener el código organizado y reutilizable.

---

## 🧭 Vue Router

La navegación de la aplicación se gestiona mediante **Vue Router**.

Entre las principales vistas se encuentran:

- Inicio
- Mis libros
- Nuevo libro
- Detalle de libro
- Login
- Página 404

El detalle de cada libro utiliza una ruta dinámica basada en su identificador:

```text
/libros/:id
```

También se utiliza Vue Router para controlar el acceso a las rutas que requieren una sesión activa.

---

## 🗃️ Gestión de estado con Vuex

La aplicación utiliza **Vuex** para administrar el estado global.

El store se encuentra organizado mediante módulos que separan las distintas responsabilidades de la aplicación:

- `productos`: administra la colección de libros y las operaciones asociadas.
- `filtros`: administra los criterios de búsqueda y filtrado.
- `favoritos`: administra los libros seleccionados como favoritos.

La modularización permite mantener una estructura más clara y facilita la gestión del estado de la aplicación.

---

## 🌐 Consumo de API

En el Módulo 7 se incorporó el consumo de una API utilizando **Axios**.

Los libros se obtienen desde un servidor local creado mediante **JSON Server**, utilizando como base de datos el archivo:

```text
db.json
```

Esto permite simular una API REST y realizar operaciones sobre los datos.

Las principales operaciones implementadas son:

- **GET** → obtener libros.
- **POST** → agregar libros.
- **PUT / PATCH** → actualizar información.
- **DELETE** → eliminar libros.

---

## 💾 Persistencia de datos

Los cambios realizados sobre la colección de libros se almacenan mediante **JSON Server**.

Las operaciones de agregar, editar, eliminar o modificar el estado de publicación actualizan los datos almacenados en:

```text
db.json
```

Por esta razón, los cambios realizados permanecen disponibles después de recargar la aplicación.

---

## ✏️ Operaciones CRUD

BookList implementa operaciones CRUD para administrar la colección.

### Crear

Permite agregar nuevos libros mediante un formulario.

### Leer

La colección se obtiene desde la API y se muestra de forma reactiva en la aplicación.

### Actualizar

Permite modificar la información de un libro y cambiar su estado entre **Publicado** y **En revisión**.

### Eliminar

Permite eliminar libros de la colección y actualizar los datos almacenados en JSON Server.

---

## 🔎 Búsqueda y filtros

La aplicación incorpora herramientas para facilitar la búsqueda dentro de la biblioteca.

Es posible:

- Buscar por título.
- Buscar por autor.
- Filtrar por categoría.
- Mostrar únicamente los libros favoritos.

Los filtros trabajan de forma reactiva sobre la colección administrada mediante Vuex.

---

## ⭐ Favoritos

Los libros pueden marcarse o desmarcarse como favoritos.

Esta funcionalidad se administra mediante un módulo específico de Vuex y permite visualizar únicamente los libros seleccionados como favoritos.

---

## 🔐 Inicio de sesión

BookList incorpora un sistema de inicio y cierre de sesión.

El estado de la sesión se administra mediante **LocalStorage**, permitiendo mantener la información necesaria para controlar el acceso a determinadas vistas.

Vue Router utiliza esta información para proteger las rutas que requieren autenticación.

---

## ⚠️ Estados de carga y manejo de errores

Durante las solicitudes realizadas a la API, la aplicación administra diferentes estados:

- Carga de información.
- Solicitudes exitosas.
- Errores de comunicación con la API.

Esto permite informar al usuario sobre el estado de las operaciones realizadas.

---

## 📱 Diseño responsive

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla.

Para ello se utilizan:

- CSS responsive.
- Media queries.
- Componentes reutilizables.
- Diseño mediante tarjetas.
- Distribución adaptable de los contenidos.

---

## 📁 Estructura general del proyecto

```text
BookList_Modulo7/
│
├── public/
│   └── portadas/
│
├── src/
│   ├── components/
│   ├── router/
│   ├── store/
│   ├── views/
│   ├── App.vue
│   └── main.js
│
├── db.json
├── package.json
├── vue.config.js
└── README.md
```

---

## ⚙️ Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

---

## 🗄️ Ejecutar JSON Server

El proyecto utiliza JSON Server para simular la API REST.

En una terminal ejecutar:

```bash
npm run mock
```

El servidor se ejecutará en:

```text
http://localhost:3001
```

Esta terminal debe permanecer abierta mientras se utiliza la aplicación.

---

## 💻 Ejecutar BookList

En una segunda terminal ejecutar:

```bash
npm run serve
```

Durante el desarrollo local, la aplicación se encuentra disponible en:

```text
http://localhost:8080/booklist-vue/
```

---

## 🧪 Uso de la aplicación

Una vez iniciada la aplicación, el usuario puede:

1. Iniciar sesión.
2. Acceder a la colección desde **Mis libros**.
3. Buscar libros por título o autor.
4. Filtrar libros por categoría.
5. Marcar libros como favoritos.
6. Mostrar únicamente los favoritos.
7. Consultar el detalle de un libro.
8. Agregar nuevos libros.
9. Editar libros existentes.
10. Cambiar el estado de publicación.
11. Eliminar libros.
12. Cerrar sesión.

Las modificaciones realizadas mediante la API se almacenan en `db.json`.

---

## 📚 Evolución del proyecto

BookList fue desarrollado progresivamente durante el curso de Desarrollo Front End.

En una primera etapa se implementaron conceptos fundamentales de Vue, entre ellos:

- Componentes.
- Props.
- Eventos.
- Directivas.
- Formularios reactivos.
- Vue Router.
- Rutas dinámicas.
- Navegación entre vistas.

Posteriormente, durante el **Módulo 7**, la aplicación fue ampliada incorporando:

- Vuex.
- Store modular.
- Axios.
- JSON Server.
- Consumo de API REST.
- Operaciones CRUD.
- Persistencia de datos.
- Estados de carga y error.
- Sistema de favoritos.
- Filtros integrados con el estado global.

Estas mejoras permiten administrar los datos de forma centralizada y realizar operaciones persistentes sobre la colección de libros.

---

## 👩‍💻 Autora

**Alejandra Espinoza Saavedra**

Proyecto desarrollado como parte del curso de **Desarrollo Front End**.