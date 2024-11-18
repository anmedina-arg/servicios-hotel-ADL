// Datos iniciales de servicios en la lista de servicios seleccionados
const serviciosHotel = [
  { id: 1, nombre: 'Desayuno buffet' },
  { id: 2, nombre: 'Servicio a la habitación' },
  { id: 3, nombre: 'Acceso al spa' },
  { id: 4, nombre: 'Wi-Fi de alta velocidad' },
  { id: 5, nombre: 'Estacionamiento privado' },
  { id: 6, nombre: 'Aire acondicionado' },
];

console.log(serviciosHotel);

// Seleccionar el elemento <ul> de la lista de servicios seleccionados y servicios disponibles
const listaServicios = document.getElementById('servicios-lista'); // Obtiene el elemento HTML con el id 'servicios-lista' y lo almacena en la variable
// console.log(listaServicios);
const listaServiciosDisponibles = document.getElementById(
  'servicios-disponibles'
); // Obtiene el elemento con id 'servicios-disponibles' para mostrar servicios extra

// Función para renderizar los servicios seleccionados
function renderizarServicios() {
  listaServicios.innerHTML = ''; // Limpia la lista antes de volver a agregar los elementos

  // Itera sobre cada servicio en 'serviciosHotel' y lo muestra en la lista
  serviciosHotel.forEach((servicio) => {
    const item = document.createElement('li'); // Crea un elemento <li> para el servicio
    // console.log(item);
    item.textContent = servicio.nombre; // Agrega el nombre del servicio al <li>
    item.className = 'services'; // Agrega una clase CSS al <li> para aplicar estilos

    const botonEliminar = document.createElement('button'); // Crea un botón de eliminación
    botonEliminar.textContent = 'X'; // Define el texto del botón como "X"
    botonEliminar.className = 'delete-button'; // Agrega una clase CSS para el botón
    //console.log(botonEliminar);
    botonEliminar.addEventListener('click', () => {
      //console.log('el id del servicio que quiero borrar es', servicio.id);
      eliminarServicio(servicio.id);
    }); // Asigna un evento para que al hacer clic se elimine el servicio

    item.appendChild(botonEliminar); // Agrega el botón al elemento <li>
    //console.log(item);
    listaServicios.appendChild(item); // Agrega el <li> completo a la lista de servicios seleccionados
  });
}

// Función para eliminar un servicio por su id
function eliminarServicio(id) {
  const index = serviciosHotel.findIndex((servicio) => servicio.id === id); // Encuentra el índice del servicio a eliminar en el array
  //console.log('el indice del servicio es el', index);
  if (index !== -1) {
    // Si el servicio existe (índice diferente de -1)
    serviciosHotel.splice(index, 1); // Elimina el servicio del array
    renderizarServicios(); // Vuelve a renderizar la lista para reflejar el cambio
  }
}

// Función para agregar un nuevo servicio a la lista seleccionada
function agregarServicio(nuevoNombre) {
  const nuevoId = serviciosHotel.length
    ? serviciosHotel[serviciosHotel.length - 1].id + 1
    : 1; // Calcula un nuevo id único para el servicio
  serviciosHotel.push({ id: nuevoId, nombre: nuevoNombre }); // Agrega el nuevo servicio con su id y nombre al array
  renderizarServicios(); // Renderiza la lista nuevamente para mostrar el nuevo servicio
}

// Agrega un evento de clic a cada <li> en servicios disponibles
Array.from(listaServiciosDisponibles.children).forEach((item) => {
  // Convierte los hijos de 'listaServiciosDisponibles' en un array y recorre cada elemento
  item.addEventListener('click', () => agregarServicio(item.textContent)); // Al hacer clic en un servicio disponible, se llama a 'agregarServicio' con su nombre
});

// Renderiza los servicios al cargar la página
renderizarServicios(); // Llama a esta función una vez al inicio para mostrar los servicios seleccionados por defecto

// Estructura de datos para almacenar sugerencias de nuevos servicios
const sugerenciasServicios = []; // Array vacío donde se almacenarán las sugerencias de los usuarios

// Selecciona el formulario y el área para mostrar mensajes
const formSugerencia = document.getElementById('form-sugerencia'); // Obtiene el formulario con el id 'form-sugerencia'
const mensajeSugerencia = document.getElementById('mensaje-sugerencia'); // Obtiene el elemento para mostrar mensajes con el id 'mensaje-sugerencia'

// Maneja el evento de envío del formulario
formSugerencia.addEventListener('submit', (e) => {
  // Al enviar el formulario, se ejecuta esta función
  e.preventDefault(); // Evita que el formulario recargue la página

  // Obtiene los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value; // Obtiene el valor del campo "Nombre"
  const apellido = document.getElementById('apellido').value; // Obtiene el valor del campo "Apellido"
  const email = document.getElementById('email').value; // Obtiene el valor del campo "Email"
  const habitacion = document.getElementById('habitacion').value; // Obtiene el valor del campo "Habitación"
  const nuevoServicio = document.getElementById('nuevo-servicio').value; // Obtiene el valor del campo "Nuevo Servicio"

  // Agrega la sugerencia a la estructura de datos
  sugerenciasServicios.push({
    // Añade un nuevo objeto con los datos del formulario al array 'sugerenciasServicios'
    nombre,
    apellido,
    email,
    habitacion,
    nuevoServicio,
  });

  // Muestra un mensaje de confirmación al usuario
  mensajeSugerencia.textContent = `Gracias, ${nombre} ${apellido}. Su sugerencia de "${nuevoServicio}" ha sido recibida.`; // Muestra un mensaje personalizado de confirmación

  // Limpia el formulario
  formSugerencia.reset(); // Restablece todos los campos del formulario a su estado original
});

// Explicación de los métodos de Array utilizados:

// forEach: Este método recorre cada elemento de un array y ejecuta una función en cada uno de ellos.
// En este código, se utiliza para iterar sobre 'serviciosHotel' y generar la lista de servicios seleccionados.
// Ejemplo: serviciosHotel.forEach((servicio) => { ... });

// findIndex: Este método busca un elemento en el array que cumpla con una condición específica y devuelve su índice.
// Si no encuentra el elemento, devuelve -1. Se usa en la función 'eliminarServicio' para encontrar el índice del servicio a eliminar.
// Ejemplo: serviciosHotel.findIndex((servicio) => servicio.id === id);

// push: Este método agrega un nuevo elemento al final de un array y actualiza su longitud.
// Aquí se usa en 'agregarServicio' y en 'formSugerencia.addEventListener' para añadir servicios y sugerencias al array correspondiente.
// Ejemplo: serviciosHotel.push({ id: nuevoId, nombre });

// splice: Este método elimina o reemplaza elementos de un array en función de su índice y la cantidad de elementos especificada.
// En este código se usa en 'eliminarServicio' para eliminar un servicio de 'serviciosHotel'.
// Ejemplo: serviciosHotel.splice(index, 1);

// from: Este método convierte un objeto similar a un array (como la colección de elementos hijos) en un array real.
// Aquí se usa para convertir los hijos de 'listaServiciosDisponibles' en un array para recorrerlos con forEach.
// Ejemplo: Array.from(listaServiciosDisponibles.children).forEach((item) => { ... });

// Métodos de Manipulación del DOM:

// document.getElementById: Selecciona un elemento del DOM mediante su id.
// Aquí se usa para obtener elementos HTML como 'servicios-lista', 'form-sugerencia', y 'mensaje-sugerencia'.
// Ejemplo: const listaServicios = document.getElementById('servicios-lista');

// createElement: Crea un nuevo elemento HTML en el documento.
// Se utiliza para crear elementos 'li' y 'button' para cada servicio en la lista.
// Ejemplo: const item = document.createElement('li');

// innerHTML: Define o devuelve el contenido HTML de un elemento.
// En 'renderizarServicios', se usa para limpiar el contenido de 'listaServicios' antes de agregar los servicios actualizados.
// Ejemplo: listaServicios.innerHTML = '';

// textContent: Establece o devuelve el contenido de texto de un elemento, excluyendo el HTML.
// Se utiliza para agregar el nombre del servicio o el texto "X" al botón de eliminación.
// Ejemplo: item.textContent = servicio.nombre;

// appendChild: Añade un nodo (elemento) al final de la lista de hijos de un nodo padre.
// Aquí se usa para añadir el botón de eliminación a cada elemento de la lista y luego el 'li' completo a 'listaServicios'.
// Ejemplo: listaServicios.appendChild(item);

// addEventListener: Asocia un evento a un elemento HTML, de modo que una función se ejecute cuando el evento ocurra.
// En este código, se usa para detectar clics en botones y elementos de la lista, y para manejar el envío del formulario.
// Ejemplo: botonEliminar.addEventListener('click', () => eliminarServicio(servicio.id));

// preventDefault: Cancela el evento si es cancelable, lo que evita que el comportamiento predeterminado ocurra.
// Aquí se usa en el evento de envío del formulario para evitar que la página se recargue al enviar.
// Ejemplo: e.preventDefault();

// reset: Restaura los valores de un formulario a sus valores iniciales o vacíos.
// En este caso, se usa después de enviar la sugerencia para limpiar el formulario.
// Ejemplo: formSugerencia.reset();
