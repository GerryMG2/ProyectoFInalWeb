// URL_ENCARGADOS = "/api/admin/users/encargados";
URL_API_USUARIOS = "/api/admin/users"

options = {
  method: "GET",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json"
  }
};

tipoUsuarios = ["Usuario", "Administrador"];

opcionUsuarios = users => {
  tipoUsuarios.forEach(element => {
    let opcion = document.createElement("option");
    opcion.innerHTML = element;
    users.appendChild(opcion);
  });
};


borrarUser = (codeU, formulario, totalPaginas, tableUser,e) => {
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
        getUsers("", 1, totalPaginas, tableUser, e);
      }, 500);
    });
};

getUsers = (filtros, pagina, paginatotales, tabla, formulario, e) => {
    if (e) {
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
            paginatotales = response.pagina
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
                if(element.superUser){
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

                btnBorrar.addEventListener("click", function (e) {
                    e.preventDefault();
                    borrarUser(element.code, formulario, paginatotales, tableUser, e);
                });
                opciones.appendChild(btn_borrar);

                let btnEditar = document.createElement("button");
                btnEditar.innerHTML = "Editar";
                btnEditar.classList.add("button");
                btnEditar.classList.add("is-primary");
                btnEditar.classList.add("is-small");
                btnEditar.classList.add("is-outlined");
                btnEditar.addEventListener("click", function (e) {
                    e.preventDefault();
                    editarUser(element, formulario, e);
                });
                opciones.appendChild(btn_editar);

                row.appendChild(th);
                row.appendChild(nombre);
                row.appendChild(codigo);
                row.appendChild(email);
                row.appendChild(tipoUser);
                row.appendChild(opciones);
                tabla.appendChild(row);
                cont++;
            })
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

    btn_limpiar.addEventListener("click", e => {
        e.preventDefault();
        console.log(btn_actualizar.classList);
        btn_actualizar.classList.remove("is-hidden");
        btn_actualizar.classList += btn_actualizar.classList + " is-hidden";
        formUser.reset();
    });

    btn_actualizar.addEventListener("click", e => {
        e.preventDefault();
        let superUser = false;
        if(opUsers.value == "Administrador"){
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
                    Swal.fire("Hubo un problema en actualizar el usuario!", error, "error");
                })
                .then(response => {
                    console.log("success: ", response);
                    Swal.fire(response.msg, "Continua modificando usuarios!", response.ok);
                })
                .then(() => {
                    btn_limpiar.click();
                })
                .then(() => {
                    console.log("esperar medio segundo");
                    setTimeout(() => {
                        getUsers("", 1, totalPaginas, tableUser, formulario, e);
                    }, 500);
                });
        } else {

        }
    });

    editarUser = (element, formulario, e) => {
        btn_actualizar.classList.remove("is-hidden");
        console.log(btn_actualizar.classList);
        e.preventDefault();
        

        name.value = element.name;
        code.value = element.code;
        email.value = element.email;
        opUsers.selectedIndex = 0;
        if(element.superUser){
            opUsers.selectedIndex = 1;
        }
    
    }

    opcionUsuarios(opUsers);
    getUsers("", 1, totalPaginas, tableUser, formulario);
};

window.onload = start;