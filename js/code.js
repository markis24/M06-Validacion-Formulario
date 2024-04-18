// Función para validar un campo de entrada
function validarCampo(input) {
    if (!input.value.trim()) {
        input.classList.remove('valid');
        input.classList.add('error');
    } else {
        input.classList.remove('error');
        input.classList.add('valid');
    }
}

// Función para validar un correo electrónico
function validarCorreo(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarContrasena(password) {
    // Expresiones regulares para verificar los requisitos de la contraseña
    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    // Verifica la longitud de la contraseña
    let lengthCheck = password.length >= 8 && password.length <= 15;
    // Verifica la presencia de caracteres en minúscula
    let lowerCaseCheck = lowerCaseLetters.test(password);
    // Verifica la presencia de caracteres en mayúscula
    let upperCaseCheck = upperCaseLetters.test(password);
    // Verifica la presencia de dígitos numéricos
    let numberCheck = numbers.test(password);
    // Verifica la presencia de caracteres especiales
    let specialCharCheck = specialChars.test(password);

    // Construye un mensaje de error detallado para cada requisito que no se cumpla
    let errorMessage = '';
    if (!lengthCheck) {
        errorMessage += 'La contraseña debe tener entre 8 y 15 caracteres.<br>';
    }
    if (!lowerCaseCheck) {
        errorMessage += 'La contraseña debe contener al menos un carácter en minúscula.<br>';
    }
    if (!upperCaseCheck) {
        errorMessage += 'La contraseña debe contener al menos un carácter en mayúscula.<br>';
    }
    if (!numberCheck) {
        errorMessage += 'La contraseña debe contener al menos un dígito numérico.<br>';
    }
    if (!specialCharCheck) {
        errorMessage += 'La contraseña debe contener al menos un carácter especial.<br>';
    }

    // Muestra el mensaje de error si hay requisitos que no se cumplen
    let contrasenaErrorElement = document.getElementById("contraseñaError");
    if (errorMessage !== '') {
        // Muestra el mensaje de error dentro del elemento HTML
        contrasenaErrorElement.innerHTML = errorMessage;
        // Cambia el color del texto a rojo
        contrasenaErrorElement.classList.add('error-text');
        contrasenaErrorElement.classList.remove('success-text'); // Elimina la clase de éxito

        return false; // La contraseña no cumple con los requisitos
    } else {
        // Muestra el mensaje de éxito
        contrasenaErrorElement.innerHTML = 'La contraseña cumple con todos los requisitos.';
        // Cambia el color del texto a verde
        contrasenaErrorElement.classList.add('success-text');
        contrasenaErrorElement.classList.remove('error-text'); // Elimina la clase de error

        return true; // La contraseña es válida
    }
}

// Función para verificar si las contraseñas coinciden
function coincidenContrasenas(contraseña, confirmacion) {
    return contraseña === confirmacion;
}

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('registroForm');
    const inputs = formulario.querySelectorAll('input[required]');
    const correoInput = formulario.querySelector('#correo');
    const contraseñaInput = formulario.querySelector('#contraseña');
    const confirmarContraseñaInput = formulario.querySelector('#confirmarContraseña');
    const contraseñaErrorElement = document.getElementById('contraseñaError');
    const confirmarContraseñaErrorElement = document.getElementById('confirmarContraseñaError');

    inputs.forEach(input => {
        input.addEventListener('focusout', function () {
            validarCampo(input);
        });
    });

    correoInput.addEventListener('focusout', function () {
        validarCampo(correoInput);
        if (!validarCorreo(correoInput.value)) {
            correoInput.classList.remove('valid');
            correoInput.classList.add('error');
        } else {
            correoInput.classList.remove('error');
            correoInput.classList.add('valid');
        }
    });

    contraseñaInput.addEventListener('focusout', function () {
        validarCampo(contraseñaInput);
        validarContrasena(contraseñaInput.value);
        if (!coincidenContrasenas(contraseñaInput.value, confirmarContraseñaInput.value)) {
            confirmarContraseñaInput.classList.remove('valid');
            confirmarContraseñaInput.classList.add('error');
            confirmarContraseñaErrorElement.innerHTML = 'Las contraseñas no coinciden.';
            confirmarContraseñaErrorElement.classList.add('error-text');
            confirmarContraseñaErrorElement.classList.remove('success-text');
        } else {
            confirmarContraseñaInput.classList.remove('error');
            confirmarContraseñaInput.classList.add('valid');
            confirmarContraseñaErrorElement.innerHTML = '';
            confirmarContraseñaErrorElement.classList.remove('error-text');
            confirmarContraseñaErrorElement.classList.add('success-text');
        }
    });

    confirmarContraseñaInput.addEventListener('focusout', function () {
        validarCampo(confirmarContraseñaInput);
        if (!coincidenContrasenas(contraseñaInput.value, confirmarContraseñaInput.value)) {
            confirmarContraseñaInput.classList.remove('valid');
            confirmarContraseñaInput.classList.add('error');
            confirmarContraseñaErrorElement.innerHTML = 'Las contraseñas no coinciden.';
            confirmarContraseñaErrorElement.classList.add('error-text');
            confirmarContraseñaErrorElement.classList.remove('success-text');
        } else {
            confirmarContraseñaInput.classList.remove('error');
            confirmarContraseñaInput.classList.add('valid');
            confirmarContraseñaErrorElement.innerHTML = '';
            confirmarContraseñaErrorElement.classList.remove('error-text');
            confirmarContraseñaErrorElement.classList.add('success-text');
        }
    });

    formulario.addEventListener('submit', function (event) {
        let camposVacios = false;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                camposVacios = true;
                validarCampo(input);
            }
        });

        if (camposVacios || !validarContrasena(contraseñaInput.value) || !coincidenContrasenas(contraseñaInput.value, confirmarContraseñaInput.value)) {
            event.preventDefault();
            alert('Por favor, completa todos los campos obligatorios y asegúrate de que la contraseña y su confirmación coincidan.');
        }
    });
});
