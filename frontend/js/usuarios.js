let currentUserId = null;

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    // Verificar si el usuario es admin
    try {
        const userResponse = await fetch('http://localhost:8080/api/auth/user-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!userResponse.ok) throw new Error('Error al obtener información del usuario');

        const userData = await userResponse.json();
        if (!userData.roles.includes('ADMIN')) {
            window.location.href = '../dashboard.html';
            return;
        }

        document.getElementById('username-display').textContent = userData.username;
        loadUsers();
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '../index.html';
    }
});

async function loadUsers() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/api/auth/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Error al cargar usuarios');

        const users = await response.json();
        const tableBody = document.getElementById('users-table-body');
        tableBody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.roles.join(', ')}</td>
                <td>
                    <button onclick="openRoleModal('${user.id}', ${JSON.stringify(user.roles)})">
                        Editar Roles
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar la lista de usuarios');
    }
}

function openRoleModal(userId, currentRoles) {
    currentUserId = userId;
    const modal = document.getElementById('role-modal');
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = currentRoles.includes(checkbox.value);
    });

    modal.style.display = 'block';
}

// Cerrar modal
document.querySelector('.close').onclick = function() {
    document.getElementById('role-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('role-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Manejar el formulario de roles
document.getElementById('role-form').onsubmit = async function(e) {
    e.preventDefault();
    
    const checkboxes = document.querySelectorAll('input[name="roles"]:checked');
    const roles = Array.from(checkboxes).map(cb => cb.value);

    if (roles.length === 0) {
        alert('Debe seleccionar al menos un rol');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/auth/users/${currentUserId}/roles`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ roles })
        });

        if (!response.ok) throw new Error('Error al actualizar roles');

        document.getElementById('role-modal').style.display = 'none';
        loadUsers();
        alert('Roles actualizados exitosamente');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar los roles');
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}