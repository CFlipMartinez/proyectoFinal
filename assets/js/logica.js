// Funcion para mostra alert (JS)
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
		<div>${message}</div>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>`;
	alertPlaceholder.append(wrapper);
}

// Selecciona todos los botones con la clase alert-btn
const alertButtons = document.querySelectorAll('.alert-btn');
alertButtons.forEach(button => {
	button.addEventListener('click', () => {
		appendAlert('¡El producto se ha añadido al carrito!', 'success');
	});
});

// Cambiar el contenido de los botones de "Comprar ahora" al hacer click (JS)
function displayCompra(buttonId) {
    // Obtiene el botón específico usando su id
    const button = document.getElementById(buttonId);
    
    // Cambia el contenido del botón
    button.innerHTML = '<img src="../assets/images/check_circle.svg" alt="Logo" width="24" height="24" class="d-inline-block"> Excelente elección';
    
    // Cambia el color del botón a 'success'
    button.classList.remove('btn-light');
    button.classList.add('btn-success');
}

// Cambiar el contenido de los botones de "Compra" al hacer click (laterales) (JS)
function displayCompraLateral(buttonId) {
    // Obtiene el botón específico usando su id
    const button = document.getElementById(buttonId);
    
    // Cambia el contenido del botón
    button.innerHTML = '<img src="../assets/images/check_circle.svg" alt="Logo" width="24" height="24" class="d-inline-block">';
    
    // Cambia el color del botón a 'success'
    button.classList.remove('btn-light');
    button.classList.add('btn-success');
}

// funciones para cambiar el contenido de un boton al pasar el mouse por encima (JS)
function cambiarContenidoTemporal(elemento) {
    // Cambia temporalmente el contenido y el color al pasar el mouse solo si no se ha hecho click
    if (!elemento.classList.contains('btn-success')) {
        elemento.innerHTML = '<img src="../assets/images/web_traffic.svg" alt="Logo" width="24" height="24" class="d-inline-block"> ¡Vamos, compralo!';
        elemento.classList.remove('btn-light');
        elemento.classList.add('btn-primary');
    }
}

function restaurarContenidoOriginal(elemento) {
    // Solo restaura el contenido original si no se ha hecho clic
    if (!elemento.classList.contains('btn-success')) {
        elemento.innerHTML = '<img src="../assets/images/shopping_cart.svg" alt="Logo" width="24" height="24" class="d-inline-block"> Comprar ahora';
        elemento.classList.remove('btn-success');
        elemento.classList.add('btn-light');
    }
}

//funcion para ampliar imagen con doble click y mostrar en un modal(js)
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.card-image'); // Selecciona todas las imágenes con class = card-image
    const modal = document.getElementById('modal');
    const expandedImg = document.getElementById('expandedImage');
    const closeModal = document.getElementById('closeModal');

    // Evento de doble clic en cada imagen
    images.forEach(image => {
        image.addEventListener('dblclick', function () {
            modal.style.display = 'flex'; // Muestra el modal
            expandedImg.src = this.src; // Usa la misma imagen
        });
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none'; // Oculta el modal
    });

    // Cerrar el modal si se hace clic fuera de la imagen
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Oculta el modal si se hace clic fuera de la imagen
        }
    });
});

//logica del login
document.addEventListener('DOMContentLoaded', function() {
    // Usuarios válidos
    const validUsers = [
        { username: 'usuario1', password: 'pass1' },
        { username: 'usuario2', password: 'pass2' },
        { username: 'usuario3', password: 'pass3' }
    ];

    // Elementos del DOM
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const blockError = document.getElementById('blockError');

    // Contador de intentos
    let loginAttempts = 0;

    // Mostrar modal
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previene scroll
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        }
    });

    // Manejar envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verificar si el usuario está bloqueado
        if (loginAttempts >= 3) {
            window.location.href = './pages/blocked.html';
            return;
        }

        // Verificar credenciales
        const user = validUsers.find(u => u.username === username && u.password === password);

        if (user) {
            // Login exitoso
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../pages/products.html';
        } else {
            // Login fallido
            loginAttempts++;
            loginError.classList.remove('d-none');
            
            if (loginAttempts >= 3) {
                blockError.classList.remove('d-none');
                loginError.classList.add('d-none');
                setTimeout(() => {
                    window.location.href = '../pages/blocked.html';
                }, 2000);
            }
        }
    });

    function resetForm() {
        loginForm.reset();
        loginError.classList.add('d-none');
        blockError.classList.add('d-none');
    }
});




