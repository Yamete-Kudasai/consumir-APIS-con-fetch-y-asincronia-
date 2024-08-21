Aquí tienes todo el contenido en formato Markdown (`.md`):

# Consumir API de forma fácil con fetch de y asincronía

Este proyecto es una simple aplicación web que gestiona una lista de personajes de Marvel. Utiliza `JSON Server` como API REST simulada para crear, leer, actualizar y eliminar personajes.

## Requisitos previos

Antes de empezar, asegúrate de tener instalado lo siguiente:

- Node.js y npm (Node Package Manager)
- JSON Server

## Instalación

### 1. Clonar el repositorio

```bash
git https://github.com/Yamete-Kudasai/consumir-APIS-con-fetch-y-asincronia-.git
cd consumir-APIS-con-fetch-y-asincronia-
```

### 2. Instalar las dependencias

No se requieren dependencias adicionales aparte de `JSON Server`.

### 3. Instalar JSON Server

Si no tienes `JSON Server` instalado globalmente, puedes instalarlo con npm:

```bash
npm install -g json-server
```

## Configuración

### 1. Configurar en package.json un script para ejecutar json server 

En la terminal, dentro de la carpeta del proyecto, ejecuta el siguiente comando para iniciar `JSON Server`:

```bash
{
  "name": "practica_agosto_1",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "json-server --watch server/db.json"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "json-server": "^1.0.0-beta.2"
  }
}

```
### 2. Iniciar JSON Server

En la terminal, dentro de la carpeta del proyecto, ejecuta el siguiente comando para iniciar `JSON Server`:

```bash
npm run server
```

Esto levantará un servidor RESTful en `http://localhost:3000` que simula una API con la base de datos del archivo `db.json`.

## Uso de la aplicación

### Funcionalidades principales

- **Crear un nuevo personaje**

  Para agregar un nuevo personaje, haz clic en el botón "Agregar personaje" en la interfaz y proporciona los detalles del personaje.

- **Ver la lista de personajes**

  Al cargar la página, la aplicación obtiene y muestra la lista de personajes disponibles en la API.

- **Eliminar un personaje**

  Cada personaje en la lista tiene un botón "Borrar" que, al hacer clic, eliminará ese personaje de la API.

### Código clave

- **Crear un personaje**

  ```javascript
  function createChamp() {
      // Código para crear un personaje utilizando fetch y JSON Server
  }
  ```

- **Obtener la lista de personajes**

  ```javascript
  function getChamp() {
      // Código para obtener la lista de personajes y renderizarla en la interfaz
  }
  ```

- **Eliminar un personaje**

  ```javascript
  function deleteChamp(id) {
      // Código para eliminar un personaje específico
  }
  ```
  - **Actualizar un personaje**

  ```javascript
  function updateChamp(id) {
      // Código para eliminar un personaje específico
  }
```

  
