// API
let apiMarvel = "http://localhost:3000/marvelChamps";

// Boton para agregar
let buttonAdd = document.getElementById('btnAdd');

// Función para crear un nuevo personaje
async function createChamp() {
    let name = prompt("Ingrese el nombre del personaje:");
    let alias = prompt("Ingrese el alias del personaje:");
    let firstAppearance = prompt("Ingrese el año de la primera aparición del personaje:");
    let powers = prompt("Ingrese los poderes del personaje separados por comas (ejemplo: 'Web-Slinging, Wall-Crawling, Super Strength')");

    // Separar los poderes ingresados por , y enviarlo al array
    let powersArray = powers.split(',').map(power => power.trim());


    // Recibir los datos de promt y convertiros en objetos
    let newChamp = {
        name: name,
        alias: alias,
        firstAppearance: firstAppearance,
        powers: powersArray
    };

    // Metodo para CREAR una nueva entrada en la base de datos
    try {
        let response = await fetch(apiMarvel, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            // Aquí estoy recibiendo los datos de del nuevo personaje
            body: JSON.stringify(newChamp)
        });

        // Establece una clase para imprimir la data en un console.log (esto es pocional)
        let data = await response.json();
        console.log("Personaje Creado:", data);

        // Actualizar la lista después de crear un nuevo personaje
        await getChamp();
    } catch (error) { //Esto es solo es un mansaje de error que nos dirá si hay un problema al enviar el POST
        console.error("Error al crear el personaje:", error);
    }
}

// Función para eliminar un personaje la usames más adelante le creamos un props que recibirá en ID
async function deleteChamp(id) {

    // el try catch es para decirle que en caso que de que funcion o en caso de error haga una cosa o la otra
    try {
        // Creamos una varaible response y con fetch le decimos con `` basticks o como se llamen, que la url es igual a ApiMarvel / y el ID que le mandaremos luego
        let response = await fetch(`${apiMarvel}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Creamos un if para que cuando la respuesta de la funcion eliminar sea OK que impmrima ejecute la funcion que queremos como consol.log y que muestre los personajes
        if (response.ok) {
            console.log(`Personaje con ID ${id} eliminado correctamente.`);

            // Actualizar la lista de personajes después de eliminar
            await getChamp();
        } else {
            console.error(`Error al eliminar el personaje con ID ${id}.`);
        }

    } catch (error) {
        console.error("Error al intentar eliminar el personaje:", error);
    }
}

// Aqui estamos escuando al boton para ejecutar la funcion para crear un nuevo personaje
buttonAdd.addEventListener('click', createChamp);


// Función para obtener la lista de personajes
async function getChamp() {

    // Metodo para OBTENER todas las entradas en la base de datos
    try {
        let response = await fetch(apiMarvel, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Creamos la variable data para almacenar lo que nos trae el GET a traves de la variable response
        let data = await response.json();

        // Creamos una variable para se lecionar el ID que le pusimos a la lista UL en el index.html
        let listContainer = document.getElementById('champList');

        // Aquí le decimos que borre todo lo que hay dentro del UL para evitar que se muestre el LI que tenemos creado epor defecto en nuestro HTML
        listContainer.innerHTML = '';

        // Selecionamos la variable data donde almacenamos la respuesta que nos trajo el response y lo recorremos con .map  y le ponemos un Props llamado Champ para obtener cada uno de los elementos de la base de datos, en este caso nuestro archivo db.json
        data.map((champ) => {
            // Creamos una variable paara crear un LI por cada objeto que traiga
            let listItem = document.createElement('li');

            // L damos clases al LI para que se vea como queremos
            listItem.classList.add('w-full', 'justify-center', 'items-center', 'flex');

            // Añadir el ID al LI
            listItem.setAttribute('data-id', champ.id);

            // Ahora aquí creamos la plantilla de cada uno de los LI y le asignamos a cada uno de los espacios que queremos que aparezcan los datos con el poerador ${data. EL VALOR DE LA JSON QUE NECESITAS}
            listItem.innerHTML = `
            <div class="rounded border w-4/5 min-h-12 flex justify-between p-4">
                <div class="flex flex-col w-[17%]">
                    <h3 class="font-bold text-xl">Nombre</h3>
                    <p>${champ.name}</p>
                </div>
                <div class="noame w-[17%] justify-center flex-col">
                    <h3 class="font-bold text-xl">Nombre de héroe</h3>
                    <p>${champ.alias}</p>
                </div>
                <div class="noame w-[17%] justify-center flex-col">
                    <h3 class="font-bold text-xl">Aparición</h3>
                    <p>${champ.firstAppearance}</p>
                </div>
                <div class="noame w-[17%] justify-center flex-col">
                    <h3 class="font-bold text-xl">Poderes</h3>
                    <p>${champ.powers.join(', ')}</p>
                </div>
                <div class="noame w-[17%] justify-center items-center flex flex-col">
                    <button class="btnDelete rounded py-4 px-6 bg-red-600 text-white font-bold w-full flex text-center justify-center my-2">Borrar</button>
                 <button class="btnUpdate rounded py-4 px-6 bg-green-600 text-white font-bold w-full flex text-center justify-center my-2">Actualizar</button>
                    </div>
            </div>`;

            // Aqui le decimos que cada contaner que cree lo mande a al listItem
            listContainer.appendChild(listItem);
        });

        // Selecionamos el boton que hay en el con la clase .btnDelete lo hacemos con querySelectorAll para que seleccione todos los botones que aparezcan
        let deleteButtons = document.querySelectorAll('.btnDelete');


        // Añadir evento de click a los botones de eliminacion
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {

                // Obtener el 'li' más cercano
                let liElement = e.target.closest('li');

                // Obtener el ID del 'data-id'
                let champId = liElement.getAttribute('data-id');

                // Llamar a la función para eliminar el personaje
                await deleteChamp(champId);
            });
        });

        // Selecionamos el boton que hay en el con la clase .btnUpdate lo hacemos con querySelectorAll para que seleccione todos los botones que aparezcan
        let updateButtons = document.querySelectorAll('.btnUpdate');

         // Añadir evento de click a los botones de eliminacion
        updateButtons.forEach(button => {
            button.addEventListener('click', async (e) => {

                // Obtener el 'li' más cercano
                let liElement = e.target.closest('li');

                // Obtener el ID del 'data-id'
                let champId = liElement.getAttribute('data-id');

                // Llamar a la función para actualizar el personaje
                await updateChamp(champId);
            });
        });

    } catch (error) {
        console.error("Error al obtener la lista de personajes:", error);
    }

    
}

async function updateChamp(id) {
    
     // Obtener los datos actuales del personaje de la API
     let response = await fetch(`${apiMarvel}/${id}`);
     let champ = await response.json();

    let newName = prompt("Ingrese el nuevo nombre del personaje:", champ.name);
    let newAlias = prompt("Ingrese el nuevo alias del personaje:", champ.alias);
    let newFirstAppearance = prompt("Ingrese el nuevo año de la primera aparición del personaje:");
    let newPowers = prompt("Ingrese los nuevos poderes del personaje separados por comas (ejemplo: 'Web-Slinging, Wall-Crawling, Super Strength')");

    // Convertir la cadena de poderes en un array
    let newPowersArray = newPowers.split(',').map(power => power.trim());

    // Crear el objeto con los datos actualizados
    let updatedChamp = {
        name: newName,
        alias: newAlias,
        firstAppearance: newFirstAppearance,
        powers: newPowersArray
    };

    try {
        // Hacer la petición PUT para actualizar el personaje
        let response = await fetch(`${apiMarvel}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedChamp)
        });

        if (response.ok) {
            console.log(`Personaje con ID ${id} actualizado correctamente.`);
            getChamp(); // Actualiza la lista de personajes después de la edición
        } else {
            console.error(`Error al actualizar el personaje con ID ${id}.`);
        }
    } catch (error) {
        console.error("Error al intentar actualizar el personaje:", error);
    }
}

// Obtener la lista de personajes al cargar la página
getChamp();
