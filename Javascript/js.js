document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".montessori-tarjeta");

  faqItems.forEach(item => {
    const question = item.querySelector(".pregunta");
    const answer = item.querySelector(".respuesta");
    const icon = item.querySelector(".icono");

    question.addEventListener("click", function () {
      const isOpen = answer.classList.contains("open");

      // Cerrar todas las respuestas
      document.querySelectorAll(".respuesta").forEach(ans => {
        ans.classList.remove("open");
        ans.previousElementSibling.classList.remove("active");
        ans.previousElementSibling.querySelector(".icono").textContent = "▼";
      });

      // Abrir la respuesta correspondiente
      if (!isOpen) {
        answer.classList.add("open");
        question.classList.add("active");
      }
    });
  });
});

const form = document.getElementById('form-container');
const boton = document.getElementById('boton');

function HandleSendEmail(event) {
  event.preventDefault();

  // Recoger los valores de los campos
  const inputName = document.getElementById('nombre').value;
  const inputApellido1 = document.getElementById('apellido1').value;
  const inputApellido2 = document.getElementById('apellido2').value;
  const inputDNI = document.getElementById('dni').value;
  const inputDomicilio = document.getElementById('domicilio').value;
  const inputLocalidad = document.getElementById('localidad').value;
  const inputCP = document.getElementById('cp').value;
  const inputProvincia = document.getElementById('provincia').value;
  const inputTelefonoFijo = document.getElementById('telefono_fijo').value;
  const inputTelefonoMovil = document.getElementById('telefono_movil').value;
  const inputEmail = document.getElementById('email').value;
  const inputGenero = document.getElementById('genero').value;
  const inputOcupacion = document.getElementById('ocupacion').value;
  const inputEstudios = document.getElementById('estudios').value;
  const inputHobbies = document.getElementById('hobbies').value;
  const inputManitas = document.getElementById('manitas').value;
  const inputDisponibilidadLaboral = document.getElementById('disponibilidad_laboral').value;
  const inputDisponibilidadFinde = document.getElementById('disponibilidad_finde').value;
  const inputMetodopago = document.getElementById('metodo_pago').value;

  let messageBody = `
    Nombre: ${inputName}
    Apellido 1: ${inputApellido1}
    Apellido 2: ${inputApellido2}
    DNI: ${inputDNI}
    Domicilio: ${inputDomicilio}
    Localidad: ${inputLocalidad}
    Código Postal: ${inputCP}
    Provincia: ${inputProvincia}
    Teléfono fijo: ${inputTelefonoFijo}
    Teléfono móvil: ${inputTelefonoMovil}
    Email: ${inputEmail}
    Sexo: ${inputGenero}
    Ocupación: ${inputOcupacion}
    Estudios / Conocimientos: ${inputEstudios}
    Aficiones / Hobbies: ${inputHobbies}
    Soy manitas en: ${inputManitas}
    Disponibilidad (laborables): ${inputDisponibilidadLaboral}
    Disponibilidad (fines de semana): ${inputDisponibilidadFinde}
    Método de pago: ${inputMetodopago}
  `;

  // Validación de campos obligatorios
  const requiredFields = [
    { value: inputName, name: "Nombre" },
    { value: inputApellido1, name: "Apellido 1" },
    { value: inputDNI, name: "DNI" },
    { value: inputEmail, name: "Email" },
    { value: inputLocalidad, name: "Localidad" },
    { value: inputGenero, name: "Género" },
    { value: inputOcupacion, name: "Ocupación" },
    { value: inputEstudios, name: "Estudios" },
    { value: inputHobbies, name: "Hobbies" },
    { value: inputManitas, name: "Manitas" },
    { value: inputDisponibilidadLaboral, name: "Disponibilidad laboral" },
    { value: inputDisponibilidadFinde, name: "Disponibilidad fines de semana" },
    { value: inputMetodopago, name: "Método de pago" }
  ];

  for (let i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i].value.trim()) {
      alert(`El campo ${requiredFields[i].name} es requerido.`);
      return;
    }
  }

  // Enviar el mensaje al backend
  fetch('http://localhost:3000/contacto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: messageBody  // Enviar el mensaje al backend
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok') {
      alert('Mensaje enviado con éxito');
    } else {
      alert('Hubo un error al enviar el mensaje');
    }
  })
  .catch((error) => {
    // Si hay un error
    console.error('Error:', error);
    console.log('Error al enviar el mensaje:', error);
    alert('No se pudo enviar el mensaje');
  });
}

boton.addEventListener('click', HandleSendEmail);
form.addEventListener('submit', HandleSendEmail);