URL_API_RESERVAS = "/api/admin/reservas";

options = {
    method: "GET",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json"
  }
};

var opReserva = ["No aprobada","Aprobada", "Sin verificación"];

estadoReserva = estado => {
    opReserva.forEach(element => {
        let opcion = document.createElement("option");
        opcion.innerHTML = element;
        estado.appendChild(opcion);        
    });
    
};

function callSwalWithHTML(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    Swal.fire("Horarios: ", html);
};

getReservas = (filtros, pagina, paginatotales, tabla, formulario, e ) => {
    if(e){
        e.preventDefault();
    }

    let params = {
        filtros: filtros,
        page: pagina
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
    let options_and_body = {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    };

    let reservaURL = URL_API_RESERVAS + "?" + query;
    console.log(reservaURL);
    console.log(options_and_body);
    tabla.innerHTML = "";
    fetch(reservaURL, options_and_body)
        .then(res => res.json())
        .catch(error => console.log("error: ", error))
        .then(response => {
            console.log("success: ", response);
            paginatotales = response.pagina
            let cont = (pagina - 1) * 10 + 1;
            response.docs.forEach(element => {
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.innerHTML = cont;
                let hechaPor = document.createElement("td");
                hechaPor.innerHTML = element.userId;
                let LaboId = document.createElement("td");
                LaboId.innerHTML = element.LabId;
                let fechaReser = document.createElement("td");
                fechaReser.innerHTML = element.date;
                
                let diasReserva = document.createElement("td");
                let btn_rangeHora = document.createElement("td");
                btn_rangeHora.innerHTML = "Ver horarios";
                btn_rangeHora.classList.add("button");
                btn_rangeHora.classList.add("is-primary");
                btn_rangeHora.classList.add("is-small");
                btn_rangeHora.classList.add("is-outlined");

                btn_rangeHora.addEventListener("click", function (e) {
                    e.preventDefault();
                    let lista = document.createElement("ul");
                    element.eventos.forEach(element => {
                        let li = document.createElement("li");
                        li.innerHTML =  JSON.stringify(element);
                        lista.appendChild(li);
                    });
                    callSwalWithHTML(lista);
                });
                diasReserva.appendChild(btn_rangeHora);


                let reservaEstado = document.createElement("td");
                reservaEstado.innerHTML = element.status;
                

                let descripcion = document.createElement("td");
                let btn_descrip = document.createElement("td");
                btn_descrip.innerHTML = "Ver descrición";
                btn_descrip.classList.add("button");
                btn_descrip.classList.add("is-primary");
                btn_descrip.classList.add("is-small");
                btn_descrip.classList.add("is-outlined");
                btn_descrip.addEventListener("click", function (e) {
                    e.preventDefault();
                    
                });
                descripcion.appendChild(btn_descrip);


                let opciones = document.createElement("td");
                let btn_borrar = document.createElement("button");
                btn_borrar.innerHTML = "borrar";
                btn_borrar.classList.add("button");
                btn_borrar.classList.add("is-primary");
                btn_borrar.classList.add("is-small");
                btn_borrar.classList.add("is-outlined");
                btn_borrar.addEventListener("click", function (e) {
                    e.preventDefault();
                    // funcion Borrar!
                });
                opciones.appendChild(btn_borrar);

                let btn_editar = document.createElement("button");
                btn_editar.innerHTML = "Editar";
                btn_editar.classList.add("button");
                btn_editar.classList.add("is-primary");
                btn_editar.classList.add("is-small");
                btn_editar.classList.add("is-outlined");

                btn_editar.addEventListener("click", function(e) {
                   e.preventDefault();
                    // funcion editar!
                });
                opciones.appendChild(btn_editar);

                row.appendChild(th);
                row.appendChild(hechaPor);
                row.appendChild(LaboId);
                row.appendChild(fechaReser);
                row.appendChild(diasReserva);
                row.appendChild(descripcion);
                row.appendChild(reservaEstado);
                row.appendChild(opciones);
                tabla.appendChild(row);
                cont++;
            });
        });
};

start = () => {
    var formAdReserva = document.getElementById("form-adminReservas");
    var userId = document.getElementById("name");
    var labId = document.getElementById("lab");
    var reserFecha = document.getElementById("fecha");
    reserFecha.disabled = true;
    var horarioRes = document.getElementById("horario");
    var estadoRes = document.getElementById("estado");
    var descripRes = document.getElementById("descripcion");
    var btn_actualizar = document.getElementById("btn-actualizar");
    var btn_limpiar = document.getElementById("btn-limpiar");
    var btn_buscar = document.getElementById("btn-buscar");
    var tablaReservas = document.getElementById("tableReserva");
    var totalPaginas = 0;

    btn_limpiar.addEventListener("click", e => {
        e.preventDefault();
        console.log(btn_actualizar.classList);
        btn_actualizar.classList.remove("is-hidden");
        btn_actualizar.classList += btn_actualizar.classList + "is-hidden";
        formAdReserva.reset();
    });


    estadoReserva(estadoRes);
    getReservas("", 1, totalPaginas, tablaReservas, formulario);
}

window.onload = start;