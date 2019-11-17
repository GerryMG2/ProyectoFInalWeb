// URL_ENCARGADOS = "/api/admin/users/encargados";
URL_API_USUARIOS = "/api/admin/users"

options = {
    method : "GET",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json"
    }
};

tipoUsuarios = ["Usuario", "Administrador"];

opcionUsuarios = users =>{
    tipoUsuarios.forEach(element => {
        let opcion = document.createElement("option");
        opcion.innerHTML = element;
        users.appendChild(opcion);
    });
};

getUsers = (filtros, pagina, paginatotales, tabla, formulario, e) => {
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
        credentiales: "same-origin", 
        headers: {
            "Content-Type": "application/json"
        }
    };

    let usersURL = URL_API_USUARIOS + "?" + query;
    console.log(usersURL);
    console.log(options_and_body);
    tabla.innerHTML = "";
    fetch(usersURL, options_and_body)
        .then(res => res.json())
        .catch(error => console.log("error: ", error))
        .then(response =>{
            console.log("success: ", response);
            paginatotales = response.paginas;
            let cont = (pagina - 1) * 10 + 1;
            response.docs.forEach(element => {
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.innerHTML = cont;
                let nombre = document.createElement("td");
                nombre.innerHTML = element.name;
                let codigo = document.createElement("td");
                codigo.innerHTML = element.code;
                let email = document.createElement("th");
                email.innerHTML = element.email;
                let tipUser = document.createElement("th");
                tipUser.innerHTML = element.superUser;
                let opciones = document.createElement("td");

                let btnBorrar = document.createElement("button");
                btnBorrar.innerHTML = "Borrar";
                btnBorrar.addEventListener("click", function(e){
                    e.preventDefault();

                });
                opciones.appendChild(btnBorrar);

                let btnEditar = document.createElement("button");
                btnEditar.innerHTML = "Editar";
                btnEditar.addEventListener("click", function (e){
                    e.preventDefault();

                });
                opciones.appendChild(btnEditar);

                row.appendChild(th);
                row.appendChild(nombre);
                row.appendChild(codigo);
                row.appendChild(email);
                row.appendChild(tipUser);
                row.appendChild(opciones);
                tabla.appendChild(row);
                cont++;
            })
        });
};


start = ()=>{
    var formUser = document.getElementById("form_users");
    var name = document.getElementById("name");
    var code = document.getElementById("code");
    code.disabled = true;
    var email = document.getElementById("email");
    var opcionesUsers = document.getElementById("opciones-users");
    var btn_limpiar = document.getElementById("btn-limpiar");
    var btn_actualizar = document.getElementById("btn-actualizar");
    var btn_buscar = document.getElementById("btn-buscar");
    var bodytable = document.getElementById("bodytableUsers");
    var totalPaginas = 0;
   
    btn_limpiar.addEventListener("click", e => {
        e.preventDefault();
        formUser.reset();
    });

    opcionUsuarios(opcionesUsers);
    getUsers("", 1, totalPaginas, bodytable, formulario);
};


window.onload = start;