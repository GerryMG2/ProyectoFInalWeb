





start = () => {
    var labos = document.getElementById("opciones-labos");
    var descripcion = document.getElementById("descText");
    var btnHorario = document.getElementById("btn-horario");
    var listaHorario = document.getElementById("listaHorario");
    let contador = 1;

    btnHorario.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("dio click")
        let li = document.createElement("li");
        let contenedor = document.createElement("div");
        let contenedorHorario = document.createElement("div");
        let contenedorOpciones = document.createElement("div");
        let contenedorHoraInicio = document.createElement("div");
        let contenedorHoraFin = document.createElement("div");
        contenedorHoraInicio.innerHTML = `
        <div class="input-group date form_datetime col-md-5" data-date="1979-09-16T05:25:07Z" data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_inputi${contador}">
            <input class="form-control" size="16" type="text" value="" readonly>
            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
        </div>
        <input type="hidden" id="dtp_inputi${contador}" value="" />`;
        contenedorHoraFin.innerHTML = `
        <div class="input-group date form_datetime col-md-5" data-date="1979-09-16T05:25:07Z" data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_inputf${contador}">
            <input class="form-control" size="16" type="text" value="" readonly>
            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
        </div>
        <input type="hidden" id="dtp_inputf${contador}" value="" />`;
        contenedorHorario.appendChild(contenedorHoraInicio);
        contenedorHorario.appendChild(contenedorHoraFin);
        contenedor.appendChild(contenedorHorario);
        
        let btnBorrar = document.createElement("button");
        contenedorOpciones.appendChild(btnBorrar);
        contenedor.appendChild(contenedorOpciones);
        li.appendChild(contenedor);
        btnBorrar.addEventListener("click", (e)=>{
            e.preventDefault();
            listaHorario.removeChild(li);
        });
        listaHorario.appendChild(li)
        $('.form_datetime').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
        
        contador++;
    });

   






    console.log("empezo");
    

};

window.onload = start;