# Prueba Tecnica

# Golf App

Aplicación móvil creada con **React Native + Expo**, que muestra una lista de jugadores de golf y permite ver detalles, filtrar por categoría y marcar como favorito.

## Tecnologías utilizadas

- **Expo SDK 52**
- **TypeScript**
- **Redux Toolkit** para gestión de estado global
- **Redux-Saga** para efectos secundarios (API calls)\*
- **Apisauce** para peticiones HTTP \*
- **React Navigation v6**
- **FlatList** para rendimiento en la lista

---

## Instalación y ejecución

```bash
git clone https://github.com/tu-usuario/jugadores-app.git
cd jugadores-app
yarn install
yarn start
```

> Debe asegurarse de tener `expo-cli` instalado globalmente.

---

## Endpoint utilizado

- Listado de jugadores:

```
GET https://dev-api.iqtekgolf.innovix.com.do:440/api/player/list
Headers: {
  "x-token": "F3J92ND9J5@493SBMDJW1344JEUDJ3TES3I/3"
}
```

---

## Características implementadas

### Pantalla "Jugadores"

- Búsqueda local de jugadores.
- Tabs A, B, C para filtrar por categoría.
- FlatList para mostrar la lista de jugadores.
- En cada jugador se muestra el HCP y si esta marcado como favorito.

### Pantalla Detalle (DetalleJugador)

- Navegación al hacer click en jugador.
- Avatar, nombre, HCP, descripción simulada.
- Botón para marcar/quitar favorito.

---

## Prácticas aplicadas

- Estructura modular.
- Separación de componentes, redux y sagas.
- Manejo de errores en la saga.
- Carga condicional, estados de loading.
- Tipado estricto con TypeScript.

---
