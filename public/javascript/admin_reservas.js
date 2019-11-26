
var filtrosT2 = "";
URL_API_RESERVAS = "/api/admin/reservas";

options = {
  method: "GET",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json"
  }
};

var opReserva = ["No Aprobada", "aprobada", "Sin verificacion"];

estadoReserva = estado => {
  opReserva.forEach(element => {
    let opcion = document.createElement("option");
    opcion.innerHTML = element;
    estado.appendChild(opcion);
  });
};

borrarReserva = (
  id,
  formulario,
  totalPaginas,
  tablaReservas,
  verHorario,
  conteHora,
  conteDesc,
  size,
  orden,
  filtrosT,
  e
) => {
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
        console.log(filtrosT);
        console.log(size);
        console.log(orden);
        getReservas(
          "",
          1,
          totalPaginas,
          tablaReservas,
          formulario,
          verHorario,
          conteHora,
          conteDesc,
          size, 
          orden,
          "",
          e
        );
      }, 500);
    });
};

getReservas = (
  filtros,
  pagina,
  paginatotales,
  tabla,
  formulario,
  verHorarios,
  conteHora,
  conteDesc,
  size, 
  orden,
  filtrosT,
  e
) => {
  if (e) {
    e.preventDefault();
  }

  let params = {
    filtros: filtrosT,
    page: pagina, 
    size: size, 
    orden: JSON.stringify(orden)
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
      paginatotales = response.pagina;
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
        let fechacreacion = new Date(element.date);

        fechaReser.innerHTML = fechacreacion.toLocaleString();

        let diasReserva = document.createElement("td");
        let btn_rangeHora = document.createElement("td");
        btn_rangeHora.innerHTML = "Ver horarios";
        btn_rangeHora.classList.add("button");
        btn_rangeHora.classList.add("is-link");
        btn_rangeHora.classList.add("is-small");
        btn_rangeHora.classList.add("is-outlined");
        console.log(verHorarios);

        btn_rangeHora.addEventListener("click", function(e) {
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

            let izq = document.createElement("div");
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
        btn_descrip.classList.add("is-success");
        btn_descrip.classList.add("is-small");
        btn_descrip.classList.add("is-outlined");
        btn_descrip.addEventListener("click", function(e) {
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
        btn_borrar.classList.add("is-small");
        btn_borrar.classList.add("is-outlined");
        btn_borrar.classList.add("is-danger");
        btn_borrar.addEventListener("click", function(e) {
          e.preventDefault();
          borrarReserva(
            element._id,
            formulario,
            paginatotales,
            tabla,
            verHorario,
            conteHora,
            conteDesc,
            size, 
            orden,
            filtrosT2,
            e
          );
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
          editarReserva(element, formulario, btn_rangeHora, e);
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
  var eventos = {};
  var formAdReserva = document.getElementById("form-adminReservas");
  var user = document.getElementById("name");
  user.disabled = true;
  var lab = document.getElementById("lab");
  var reserFecha = document.getElementById("fecha");
  reserFecha.disabled = true;
  var horarioResI = document.getElementById("horarioIni");
  var horarioResF = document.getElementById("horarioFin");
  var estadoRes = document.getElementById("estado");
  var descripRes = document.getElementById("descripcion");
  var btn_actualizar = document.getElementById("btn-actualizar");
  var btn_ver = document.getElementById("btn-ver");
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
  var nombreOrder = document.getElementById("nombreOrder");
  var labOrder = document.getElementById("labOrder");
  var fechaOrder = document.getElementById("fechaOrder");
  
  var orden ={
    date: -1
  };


// 
nombreOrder.addEventListener("click", (e) => {
  e.preventDefault();
  if (nombreOrder.getAttribute("ordenValue") == "-1") {
      orden = {
          userId: 1
      };
      nombreOrder.classList = "fas fa-sort-up";
      nombreOrder.removeAttribute("ordenValue");
      nombreOrder.setAttribute("ordenValue", "1")

  } else {
      orden = {
          userId: -1
      }
      nombreOrder.classList = "fas fa-sort-down";

      nombreOrder.removeAttribute("ordenValue");
      nombreOrder.setAttribute("ordenValue", "-1")

  }
  getReservas(
    filtros,
    1,
    totalPaginas,
    tablaReservas,
    formulario,
    verHorarios,
    conteHora,
    conteDesc, 
    10, 
    orden,
    filtrosT2

  );
});

labOrder.addEventListener("click", (e) => {
  e.preventDefault();
  if (labOrder.getAttribute("ordenValue") == "-1") {
      orden = {
          LabId: 1
      };
      labOrder.classList = "fas fa-sort-up";

      labOrder.removeAttribute("ordenValue");
      labOrder.setAttribute("ordenValue", "1")


  } else {
      orden = {
          code: -1
      }
      labOrder.classList = "fas fa-sort-down";
      labOrder.removeAttribute("ordenValue");
      labOrder.setAttribute("ordenValue", "-1")

      
  }
  getReservas(
    filtros,
    1,
    totalPaginas,
    tablaReservas,
    formulario,
    verHorarios,
    conteHora,
    conteDesc, 
    10, 
    orden,
    filtrosT2
  );
});

fechaOrder.addEventListener("click", (e) => {
  e.preventDefault();
  if (fechaOrder.getAttribute("ordenValue") == "-1") {
      orden = {
          date: 1
      };
      fechaOrder.classList = "fas fa-sort-up";

      fechaOrder.removeAttribute("ordenValue");
      fechaOrder.setAttribute("ordenValue", "1")

  } else {
      orden = {
          date: -1
      }
      fechaOrder.classList = "fas fa-sort-down";

      fechaOrder.removeAttribute("ordenValue");
      fechaOrder.setAttribute("ordenValue", "-1")

  }
  getReservas(
    filtros,
    1,
    totalPaginas,
    tablaReservas,
    formulario,
    verHorarios,
    conteHora,
    conteDesc, 
    10, 
    orden,
    filtrosT2
  );
});


btn_buscar.addEventListener("click", (e)=>{
  e.preventDefault();
  console.log("filtros", filtros.value)
  filtrosT2 = filtros.value;
  getReservas(
    filtros,
    1,
    totalPaginas,
    tablaReservas,
    formulario,
    verHorarios,
    conteHora,
    conteDesc, 
    10, 
    orden, 
    filtrosT2
  );
} );


  // 

  closeDescripcion.onclick = function() {
    modelDescrip.style.display = "none";
  };

  closeDescripx.onclick = function() {
    modelDescrip.style.display = "none";
  };

  closeHorarios.onclick = function() {
    verHorarios.style.display = "none";
  };

  closeHorariosx.onclick = function() {
    verHorarios.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == verHorarios) {
      verHorarios.style.display = "none";
    } else if (event.target == modelDescrip) {
      modelDescrip.style.display = "none";
    }
  };

  btn_limpiar.addEventListener("click", e => {
    e.preventDefault();
    console.log(btn_actualizar.classList);
    btn_actualizar.classList.remove("is-hidden");
    btn_actualizar.classList += btn_actualizar.classList + " is-hidden";
    btn_ver.classList.remove("is-hidden");
    btn_ver.classList += btn_actualizar.classList + " is-hidden";
    console.log(eventos);
    eventos = {};
    formAdReserva.reset();
  });

  editarReserva = (element, formulario, btn, e) => {
    btn_actualizar.classList.remove("is-hidden");
    btn_ver.classList.remove("is-hidden");
    console.log(btn_actualizar.classList);
    e.preventDefault();

    user.value = element.userId;
    user.setAttribute("_id", element._id);
    eventos = element.eventos;
    lab.value = element.LabId;

    btn_ver.addEventListener("click", ev => {
      ev.preventDefault();
      btn.click();
    });

    for (let index = 0; index < estadoRes.options.length; index++) {
      if (estadoRes.options[index].value == element.status) {
        estadoRes.selectedIndex = index;
      }
    }

    let fechacreacion = new Date(element.date);
    reserFecha.value = fechacreacion.toLocaleString();

    descripRes.value = element.description;
  };

  btn_actualizar.addEventListener("click", e => {
    e.preventDefault();
    let reservaUpdate = {
        _id: user.getAttribute("_id"),
        userId: user.value,
        LabId: lab.value,
        eventos: eventos,
        status: estadoRes.value, 
        description: descripRes.value
    };
    console.log(reservaUpdate);

    let options_and_body = {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      };
      options_and_body["body"] = JSON.stringify(reservaUpdate);
    
      fetch(URL_API_RESERVAS, options_and_body)
        .then(res => res.json())
        .catch(error => {
          console.log("error: ", error);
          Swal.fire("Hubo un problema para actualizar la reserva", error, "error");
        })
        .then(response => {
          console.log("success: ", response);
          Swal.fire(response.msg, "Continua gestionando reservas", response.ok);
        }).then(something => {
            getReservas(
              filtros,
                1,
                totalPaginas,
                tablaReservas,
                formulario,
                verHorarios,
                conteHora,
                conteDesc,
                10, orden,
                filtrosT2,
                e
              );
        });


  });

  estadoReserva(estadoRes);
  getReservas(
    filtros,
    1,
    totalPaginas,
    tablaReservas,
    formulario,
    verHorarios,
    conteHora,
    conteDesc, 
    10, 
    orden,
    filtrosT2
  );
};

window.onload = start;
