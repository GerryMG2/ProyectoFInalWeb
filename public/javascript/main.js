document.addEventListener("DOMContentLoaded", function() {
  var initialLocaleCode = "es";
  var localeSelectorEl = document.getElementById("locale-selector");
  var calendarEl = document.getElementById("calendar");
  var diaActual = new Date();
  var dia = diaActual.toLocaleDateString().replace("/","-").replace("/","-").replace("/","-").split("-").reverse().join("-");
  
  console.log(dia)
  URL_ENCARGADOS = "/api/admin/reservas/eventos";
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
      console.log(response);

      let URL_ENCARGADOS2 = "/api/admin/labos/labs";
      let options2 = {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      };

      fetch(URL_ENCARGADOS2, options2)
        .then(res => res.json())
        .catch(error => console.log("error: ", error))
        .then(response2 => {
          console.log("success: ", response2);
          let resources = [];
          response2.forEach(element => {
            resources.push({
              id: element.code,
              title: element.name
            });
          });
          resources.push({id: "00000", name: "Laboratorio Eliminado"})

          var calendar = new FullCalendar.Calendar(calendarEl, {
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            defaultView: "resourceTimelineDay",
            plugins: [
              "interaction",
              "dayGrid",
              "timeGrid",
              "list",
              "resourceTimeline"
            ],
            header: {
              left: "prev,next today",
              center: "title",
              right: "resourceTimelineDay,dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            },
            buttonText: {

              resourceTimelineDay: 'Horario por Labo'
            },
           
            locale: initialLocaleCode,
            resources: resources,
            buttonIcons: false, // show the prev/next text
            weekNumbers: true,
            navLinks: true, // can click day/week names to navigate views
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            events: response
          });

          calendar.render();

          // build the locale selector's options
          calendar.getAvailableLocaleCodes().forEach(function(localeCode) {
            var optionEl = document.createElement("option");
            optionEl.value = localeCode;
            optionEl.selected = localeCode == initialLocaleCode;
            optionEl.innerText = localeCode;
            localeSelectorEl.appendChild(optionEl);
          });

          // when the selected option changes, dynamically change the calendar option
          localeSelectorEl.addEventListener("change", function() {
            if (this.value) {
              calendar.setOption("locale", this.value);
            }
          });
        });
    });
});
