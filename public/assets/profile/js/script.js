function setBalance(balanceNumber) {
  var balanceElement = document.getElementById('balance-ars');
  if (balanceElement) {
    balanceElement.innerHTML = balanceNumber;
  } else {
    console.error("No se encontraron los elementos de cantidades");
  }
}

function setNewNumber(number) {
  const orderTable = document.getElementById("order-table-id");
  var numberElement = document.getElementById('whatsapp-number');
  if (numberElement) {
    numberElement.innerHTML = number;
    orderTable.style.display = "table";
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
  const orderTable = document.getElementById("order-table-id");
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
    const phoneNumber = data.phoneNumber;
    const orderId = data.orderId;

    if (phoneNumber && orderId) {
      orderTable.style.display = "table";
      setNewNumber(phoneNumber);
      setOrderId(orderId);
    }

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
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-swal'
      }
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
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal'
      }
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
      confirmButtonText: "Si, lo quiero!",
      customClass: {
        popup: 'custom-swal'
      }
    });

    if (result.isConfirmed) {
      const response = await fetch('/api/sms/number');
      let data;
      console.log(response)

      if (response.status === 402) {
        throw new Error('No tiene saldo en su cuenta para comprar un nuevo numero');
      }

      if (response.status === 201) {
        data = await response.json();
        setNewNumber(data.data.phoneNumber);
        setOrderId(data.data.orderId);
        setBalance(data.data.newBalance);
      }
    }

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal'
      }
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
      confirmButtonText: "Continuar",
      customClass: {
        popup: 'custom-swal'
      }
    });

    if (result.isConfirmed) {

      let orderId = getOrderId();

      if (!orderId) {
        throw new Error('Debes obtener primero un numero para recibir un sms.');
      }

      changeWaitingStatus()

      const response = await fetch(`/api/sms/receive/${orderId}`);
      const order = await response.json();

      console.log(order)

      if (order.statusCode === 200) {
        setActivationCode(order.data.sms.code);
      } else {
        let result = await Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener el sms. Tu dinero fue reembolsado. Intentá con otro numero',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal'
          }
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
      }

    }

  } catch (error) {
    let result = await Swal.fire({
      title: 'Error',
      text: 'No se puede obtener el codigo para ese numero, pruebe con otro.',
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal'
      }
    });
    console.log(result)
    if(result.isConfirmed){
      window.location.reload();
    }
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

async function getInfo() {  
  await Swal.fire({
    title: "Paso a paso",
    html: "<div style='text-align: left;'>" +
    "1- Cargar saldo en tu cuenta (1 número - $3500)<br>" +
    "2- Presionar botón nuevo número<br>" +
    "3- Cargar tu nuevo número en WhatsApp y enviar SMS de verificación<br>" +
    "4- Presionar botón <img src='assets/profile/sms-image.svg' alt='Editar' width='24' height='24'>  para recibir el código de verificación<br>" +
    "5- Esperar unos segundos a que el mensaje llegue sin recargar la página<br>" +
    "6- Ingresar el código recibido<br>" +
    "7- Disfrutar de su nuevo número de WhatsApp</div>",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Entendido!",
    customClass: {
      popup: 'custom-swal'
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchDataFromServer);
document.getElementById('topUpButton').addEventListener('click', topUpBalance);
document.getElementById('newNumber').addEventListener('click', getNewNumber);
document.getElementById('infoButton').addEventListener('click', getInfo);
document.getElementById('reloadButton').addEventListener('click', function () {
  var gif = document.getElementById('loading-gif');
  console.log(gif)
  if (gif.style.display === 'none') {
    location.reload();
  } else {
    Swal.fire({
      title: 'Error',
      text: 'No se puede recargar mientras esperas sms',
      icon: 'error',
      confirmButtonText: 'Esperar',
      customClass: {
        popup: 'custom-swal'
      }
    });
  }
});