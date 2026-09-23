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


   
const productosContainer = document.getElementById("productos-container");
const contadorCarrito = document.getElementById("contador-carrito");

const botonCarrito = document.getElementById("carrito");
const contenidoCarrito = document.getElementById("contenido-carrito");

const vistaProducto = document.getElementById("vista-producto");
const imagenGrande = document.getElementById("imagen-grande");
const nombreGrande = document.getElementById("nombre-grande");
const precioGrande = document.getElementById("precio-grande");
const cerrarVista = document.getElementById("cerrar-vista");

const disciplinas = document.querySelectorAll(".deporte");


const productos = [
    // Running
    { nombre: "Tenis deportivos", precio: 1299, imagen: "img/tenis.jpg", deporte: "Running" },
    { nombre: "Playera deportiva", precio: 599, imagen: "img/playera.jpg", deporte: "Running" },
    { nombre: "Short para correr", precio: 499, imagen: "img/short-running.jpg", deporte: "Running" },
    { nombre: "Sudadera deportiva", precio: 899, imagen: "img/sudadera-running.jpg", deporte: "Running" },
    { nombre: "Calcetas deportivas", precio: 249, imagen: "img/calcetas-running.jpg", deporte: "Running" },
    { nombre: "Gorra deportiva", precio: 399, imagen: "img/gorra-running.jpg", deporte: "Running" },
    { nombre: "Cangurera deportiva", precio: 449, imagen: "img/cangurera.jpg", deporte: "Running" },

    // Fútbol
    { nombre: "Balón de fútbol", precio: 799, imagen: "img/balon-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Jersey de fútbol", precio: 999, imagen: "img/jersey-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Short de fútbol", precio: 499, imagen: "img/short-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Tacos de fútbol", precio: 1499, imagen: "img/tacos-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Espinilleras", precio: 299, imagen: "img/espinilleras.jpg", deporte: "Fútbol" },
    { nombre: "Guantes de portero", precio: 899, imagen: "img/guantes-portero.jpg", deporte: "Fútbol" },
    { nombre: "Mochila de fútbol", precio: 699, imagen: "img/mochila-futbol.jpg", deporte: "Fútbol" },

    // Básquetbol
    { nombre: "Balón de básquetbol", precio: 849, imagen: "img/balon-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Jersey de básquetbol", precio: 899, imagen: "img/jersey-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Short de básquetbol", precio: 499, imagen: "img/short-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Tenis de básquetbol", precio: 1799, imagen: "img/tenis-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Muñequeras deportivas", precio: 249, imagen: "img/munequeras.jpg", deporte: "Básquetbol" },
    { nombre: "Rodilleras deportivas", precio: 399, imagen: "img/rodilleras.jpg", deporte: "Básquetbol" },
    { nombre: "Mochila de básquetbol", precio: 749, imagen: "img/mochila-basquetbol.jpg", deporte: "Básquetbol" },

    // Americano
    { nombre: "Balón americano", precio: 899, imagen: "img/balon-americano.jpg", deporte: "Americano" },
    { nombre: "Jersey americano", precio: 1299, imagen: "img/jersey-americano.jpg", deporte: "Americano" },
    { nombre: "Pants deportivos", precio: 799, imagen: "img/pants-americano.jpg", deporte: "Americano" },
    { nombre: "Casco americano", precio: 2499, imagen: "img/casco-americano.jpg", deporte: "Americano" },
    { nombre: "Guantes americanos", precio: 699, imagen: "img/guantes-americano.jpg", deporte: "Americano" },
    { nombre: "Hombreras deportivas", precio: 1899, imagen: "img/hombreras.jpg", deporte: "Americano" },
    { nombre: "Mochila deportiva", precio: 749, imagen: "img/mochila-americano.jpg", deporte: "Americano" }
];


let contador = 0;
let productoCarrito = [];


// Mostrar productos
function mostrarProductos(listaProductos) {

    productosContainer.innerHTML = "";

    listaProductos.forEach(function(producto) {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="producto-info">
                <h3>${producto.nombre}</h3>

                <p>Producto deportivo de alta calidad.</p>

                <span>$${producto.precio}</span>

                <button>Agregar al carrito</button>
            </div>
        `;

        productosContainer.appendChild(tarjeta);


        // Agregar al carrito
        const boton = tarjeta.querySelector("button");

        boton.addEventListener("click", function(event) {

            event.stopPropagation();

            contador++;
            contadorCarrito.textContent = contador;

            productoCarrito.push(producto);

            console.log(productoCarrito);
        });


        // Vista ampliada del producto
        tarjeta.addEventListener("click", function() {

            imagenGrande.src = producto.imagen;
            nombreGrande.textContent = producto.nombre;
            precioGrande.textContent = `$${producto.precio}`;

            vistaProducto.classList.remove("oculto");
        });

    });
}


// Mostrar todos los productos al cargar
mostrarProductos(productos);


// Filtrar productos por disciplina
disciplinas.forEach(function(disciplina) {

    disciplina.addEventListener("click", function() {

        const deporteSeleccionado =
            disciplina.getAttribute("data-deporte");

        console.log(deporteSeleccionado);


        const productosFiltrados = productos.filter(function(producto) {

            return producto.deporte === deporteSeleccionado;

        });


        mostrarProductos(productosFiltrados);

    });

});


// Mostrar / ocultar carrito
botonCarrito.addEventListener("click", function(event) {

    event.stopPropagation();

    contenidoCarrito.classList.toggle("oculto");

    mostrarCarrito();

});


// Mostrar carrito
function mostrarCarrito() {

    if (productoCarrito.length === 0) {

        contenidoCarrito.innerHTML = "El carrito está vacío";

        return;
    }


    contenidoCarrito.innerHTML = "";


    productoCarrito.forEach(function(producto, index) {

        contenidoCarrito.innerHTML += `
            <div class="producto-carrito">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div class="info-carrito">

                    <h4>${producto.nombre}</h4>

                    <span>$${producto.precio}</span>

                </div>

                <button class="eliminar" data-index="${index}">
                    Eliminar
                </button>

            </div>
        `;

    });


    const total = productoCarrito.reduce(function(acumulador, producto) {

        return acumulador + producto.precio;

    }, 0);


    contenidoCarrito.innerHTML += `
        <div class="total-carrito">
            Total: $${total}
        </div>
    `;


    const botonesEliminar =
        contenidoCarrito.querySelectorAll(".eliminar");


    botonesEliminar.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const index = boton.dataset.index;

            productoCarrito.splice(index, 1);

            contador = productoCarrito.length;

            contadorCarrito.textContent = contador;

            mostrarCarrito();

        });

    });

}


// Cerrar carrito al hacer clic afuera
document.addEventListener("click", function(event) {

    if (
        !contenidoCarrito.contains(event.target) &&
        !botonCarrito.contains(event.target)
    ) {

        contenidoCarrito.classList.add("oculto");

    }

});


// Cerrar vista del producto
cerrarVista.addEventListener("click", function() {

    vistaProducto.classList.add("oculto");

});
