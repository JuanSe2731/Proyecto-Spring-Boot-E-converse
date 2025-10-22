// Verificar el token al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Si no hay token, redirigir al login
        window.location.href = '/index.html';
        return;
    }

    try {
        // Obtener información del usuario
        const response = await fetch('http://localhost:8080/api/auth/user-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener información del usuario');
        }

        const userData = await response.json();
        
        // Mostrar el nombre de usuario
        document.getElementById('username-display').textContent = userData.username;

        // Mostrar contenido según el rol
        if (userData.roles.includes('ADMIN')) {
            document.getElementById('admin-content').style.display = 'block';
        }
        if (userData.roles.includes('CLIENTE')) {
            document.getElementById('client-content').style.display = 'block';
        }

    } catch (error) {
        console.error('Error:', error);
        // Si hay error, redirigir al login
        window.location.href = '/index.html';
    }
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
}