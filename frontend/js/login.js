async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            // Redirigir al usuario a la página principal
            window.location.href = '/dashboard.html';
        } else {
            // Mostrar mensaje de error
            errorMessage.textContent = data.message || 'Error al iniciar sesión';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error de conexión con el servidor';
        errorMessage.classList.add('show');
    }

    return false;
}

// Remover mensaje de error cuando el usuario comienza a escribir
document.getElementById('username').addEventListener('input', removeErrorMessage);
document.getElementById('password').addEventListener('input', removeErrorMessage);

function removeErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('show');
}