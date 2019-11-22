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

borrarReserva = (id, formulario, totalPaginas, tablaReservas, verHorario, conteHora, conteDesc, e) => {
    e.preventDefault();
    let options_and_body = {
        method: "DELETE",
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json"
        }
    };
    options_and_body["body"] = JSON.stringify({
        _id: id
    });

    fetch(URL_API_RESERVAS, options_and_body)
        .then(res => res.json())
        .catch(error => {
            console.log("error: ", error);
            Swal.fire("Hubo un problema para eliminar la reserva", error, "error");
        })
        .then(response => {
            console.log("success: ", response);
            Swal.fire(response.msg, "Continua gestionando reservas!", response.ok);
        })
        .then(() => {})
        .then(() => {
            console.log("Esperar medio segundo");
            setTimeout(() => {
                getReservas("", 1, totalPaginas,tablaReservas, formulario, verHorario, conteHora, conteDesc, e);
            }, 500);
        });
};

getReservas = (filtros, pagina, paginatotales, tabla, formulario, verHorarios,conteHora, conteDesc,e ) => {
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
                let fechacreacion  = new Date(element.date);

                fechaReser.innerHTML = fechacreacion.toLocaleString();
                
                let diasReserva = document.createElement("td");
                let btn_rangeHora = document.createElement("td");
                btn_rangeHora.innerHTML = "Ver horarios";
                btn_rangeHora.classList.add("button");
                btn_rangeHora.classList.add("is-primary");
                btn_rangeHora.classList.add("is-small");
                btn_rangeHora.classList.add("is-outlined");
                console.log(verHorarios);                

                btn_rangeHora.addEventListener("click", function (e) {
                    conteHora.innerHTML = "";
                    e.preventDefault();
                    let lista = document.createElement("ul");
                    element.eventos.forEach(element => {
                        let li = document.createElement("li");
                        let fechaI = new Date(element.inicio);
                        let fechaF = new Date(element.fin);
                        
                        let title = document.createElement("h2");
                        title.innerHTML = element.title;

                        let fechaInicio = document.createElement("div");                        
                        fechaInicio.innerHTML = fechaI.toLocaleString();
                        fechaInicio.className = "level-item";

                        let fechaFin = document.createElement("div");
                        fechaFin.innerHTML = fechaF.toLocaleString();
                        fechaFin.className = "level-item";

                        
                        let izq= document.createElement("div");
                        let derecha = document.createElement("div");
                        
                        li.classList.add("level");
                        izq.classList.add("level-left");
                        derecha.classList.add("level-rigth");
                        let brtag = document.createElement("br");
                        brtag.className = "level-item";
                                                
                        izq.appendChild(fechaInicio);

                        derecha.appendChild(fechaFin);
                        
                        li.appendChild(izq);
                        li.appendChild(derecha);

                        lista.appendChild(li);
                        conteHora.appendChild(lista);
                    });
                    verHorarios.style.display = "block";
                });
                diasReserva.appendChild(btn_rangeHora);


                let reservaEstado = document.createElement("td");
                reservaEstado.innerHTML = element.status;
                

                let descripcion = document.createElement("td");
                let btn_descrip = document.createElement("button");
                btn_descrip.innerHTML = "Ver descrición";
                btn_descrip.classList.add("button");
                btn_descrip.classList.add("is-primary");
                btn_descrip.classList.add("is-small");
                btn_descrip.classList.add("is-outlined");
                btn_descrip.addEventListener("click", function (e) {
                    console.log(conteDesc);
                    conteDesc.innerHTML = "";
                    e.preventDefault();
                    let desc = document.createElement("p");
                    desc.innerHTML = element.description;
                    conteDesc.appendChild(desc);
                    verDescripcion.style.display = "block";
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
                    borrarReserva(element._id, formulario, paginatotales, tabla, verHorario, conteHora, conteDesc,e);
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
    var verHorarios = document.getElementById("verHorario");
    var closeHorarios = document.getElementById("closeHorario");
    var closeHorariosx = document.getElementById("closeHorariox");
    var conteHora = document.getElementById("contenidoHorarios");
    var modelDescrip = document.getElementById("verDescripcion");
    var conteDesc = document.getElementById("contenidoDescrip");


    closeDescripcion.onclick = function(){
        modelDescrip.style.display = "none";
    }

    closeDescripx.onclick = function(){
        modelDescrip.style.display = "none";
    }

    
    closeHorarios.onclick = function(){
        verHorarios.style.display = "none";
    }

    closeHorariosx.onclick = function(){
        verHorarios.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == verHorarios) {
            verHorarios.style.display = "none";
        }
        else if(event.target == modelDescrip){
            modelDescrip.style.display = "none";
        }
      }

    btn_limpiar.addEventListener("click", e => {
        e.preventDefault();
        console.log(btn_actualizar.classList);
        btn_actualizar.classList.remove("is-hidden");
        btn_actualizar.classList += btn_actualizar.classList + "is-hidden";
        formAdReserva.reset();
    });


    estadoReserva(estadoRes);
    getReservas("", 1, totalPaginas, tablaReservas, formulario, verHorarios, conteHora, conteDesc);
}

window.onload = start;