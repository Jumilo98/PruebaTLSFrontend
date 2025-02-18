# **MovieReview App Next - Proyecto Next/React con MongoDB y JWT (PruebaTLS Frontend Jimmy Granizo)**

Este proyecto de almacenamiento de Usuarios y reseñas utilizando el API IMDB (rapid api), para visuzalir las peliculas, segura por autenticación mediante JWT, Puede registarse, logearse, ver peliculas, buscar, escribir reseñas y ver un historial de las mismas del usuario y de otros.

## **Estructura del Proyecto**

La estructura del proyecto es la siguiente:

      PRUEBATLSFRONTEND/
    │
    ├── .next/
    ├── node_modules/
    ├── public/
    │   └── images/
    │       └── auth/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx
    │   │   │   ├── register/
    │   │   │   │   └── page.tsx
    │   │   │   └──  layout.tsx 
    │   │   │           
    │   │   ├── (main)/
    │   │   │   ├── layout.tsx
    │   │   │   ├── page.tsx
    │   │   │   ├── search/
    │   │   │   │   └── page.tsx
    │   │   │   ├── movie/
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx
    │   │   │   └── profile/
    │   │   │       └── page.tsx
    │   │   ├── api/
    │   │   │   ├── auth/
    │   │   │   │   └── route.ts
    │   │   │   ├── movies/
    │   │   │   │   ├── [id]/
    │   │   │   │   │   └── route.ts
    │   │   │   │   ├── search/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── route.ts
    │   │   │   └── reviews/
    │   │   │       ├── movie/
    │   │   │       │   └── [movieId]/
    │   │   │       │       └── route.ts
    │   │   │       └── users/
    │   │   │            └── [userId]/    
    │   │   │                └── route.ts
    │   │   ├── components/
    │   │   │   ├── Footer.tsx
    │   │   │   ├── Header.tsx
    │   │   │   ├── MovieCard.tsx
    │   │   │   ├── ReviewForm.tsx
    │   │   │   └── ReviewList.tsx
    │   │   ├── hooks/
    │   │   │   ├── useAuth.ts
    │   │   │   └── useMovies.ts
    │   │   ├── models/
    │   │   │   ├── Movies.ts
    │   │   │   ├── Review.ts
    │   │   │   └── User.ts
    │   │   ├── styles/
    │   │   │   ├── css/
    │   │   │   └── globals.css
    │   │   └── layout.tsx
    │   ├── db/
    │   │   └── connect.ts
    │   └── utils/
    │       ├── alerts.ts
    │       ├── api.ts
    │       ├── validateObjects.ts
    │       └── auth.ts
    ├── env.local
    ├── .gitignore
    ├── eslint.config.mjs
    ├── LICENSE
    ├── next-env.d.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    └── tsconfig.json


## **Requisitos del Proyecto**

Asegúrate de cumplir con los siguientes requisitos antes de comenzar:

- **Node 18 o superior**.
- **MongoDB** (con el driver de MongoDB para PHP).
- **Node** (para gestionar dependencias).
- **Apache/Nginx** como servidor web (en este caso, se usa Laragon).

## **Instalación del Proyecto**

### **Paso 1: Clonar el Repositorio**

Primero, clona el repositorio en tu máquina local. Abre una terminal y ejecuta el siguiente comando:

**Recuerda: Deberas clonar dentro de cualquier directorio de esta manera podras iniciar**

```bash
git clone https://github.com/Jumilo98/PruebaTLSFrontend.git
cd PruebaTLSFrontend
```
### **Paso 2: Instalar las Dependencias**

Instala las dependencias del proyecto usando Composer. Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install --force
```

Esto descargará todas las dependencias necesarias definidas en el archivo package.json.

**Ojo: Una libreria tiene conflicto con la version de Next por lo que se instalara de todas maneras a pesar de su compatibilidad**

### **Paso 3: Configuración de MongoDB**

Si es necesario, configura la conexión a MongoDB en el archivo db/connect.ts. Si utilizas MongoDB en Laragon, puede que debas actualizar la URI de conexión (por ejemplo, si la contraseña o el usuario es diferente):

```js
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/MovieReviews';
```
### **Paso 4: Iniciar el Proyecto con Node**

Si vas a iniciar localmente, simplemente sigue estos pasos:

1. Abre VSC.
2. Inicia los servicios de mongoDB.
3. Ejecuta 
```bash
npm run dev
```
4. Accede al proyecto desde tu navegador en: http://localhost:3000.

**Recuerda: Si alguna otra app esta utilizando este puerto se modificara automaticamente VSC te lo indircara**

### **Paso 5: Verificar MongoDB**

Para trabajar con MongoDB en tu proyecto, primero necesitas asegurarte de que MongoDB esté instalado y corriendo correctamente.

1. Descargar MongoDB
Ve al sitio oficial de MongoDB:

Dirígete a la página de descargas de MongoDB en: https://www.mongodb.com/try/download/community.
Selecciona la versión de Windows (o el sistema operativo que estés usando) y elige la versión "Current Release" de MongoDB.

2. Descargar MongoDB:

Selecciona la opción de MSI (instalador para Windows) y descarga el archivo.
Instalar MongoDB:

3. Ejecuta el archivo MSI descargado y sigue el asistente de instalación.

-(Opcional) de seleccionar la opción de "Install MongoDB as a Service" (Instalar MongoDB como un servicio). Esto permitirá que MongoDB se ejecute automáticamente cuando inicies tu máquina.
-Deja las configuraciones predeterminadas para el proceso de instalación.

4. Verificar MongoDB en la Consola o MongoDB Compass

Deberas abrir el MongoDB Compass 

Posterior ejecutar en el CMD
```bash
C:\Program Files\MongoDB\mongosh-2.3.9-win32-x64\bin mongosh.exe
```

De esta manera con el MongoDB Compass podras ingresar a tus BD locales

### **Paso 6: Despliegue del Proyecto**

Para poder desplegar se puede utilizar Vercel y MongoAtlas

Deberas ejectuar el siguiente comando:

```bash
vercel
```

El compilador empezara a empaquetar el proyecto que de tal manera puedas utilizarlo dentro de Vercel

1. Se debera tener autenticado Mongoatlas y Vercel con la cuenta de github 
2. Se tendra que que agregar las variables de entorno dentro de Vercel
3. Cuando se cree un cluster DB, tendremos que copiar el acceso de Connect a nuestro Vercel
4. Redesplegamos el proyecto y estara conectado

En mi caso esta alojado en:

**https://prueba-tlsf-rontend.vercel.app/login**

Dentro se podra verificar su respectivo funcionamiento 