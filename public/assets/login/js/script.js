let loginForm = document.querySelector(".my-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  console.log("Email:", email.value);
  console.log("Password:", password.value);


  const formData = {
    email: email.value,
    password: password.value
  };

  try {
    const response = await fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      let data = await response.json();
      let redirect = data.admin ? 'admin.html' : 'profile.html';
      window.location.href = redirect;
    } else {
      console.log('ERROR')
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Los datos son incorrecto",
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