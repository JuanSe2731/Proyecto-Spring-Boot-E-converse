# 🛒 E-Converse

**E-Converse** es un sistema de comercio electrónico completo desarrollado como proyecto académico.  
Su objetivo es simular una tienda virtual profesional donde los usuarios pueden registrarse, navegar por un catálogo de productos, agregarlos al carrito y gestionar pedidos.

El proyecto integra **Backend REST API con Spring Boot, Frontend SPA con React y Base de datos NoSQL MongoDB**, aplicando buenas prácticas en el desarrollo de aplicaciones web modernas con arquitectura full-stack.

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Spring Boot 3.5.6** (Java 20)
  - Spring Security con JWT para autenticación
  - Spring Data MongoDB para persistencia NoSQL
  - API REST con ResponseEntity y manejo de errores
  - CORS configurado para desarrollo local (puertos 5173, 5174, 5500)
  - Logging detallado en controladores
  - Swagger/OpenAPI para documentación de API

### Base de Datos
- **MongoDB Atlas** (Cloud NoSQL Database)
  - Modelo de documentos flexible
  - Colecciones: usuario, rol, producto, categoria, carrito, pedido
  - Relaciones por referencias de IDs
  - Conexión remota con autenticación

### Frontend
- **React 18** con **Vite**
  - Componentes funcionales con Hooks
  - React Router v6 para navegación
  - Zustand para manejo de estado global (auth, cart)
  - Axios con interceptores para JWT
  - Rutas protegidas (ProtectedRoute, AdminRoute)

- **TailwindCSS 3.4**
  - Utility-first CSS framework
  - Tema personalizado (colores primary/secondary)
  - Componentes reutilizables (botones, cards, inputs)
  - Diseño responsive con breakpoints
  - Animaciones y transiciones suaves

- **Heroicons**
  - Librería de iconos de Tailwind Labs
  - Iconos SVG optimizados
  - Integración nativa con React

---

## 📂 Estructura del Proyecto

```
Proyecto-Spring-Boot-E-converse/
├── backend/
│   ├── src/main/java/backend/application/
│   │   ├── config/          # OpenAPI/Swagger configuration
│   │   ├── controller/      # REST Endpoints (8 controladores)
│   │   │   ├── AuthController.java      # Login, registro, JWT
│   │   │   ├── UsuarioController.java   # CRUD usuarios
│   │   │   ├── RolController.java       # Gestión de roles
│   │   │   ├── ProductoController.java  # CRUD productos
│   │   │   ├── CategoriaController.java # CRUD categorías
│   │   │   ├── CarritoController.java   # Gestión de carrito
│   │   │   └── PedidoController.java    # Gestión de pedidos
│   │   ├── model/           # Entidades MongoDB (8 modelos)
│   │   │   ├── Usuario.java (@Document)
│   │   │   ├── Rol.java
│   │   │   ├── Producto.java
│   │   │   ├── Categoria.java
│   │   │   ├── Carrito.java
│   │   │   ├── ItemCarrito.java
│   │   │   ├── Pedido.java
│   │   │   └── ItemPedido.java
│   │   ├── repository/      # MongoRepository interfaces
│   │   ├── service/         # Lógica de negocio
│   │   ├── seguridad/       # JWT, SecurityConfig, Filters
│   │   └── exception/       # Manejo de excepciones
│   ├── src/main/resources/
│   │   └── application.properties  # MongoDB URI, JWT config
│   └── pom.xml              # Dependencias Maven
│
├── frontend-react/          # 🆕 Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   │   ├── ProtectedRoute.jsx   # Guard para rutas autenticadas
│   │   │   └── AdminRoute.jsx       # Guard para rutas de admin
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Página de inicio de sesión
│   │   │   ├── Register.jsx         # Página de registro
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx    # Panel admin (menú módulos)
│   │   │   │   ├── Usuarios.jsx     # ✅ CRUD Usuarios completo
│   │   │   │   ├── Roles.jsx        # Pendiente
│   │   │   │   ├── Categorias.jsx   # Pendiente
│   │   │   │   └── Productos.jsx    # Pendiente
│   │   │   └── client/
│   │   │       ├── Dashboard.jsx    # Catálogo de productos
│   │   │       └── Cart.jsx         # Carrito de compras
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance con interceptors
│   │   │   └── index.js             # API services (auth, usuarios, roles, etc.)
│   │   ├── store/
│   │   │   ├── authStore.js         # Zustand: autenticación
│   │   │   └── cartStore.js         # Zustand: carrito de compras
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Funciones auxiliares
│   │   ├── App.jsx                  # Router principal
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Estilos globales + TailwindCSS
│   ├── public/                      # Assets estáticos
│   ├── .env                         # Variables de entorno (VITE_API_URL)
│   ├── tailwind.config.js           # Configuración de Tailwind
│   ├── postcss.config.js            # PostCSS para Tailwind
│   ├── vite.config.js               # Configuración de Vite
│   └── package.json                 # Dependencias npm
│
└── frontend/                # 📦 Frontend vanilla (legacy)
    └── (mantenido para referencia)
```

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticación y Seguridad
- ✅ **Login con JWT**: Token Bearer almacenado en localStorage
- ✅ **Registro de usuarios**: Validación de formularios con React
- ✅ **Rutas protegidas**: ProtectedRoute y AdminRoute components
- ✅ **Control de roles**: Administrador (id: 1), Cliente (id: 2), Vendedor (id: 3)
- ✅ **Logout seguro**: Limpieza de tokens y redirección a /login
- ✅ **Auto-login**: Restauración de sesión desde localStorage
- ✅ **Interceptores Axios**: Auto-inyección de token y logout en 401

### 👤 Gestión de Usuarios (Admin) ✅ COMPLETO
- ✅ **CRUD completo** con interfaz moderna en React
- ✅ **Tabla responsive** con búsqueda en tiempo real
- ✅ **Modal de creación/edición** con validaciones
- ✅ **Eliminación con confirmación**
- ✅ **Estados visuales**: Badges para roles y estado activo/inactivo
- ✅ **Selección de rol**: Dropdown dinámico con roles de BD
- ✅ **Actualización de contraseña**: Opcional al editar (mantiene actual si se deja vacío)
- ✅ **Campo dirección opcional**
- ✅ **Sin campo teléfono** (removido según requerimientos)
- ✅ **Logging detallado**: Consola con emojis para debugging

### 🏷️ Gestión de Roles (Admin) ⏳ PENDIENTE
- ⏳ CRUD de roles por implementar
- ⏳ Interfaz de gestión de permisos
- ⏳ Vista de roles disponibles

### 📦 Gestión de Categorías (Admin) ⏳ PENDIENTE
- ⏳ CRUD de categorías por implementar
- ⏳ Interfaz con tarjetas de categorías
- ⏳ Búsqueda y filtros

### 🛍️ Gestión de Productos (Admin) ⏳ PENDIENTE
- ⏳ CRUD de productos por implementar
- ⏳ Carga de imágenes de productos
- ⏳ Gestión de stock e inventario
- ⏳ Asociación con categorías

### 🏪 Catálogo de Productos (Cliente) ⏳ PENDIENTE
- ⏳ Vista de productos públicos
- ⏳ Búsqueda y filtros por categoría/precio
- ⏳ Modal de detalles de producto
- ⏳ Agregar productos al carrito

### 🛒 Carrito de Compras (Cliente) ⏳ PENDIENTE
- ⏳ Vista del carrito con items agregados
- ⏳ Actualización de cantidades
- ⏳ Cálculo de subtotales y total
- ⏳ Proceso de checkout y creación de pedido

### 📊 Dashboard Administrativo ✅ COMPLETO
- ✅ **Panel principal con menú de módulos**
- ✅ **Cards de navegación con iconos**
- ✅ **Gradientes visuales modernos**
- ✅ **Solo módulo Usuarios activo** (otros muestran "Próximamente")
- ✅ **Navegación a /admin/usuarios funcional**

### 🎨 Interfaz de Usuario
- ✅ **Diseño responsive**: Desktop, tablet y móvil
- ✅ **Tema coherente**: Paleta de colores unificada
- ✅ **Gradientes modernos**: Efectos visuales atractivos
- ✅ **Hover effects**: Feedback visual en elementos interactivos
- ✅ **Loading states**: Indicadores de carga
- ✅ **Empty states**: Mensajes cuando no hay datos
- ✅ **Error handling**: Mensajes de error amigables

---

## ⚙️ Instalación y Configuración

### Prerequisitos
- Java 17 o superior
- Maven 3.8+
- PostgreSQL 13+ o MySQL 8+
- Navegador web moderno (Chrome, Firefox, Edge)
- Git
---

## 🚦 Inicio Rápido

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/JuanSe2731/Proyecto-Spring-Boot-E-converse.git
cd Proyecto-Spring-Boot-E-converse
```

---

### 2️⃣ Configurar Backend (Spring Boot + MongoDB)

#### **Base de Datos MongoDB Atlas**

El proyecto utiliza **MongoDB Atlas** (base de datos en la nube). La URI de conexión ya está configurada en `application.properties`:

```properties
spring.data.mongodb.uri=mongodb+srv://admin1:mongo1@cluster0.elouxfb.mongodb.net/
spring.data.mongodb.database=e_converse
```

**✅ No requiere instalación local** - La base de datos ya está alojada en la nube.

#### **Configuración adicional en application.properties**

Verifica que `backend/src/main/resources/application.properties` tenga:

```properties
# MongoDB Atlas Cloud Database
spring.data.mongodb.uri=mongodb+srv://admin1:mongo1@cluster0.elouxfb.mongodb.net/
spring.data.mongodb.database=e_converse

# Server Config
server.port=8080

# JWT Security
jwt.secret=tu_clave_secreta_super_segura_minimo_256_bits
jwt.expiration=86400000

# CORS Configuration (desarrollo local)
# Permite puertos: 5173, 5174 (Vite), 5500 (Live Server), 3000 (fallback)
```

#### **Compilar y Ejecutar Backend**

**Desde PowerShell en Windows:**
```powershell
cd backend
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

**Desde Bash/Linux:**
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

✅ El servidor estará disponible en: `http://localhost:8080`

---

### 3️⃣ Configurar Frontend (React + Vite)

#### **Instalar dependencias de Node.js**

```powershell
cd frontend-react
npm install
```

**Dependencias principales instaladas:**
- `react@19.1.1` - Librería de UI
- `react-router-dom@7.9.4` - Enrutamiento SPA
- `zustand@5.0.8` - Manejo de estado global
- `axios@1.7.9` - Cliente HTTP
- `tailwindcss@3.4.0` - Framework CSS
- `@heroicons/react@2.2.0` - Librería de iconos
- `vite@7.1.7` - Build tool ultrarrápido

#### **Configurar variables de entorno**

Crea un archivo `.env` en `frontend-react/`:

```env
VITE_API_URL=http://localhost:8080
```

#### **Ejecutar Frontend en desarrollo**

```powershell
npm run dev
```

✅ La aplicación estará disponible en: `http://localhost:5173` (o puerto 5174 si 5173 está ocupado)

Vite muestra el puerto exacto en la terminal:
```
VITE v7.1.7  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### **Build para producción**

```powershell
npm run build
```

Los archivos compilados estarán en `frontend-react/dist/`.

---

### 4️⃣ Datos Iniciales

La primera vez que ejecutes el backend, **debes insertar los roles iniciales** directamente en MongoDB Atlas:

#### **Opción A: Usar MongoDB Compass (GUI)**

1. Descarga [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Conecta con la URI: `mongodb+srv://admin1:mongo1@cluster0.elouxfb.mongodb.net/`
3. Selecciona la base de datos `e_converse`
4. En la colección `rol`, inserta estos documentos:

```json
{ "_id": "1", "nombre": "Administrador" }
{ "_id": "2", "nombre": "Cliente" }
{ "_id": "3", "nombre": "Vendedor" }
```

#### **Opción B: Usar MongoDB Shell (mongosh)**

```bash
mongosh "mongodb+srv://admin1:mongo1@cluster0.elouxfb.mongodb.net/"
use e_converse
db.rol.insertMany([
  { "_id": "1", "nombre": "Administrador" },
  { "_id": "2", "nombre": "Cliente" },
  { "_id": "3", "nombre": "Vendedor" }
])
```

#### **Usuario Administrador Inicial**

Puedes registrarte desde la aplicación (`/register`) y luego cambiar manualmente el rol a `"1"` (Administrador) en MongoDB:

1. Regístrate con cualquier email
2. En MongoDB Compass, busca tu usuario en la colección `usuario`
3. Edita el campo `rol.idRol` a `"1"`

---

## 🎯 Uso del Sistema

### Acceso según Rol

#### **Como Administrador** 🔐

1. **Login**: Ingresa con tu cuenta de administrador
2. **Dashboard Admin**: `/admin/dashboard`
   - Menú con módulos: Usuarios, Roles, Categorías, Productos
3. **Módulo Usuarios** ✅ FUNCIONAL:
   - Ver lista completa de usuarios
   - Buscar por nombre o correo
   - Crear nuevo usuario (con validaciones)
   - Editar usuario existente (contraseña opcional)
   - Eliminar usuario (con confirmación)
   - Cambiar estado (activo/inactivo)
   - Asignar roles desde dropdown
4. **Otros módulos**: En desarrollo (muestran "Próximamente")

#### **Como Cliente** 🛍️

1. **Registro**: Crea tu cuenta desde `/register`
   - Campos: Nombre, Apellido, Email, Contraseña
   - Dirección es opcional
   - **No requiere teléfono** (campo removido)
2. **Login**: Ingresa con tu email y contraseña
3. **Dashboard Cliente**: ⏳ En desarrollo
   - Catálogo de productos (pendiente)
   - Carrito de compras (pendiente)
   - Mis pedidos (pendiente)

---

## 🔒 Seguridad Implementada

- ✅ **JWT (JSON Web Tokens)**: Autenticación stateless con Bearer token
- ✅ **BCrypt**: Hashing de contraseñas en backend
- ✅ **CORS**: Configurado para puertos 5173, 5174, 5500, 3000
- ✅ **Axios Interceptors**: Auto-inyección de token en todas las requests
- ✅ **Protected Routes**: ProtectedRoute y AdminRoute en React Router
- ✅ **Logout automático**: Redirección a /login en respuestas 401
- ✅ **Validación de sesión**: Token verificado en cada request al backend
- ✅ **Persistencia de sesión**: Token y usuario guardados en localStorage
- ✅ **Validación de formularios**: Frontend (React) y Backend (Spring)

---

## 🔧 Endpoints API REST

### Autenticación (`/auth`)
- `POST /auth/login` - Iniciar sesión
  - Body: `{ "username": "email@example.com", "password": "123456" }`
  - Response: `{ "token": "jwt_token", "usuario": {...} }`
- `POST /auth/register` - Registrar usuario
  - Body: `{ "nombre": "Juan", "apellido": "Pérez", "correo": "juan@mail.com", "contrasena": "123456", "direccion": "Calle 123" }`
  - Auto-asigna rol "Cliente" (id: 2)

### Usuarios (`/usuario`) 🔐 Admin
- `GET /usuario/list` - Listar todos los usuarios
- `GET /usuario/list/{id}` - Buscar usuario por ID
- `POST /usuario/new` - Crear nuevo usuario
  - Body: `{ "nombre": "...", "correo": "...", "contrasena": "...", "idRol": "1", "direccion": "...", "estado": true }`
- `PUT /usuario/update` - Actualizar usuario
  - Body: `{ "idUsuario": "...", "nombre": "...", "correo": "...", "contrasena": "...", "rol": { "idRol": "1" }, "direccion": "...", "estado": true }`
  - **IMPORTANTE**: Debe incluir `idUsuario` en el body
  - Contraseña es opcional (se mantiene actual si se omite)
- `DELETE /usuario/delete/{id}` - Eliminar usuario

### Roles (`/roles`) 🔐 Admin
- `GET /roles/list` - Listar todos los roles
- `GET /roles/list/{id}` - Buscar rol por ID
- `POST /roles/new` - Crear nuevo rol
- `PUT /roles/update` - Actualizar rol
- `DELETE /roles/delete/{id}` - Eliminar rol

### Categorías (`/categorias`) 🔐 Admin
- `GET /categorias/list` - Listar todas las categorías
- `GET /categorias/list/{id}` - Buscar categoría por ID
- `POST /categorias/new` - Crear nueva categoría
- `PUT /categorias/update` - Actualizar categoría
- `DELETE /categorias/delete/{id}` - Eliminar categoría

### Productos (`/productos`)
- `GET /productos/list` - Listar todos los productos (público)
- `GET /productos/list/{id}` - Buscar producto por ID (público)
- `POST /productos/new` - Crear producto 🔐 Admin
- `PUT /productos/update` - Actualizar producto 🔐 Admin
- `DELETE /productos/delete/{id}` - Eliminar producto 🔐 Admin

### Carrito (`/carrito`) 🔐 Cliente
- `GET /carrito/mis-items` - Obtener items del carrito del usuario autenticado
- `POST /carrito/agregar` - Agregar producto al carrito
- `PUT /carrito/actualizar/{id}` - Actualizar cantidad de un item
- `DELETE /carrito/eliminar/{id}` - Eliminar item del carrito
- `GET /carrito/total` - Calcular total del carrito

### Pedidos (`/pedidos`) 🔐 Cliente
- ⚠️ **Endpoints disponibles** pero frontend pendiente

---

## 🚧 Pendiente de Implementación

### Alta Prioridad 🔴
- 🔲 **CRUD de Roles** (Frontend React):
  - Interfaz de gestión de roles
  - Vista de permisos asociados
  - Backend ya implementado ✅

- 🔲 **CRUD de Categorías** (Frontend React):
  - Interfaz con tarjetas de categorías
  - Búsqueda y filtros
  - Backend ya implementado ✅

- 🔲 **CRUD de Productos** (Frontend React):
  - Tabla de gestión de productos
  - Carga y preview de imágenes
  - Gestión de stock
  - Asociación con categorías
  - Backend ya implementado ✅

- 🔲 **Dashboard Cliente**:
  - Catálogo público de productos
  - Filtros por categoría, precio, talla
  - Modal de detalles de producto
  - Agregar al carrito
  - Backend ya implementado ✅

- 🔲 **Carrito de Compras**:
  - Vista del carrito con items
  - Actualización de cantidades
  - Cálculo de totales (subtotal + IVA)
  - Proceso de checkout
  - Backend ya implementado ✅

- 🔲 **Módulo de Pedidos**:
  - Crear pedido desde carrito
  - Historial de pedidos del cliente
  - Estados del pedido (Pendiente, Pagado, Enviado, Entregado)
  - Vista de detalles del pedido
  - Backend ya implementado ✅

### Media Prioridad 🟡
- 🔲 **Dashboard de métricas reales**:
  - Productos más vendidos
  - Gráficas de ventas (por día, mes)
  - Total de ingresos
  - Clientes registrados
  - Utilizar librería de gráficos (Chart.js o Recharts)

- 🔲 **Gestión de stock e inventario**:
  - Alertas de stock bajo
  - Historial de movimientos
  - Ajuste manual de inventario
  - Integración con pedidos

- 🔲 **Sistema de notificaciones**:
  - Toast notifications en frontend (react-hot-toast)
  - Email de confirmación de registro
  - Email de confirmación de pedido
  - Notificaciones push

- 🔲 **Mejoras de UX**:
  - Loading skeletons (evitar pantallas blancas)
  - Animaciones de transición entre páginas
  - Paginación de tablas largas
  - Confirmación de acciones destructivas

### Baja Prioridad 🟢 (Mejoras Futuras)
- 🔲 **Recuperación de contraseña**:
  - Endpoint backend para reset token
  - Email con enlace temporal
  - Formulario de nueva contraseña

- 🔲 **Perfil de usuario**:
  - Editar datos personales
  - Cambiar contraseña
  - Foto de perfil
  - Historial de compras

- 🔲 **Wishlist (Lista de deseos)**:
  - Guardar productos favoritos
  - Compartir lista con otros usuarios

- 🔲 **Reseñas y valoraciones**:
  - Calificar productos (1-5 estrellas)
  - Comentarios de clientes
  - Moderación de reseñas por admin

- 🔲 **Búsqueda avanzada**:
  - Autocompletado en barra de búsqueda
  - Filtros combinados más complejos
  - Búsqueda por similitud (algoritmo)

- 🔲 **Integración de pagos**:
  - Pasarela de pago (Stripe, PayPal, etc.)
  - Confirmación de pago
  - Reembolsos

---

## 🐛 Problemas Conocidos y Soluciones

### ✅ Resueltos

1. **TailwindCSS v4 incompatibilidad con PostCSS**
   - **Problema**: Plugin `@tailwindcss/postcss` no encontrado
   - **Solución**: Downgrade a TailwindCSS v3.4.0 estable

2. **React no renderiza (muestra count 0)**
   - **Problema**: `main.tsx` importaba `App.tsx` por defecto (Vite template)
   - **Solución**: Cambiar a `import App from './App.jsx'`

3. **Duplicate roles en dropdown**
   - **Problema**: Backend retornaba roles duplicados
   - **Solución**: Deduplicación con `reduce()` en frontend
   ```javascript
   const rolesUnicos = rolesData.reduce((acc, rol) => {
     if (!acc.find(r => r.idRol === rol.idRol)) acc.push(rol);
     return acc;
   }, []);
   ```

4. **Error al actualizar usuario (JSON parse error)**
   - **Problema**: Backend esperaba `idUsuario` en el body, pero se enviaba como parámetro URL
   - **Solución**: Incluir `usuarioData.idUsuario = editingUser.idUsuario` antes de llamar a `update(usuarioData)`

5. **Registro no guardaba en MongoDB**
   - **Problema**: Backend no manejaba correctamente el campo `direccion` opcional
   - **Solución**: Modificar `AuthController.java` para aceptar direccion con `getOrDefault()`

### ⚠️ Por Resolver

1. **Imágenes de productos**
   - **Problema**: No hay sistema de carga de imágenes aún
   - **Solución propuesta**: 
     - Usar servicio de almacenamiento (AWS S3, Cloudinary)
     - O guardar imágenes en `public/images` y URL en BD

2. **Sesión expira sin aviso**
   - **Problema**: JWT expira (24h) sin notificar al usuario
   - **Solución propuesta**: 
     - Mostrar modal de "Sesión expirada"
     - Implementar refresh tokens

3. **Validación de stock al agregar al carrito**
   - **Problema**: No se valida si hay suficiente stock antes de agregar
   - **Solución propuesta**: 
     - Endpoint backend que verifique stock actual
     - Bloquear botón si stock = 0

---

## 📚 Documentación Adicional

### Arquitectura del Sistema

```
┌─────────────────┐
│   Frontend      │
│   React + Vite  │  
│   Port: 5173    │
│   ├─ Zustand    │  (Estado global: auth, cart)
│   ├─ Axios      │  (HTTP client con interceptors)
│   └─ TailwindCSS│  (Estilos utility-first)
└────────┬────────┘
         │ HTTP Requests (JWT Bearer)
         │ CORS: localhost:5173, 5174
┌────────▼────────┐
│   Backend       │
│   Spring Boot   │
│   Port: 8080    │
│   ├─ Security   │  (JWT + BCrypt)
│   ├─ REST API   │  (8 controladores)
│   └─ MongoDB    │  (Spring Data MongoDB)
└────────┬────────┘
         │ Connection String
┌────────▼────────┐
│   MongoDB Atlas │
│   (Cloud NoSQL) │
│   Database:     │
│   e_converse    │
└─────────────────┘
```

### Modelo de Datos MongoDB

**Colecciones:**

**`usuario`**
```json
{
  "_id": "ObjectId",
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@mail.com",
  "contrasena": "$2a$10$...", // BCrypt hash
  "direccion": "Calle 123",
  "estado": true,
  "rol": {
    "idRol": "1",
    "nombre": "Cliente"
  }
}
```

**`rol`**
```json
{
  "_id": "1",
  "nombre": "Administrador"
}
```

**`categoria`**
```json
{
  "_id": "ObjectId",
  "nombre": "Deportivos"
}
```

**`producto`**
```json
{
  "_id": "ObjectId",
  "nombre": "Zapatillas Nike",
  "descripcion": "Talla: 42",
  "precio": 89990.00,
  "stock": 25,
  "imagen": "https://...",
  "categoria": {
    "idCategoria": "ObjectId",
    "nombre": "Deportivos"
  }
}
```

**`carrito`**
```json
{
  "_id": "ObjectId",
  "usuario": { "idUsuario": "ObjectId" },
  "items": [
    {
      "producto": { "idProducto": "ObjectId", "nombre": "..." },
      "cantidad": 2
    }
  ]
}
```

**`pedido`**
```json
{
  "_id": "ObjectId",
  "usuario": { "idUsuario": "ObjectId" },
  "fechaPedido": "2024-01-15",
  "total": 179980.00,
  "estado": "Pendiente",
  "items": [
    {
      "producto": { "idProducto": "ObjectId", "nombre": "..." },
      "cantidad": 2,
      "precioUnitario": 89990.00
    }
  ]
}
```

### Convenciones de Código

**Backend (Java):**
- Clases: `PascalCase` (ej: `UsuarioController`)
- Métodos: `camelCase` (ej: `buscarUsuario()`)
- Variables: `camelCase` (ej: `usuarioService`)
- Constantes: `UPPER_SNAKE_CASE` (ej: `JWT_SECRET`)
- Logging con System.out y emojis para debugging

**Frontend (React):**
- Componentes: `PascalCase` (ej: `AdminUsuarios.jsx`)
- Hooks: `camelCase` con prefijo `use` (ej: `useAuth`)
- Funciones: `camelCase` (ej: `handleSubmit`)
- Variables: `camelCase` (ej: `formData`)
- Archivos CSS: `kebab-case` (ej: `admin-usuarios.css`)
- Comentarios con emojis para secciones (ej: `// 🔍 Búsqueda`)

**Git Commits:**
- feat: Nueva funcionalidad
- fix: Corrección de bugs
- refactor: Refactorización sin cambios funcionales
- docs: Actualización de documentación
- style: Cambios de formato (no afectan código)

---

## 🛠️ Troubleshooting

### Backend no inicia
```
Error: Unable to connect to MongoDB
```
**Solución**: Verificar URI de MongoDB en `application.properties` y conexión a internet.

### Frontend muestra pantalla blanca
```
Error: Cannot find module './App'
```
**Solución**: Verificar que `main.tsx` importe `App.jsx` correctamente.

### Error 401 al llamar API
```
Error: Unauthorized
```
**Solución**: 
1. Verificar que el token esté en localStorage (`localStorage.getItem('token')`)
2. Verificar que Axios interceptor esté inyectando el token
3. Verificar que el token no haya expirado (24h)

### TailwindCSS no aplica estilos
```
Clases no aparecen en el navegador
```
**Solución**:
1. Verificar que `index.css` tenga `@tailwind base; @tailwind components; @tailwind utilities;`
2. Reiniciar servidor Vite (`Ctrl+C` y `npm run dev`)
3. Limpiar cache del navegador

---

## 📊 Estado del Proyecto

**Progreso General: 45%**

| Módulo | Backend | Frontend | Estado |
|--------|---------|----------|--------|
| Autenticación | ✅ 100% | ✅ 100% | Completo |
| Usuarios (Admin) | ✅ 100% | ✅ 100% | Completo |
| Roles | ✅ 100% | ⏳ 0% | Backend listo |
| Categorías | ✅ 100% | ⏳ 0% | Backend listo |
| Productos | ✅ 100% | ⏳ 0% | Backend listo |
| Carrito | ✅ 100% | ⏳ 0% | Backend listo |
| Pedidos | ✅ 100% | ⏳ 0% | Backend listo |
| Dashboard Admin | ✅ 50% | ✅ 100% | Menú listo |
| Dashboard Cliente | ⏳ 0% | ⏳ 0% | Pendiente |

**Última actualización:** Enero 2025

---

## 👥 Equipo de Desarrollo

**Desarrolladores:**
- Juan Sebastián Otero - 2220053
- Daniel Santiago Convers - 2221120
- Juan David Paipa - 2220062
- Jhon Anderson Vargas - 2220086

**Institución:**
- Universidad Industrial de Santander (UIS)
- Asignatura: Desarrollo de Aplicaciones Web
- Período: 2024-2

---

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

## 🔗 Enlaces Útiles

- [Documentación Spring Boot](https://spring.io/projects/spring-boot)
- [Documentación MongoDB](https://www.mongodb.com/docs/)
- [Documentación React](https://react.dev/)
- [Documentación Vite](https://vite.dev/)
- [Documentación TailwindCSS](https://tailwindcss.com/)
- [Documentación Zustand](https://zustand-demo.pmnd.rs/)
- [JWT.io](https://jwt.io/) - Debug de tokens JWT

---

**✨ ¡Gracias por revisar nuestro proyecto! ✨**

**Curso:**
- Entornos de Programacion C1

**Período:**
- 2025

---

## 📝 Licencia

Este proyecto es de carácter **académico** y está desarrollado con fines educativos.

---

## 🙏 Agradecimientos

- Spring Boot Community
- Stack Overflow
- Font Awesome
- PostgreSQL & MySQL Communities
- Todos los profesores y compañeros que aportaron feedback

---

## 📞 Contacto

Para preguntas o sugerencias sobre el proyecto:

- **GitHub**: [@JuanSe2731](https://github.com/JuanSe2731)

---

## 🎓 Notas del Proyecto

Este sistema de e-commerce fue desarrollado como proyecto académico, implementando:
- ✅ Arquitectura MVC completa
- ✅ API REST con Spring Boot
- ✅ Autenticación JWT
- ✅ Frontend con JavaScript vanilla
- ✅ Base de datos relacional normalizada
- ✅ CRUD completo para todas las entidades
- ✅ Interfaz responsive y moderna

**Estado actual**: 🟡 **En desarrollo activo** (85% completado)

Las funcionalidades core están implementadas y funcionando. Pendiente: módulo completo de pedidos y mejoras en reportes.

---

**⭐ Si este proyecto te resultó útil, no olvides darle una estrella en GitHub!**
