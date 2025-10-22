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

            card.innerHTML = `
                <img src="${product.imagen || '/static/default.png'}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${product.categoria ? product.categoria.nombre : 'Sin categoría'}</p>
                <p class="price">$${product.precio}</p>
            `;

            card.onclick = () => showProductDetails(product);
            productsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// -----------------------------
// 🧾 DETALLES DEL PRODUCTO
// -----------------------------
function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    const details = document.getElementById('product-details');
    if (!modal || !details) return;

    details.innerHTML = `
        <img src="${product.imagen || '/static/default.png'}" alt="${product.nombre}">
        <h2>${product.nombre}</h2>
        <p><strong>Categoría:</strong> ${product.categoria ? product.categoria.nombre : 'Sin categoría'}</p>
        <p><strong>Descripción:</strong> ${product.descripcion || 'Sin descripción'}</p>
        <p><strong>Precio:</strong> $${product.precio}</p>
    `;

    modal.style.display = 'block';
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
// 📦 INICIALIZACIÓN PRINCIPAL
// -----------------------------
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📦 Dashboard inicializando...');

    await validateSession();
    await loadCategories();
    await loadProducts();
    setupLogout();

    // ✅ Manejadores de modal
    const closeBtn = document.querySelector('.close');
    const modal = document.getElementById('product-modal');

    if (closeBtn) {
        closeBtn.onclick = function () {
            if (modal) modal.style.display = 'none';
        };
    }

    if (modal) {
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    console.log('✅ Dashboard listo');
});
