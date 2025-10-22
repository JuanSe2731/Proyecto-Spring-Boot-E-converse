// Estado global del carrito
let cartItems = [];

// Cargar los productos al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
    await validateSession();
    await loadCategories();
    await loadProducts();
});

// Validar sesión del usuario
async function validateSession() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/user-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Error de autenticación');

        const userData = await response.json();
        document.getElementById('username-display').textContent = userData.username;
        
        // Mostrar panel de admin si corresponde
        if (userData.roles.includes('ADMIN')) {
            document.getElementById('admin-panel').style.display = 'block';
        }

    } catch (error) {
        console.error('Error:', error);
        window.location.href = 'index.html';
    }
}

// Cargar categorías
async function loadCategories() {
    try {
        const response = await fetch('http://localhost:8080/api/categorias');
        const categories = await response.json();
        
        const categoriesMenu = document.getElementById('categories-menu');
        const categoryFilters = document.getElementById('category-filters');
        
        categories.forEach(category => {
            // Agregar al menú de navegación
            const menuItem = document.createElement('a');
            menuItem.href = '#';
            menuItem.textContent = category.nombre;
            menuItem.onclick = () => filterByCategory(category.id);
            categoriesMenu.appendChild(menuItem);

            // Agregar a los filtros
            const filterItem = document.createElement('div');
            filterItem.className = 'filter-item';
            filterItem.innerHTML = `
                <input type="checkbox" id="cat-${category.id}" value="${category.id}">
                <label for="cat-${category.id}">${category.nombre}</label>
            `;
            categoryFilters.appendChild(filterItem);
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

// Cargar productos
async function loadProducts(filters = {}) {
    try {
        let url = 'http://localhost:8080/api/productos';
        const queryParams = new URLSearchParams(filters).toString();
        if (queryParams) {
            url += `?${queryParams}`;
        }

        const response = await fetch(url);
        const products = await response.json();
        
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}">
        <div class="product-info">
            <h3>${product.nombre}</h3>
            <p class="price">$${product.precio.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
            <button onclick="showProductDetails(${product.id})" class="details-button">
                <i class="fas fa-info-circle"></i> Detalles
            </button>
        </div>
    `;
    return card;
}

// Agregar al carrito
async function addToCart(productId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/api/carrito/agregar', {
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

        if (!response.ok) throw new Error('Error al agregar al carrito');

        updateCartCount();
        alert('Producto agregado al carrito');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}

// Actualizar contador del carrito
async function updateCartCount() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/api/carrito/cantidad', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Error al obtener cantidad del carrito');

        const { cantidad } = await response.json();
        document.getElementById('cart-count').textContent = cantidad;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Mostrar detalles del producto
async function showProductDetails(productId) {
    try {
        const response = await fetch(`http://localhost:8080/api/productos/${productId}`);
        const product = await response.json();

        const modal = document.getElementById('product-modal');
        const details = document.getElementById('product-details');
        
        details.innerHTML = `
            <div class="product-detail-content">
                <img src="${product.imagen}" alt="${product.nombre}">
                <div class="detail-info">
                    <h2>${product.nombre}</h2>
                    <p class="price">$${product.precio.toLocaleString()}</p>
                    <p class="description">${product.descripcion}</p>
                    <p class="stock">Stock disponible: ${product.stock}</p>
                    <button onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los detalles del producto');
    }
}

// Filtrar por categoría
function filterByCategory(categoryId) {
    loadProducts({ categoria: categoryId });
}

// Aplicar filtro de precio
function applyPriceFilter() {
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    
    const filters = {};
    if (minPrice) filters.precioMin = minPrice;
    if (maxPrice) filters.precioMax = maxPrice;
    
    loadProducts(filters);
}

// Buscar productos
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        loadProducts({ busqueda: searchTerm });
    }
}

// Cerrar modal
document.querySelector('.close').onclick = function() {
    document.getElementById('product-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}