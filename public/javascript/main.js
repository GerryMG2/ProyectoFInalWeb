
  document.addEventListener('DOMContentLoaded', function() {
    var initialLocaleCode = 'es';
    var localeSelectorEl = document.getElementById('locale-selector');
    var calendarEl = document.getElementById('calendar');
    var diaActual = new Date();
    var dia = diaActual.toISOString().split('T')[0]


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

      var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        defaultDate: dia,
        locale: initialLocaleCode,
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
        var optionEl = document.createElement('option');
        optionEl.value = localeCode;
        optionEl.selected = localeCode == initialLocaleCode;
        optionEl.innerText = localeCode;
        localeSelectorEl.appendChild(optionEl);
      });
  
      // when the selected option changes, dynamically change the calendar option
      localeSelectorEl.addEventListener('change', function() {
        if (this.value) {
          calendar.setOption('locale', this.value);
        }
      });
  
        
      
    });



   
   

  });