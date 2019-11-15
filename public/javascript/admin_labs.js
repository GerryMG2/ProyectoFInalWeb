

URL_ENCARGADOS = "/api/admin/users/encargados";
URL_API_LABORATORIOS = "/api/admin/labos/";

options = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
}

listaEdificios = ["Martin Baro", "Icas", "John de Cortina", "Audio Visuales"];

llenarEdificios = (edificios) => {
    listaEdificios.forEach(element => {
        let opcion = document.createElement("option");
        opcion.innerHTML = element;
        edificios.appendChild(opcion);
    });
};

llenarEncargados = (encargados) => {
    fetch(URL_ENCARGADOS, options).then(res => res.json())
        .catch(error => console.log('error: ', error))
        .then(response => {
            console.log('success: ', response);
            response.forEach(element => {
                opcion = document.createElement("option");
                opcion.innerHTML = element;
                encargados.appendChild(opcion);
            });
        });
}


crearLabFetch = (body) => {

    let options_and_body = options;
    options_and_body["body"] = JSON.stringify(body);
    options_and_body["method"] = "POST";
    fetch(URL_API_LABORATORIOS , options_and_body).then(res => res.json())
        .catch(error => {
            console.log('error: ', error);
            Swal.fire(
                'Hubo un problema para crear el laboratorio',
                error,
                'error'
            )
        })
        .then(response => {
            console.log('success: ', response);
            Swal.fire(
                response.msg,
                'Continua gestionado laboratorios',
                'success'
            )
        })
};

getLabs = (filtros, pagina) => {
    let params = {
        filtros: filtros,
        page: pagina

    }

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let options_and_body = options;

    let auxUrl = URL_API_LABORATORIOS + '?' + query;
    console.log(auxUrl);

    fetch(auxUrl, options_and_body).then(res => res.json())
        .catch(error => console.log('error: ', error))
        .then(response => {
            console.log('success: ', response);
        });

};





// inicio javascript
function start() {
    var formulario = document.getElementById("form-principal");
    var selectEdificios = document.getElementById("opciones-edificios");
    var selectEncargado = document.getElementById("opciones-inCharge");
    var btn_crear = document.getElementById("btn-principal");
    var btn_limpiar = document.getElementById("btn-limpiar");
    var nombre = document.getElementById("name");
    var code = document.getElementById("code");
    var capacidad = document.getElementById("capacity");
    var buscar = document.getElementById("btn-buscar");
    var pagina = 0;

    crearlab = (event) => {
        event.preventDefault();
        console.log("name: ", nombre.value);
        if (nombre.value && code.value && capacidad.value) {
            let body = {
                name: nombre.value,
                code: code.value,
                capacity: parseInt(capacidad.value),
                inCharge: selectEncargado.value,
                building: selectEdificios.value
            };
            console.log("body: ", body);
            crearLabFetch(body);

        } else {
            // TODO: Agregar mensajes al usuario  
        }

    };
    btn_crear.addEventListener("click", crearlab)
    btn_limpiar.addEventListener("click", (e) => {
        e.preventDefault();
        formulario.reset();
    })

    llenarEdificios(selectEdificios);
    llenarEncargados(selectEncargado);

    getLabs({}, 1);
}













window.onload = start;


