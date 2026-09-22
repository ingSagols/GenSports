document.addEventListener("DOMContentLoaded", function () {
  const modalElemento = document.getElementById("modalSorteo");
  const botonParticipar = document.getElementById("btnParticipar");
  const botonCerrarSuperior = document.getElementById("cerrarSorteoSuperior");
  const formulario = document.getElementById("formularioSuscripcion");
  const mensaje = document.getElementById("mensajeSuscripcion");

  const modalSorteo = new bootstrap.Modal(modalElemento, {
    backdrop: "static",
    keyboard: false
  });

  // Mostrar la alerta al cargar la página
  modalSorteo.show();

  function cerrarAlerta() {
    modalSorteo.hide();
  }

  // Botón superior de cierre
  botonCerrarSuperior.addEventListener("click", function () {
    cerrarAlerta();
  });

  // Botón para participar
  botonParticipar.addEventListener("click", function () {
    cerrarAlerta();

    const seccionSuscripcion = document.getElementById("suscripcion");

    setTimeout(function () {
      seccionSuscripcion.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(function () {
        document.getElementById("nombre").focus();
      }, 700);
    }, 350);
  });

  // Validación visual del formulario
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (nombre === "" || correo === "") {
      mensaje.textContent = "Completa todos los campos para participar.";
      mensaje.className = "mensaje-suscripcion mt-3 text-danger";
      return;
    }

    mensaje.textContent =
      `¡Gracias, ${nombre}! Tu registro fue recibido correctamente.`;

    mensaje.className = "mensaje-suscripcion mt-3 text-success";

    formulario.reset();
  });
});
