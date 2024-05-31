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
    console.error("No se encontraron los elementos de cantidades num");
  }
}

function changeWaitingStatus() {
  var button = document.getElementById('sms-button');
  var gif = document.getElementById('loading-gif');

  if (button.style.display !== 'none') {
    button.style.display = 'none';
    gif.style.display = 'inline';
  } else {
    button.style.display = 'inline';
    gif.style.display = 'none';
  }
}


function setActivationCode(code) {
  var codeElement = document.getElementById('verification-code');
  if (codeElement) {
    codeElement.innerHTML = code;
    changeWaitingStatus();
  } else {
    console.error("No se encontraron los elementos de cantidades code");
  }
}

function setOrderId(orderId) {
  var orderNumber = document.getElementById('order-number-td');
  if (orderNumber) {
    orderNumber.textContent = orderId;
  } else {
    console.error("No se encontraron los elementos de cantidades");
  }
}

function getOrderId() {
  var orderNumber = document.getElementById('order-number-td');
  if (orderNumber) {
    return orderNumber.textContent;
  }
}

function checkNumber() {
  var numberElement = document.getElementById('whatsapp-number');
  return numberElement && numberElement.innerHTML;
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
      console.log(data)

      if (data.response) {
        window.location.href = data.response;
      } else {
        throw new Error('La respuesta no contiene una URL válida');
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
      const response = await fetch('/api/sms/number');
      let data;

      if (response.status === 402) {
        throw new Error('No tiene saldo en su cuenta para comprar un nuevo numero');
      }

      if (response.status === 201) {
        data = await response.json();
        setNewNumber(responseJson.data.phoneNumber);
        setOrderId(responseJson.data.orderId);
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

async function receiveSMS() {
  try {
    let result = await Swal.fire({
      title: "Recibiras el mensaje en unos segundos",
      text: "Si ya comenzaste con la creaciòn de la cuenta con el numero solicitado, tocá continuar y esperá unos segundos a recibir el código de confirmación. Una vez recibido ingresalo y listo!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    });

    if (result.isConfirmed) {

      changeWaitingStatus()

      let orderId = getOrderId();

      if (!orderId) {
        throw new Error('Debes obtener primero un numero para recibir un sms.');
      }

      const response = await fetch(`/api/sms/receive/${orderId}`);
      const order = await response.json();
      console.log(order)
      setActivationCode(order.data.sms.code);
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