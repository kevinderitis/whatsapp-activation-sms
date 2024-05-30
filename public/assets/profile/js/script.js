function setBalance(balanceNumber) {
  var balanceElement = document.getElementById('balance-ars');
  if (balanceElement) {
    balanceElement.innerHTML = balanceNumber;
  } else {
    console.error("No se encontraron los elementos de cantidades");
  }
}

function setNewNumber(number) {
  var numberElement = document.getElementById('whatsapp-number');
  if (numberElement) {
    numberElement.innerHTML = number;
  } else {
    console.error("No se encontraron los elementos de cantidades");
  }
}

async function fetchDataFromServer() {
  try {
    const response = await fetch(`/user/data`);

    if (!response.ok) {
      if (response.statusText === "Unauthorized") {
        window.location.href = 'login.html'
      }
      throw new Error('Hubo un problema al obtener los datos del servidor.');
    }

    const data = await response.json();

    console.log(data)

    const balance = data.balance;

    setBalance(balance);

  } catch (error) {
    console.error('Error al obtener datos del servidor:', error);
  }
};

async function topUpBalance() {
  try {
    const { value: amount } = await Swal.fire({
      title: 'Recargar Saldo',
      input: 'number',
      inputLabel: 'Ingrese la cantidad de saldo que desea cargar',
      inputPlaceholder: 'Monto en ARS',
      inputAttributes: {
        min: 1,
        step: 1
      },
      showCancelButton: true,
      confirmButtonText: 'Recargar',
      cancelButtonText: 'Cancelar'
    });

    if (amount) {
      const response = await fetch(`/user/topup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: Number(amount) })
      });

      if (!response.ok) {
        throw new Error('Error al recargar saldo');
      }

      const data = await response.json();

      Swal.fire({
        title: 'Éxito',
        text: 'Saldo recargado con éxito',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      console.log('Saldo recargado con éxito: aguarde unos minutos a que impacte el pago.');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });

    console.error('Error al recargar saldo:', error);
  }
}

function fakeResponseNumber() {
  let response = {
    statusCode: 200,
    data: {
        orderId: 151069516,
        phoneNumber: "1155617091",
        countryCode: "+54",
        orderExpireIn: 600
    }
};
  return response;
}

async function getNewNumber() {
  try {
    let result = await Swal.fire({
      title: "Estas por comprar un nuevo numero",
      text: "El valor del mismo es $3500, se descontará de tu saldo. Luego podrás recibir un sms para activar tu nueva cuenta de Whatsapp.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, lo quiero!"
    });

    if (result.isConfirmed) {
      // const response = await fetch(`/api/sms/number`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ amount: Number(amount) })
      // });

      // const responseJson = await response.json();
      let responseJson = {};
      responseJson = fakeResponseNumber();
      // if (response.status === '402') {
      //   Swal.fire({
      //     title: 'Error',
      //     text: 'No tiene saldo en su cuenta para comprar un nuevo numero',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   });
      // }

      if (responseJson.data.phoneNumber) {
        setNewNumber(responseJson.data.phoneNumber);
      }
    }

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });

    console.error('Error al recargar saldo:', error);
  }
}

const logout = async () => {
  try {
    const response = await fetch(`/auth/logout`)

    if (!response.ok) {
      throw new Error('Error al hacer logout');
    }

    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error al hacer logout:', error.message);
  }
};

function copyToClipboard(elementId) {
  var element = document.getElementById(elementId);
  var text = element.textContent || element.innerText;

  navigator.clipboard.writeText(text).then(function () {
    console.log('Text copied to clipboard');
    showCopiedAlert();
  }).catch(function (err) {
    console.error('Error copying text: ', err);
  });
}

function showCopiedAlert() {
  var alertBox = document.getElementById('copyAlert');
  alertBox.textContent = '¡Copiado!';
  alertBox.style.display = 'block';
  setTimeout(function () {
    alertBox.style.display = 'none';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', fetchDataFromServer);
document.getElementById('topUpButton').addEventListener('click', topUpBalance);
document.getElementById('newNumber').addEventListener('click', getNewNumber);