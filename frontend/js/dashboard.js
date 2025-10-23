// =============================
// 🧩 DASHBOARD.JS SIN CONFIG.JS
// =============================

// Cambia esta constante según tu backend
const API_BASE_URL = "http://localhost:8080"; // <-- Ajusta tu puerto/ruta si es necesario

// -----------------------------
// 🔐 VALIDACIÓN DE SESIÓN JWT
// -----------------------------
async function validateSession() {
    const token = localStorage.getItem('token'); // ✅ corregido: antes era 'jwt'

    if (!token) {
        console.warn('No hay token, redirigiendo a index...');
        window.location.href = '/index.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/user-info`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            console.warn('Token inválido o expirado, cerrando sesión...');
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        } else {
            const userData = await response.json();
            const usernameDisplay = document.getElementById('username-display');
            if (usernameDisplay) {
                usernameDisplay.textContent = userData.username;
            }
            
            // Mostrar botón de administración si el usuario es ADMIN
            if (userData.rol && userData.rol.nombre === 'ADMIN') {
                const adminBtn = document.getElementById('admin-btn');
                if (adminBtn) {
                    adminBtn.style.display = 'block';
                }
            }
        }
    } catch (error) {
        console.error('Error validando token:', error);
        window.location.href = '/index.html';
    }
}

// -----------------------------
// 📦 CARGAR CATEGORÍAS
// -----------------------------
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/list`);
        if (!response.ok) throw new Error('Error cargando categorías');

        const categories = await response.json();

        const categoriesMenu = document.getElementById('categories-menu');
        const categoryFilters = document.getElementById('category-filters');

        if (categoriesMenu && categoryFilters) {
            categoriesMenu.innerHTML = '';
            categoryFilters.innerHTML = `
                <button class="filter-btn active" data-category="all">Todos</button>
            `;

            categories.forEach(cat => {
                const button = document.createElement('button');
                button.classList.add('filter-btn');
                button.textContent = cat.nombre;
                button.dataset.category = cat.nombre;

                categoryFilters.appendChild(button);

                const li = document.createElement('li');
                li.textContent = cat.nombre;
                categoriesMenu.appendChild(li);
            });

            setupCategoryFilters();
        }
    } catch (error) {
        console.error('Error cargando categorías:', error);
    }
}

// -----------------------------
// 🧱 CARGAR PRODUCTOS
// -----------------------------
async function loadProducts(category = 'all') {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/list`);
        if (!response.ok) throw new Error('Error cargando productos');

        const products = await response.json();
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer) return;

        productsContainer.innerHTML = '';

        const filtered = category === 'all'
            ? products
            : products.filter(p => p.categoria && p.categoria.nombre === category);

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            // Procesar URL de imagen
            const imageUrl = getImageUrl(product.imagenUrl);

            card.innerHTML = `
                <img src="${imageUrl}" alt="${product.nombre}" onerror="this.src='https://via.placeholder.com/300x220/4CAF50/ffffff?text=Sin+Imagen'">
                <h3>${product.nombre}</h3>
                <p>${product.categoria ? product.categoria.nombre : 'Sin categoría'}</p>
                <p class="price">$${product.precio.toLocaleString()}</p>
            `;

            card.onclick = () => showProductDetails(product);
            productsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// -----------------------------
// 🖼️ OBTENER URL DE IMAGEN
// -----------------------------
function getImageUrl(imagen) {
    // Si no hay imagen, usar placeholder
    if (!imagen) {
        return 'https://via.placeholder.com/300x220/4CAF50/ffffff?text=Sin+Imagen';
    }
    
    // Si es una URL completa (http o https), usar tal cual
    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
        return imagen;
    }
    
    // Si es una ruta local, construir la ruta completa
    if (imagen.startsWith('/')) {
        return imagen;
    }
    
    // Si es solo el nombre del archivo, asumir que está en /static/
    return `/static/${imagen}`;
}

// -----------------------------
// 🧾 DETALLES DEL PRODUCTO
// -----------------------------
function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    const details = document.getElementById('product-details');
    if (!modal || !details) return;

    const imageUrl = getImageUrl(product.imagenUrl);

    details.innerHTML = `
        <img src="${imageUrl}" alt="${product.nombre}" onerror="this.src='https://via.placeholder.com/500x300/4CAF50/ffffff?text=Sin+Imagen'">
        <h2>${product.nombre}</h2>
        <p><strong>Categoría:</strong> ${product.categoria ? product.categoria.nombre : 'Sin categoría'}</p>
        <p><strong>Descripción:</strong> ${product.descripcion || 'Sin descripción'}</p>
        <p class="price">$${product.precio.toLocaleString()}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart"></i> Agregar al Carrito
        </button>
    `;

    // Mostrar modal usando clase 'open' para evitar depender de estilos inline
    modal.classList.add('open');
}

// -----------------------------
// ➕ AGREGAR AL CARRITO
// -----------------------------
async function addToCart(productId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión para agregar productos al carrito');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/carrito/agregar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                productoId: productId, 
                cantidad: 1 
            })
        });

        if (!response.ok) throw new Error('Error agregando al carrito');

        // Actualizar contador del carrito
        await loadCartItems();
        
        // Mostrar notificación
        showNotification('Producto agregado al carrito', 'success');
        
        // Cerrar modal
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('open');
            // También limpiar cualquier inline style por compatibilidad
            modal.style.display = '';
        }
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al agregar el producto', 'error');
    }
}

// -----------------------------
// 📢 MOSTRAR NOTIFICACIÓN
// -----------------------------
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// -----------------------------
// 🔘 FILTROS POR CATEGORÍA
// -----------------------------
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.onclick = async () => {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            button.classList.add('active');
            await loadProducts(button.dataset.category);
        };
    });
}

// -----------------------------
// 🚪 CERRAR SESIÓN
// -----------------------------
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            window.location.href = '/index.html';
        };
    }
}

// -----------------------------
// 🛒 FUNCIONALIDAD DEL CARRITO
// -----------------------------
function setupCart() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');

    // Asegurar que el carrito esté cerrado al inicio
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
        cartSidebar.style.display = 'none';
    }
    if (cartOverlay) {
        cartOverlay.classList.remove('active');
        cartOverlay.style.display = 'none';
    }

    if (cartToggleBtn) {
        cartToggleBtn.onclick = () => {
            const isActive = cartSidebar.classList.contains('active');
            
            if (isActive) {
                // Cerrar carrito
                cartSidebar.classList.remove('active');
                cartOverlay.classList.remove('active');
                setTimeout(() => {
                    cartSidebar.style.display = 'none';
                    cartOverlay.style.display = 'none';
                }, 300); // Esperar a que termine la animación
            } else {
                // Abrir carrito
                cartSidebar.style.display = 'flex';
                cartOverlay.style.display = 'block';
                setTimeout(() => {
                    cartSidebar.classList.add('active');
                    cartOverlay.classList.add('active');
                }, 10); // Pequeño delay para que la animación funcione
                loadCartItems();
            }
        };
    }

    if (closeCartBtn) {
        closeCartBtn.onclick = () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            setTimeout(() => {
                cartSidebar.style.display = 'none';
                cartOverlay.style.display = 'none';
            }, 300);
        };
    }

    if (cartOverlay) {
        cartOverlay.onclick = () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            setTimeout(() => {
                cartSidebar.style.display = 'none';
                cartOverlay.style.display = 'none';
            }, 300);
        };
    }
}

// -----------------------------
// 📦 CARGAR ITEMS DEL CARRITO
// -----------------------------
async function loadCartItems() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/carrito`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Error cargando carrito');
            return;
        }

        const cart = await response.json();
        displayCartItems(cart);
    } catch (error) {
        console.error('Error:', error);
    }
}

// -----------------------------
// 📋 MOSTRAR ITEMS DEL CARRITO
// -----------------------------
function displayCartItems(cart) {
    const container = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    
    if (!container) return;

    if (!cart || !cart.items || cart.items.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        if (cartCount) cartCount.textContent = '0';
        updateCartSummary(0, 0, 0);
        return;
    }

    if (cartCount) cartCount.textContent = cart.items.length;

    container.innerHTML = '';
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const imageUrl = getImageUrl(item.producto.imagenUrl);
        
        itemElement.innerHTML = `
            <img src="${imageUrl}" alt="${item.producto.nombre}" onerror="this.src='https://via.placeholder.com/80x80/4CAF50/ffffff?text=Sin+Imagen'">
            <div class="cart-item-details">
                <h4>${item.producto.nombre}</h4>
                <p class="item-price">$${item.producto.precio.toLocaleString()}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateCartQuantity(${item.id}, ${item.cantidad - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span>${item.cantidad}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.cantidad + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(itemElement);
    });

    // Calcular totales
    const subtotal = cart.items.reduce((sum, item) => 
        sum + (item.producto.precio * item.cantidad), 0);
    const tax = subtotal * 0.19;
    const total = subtotal + tax;

    updateCartSummary(subtotal, tax, total);
}

// -----------------------------
// 💰 ACTUALIZAR RESUMEN
// -----------------------------
function updateCartSummary(subtotal, tax, total) {
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (taxEl) taxEl.textContent = `$${tax.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

// -----------------------------
// ➕➖ ACTUALIZAR CANTIDAD
// -----------------------------
async function updateCartQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/carrito/actualizar/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cantidad: newQuantity })
        });

        if (!response.ok) throw new Error('Error actualizando cantidad');

        await loadCartItems();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar la cantidad');
    }
}

// -----------------------------
// 🗑️ ELIMINAR DEL CARRITO
// -----------------------------
async function removeFromCart(itemId) {
    if (!confirm('¿Eliminar este producto del carrito?')) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/carrito/eliminar/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Error eliminando item');

        await loadCartItems();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el producto');
    }
}

// -----------------------------
// 💳 PROCEDER AL PAGO
// -----------------------------
function proceedToCheckout() {
    window.location.href = '/views/client/cart.html';
}


// -----------------------------
// 📦 INICIALIZACIÓN PRINCIPAL
// -----------------------------
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📦 Dashboard inicializando...');

    // PRIMERO: Ocultar carrito y overlay inmediatamente
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar) {
        cartSidebar.style.display = 'none';
        cartSidebar.classList.remove('active');
        console.log('✅ Carrito ocultado');
    }
    
    if (cartOverlay) {
        cartOverlay.style.display = 'none';
        cartOverlay.classList.remove('active');
        console.log('✅ Overlay ocultado');
    }

    // Verificar elementos del carrito
    console.log('Cart Sidebar:', cartSidebar);
    console.log('Cart Overlay:', cartOverlay);
    console.log('Cart Sidebar classes:', cartSidebar?.className);
    console.log('Cart Overlay classes:', cartOverlay?.className);

    await validateSession();
    await loadCategories();
    await loadProducts();
    setupLogout();
    setupCart(); // ✅ Inicializar funcionalidad del carrito

    // ✅ Manejadores de modal
    const closeBtn = document.querySelector('.close');
    const modal = document.getElementById('product-modal');

    if (closeBtn) {
        closeBtn.onclick = function () {
            if (modal) {
                modal.classList.remove('open');
                modal.style.display = '';
            }
        };
    }

    if (modal) {
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.classList.remove('open');
                modal.style.display = '';
            }
        };
    }

    console.log('✅ Dashboard listo');
    console.log('✅ Deberías poder hacer clic en los productos ahora...');
});
