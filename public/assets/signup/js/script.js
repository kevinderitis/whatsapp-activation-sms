let loginForm = document.querySelector(".my-form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Email:", email.value);
    console.log("Password:", password.value);


    const formData = {
        email: email.value,
        password: password.value
    };

    console.log(formData)

    try {
        const response = await fetch(`/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // console.log(response);
        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Error al registrar usuario, intente nuevamente mas tarde. ",
                footer: '<a href="#"></a>'
            });
            throw new Error('Error en la solicitud al servidor');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error.message);
    }
});

async function checkLoggedIn() {
    try {
        const response = await fetch(`/auth/checkLoggedIn`);
        if (response.ok) {
            const data = await response.json();
            if (data.loggedIn) {
                window.location.href = 'profile.html';
            }
        } else {
            throw new Error('Error al verificar el estado de inicio de sesión');
        }
    } catch (error) {
        console.error('Error al verificar el estado de inicio de sesión:', error.message);
    }
}

window.addEventListener('DOMContentLoaded', checkLoggedIn);

function onChange() {
    if (confirmPassword.value === password.value) {
        confirmPassword.setCustomValidity('');
    } else {
        confirmPassword.setCustomValidity('Las contraseñas no son iguales');
    }
}

password.addEventListener('change', onChange);
confirmPassword.addEventListener('change', onChange);