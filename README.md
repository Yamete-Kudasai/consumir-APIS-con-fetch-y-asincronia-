# Consumir API de forma fácil con fetch de y asincronía

Este proyecto es una simple aplicación web que gestiona una lista de personajes de Marvel. Utiliza `JSON Server` como API REST simulada para crear, leer, actualizar y eliminar personajes, además utilizaremos TAILWIND con su CDN para estilizar nuestro front.

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

Vamos aconfigurar nuestro script en el package.json para ejecutarlo con npm run api :

```bash
{
  "name": "practica_agosto_1",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "api": "json-server --watch server/db.json --port 5000"
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
npm run api
```

Esto levantará un servidor RESTful en `http://localhost:5000` que simula una API con la base de datos del archivo `db.json`.

## Uso de la aplicación

### Funcionalidades principales

- **Crear un nuevo personaje**

  Para agregar un nuevo personaje, haz clic en el botón "Agregar personaje" en la interfaz y proporciona los detalles del personaje.

- **Ver la lista de personajes**

  Al cargar la página, la aplicación obtiene y muestra la lista de personajes disponibles en la API.

- **Eliminar un personaje**

  Cada personaje en la lista tiene un botón "Borrar" que, al hacer clic, eliminará ese personaje de la API.

### Código clave

- **Mostrar un personaje**

  ```javascript
  function mostrar() {
      // Código para mostrar un personaje utilizando fetch
  }
  ```

- **Eliminar personaje**

  ```javascript
  function eliminar(id) {
      // Código para eliminar un personaje espacifico
  }
  ```

- **Capturar personaje del formulario**

  ```javascript
  function personajeForm(personaje) {
      // Código para captuar los datos de los inputs del formulario
  }
  ```
  - **Actualizar un personaje**

  ```javascript
  function CrearActualizarItem() {
      // Código para crear y actualizar un personaje específico
  }
```

  
