async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token y el usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', data.usuario);
            
            // Configurar el token para futuras peticiones
            setupAuthToken(data.token);
            
            // Mostrar mensaje de éxito
            errorMessage.textContent = '¡Inicio de sesión exitoso!';
            errorMessage.style.color = '#4CAF50';
            errorMessage.style.display = 'block';
            
            // Esperar 1 segundo antes de redirigir
            setTimeout(() => {
                window.location.replace('/views/client/dashboard.html');
            }, 1000);
        } else {
            // Mostrar mensaje de error
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error de conexión con el servidor';
        errorMessage.style.display = 'block';
    }
}

// Función para configurar el token en el header por defecto
function setupAuthToken(token) {
    if (token) {
        // Guardar el token para su uso en otras páginas
        localStorage.setItem('token', token);
    } else {
        // Si no hay token, intentar obtenerlo del localStorage
        token = localStorage.getItem('token');
    }
}

// Función para verificar si el usuario está autenticado
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');
    
    if (!token || !user) {
        return false;
    }
    return true;
}

// Función para obtener el token actual
function getAuthToken() {
    return localStorage.getItem('token');
}

// Función para obtener el usuario actual
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.location.replace('/frontend/index.html');
}

// Remover mensaje de error cuando el usuario comienza a escribir
document.getElementById('username').addEventListener('input', removeErrorMessage);
document.getElementById('password').addEventListener('input', removeErrorMessage);

function removeErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
}