// URL_ENCARGADOS = "/api/admin/users/encargados";
URL_API_USUARIOS = "/api/admin/users";
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

tipoUsuarios = ["Usuario", "Administrador"];

opcionUsuarios = users => {
  tipoUsuarios.forEach(element => {
    let opcion = document.createElement("option");
    opcion.innerHTML = element;
    users.appendChild(opcion);
  });
};

borrarUser = (codeU, formulario, totalPaginas, tableUser, e) => {

  e.preventDefault();
  let options_and_body = {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  };
  options_and_body["body"] = JSON.stringify({
    code: codeU
  });

  fetch(URL_API_USUARIOS, options_and_body)
    .then(res => res.json())
    .catch(error => {
      console.log("error: ", error);
      Swal.fire("Hubo un problema para eliminar el usuario", error, "error");
    })
    .then(response => {
      console.log("success: ", response);
      Swal.fire(response.msg, "Continua gestionando usuarios!", response.ok);
    })
    .then(() => {})
    .then(() => {
      console.log("Esperar medio segundo");
      setTimeout(() => {
        getUsers("", 1, totalPaginas, tableUser, 10, e);
      }, 500);
    });
};

start = () => {
  var formUser = document.getElementById("form-user");
  var name = document.getElementById("name");
  var code = document.getElementById("code");
  code.disabled = true;
  var email = document.getElementById("email");
  var opUsers = document.getElementById("opciones-users");
  var btn_limpiar = document.getElementById("btn-limpiar");
  var btn_actualizar = document.getElementById("btn-actualizar");
  var btn_buscar = document.getElementById("btn-buscar");
  var tableUser = document.getElementById("tableUser");
  var totalPaginas = 0;
  var filtros = document.getElementById("filtros");
  var nombreOrder = document.getElementById("nombreOrder");
  var codigoOrder = document.getElementById("codigoOrder");
  var emailOrder = document.getElementById("emailOrder");
  var adminOrder = document.getElementById("adminOrder");
  var orden = { name: 1 };
  var filtrosT = "";

  editarUser = (element, formulario, e) => {
    btn_actualizar.classList.remove("is-hidden");
    console.log(btn_actualizar.classList);
    e.preventDefault();

    name.value = element.name;
    code.value = element.code;
    email.value = element.email;
    opUsers.selectedIndex = 0;
    if (element.superUser) {
      opUsers.selectedIndex = 1;
    }
  };

  getUsers = (filtros, pagina, paginatotales, tabla, formulario, size, e) => {
    if (e) {
      e.preventDefault();
    }

    currPage = pagina;

    let params = {
      filtros: filtros,
      page: pagina,
      orden: JSON.stringify(orden),
      size: parseInt(size)
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
    let paginasTotales = 0;

    let userURL = URL_API_USUARIOS + "?" + query;
    console.log(userURL);
    console.log(options_and_body);
    // aqui!
    tabla.innerHTML = "";
    fetch(userURL, options_and_body)
      .then(res => res.json())
      .catch(error => console.log("error: ", error))
      .then(response => {
        console.log("success: ", response);
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
          }
        }

        //
        paginatotales = response.pagina;
        let cont = (pagina - 1) * 10 + 1;
        response.docs.forEach(element => {
          let row = document.createElement("tr");
          let th = document.createElement("th");
          th.innerHTML = cont;
          let nombre = document.createElement("td");
          nombre.innerHTML = element.name;
          let codigo = document.createElement("td");
          codigo.innerHTML = element.code;
          let email = document.createElement("td");
          email.innerHTML = element.email;
          let tipoUser = document.createElement("td");
          let tip = "Usuario";
          if (element.superUser) {
            tip = "Administrador";
          }
          tipoUser.innerHTML = tip;
          let opciones = document.createElement("td");

          let btnBorrar = document.createElement("button");
          btnBorrar.innerHTML = "Borrar";
          btnBorrar.classList.add("button");
          btnBorrar.classList.add("is-danger");
          btnBorrar.classList.add("is-small");
          btnBorrar.classList.add("is-outlined");

          btnBorrar.addEventListener("click", function(e) {
              btnBorrar.disabled = true;
            e.preventDefault();
            borrarUser(element.code, formulario, paginatotales, tableUser, e);
            btnBorrar.disabled = false;
          });
          opciones.appendChild(btnBorrar);

          let btnEditar = document.createElement("button");
          btnEditar.innerHTML = "Editar";
          btnEditar.classList.add("button");
          btnEditar.classList.add("is-primary");
          btnEditar.classList.add("is-small");
          btnEditar.classList.add("is-outlined");
          btnEditar.addEventListener("click", function(e) {
            e.preventDefault();
            editarUser(element, formulario, e);
          });
          opciones.appendChild(btnEditar);

          row.appendChild(th);
          row.appendChild(nombre);
          row.appendChild(codigo);
          row.appendChild(email);
          row.appendChild(tipoUser);
          row.appendChild(opciones);
          tabla.appendChild(row);
          cont++;
        });
      });
    console.log("curr:", currPage);
    console.log("paginastotales: ", paginasTotales);
  };

  btn_buscar.addEventListener("click", e => {
    btn_buscar.disabled = true;
    e.preventDefault();
    console.log("filtros", filtros.value);
    filtrosT = filtros.value;
    getUsers(filtrosT, 1, totalPaginas, tableUser, formulario, 10, e);
    btn_buscar.disabled = false;
  });

  nombreOrder.addEventListener("click", e => {
    e.preventDefault();
    if (nombreOrder.getAttribute("ordenValue") == "-1") {
      orden = {
        name: 1
      };
      nombreOrder.classList = "fas fa-sort-up";
      nombreOrder.removeAttribute("ordenValue");
      nombreOrder.setAttribute("ordenValue", "1");
    } else {
      orden = {
        name: -1
      };
      nombreOrder.classList = "fas fa-sort-down";

      nombreOrder.removeAttribute("ordenValue");
      nombreOrder.setAttribute("ordenValue", "-1");
    }
    getUsers(filtrosT, currPage, totalPaginas, tableUser, formulario, 10, e);
  });

  codigoOrder.addEventListener("click", e => {
    e.preventDefault();
    if (codigoOrder.getAttribute("ordenValue") == "-1") {
      orden = {
        code: 1
      };
      codigoOrder.classList = "fas fa-sort-up";

      codigoOrder.removeAttribute("ordenValue");
      codigoOrder.setAttribute("ordenValue", "1");
    } else {
      orden = {
        code: -1
      };
      codigoOrder.classList = "fas fa-sort-down";
      codigoOrder.removeAttribute("ordenValue");
      codigoOrder.setAttribute("ordenValue", "-1");
    }
    getUsers(filtrosT, currPage, totalPaginas, tableUser, formulario, 10, e);
  });

  emailOrder.addEventListener("click", e => {
    e.preventDefault();
    if (emailOrder.getAttribute("ordenValue") == "-1") {
      orden = {
        email: 1
      };
      emailOrder.classList = "fas fa-sort-up";

      emailOrder.removeAttribute("ordenValue");
      emailOrder.setAttribute("ordenValue", "1");
    } else {
      orden = {
        email: -1
      };
      emailOrder.classList = "fas fa-sort-down";

      emailOrder.removeAttribute("ordenValue");
      emailOrder.setAttribute("ordenValue", "-1");
    }
    getUsers(filtrosT, currPage, totalPaginas, tableUser, formulario, 10, e);
  });

  adminOrder.addEventListener("click", e => {
    e.preventDefault();
    if (adminOrder.getAttribute("ordenValue") == "-1") {
      orden = {
        superUser: 1
      };
      adminOrder.classList = "fas fa-sort-up";

      adminOrder.removeAttribute("ordenValue");
      adminOrder.setAttribute("ordenValue", "1");
    } else {
      orden = {
        superUser: -1
      };
      adminOrder.classList = "fas fa-sort-down";

      adminOrder.removeAttribute("ordenValue");
      adminOrder.setAttribute("ordenValue", "-1");
    }
    getUsers(filtrosT, 1, totalPaginas, tableUser, formulario, 10, e);
  });

  btn_limpiar.addEventListener("click", e => {
    e.preventDefault();
    console.log(btn_actualizar.classList);
    btn_actualizar.classList.remove("is-hidden");
    btn_actualizar.classList += btn_actualizar.classList + " is-hidden";
    formUser.reset();
  });

  btn_actualizar.addEventListener("click", e => {
    btn_actualizar.disabled = true;
    e.preventDefault();
    let superUser = false;
    if (opUsers.value == "Administrador") {
      superUser = true;
    }

    if (name.value && email.value && code.value) {
      let body = {
        name: name.value,
        code: code.value,
        email: email.value,
        superUser: superUser
      };

      let options_and_body = {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      };

      options_and_body["body"] = JSON.stringify(body);
      fetch(URL_API_USUARIOS, options_and_body)
        .then(res => res.json())
        .catch(error => {
          console.log("error: ", error);
          Swal.fire(
            "Hubo un problema en actualizar el usuario!",
            error,
            "error"
          );
        })
        .then(response => {
          console.log("success: ", response);
          Swal.fire(
            response.msg,
            "Continua modificando usuarios!",
            response.ok
          );
        })
        .then(() => {
          btn_limpiar.click();
        })
        .then(() => {
          console.log("esperar medio segundo");
          setTimeout(() => {
            getUsers(filtrosT, 1, totalPaginas, tableUser, formulario, 10, e);
            btn_actualizar.disabled = false;
          }, 500);
        });
    } else {
    }
  });

  opcionUsuarios(opUsers);
  getUsers(filtrosT, currPage, totalPaginas, tableUser, formulario, 10);

  function go_to(page) {
    getUsers(filtrosT, page, totalPaginas, tableUser, formulario, 10);
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
};

window.onload = start;
