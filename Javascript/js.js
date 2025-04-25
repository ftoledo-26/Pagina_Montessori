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
  event.preventDefault();


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
  enlaceInvisible.setAttribute(
    'href',
    'mailto:info@asociacionmontessori-malaga.org?subject=Formulario de Inscripción&body=' + encodeURIComponent(messageBody)
  );
  enlaceInvisible.click();
}

boton.addEventListener('click', HandleSendEmail);


document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById('episodioPodcast');
  console.log(selectElement);  // Log to check if it's selected correctly

  if (!selectElement) {
      console.error("No se encontró el select con ID 'episodioPodcast'.");
      return;
  }

  const video_container = document.querySelector('.video-container');
  if (!video_container) {
      console.error("No se encontró el contenedor de video.");
      return;
  }

  const podcastURL = new Map([
      ['Otra educación es posible', 'g2XTpCa9qlw'],
      ['episodio2', 'AQUI_OTRO_ID']
  ]);

  // Populating the select dropdown
  for (const [key] of podcastURL) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key;
      selectElement.appendChild(option);
  }

  // Function to load the selected podcast
  function CargarPodcast() {
      const selectedValue = selectElement.value;
      console.log("Selected Value: ", selectedValue);  // Log to see the selected option
      const videoID = podcastURL.get(selectedValue);
      console.log("Video ID: ", videoID);  // Log to verify the video ID
      video_container.innerHTML = `
          <iframe 
              src="https://www.youtube.com/embed/${videoID}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>`;
  }

  selectElement.addEventListener('change', CargarPodcast);
  CargarPodcast();
});
