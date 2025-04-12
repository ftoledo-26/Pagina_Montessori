document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".montessori-tarjeta");

    faqItems.forEach(item => {
        const question = item.querySelector(".pregunta");
        const answer = item.querySelector(".respuesta");
        const icon = item.querySelector(".icono");

        question.addEventListener("click", function() {
            const isOpen = answer.classList.contains("open");

            
            document.querySelectorAll(".respuesta").forEach(ans => {
                ans.classList.remove("open");
                ans.previousElementSibling.classList.remove("active");
                ans.previousElementSibling.querySelector(".icono").textContent = "▼";
            });

            
            if (!isOpen) {
                answer.classList.add("open");
                question.classList.add("active");
                
            }
        });
    });
});

const form = document.getElementById('form-container');
const boton = document.getElementById('boton');
const enlaceInvisible = document.getElementById('btn');

function HandleSendEmail(event) {
  event.preventDefault(); // Prevenir envío por defecto

  // Obtener los valores de los campos
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

  // Inicializa messageBody al principio de la función
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

  // Ahora que messageBody está definida, puedes usarla para construir el enlace mailto
  enlaceInvisible.setAttribute(
    'href',
    'mailto:franciscomanueltoledo@gmail.com?subject=Formulario de Inscripción&body=' + encodeURIComponent(messageBody)
  );

  // Simula el clic para enviar el correo
  enlaceInvisible.click();
}

boton.addEventListener('click', HandleSendEmail);