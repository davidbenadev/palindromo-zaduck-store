
# Palindromo Za-Duck Store 🦆

## 📋 Descripción

Este es un proyecto de demostración que implementa un catálogo de productos y les aplica descuento en caso de que su marca o su descripción sea un palindromo, usando una arquitectura **Full Stack** con **NestJS** (Backend), **Next.js** (Frontend) y **PostgreSQL** (Base de Datos).

-----

## 🛠️ Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

  * **Docker**
  * **Docker Compose** (Generalmente viene incluido con las instalaciones modernas de Docker)
  * **Node.js** (Opcional, solo si quieres correr los tests)


-----

## 📦 Uso en Producción (Docker Compose)

El modo de Producción utiliza imágenes optimizadas con un tamaño mínimo y máximo rendimiento.

### 1\. Levantar el Entorno

Usamos el archivo `docker-compose.prod.yml` para levantar la aplicación en modo productivo.

```bash
# 1. Construir las imágenes (compila NextJS y NestJS)
docker-compose -f docker-compose.prod.yml build

# 2. Levantar los contenedores en segundo plano (-d)
docker-compose -f docker-compose.prod.yml up -d
```

| Servicio | Puerto Local | URL |
| :--- | :--- | :--- |
| **Frontend** (NextJS) | 3001 | `http://localhost:3001` |
| **Backend** (NestJS) | 3000 | `http://localhost:3000/api` |

### 2\. Terminar y Limpiar el Entorno de Producción

Para detener y eliminar los contenedores, redes y volúmenes de datos que no son esenciales:

```bash
# Detiene los contenedores y elimina redes
docker-compose -f docker-compose.prod.yml down

# Para eliminar los datos de la base de datos (volumen postgres_data), añade -v al final
```

-----

## 💻 Uso en Desarrollo (Docker Compose)

El modo de Desarrollo usa `volumes` para mapear el código fuente, permitiendo la **recarga en caliente** (`hot-reloading`) al guardar cambios en tu IDE.

### 1\. Levantar el Entorno

Usamos el archivo `docker-compose.yml` por defecto (sin flag `-f`).

```bash
# Levantar los contenedores en segundo plano (-d)
docker-compose up -d
```

### 2\. Terminar el Entorno de Desarrollo

Simplemente detiene y elimina los contenedores de desarrollo:

```bash
docker-compose down
```

-----

## ✨ Comandos de Mantenimiento (Seed & Reset)

Una vez que el backend (`nestjs_api` o `nestjs_api_prod`) esté corriendo en `http://localhost:3000`, puedes poblar o limpiar la base de datos a través de los *endpoints*:

| Acción | Endpoint (GET) |
| :--- | :--- |
| **Poblar DB** | `http://localhost:3000/products/seed` |
| **Limpiar DB** | `http://localhost:3000/products/reset` |

### Casos de Prueba

La funcionalidad principal de este proyecto es la búsqueda de productos en los campos `brand` y `description`, incluyendo la siguiente regla: **Si el término de búsqueda es un palíndromo, se aplica un 50% de descuento a todos los resultados obtenidos.**

Es necesario ejecutar el seeder (`http://localhost:3000/products/seed`) antes de realizar estas pruebas.

### Pruebas donde no es un Palindromo 

| Término de Búsqueda | Condición |
| :--- | :--- |
| **`nike`** | Coincidencia Simple (Marca) |
| **`correr`** | Coincidencia Simple (Descripción) |
| **`retro`** | Coincidencia Múltiple (Descripción) |
| **`urbana`** | Coincidencia Híbrida (Marca y Descripción) |
| **`a`** | Término Corto |

### Pruebas de Palíndromo (Aplicación del 50% de Descuento)

| Término de Búsqueda | Condición |
| :--- | :--- |
| **`abba`** | Palíndromo Puro (Marca) |
| **`oso`** | Palíndromo Puro (Descripción) |
| **`101`** | Palíndromo Numérico (Descripción) |
| **`radar`** | Palíndromo + Múltiples Resultados |

-----

## 🧪 Ejecución de Tests (Backend: NestJS)

Los tests unitarios del backend deben correr dentro de un entorno Node.js.

```bash
npm run test
```

