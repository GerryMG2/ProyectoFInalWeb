start = () => {
  var formulario = document.getElementById("form-reserva");
  var labos = document.getElementById("opciones-labos");
  var descripcion = document.getElementById("descText");
  var btnHorario = document.getElementById("btn-horario");
  var listaHorario = document.getElementById("listaHorario");
  var btnCrear = document.getElementById("btn-crear");
  var btnActualizar = document.getElementById("btn-actualizar");
  let contador = 1;

  btnHorario.addEventListener("click", e => {
    e.preventDefault();
    console.log("dio click");
    let annio = new Date();

    let li = document.createElement("li");
    let contenedor = document.createElement("div");
    let contenedorHorario = document.createElement("div");
    let contenedorOpciones = document.createElement("div");
    let contenedorHoraInicio = document.createElement("div");
    let contenedorHoraFin = document.createElement("div");
    contenedorHoraInicio.innerHTML = `
        <div class="input-group date form_datetime col-md-5" data-date="${annio.getFullYear()}-${annio.getMonth() +
      1}-${annio.getDate()}T05:25:07Z" data-date-format="yyyy-mm-dd hh:ii" data-link-field="dtp_inputi${contador}">
            <input class="form-control inicioH" size="16" type="text" value="" readonly id="inicioH">
            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
        </div>
        <input type="hidden" id="dtp_inputi${contador}" value=""  />`;
    contenedorHoraFin.innerHTML = `
        <div class="input-group date form_datetime col-md-5" data-date="${annio.getFullYear()}-${annio.getMonth() +
      1}-${annio.getDate()}T05:25:07Z" data-date-format="yyyy-mm-dd hh:ii" data-link-field="dtp_inputf${contador}">
            <input class="form-control finH" size="16" type="text" value="" readonly id="finH">
            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
        </div>
        <input type="hidden" id="dtp_inputf${contador}" value="" />`;
    contenedorHorario.appendChild(contenedorHoraInicio);
    contenedorHorario.appendChild(contenedorHoraFin);
    contenedor.appendChild(contenedorHorario);

    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.classList.add("btn-small");
    btnBorrar.classList.add("btn-outline-danger");

    contenedorOpciones.appendChild(btnBorrar);
    contenedor.appendChild(contenedorOpciones);
    li.appendChild(contenedor);
    btnBorrar.addEventListener("click", e => {
      e.preventDefault();
      listaHorario.removeChild(li);
    });
    listaHorario.appendChild(li);
    $(".form_datetime").datetimepicker({
      //language:  'fr',
      weekStart: 1,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
      showMeridian: 1
    });

    contador++;
  });

  btnActualizar.addEventListener("click", e => {
    e.preventDefault();
    formulario.reset();
    listaHorario.innerHTML = "";
    contador = 1;
  });

  btnCrear.addEventListener("click", e => {
    console.log("crear");
    e.preventDefault();
    let ListaHorarioInicio = document.getElementsByClassName("inicioH");
    let ListaHorarioFin = document.getElementsByClassName("finH");
    let err = 0;
    let eventos = [];
    for (let index = 0; index < ListaHorarioInicio.length; index++) {
      let obj = {
        inicio: new Date(Date.parse(ListaHorarioInicio[index].value)),
        fin: new Date(Date.parse(ListaHorarioFin[index].value))
      };

      if ( (new Date(Date.parse(ListaHorarioInicio[index].value))) < (new Date(Date.parse(ListaHorarioFin[index].value)))) {
      } else {
        err++;
      }
      eventos.push(obj);

      console.log(obj);
    }

    if (err == 0) {
      // continuar
      console.log(eventos);

      if (descripcion.value && eventos.length >= 1) {
        URL_ENCARGADOS = "/api/admin/reservas";
        options = {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          }
        };

        options['body'] = JSON.stringify({
            LabId: labos.selectedOptions[0].getAttribute("valor"),
            LabIdR: labos.selectedOptions[0].getAttribute("_id"),
            description: descripcion.value,
            eventos: eventos
        });

        console.log(options)
        console.log(URL_ENCARGADOS);

        fetch(URL_ENCARGADOS, options)
          .then(res => res.json())
          .catch(error => {
              console.log("error: ", error);
              Swal.fire("Hubo un problema en crear la reserva!", error, "error");
          })
          .then(response => {
              if(response.result != "error"){
                console.log("success: ", response);
                Swal.fire(response.msg, "Continua haciendo reservas", response.ok);
              }else{
                  alert("No se pudo crear");
              }
            
          });
      }
    } else {
      alert("Alguna fecha de finalizacion es menor o igual que una de inicio");
    }
  });

  llenarEncargados = () => {
    URL_ENCARGADOS = "/api/admin/labos/labs";
    options = {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(URL_ENCARGADOS, options)
      .then(res => res.json())
      .catch(error => console.log("error: ", error))
      .then(response => {
        console.log("success: ", response);
        response.forEach(element => {
          opcion = document.createElement("option");
          opcion.innerHTML = `${element.name}|${element.code}`;
          opcion.setAttribute("valor", element.code);
          opcion.setAttribute("_id", element._id);
          labos.appendChild(opcion);
        });
      });
  };

  console.log("empezo");
  llenarEncargados();
};

window.onload = start;
