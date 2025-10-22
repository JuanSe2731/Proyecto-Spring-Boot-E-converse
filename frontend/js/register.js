async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.querySelector('button[type="submit"]');

    // Validaciones
    if (!username || username.length > 100) {
        errorMessage.textContent = 'El nombre de usuario es requerido y debe tener menos de 100 caracteres';
        errorMessage.classList.add('show');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Correo electrónico inválido';
        errorMessage.classList.add('show');
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorMessage.classList.add('show');
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden';
        errorMessage.classList.add('show');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Registrando...';

    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: username,
                correo_unico: email,
                contrasena: password,
                id_rol: parseInt(userType) // Asegurar que sea un número
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso. Por favor, inicia sesión.');
            window.location.href = '/index.html';
        } else {
            errorMessage.textContent = data.message || 'Error en el registro';
            if (response.status === 400 && data.message.includes('correo')) {
                errorMessage.textContent = 'El correo ya está registrado';
            }
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error de conexión con el servidor';
        errorMessage.classList.add('show');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Registrar';
    }
}

document.getElementById('username').addEventListener('input', removeErrorMessage);
document.getElementById('email').addEventListener('input', removeErrorMessage);
document.getElementById('password').addEventListener('input', removeErrorMessage);
document.getElementById('confirmPassword').addEventListener('input', removeErrorMessage);

function removeErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('show');
}