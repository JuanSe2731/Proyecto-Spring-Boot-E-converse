# 🛒 E-Converse

**E-Converse** es un sistema de comercio electrónico desarrollado como proyecto académico.  
Su objetivo es simular una tienda virtual en la que los usuarios pueden registrarse, navegar por un catálogo de productos, agregarlos a un carrito y generar pedidos.  

El proyecto busca integrar **backend, frontend y base de datos**, aplicando buenas prácticas en el desarrollo de aplicaciones web modernas.

---

## 🚀 Tecnologías utilizadas

- **Backend**: [Spring Boot](https://spring.io/projects/spring-boot) (Java)  
  - Framework para el desarrollo de APIs REST.  
  - Manejo de seguridad y autenticación.  
  - Control de roles (Administrador / Cliente).  

- **Base de datos**: [PostgreSQL](https://www.postgresql.org/)  
  - Modelo relacional para gestionar usuarios, productos, pedidos y reportes.  
  - Uso de claves foráneas y relaciones N:M para carritos y pedidos.  

- **Frontend**: **JavaScript genérico + HTML + CSS**  
  - Interfaz ligera y funcional para la interacción con la API.  
  - Manejo básico de DOM y consumo de endpoints REST.  

---

## 📂 Funcionalidades principales

- **Gestión de usuarios y roles**  
  - Registro e inicio de sesión.  
  - Recuperación de credenciales.  
  - Seguridad y control de accesos.  

- **Catálogo de productos**  
  - Visualización de productos.  
  - Búsqueda por nombre y categoría.  
  - Administración de productos (crear, editar, eliminar).  

- **Carrito de compras**  
  - Agregar productos al carrito.  
  - Modificar cantidades o eliminar.  
  - Cálculo automático de subtotales y total.  

- **Gestión de pedidos**  
  - Confirmación de compra.  
  - Historial de pedidos.  
  - Estados del pedido (pendiente, proceso, enviado, entregado).  

- **Reportes simplificados**  
  - Productos más vendidos.  
  - Número de clientes activos.  

---

## ⚙️ Ejecución en entorno local

### 1. Clonar el repositorio
```bash
https://github.com/JuanSe2731/Proyecto-Spring-Boot-E-converse.git

