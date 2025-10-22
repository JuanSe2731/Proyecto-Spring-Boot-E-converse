async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    const errorMessage = document.getElementById('error-message');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden';
        errorMessage.classList.add('show');
        return false;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                roles: ["CLIENTE"]  // Por defecto, todos los usuarios nuevos son CLIENTE
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Registro exitoso, redirigir al login
            alert('Registro exitoso. Por favor, inicia sesión.');
            window.location.href = '/index.html';
        } else {
            // Mostrar mensaje de error
            errorMessage.textContent = data.message || 'Error en el registro';
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
document.getElementById('email').addEventListener('input', removeErrorMessage);
document.getElementById('password').addEventListener('input', removeErrorMessage);
document.getElementById('confirmPassword').addEventListener('input', removeErrorMessage);

function removeErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('show');
}