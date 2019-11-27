URL_ENCARGADOS = "/api/admin/users/encargados";
URL_API_LABORATORIOS = "/api/admin/labos/";
var siguiente = document.getElementById("siguiente");
var anterior = document.getElementById("anterior");
var pagina1 = document.getElementById("pagina1");
var pagina2 = document.getElementById("pagina2");
var pagina3 = document.getElementById("pagina3");
var currPage = 1;

options = {
  method: "GET",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json"
  }
};

listaEdificios = ["Martin Baro", "Icas", "John de Cortina", "Audio Visuales"];

llenarEdificios = edificios => {
  listaEdificios.forEach(element => {
    let opcion = document.createElement("option");
    opcion.innerHTML = element;
    edificios.appendChild(opcion);
  });
};

llenarEncargados = encargados => {
  fetch(URL_ENCARGADOS, options)
    .then(res => res.json())
    .catch(error => console.log("error: ", error))
    .then(response => {
      console.log("success: ", response);
      response.forEach(element => {
        opcion = document.createElement("option");
        opcion.innerHTML = element;
        encargados.appendChild(opcion);
      });
    });
};

LabBorrar = (id, formulario, totalPaginas,orden,filstroT, e) => {
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

  fetch(URL_API_LABORATORIOS, options_and_body)
    .then(res => res.json())
    .catch(error => {
      console.log("error: ", error);
      Swal.fire("Hubo un problema para borrar el laboratorio", error, "error");
    })
    .then(response => {
      console.log("success: ", response);
      Swal.fire(response.msg, "Continua gestionado laboratorios", response.ok);
    })
    .then(() => { })
    .then(() => {
      console.log("esperar medio segundo");
      setTimeout(() => {
        getLabs(filstroT, 1, totalPaginas, bodytable,10, orden, e);
      }, 500);
    });
};

getLabs = (filtros, pagina, paginatotales, tabla, formulario,size,orden, e) => {
  if (e) {
    e.preventDefault();
  }
  let params = {
    filtros: filtros,
    page: pagina, 
    size: size,
    orden: JSON.stringify(orden),
  };

  currPage = pagina;

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

  let auxUrl = URL_API_LABORATORIOS + "?" + query;
  console.log(auxUrl);
  console.log(options_and_body);
  tabla.innerHTML = "";
  fetch(auxUrl, options_and_body)
    .then(res => res.json())
    .catch(error => console.log("error: ", error))
    .then(response => {
      console.log("success: ", response);
      paginatotales = response.paginas;

//


paginasTotales = response.paginas;
console.log(currPage);
//
if (currPage == 1) {
  if (paginasTotales == 1) {
    //paginas totales = 1
    anterior.disabled = true;
    pagina1.disabled = true;
    pagina1.innerHTML = "";
    pagina2.disabled = false;
    pagina2.setAttribute("page", "1");
    pagina2.innerHTML = "1";

    pagina3.disabled = true;
    pagina3.innerHTML = "";
    siguiente.disabled = true;
  } else {
    siguiente.disabled = false;
    anterior.disabled = true;
    siguiente.setAttribute("page", "2");
    pagina1.disabled = true;
    pagina1.innerHTML = "";
    pagina2.disabled = false;
    pagina2.setAttribute("page", "1");
    pagina2.innerHTML = "1";
    pagina3.disabled = false;
    pagina3.setAttribute("page", "2");
    pagina3.innerHTML = "2";

    //mas de una pagina
  }
} else {
  if (currPage == paginasTotales) {
    let valorPage = paginasTotales - 1;
    anterior.disabled = false;
    anterior.setAttribute("page", valorPage);
    siguiente.disabled = true;
    pagina1.disabled = false;

    pagina1.setAttribute("page", valorPage);
    pagina1.innerHTML = valorPage;
    pagina2.disabled = false;
    pagina2.setAttribute("page", paginasTotales);
    pagina2.innerHTML = paginasTotales;
    pagina3.disabled = true;
    pagina3.innerHTML = "";

    //final
  } else {
    //en medio
    let valorAnterior = currPage - 1;
    let valorsiguiente = currPage + 1;
    anterior.disabled = false;
    anterior.setAttribute("page", valorAnterior);
    siguiente.disabled = false;
    siguiente.setAttribute("page", valorsiguiente);
    pagina1.disabled = false;
    pagina1.setAttribute("page", valorAnterior);
    pagina1.innerHTML = valorAnterior;
    pagina2.disabled = false;
    pagina2.setAttribute("page", currPage);
    pagina2.innerHTML = currPage;
    pagina3.disabled = false;
    pagina3.setAttribute("page", valorsiguiente);
    pagina3.innerHTML = valorsiguiente;
  }}

//


      let contador = (pagina - 1) * 10 + 1;
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
        let opciones = document.createElement("td");

        let btnBorrar = document.createElement("button");
        btnBorrar.innerHTML = "Borrar";
        btnBorrar.classList.add("button");
        btnBorrar.classList.add("is-danger");
        btnBorrar.classList.add("is-small");
        btnBorrar.classList.add("is-outlined");

        btnBorrar.addEventListener("click", function (e) {
          btnBorrar.disabled = true;
          e.preventDefault();
          LabBorrar(element._id, formulario, paginatotales, orden,filstroT, e);
          btnBorrar.disabled = false;
        });
        opciones.appendChild(btnBorrar);


        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.classList.add("button");
        btnEditar.classList.add("is-primary");
        btnEditar.classList.add("is-small");
        btnEditar.classList.add("is-outlined");
        btnEditar.addEventListener("click", function (e) {
          e.preventDefault();
          EditarLab(element, formulario, e);
        });
        opciones.appendChild(btnEditar);

        row.appendChild(th);
        row.appendChild(nombre);
        row.appendChild(code);
        row.appendChild(edificio);
        row.appendChild(encargado);
        row.appendChild(capacidad);
        row.appendChild(opciones);
        tabla.appendChild(row);
        contador++;
      });
    });
};

crearLabFetch = (e, body, formulario, totalPaginas, orden, filtrosT) => {
  e.preventDefault();
  let options_and_body = {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  };
  options_and_body["body"] = JSON.stringify(body);
  options_and_body["method"] = "POST";
  fetch(URL_API_LABORATORIOS, options_and_body)
    .then(res => res.json())
    .catch(error => {
      console.log("error: ", error);
      Swal.fire("Hubo un problema para crear el laboratorio", error, "error");
    })
    .then(response => {
      console.log("success: ", response);
      Swal.fire(response.msg, "Continua gestionado laboratorios", response.ok);
    })
    .then(() => {
      formulario.reset();
    })
    .then(() => {
      console.log("esperar medio segundo");
      setTimeout(() => {
        getLabs(filtrosT, 1, totalPaginas, bodytable, formulario,10, orden, e);
      }, 500);
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
  var bodytable = document.getElementById("bodytable");
  var totalPaginas = 0;
  var btnActualizar = document.getElementById("btn-actualizar");
  var nombreOrder = document.getElementById("nombreOrder");
  var codigoOrder = document.getElementById("codigoOrder");
  var edificioOrder = document.getElementById("edificioOrder");
  var encargadoOrder = document.getElementById("encargadoOrder");
  var capacidadOrder = document.getElementById("capacidadOrder");
  var filtrosT = "";
  var orden = {
    name: -1
  };

  nombreOrder.addEventListener("click", (e) => {
    e.preventDefault();
    if (nombreOrder.getAttribute("ordenValue") == "-1") {
        orden = {
            name: 1
        };
        nombreOrder.classList = "fas fa-sort-up";
        nombreOrder.removeAttribute("ordenValue");
        nombreOrder.setAttribute("ordenValue", "1")

    } else {
        orden = {
            name: -1
        }
        nombreOrder.classList = "fas fa-sort-down";

        nombreOrder.removeAttribute("ordenValue");
        nombreOrder.setAttribute("ordenValue", "-1")

    }
    getLabs(filtrosT, currPage, totalPaginas, bodytable, formulario, 10, orden);;
});

codigoOrder.addEventListener("click", (e) => {
    e.preventDefault();
    if (codigoOrder.getAttribute("ordenValue") == "-1") {
        orden = {
            code: 1
        };
        codigoOrder.classList = "fas fa-sort-up";

        codigoOrder.removeAttribute("ordenValue");
        codigoOrder.setAttribute("ordenValue", "1")


    } else {
        orden = {
            code: -1
        }
        codigoOrder.classList = "fas fa-sort-down";
        codigoOrder.removeAttribute("ordenValue");
        codigoOrder.setAttribute("ordenValue", "-1")

        
    }
    getLabs(filtrosT, currPage, totalPaginas, bodytable, formulario, 10, orden);;
});

edificioOrder.addEventListener("click", (e) => {
    e.preventDefault();
    if (edificioOrder.getAttribute("ordenValue") == "-1") {
        orden = {
            building: 1
        };
        edificioOrder.classList = "fas fa-sort-up";

        edificioOrder.removeAttribute("ordenValue");
        edificioOrder.setAttribute("ordenValue", "1")

    } else {
        orden = {
            building: -1
        }
        edificioOrder.classList = "fas fa-sort-down";

        edificioOrder.removeAttribute("ordenValue");
        edificioOrder.setAttribute("ordenValue", "-1")

    }
    getLabs(filtrosT, currPage, totalPaginas, bodytable, formulario, 10, orden);;
});

encargadoOrder.addEventListener("click", (e) => {
    e.preventDefault();
    if (encargadoOrder.getAttribute("ordenValue") == "-1") {
        orden = {
            inCharge: 1
        };
        encargadoOrder.classList = "fas fa-sort-up";

        encargadoOrder.removeAttribute("ordenValue");
        encargadoOrder.setAttribute("ordenValue", "1");
       

    } else {
        orden = {
          inCharge: -1
        }
        encargadoOrder.classList = "fas fa-sort-down";

        encargadoOrder.removeAttribute("ordenValue");
        encargadoOrder.setAttribute("ordenValue", "-1")

    }
    getLabs(filtrosT, currPage, totalPaginas, bodytable, formulario, 10, orden);;
});

capacidadOrder.addEventListener("click", (e) => {
  e.preventDefault();
  if (capacidadOrder.getAttribute("ordenValue") == "-1") {
      orden = {
          capacity: 1
      };
      capacidadOrder.classList = "fas fa-sort-up";

      capacidadOrder.removeAttribute("ordenValue");
      capacidadOrder.setAttribute("ordenValue", "1");
     

  } else {
      orden = {
          capacity: -1
      }
      capacidadOrder.classList = "fas fa-sort-down";

      capacidadOrder.removeAttribute("ordenValue");
      capacidadOrder.setAttribute("ordenValue", "-1")

  }
  getLabs(filtrosT, currPage, totalPaginas, bodytable, formulario, 10, orden);;
});

buscar.addEventListener("click", (e)=>{
  e.preventDefault();
  console.log("filtros", filtros.value)
  filtrosT = filtros.value;
  getLabs(filtrosT, 1, totalPaginas, bodytable, formulario, 10, orden);
} );


  btn_limpiar.addEventListener("click", e => {
    e.preventDefault();
    console.log(btnActualizar.classList);
    btnActualizar.classList.remove("is-hidden")
    btnActualizar.classList += btnActualizar.classList + " is-hidden";
    formulario.reset();
    code.disabled = false;
  });


  btnActualizar.addEventListener("click", e => {
    e.preventDefault(); 
    btnActualizar.disabled = true;

    if (nombre.value && code.value && capacidad.value) {

      let body = {
        name: nombre.value,
        code: code.value,
        capacity: parseInt(capacidad.value),
        inCharge: selectEncargado.value,
        building: selectEdificios.value
      };

      let options_and_body = {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      };


      options_and_body["body"] = JSON.stringify(body);
      fetch(URL_API_LABORATORIOS, options_and_body)
        .then(res => res.json())
        .catch(error => {
          console.log("error: ", error);
          Swal.fire("Hubo un problema para actualizar el laboratorio", error, "error");
        })
        .then(response => {
          console.log("success: ", response);
          Swal.fire(response.msg, "Continua gestionado laboratorios", response.ok);
        })
        .then(() => {

          btn_limpiar.click();
        })
        .then(() => {
          console.log("esperar medio segundo");
          setTimeout(() => {
            getLabs(filtrosT, 1, totalPaginas, bodytable, formulario, 10, orden, e);
            btnActualizar.disabled = false;
          }, 500);
        });

    } else {

    }

  });

  crearlab = (event, formulario, totalPaginas) => {
    console.log("entrar a crear labo");
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
      crearLabFetch(event, body, formulario, totalPaginas, orden, filtrosT);
    } else {
      // TODO: Agregar mensajes al usuario
    }
  };

  btn_crear.addEventListener("click", e => {
    btn_crear.disabled = true;
    e.preventDefault();

    crearlab(e, formulario, totalPaginas);
    btn_crear.disabled = false;
    // console.log("se creo el lab");
  });

  EditarLab = (element, formulario, e) => {

    btnActualizar.classList.remove("is-hidden");
    console.log(btnActualizar.classList);
    code.disabled = true;
    e.preventDefault();


    nombre.value = element.name;
    code.value = element.code;
    capacidad.value = element.capacity;

    for (let index = 0; index < selectEdificios.options.length; index++) {
      if (selectEdificios.options[index].value == element.building) {
        selectEdificios.selectedIndex = index;
      }
    }

    for (let index = 0; index < selectEncargado.options.length; index++) {
      if (selectEncargado.options[index].value == element.inCharge) {
        selectEncargado.selectedIndex = index;
      }
    }

  };


  llenarEdificios(selectEdificios);
  llenarEncargados(selectEncargado);

  getLabs("", 1, totalPaginas, bodytable, formulario, 10, orden);

  function go_to(page) {
    getLabs("", page, totalPaginas, bodytable, formulario, 10, orden);
  }

  siguiente.addEventListener("click", () => {
    currPage++;
    go_to(parseInt(siguiente.getAttribute("page")));
  });

  anterior.addEventListener("click", () => {
    currPage--;
    go_to(parseInt(anterior.getAttribute("page")));
  });

  pagina1.addEventListener("click", () => {
    currPage--;
    go_to(parseInt(pagina1.getAttribute("page")));
  });

  pagina2.addEventListener("click", () => {
    go_to(parseInt(pagina2.getAttribute("page")));
  });

  pagina3.addEventListener("click", () => {
    currPage++;
    go_to(parseInt(pagina3.getAttribute("page")));
  });


}

window.onload = start;
