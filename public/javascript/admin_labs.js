

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



getLabs = (filtros, pagina, paginatotales,tabla, e) => {
    if(e){
        e.preventDefault();
    }
    let params = {
        filtros: filtros,
        page: pagina

    }

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let options_and_body = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let auxUrl = URL_API_LABORATORIOS + '?' + query;
    console.log(auxUrl);
    console.log(options_and_body);
    tabla.innerHTML = "";
    fetch(auxUrl, options_and_body).then(res => res.json())
        .catch(error => console.log('error: ', error))
        .then(response => {
            console.log('success: ', response);
            paginatotales = response.paginas;
            let contador = ((pagina - 1) * 10 )+ 1;
            response.docs.forEach(element => {
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.innerHTML = contador;
                let nombre = document.createElement("td");
                nombre.innerHTML = element.name;
                let code = document.createElement("td");
                code.innerHTML = element.code;
                let edificio = document.createElement("td");
                edificio.innerHTML = element.building;
                let encargado = document.createElement("td");
                encargado.innerHTML = element.inCharge;
                let capacidad = document.createElement("td");
                capacidad.innerHTML = element.capacity;
                row.appendChild(th);
                row.appendChild(nombre);
                row.appendChild(code);
                row.appendChild(edificio);
                row.appendChild(encargado);
                row.appendChild(capacidad);
                tabla.appendChild(row);
                contador++;
            });
        });


};

crearLabFetch = (e,body, formulario, totalPaginas) => {
    e.preventDefault();
    let options_and_body = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };
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
        }).then(()=>{
            formulario.reset();
        }).then(()=>{
            console.log("esperar medio segundo");
            setTimeout(() => {
                getLabs("", 1, totalPaginas, bodytable,e);    
            }, 500);
            
        })
        
        

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
    var bodytable = document.getElementById("bodytable")
    var totalPaginas = 0;
    
  
    btn_limpiar.addEventListener("click", (e) => {
        e.preventDefault();
        formulario.reset();
    })

    crearlab = (event, formulario, totalPaginas) => {
        console.log("entrar a crear labo")
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
            crearLabFetch(event,body, formulario, totalPaginas);
            
        } else {
            // TODO: Agregar mensajes al usuario  
        }
        
        

    };

    btn_crear.addEventListener("click", (e) =>{
        e.preventDefault();

        crearlab(e, formulario, totalPaginas);
        // console.log("se creo el lab");
        
    });

    llenarEdificios(selectEdificios);
    llenarEncargados(selectEncargado);

    getLabs("", 1, totalPaginas, bodytable);
}













window.onload = start;


