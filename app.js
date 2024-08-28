// API
let API_URL = "http://localhost:5000/personajes"

// establecemos una varibale para ID en null para que este sea su valor inicial
let personajeID = null;

// seleccionamos todo lo que vamos a necesitar como el input para buscar, el formulario y los botones
let form = document.getElementById('formCreateUpdate')

let botonGuardar = document.getElementById("btnSave")

let botonAdd = document.getElementById("btnAdd")

let botonCancelar = document.getElementById("btnClose")

let searchBard = document.getElementById("searchBard")


// FUNCION PARA MOSTRAR ELEMENTOS DE LA BASE DE DATOS
async function mostrarLista() {

    // Utilizamos tryCatch para manejar los errores
    try {
        // Creamos una variable response para hacer nuestra petición con fetch
        // Fetch funciona de la siguiente manera en el caso de mostrar: fetch(URLDELAAPI,{ METODO A UTILIZAR, EN ESTE CASO ES GET })
        let response = await fetch(API_URL, {
            method: "GET"
        });

        // creamos una varible en la cual vamos a convertir los datos de response a json
        let data = await response.json()

        // le damos una variable al input que usaremos para buscar
        let searchInput = document.getElementById('inputSearch');

        // Creamos un validador para para que la lista se actualice segun lo que haya en el input de buscar
        if (searchInput) {
            // aqui le decimos que tendrá un evento input y que al pasar algun dato dentro se elecute la funcion mostrarLista
            searchInput.addEventListener('input', mostrarLista);
        }
        // aqui le damos un valdiador con un operador ternario donde le decimos que el input va a tener como valor lo ingresado y sino tiene nada que lo deje vacio, tenemos que hacer esto para que no nos salga un error undefined cuando el input este vacio, esto provoca que se muestren todos los elementos
        let query = searchInput ? searchInput.value.toLowerCase() : ''

        // Seleccionamos el lugar donde se van a ingresar cada uno de los datos en formato de lista, en este casi seleccionamos el UL que tenemos en el html con el ID list
        let listado = document.getElementById("list")

        // Ahora le decimos al listado que borre todo lo que tenga adentro para que el UL quede vacio
        listado.innerHTML = ''

        // aqui una variable en la cual vamos a recorrer los datos con el metodo filter para que así luego podamos usar nuestra barra de busqueda, entonces lo que le decimos al filter es que recorra todo el array  y que cada uno de los objetos se lamarán personaje
        let personajeFiltrado = data.filter(personaje => {

            // Validar que cada propiedad exista antes de usar toLowerCase() y le decimos que en caso tañ que no tega nada que el vamor sea vacio
            const name = personaje.name ? personaje.name.toLowerCase() : '';
            const alias = personaje.alias ? personaje.alias.toLowerCase() : '';
            const firstAppearance = personaje.firstAppearance ? personaje.firstAppearance.toLowerCase() : '';
            // En este elemento lo que hacemos es decirle a los poderes que se separen con una comy un espacio y que en caso tal de que no tengamos nada que sean vacios
            const powers = personaje.powers ? personaje.powers.join(", ").toLowerCase() : '';

            // Filtrar si alguna de las propiedades coincide con la consulta
            return name.includes(query) || alias.includes(query) || firstAppearance.includes(query) || powers.includes(query);
        })

        // Aqui vamos a recorrer el filtro que creamos anteriror mente para que me cree cada uno de los elementos de la lista
        personajeFiltrado.map((personaje) => {
            // creamos una variable que va a crear un elemento LI por cada uno de los objetos del array
            let item = document.createElement('li')

            // Ahora le damos estilos a LI
            item.classList.add("itemList", "w-full", "flex", "flex-col", "justify-center", "items-center", "mb-5")

            // Despues con innerHTML creamos la plantilla de nuestro elemento y con el operador ${} llamamos el dato que queremos traer del personaje
            item.innerHTML = `
            <div class="rounded-2xl border w-full max-lg:py-4 min-h-12 flex flex-wrap justify-between p-4 m-4 shadow-md text-center">
                    <div class="flex flex-col max-lg:w-full lg:w-[25%] gap-5">
                        <h3 class="font-bold text-md text-center">Nombre</h3>
                        <p class"" data-names >${personaje.name}</p>
                    </div>
                    <div class="flex flex-col max-lg:w-full lg:w-[25%] gap-5">
                        <h3 class="font-bold text-md text-center">Nombre de héroe</h3>
                        <p>${personaje.alias}</p>
                    </div>
                    <div class="flex flex-col max-lg:w-full lg:w-[25%] gap-5">
                        <h3 class="font-bold text-md text-center">Aparición</h3>
                        <p class"">${personaje.firstAppearance}</p>
                    </div>
                    <div class="flex flex-col max-lg:w-full lg:w-[25%] gap-5">
                        <h3 class="font-bold text-md text-center">Poderes</h3>
                        <p class"">${personaje.powers.join(", ")}</p>
                    </div>
                    <div class="noame w-full max-lg:py-4 mt-10 justify-center items-center flex ">
                        <button onclick="eliminar('${personaje.id}')" class="btnDelete rounded-2xl mx-2 py-4 px-6 bg-red-600 text-white font-bold w-full flex text-center justify-center my-2">Borrar</button>
                    <button  class="btnUpdate rounded-2xl mx-2 py-4 px-6 bg-green-600 text-white font-bold w-full flex text-center justify-center my-2">Actualizar</button>
                        </div>
                </div>
            `;

            // Aquí haremos una validacion para irganice la lista de forma descentende
            if (listado.firstChild) {
                // aui le decimos que agregue el item al principio de la lista así los ultimos serán primero y cuando creemos un nuevo se vea de primero en la lista
                listado.insertBefore(item, listado.firstChild);
            }
            // Aqui le decimos que agregue el item
            else {
                listado.appendChild(item); // Si la lista está vacía, simplemente añade el elemento
            }

            // Aquí daremos la funcion al boton actualizar 
            item.querySelector('.btnUpdate').addEventListener('click', (e) => {
                // Prevenimos el comportamiento por defecto del boton
                e.preventDefault()

                // Aqui le asignamos un ID a la variable perosnajeID
                personajeID = personaje.id

                // Aquí le decimos que tome los tados que estamos trayendo del formulario (esto lo confugaremos más abajo ASÍ QUE TRNAQUILO SI ESTE NO LO ENTEINDES AUN) basicamente le decimos que ejecute esa funcion pero con los datos del persoanje
                personajeForm(personaje)

                // con esto le decimos que oculte el boton de agregar, añadiendo la clase hidden
                botonAdd.classList.add('hidden')

                // con esto le decimos que muestre el formulario, removiendo la clase hidden
                form.classList.remove('hidden')

                // con esto le decimos que oculte el listado UL, añadiendo la clase hidden
                listado.classList.add('hidden')

                //// con esto le decimos que oculte la bara de busqueda, añadiendo la clase hidden
                searchBard.classList.add("hidden")

            })
        })


    } catch (error) {
        console.log("erro al botener la lista de personajes", error)

    }


}

// inicializamos la función para que se muestre la lista
mostrarLista()

// FUNCION PARA ELEMENTOS ELEMENTOS DE LA BASE DE DATOS
async function eliminar(id) {
    // Utilizamos tryCatch para manejar los errores
    try {
        // Creamos una variable response para hacer nuestra petición con fetch
        // Fetch funciona de la siguiente manera en el caso de eliminar: fetch(`URLDELAAPI/${id}`{ METODO A UTILIZAR, EN ESTE CASO ES DELETE })
        let response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        // validamos para que ejecute un funcion en caso de que la respuesta sea OK y que nos muestre un error en caso de que no se cumpla
        if (response.ok) {
            console.log(`Personaje con id ${id} eliminado correctamente`);
            await mostrarLista();
        } else {
            console.log("Error al eliminar el personaje");
        }
    } catch (error) {
        console.log("error al eliminar", error);
    }
}

// Funcion para capturar los datos al CREAR un personaje y tambien MOSTRAR los datos cuando vayammos a actulizar (ESTA ES LA QUE UTILIZAMOS EN LA LINEA 117)
function personajeForm(personaje) {
    document.getElementById('inputName').value = personaje.name;
    document.getElementById('inputAlias').value = personaje.alias;
    document.getElementById('inputAppearance').value = personaje.firstAppearance;
    document.getElementById('inputPowers').value = personaje.powers.join(', ');
}



// FUNCION PARA CREAR Y ACTUALIZAR ELEMENTOS DE LA BASE DE DATOS
async function CrearActualizarItem() {

    //Caputramos los datos de los imputs del formulario con .value y le agregamos .trim() para que elimine los espacios que pongan al inicio
    let name = document.getElementById('inputName').value.trim();
    let alias = document.getElementById('inputAlias').value.trim();
    let firstAppearance = document.getElementById('inputAppearance').value.trim();
    let powers = document.getElementById('inputPowers').value.trim();


    // con estos if lo que haremos es valdiar que ingresen los datos
    if (!name) {
        alert("Por favor, ingrese el nombre");
        return;  // Detener la ejecución si 'name' está vacío
    }

    if (!alias) {
        alert("Por favor, ingrese el alias.");
        return;  // Detener la ejecución si 'alias' está vacío
    }
    if (!firstAppearance) {
        alert("Por favor, ingrese su primer aparición.");
        return;  // Detener la ejecución si 'firstAppearance' está vacío
    }
    if (!powers) {
        alert("Por favor, ingrese sus poderes.");
        return;  // Detener la ejecución si 'powers' está vacío
    }

    // Separar los poderes ingresados por ',' y enviarlo al array
    let powersArray = powers ? powers.split(',').map(power => power.trim()) : [];


    // creamos un objeto que recibirá los datos organizados de forma correta para enviarlo a nustra base de datos
    let dataPersonaje = {
        name: name,
        alias: alias,
        firstAppearance: firstAppearance,
        powers: powersArray
    };
    // Utilizamos tryCatch para manejar los errores
    try {
        // creamos la variable response donde se hara el fetch
        let response;

        // creamos el validador para que ejecute la funcion de actualizar en caso de que tengamos un ID almacenado en personajeID
        if (personajeID) {


             // Fetch funciona de la siguiente manera en el caso de ACTUALIZAR: fetch(`URLDELAAPI/${id}`{ METODO A UTILIZAR, EN ESTE CASO ES PUT })
            response = await fetch(`${API_URL}/${personajeID}`, {
                method: "PUT",
                
                // Con esto le decimos que le vamos a enviar un JSON el cual está almacenado en dataPersonaje
                body: JSON.stringify(dataPersonaje)
            });

            // Asignamos una variable a nuestros datos actualizados
            let updateData = await response.json();
            // imprimimos un mensaje 
            console.log(`Personaje actualizado: ${updateData}`);
        } 
        // Este else se ejecutará en caso tal de que no haya un ID en personaje ID
        else {
             // Fetch funciona de la siguiente manera en el caso de CREAR: fetch(URLDELAAPI{ METODO A UTILIZAR, EN ESTE CASO ES POST })
            response = await fetch(API_URL, {
                method: "POST",
                // Con esto le decimos que le vamos a enviar un JSON el cual está almacenado en dataPersonaje
                body: JSON.stringify(dataPersonaje)
            });

        }

        // Este validador nos dirá que en caso contrario de que la respuesta sea OK que nos cree un error y nos responda el status de response 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Una vez se cumpla una de las dos funciones anteriores que actualice la lista
        await mostrarLista()

        // una vez se envie el formulario eliminará el valor almacenado del personaje
        personajeID = null;

        // UNa vez se envia reseteamos el formulario para que quede en blanco
        form.reset()

        alert('Personaje guardado con éxito.');

    } catch (error) {
        console.log("Error al Crear o actualizar el personaje:", error)
        alert("Hubo un problema al guardar el personaje. Por favor, intente de nuevo.");
    }
}


// agregamos el evento al boton para que muestre el formulario y oculte la lista
botonAdd.addEventListener('click', (e) => {
    // Con esto evitamos que el boto reinicie la web al darle clic
    e.preventDefault()
// le decimos que muestre el formulario quitandole la clase hidden
    form.classList.remove('hidden');

    // ahora que oculte el boton añadir, agregando la clase hidden
    botonAdd.classList.add('hidden');
    // ahora seleccionamos la lista UL y la ocultamos agregando el hidden
    document.getElementById('list').classList.add('hidden');

    // ocultamos la barra de busqueda agregando hidden
    searchBard.classList.add("hidden")

})

// Evento para el botono cancelar (BASICAMENTE REVERTIMOS QUE LE DIJIMOS EN EL BOTON AÑADIR LO QUE HAY CON REMOVE LO CAMBIAMOS A ADD Y LO DE ADD A REMOVE)
botonCancelar.addEventListener('click', (e) => {
    // Con esto evitamos que el boto reinicie la web al darle clic
    e.preventDefault()

    document.getElementById("formCreateUpdate").classList.add('hidden');
    botonAdd.classList.remove('hidden');
    document.getElementById('list').classList.remove('hidden');
    searchBard.classList.remove("hidden")
})

// Agergamos el evento para guardar crear o actualizar
botonGuardar.addEventListener('click', (e) => {
    // Con esto evitamos que el boto reinicie la web al darle clic
    e.preventDefault()

    // cuando den clic se ejecutará esta funcion de crear y actualizar
    CrearActualizarItem()

    // y luego volvemos a mostrar la lista, el la barra de busqueda  el boton de añadir y oculte el formulario
    document.getElementById("formCreateUpdate").classList.add('hidden');
    botonAdd.classList.remove('hidden');
    document.getElementById('list').classList.remove('hidden');
    searchBard.classList.remove("hidden")


})



