



document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'resourceTimeline' ],
    timeZone: 'UTC',
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'
    },
    defaultView: 'resourceTimelineDay',
    scrollTime: '08:00',
    aspectRatio: 1.5,
    views: {
      resourceTimelineDay: {
        buttonText: ':15 slots',
        slotDuration: '00:15'
      },
      resourceTimelineTenDay: {
        type: 'resourceTimeline',
        duration: { days: 10 },
        buttonText: '10 days'
      }
    },
    editable: true,
    resourceLabelText: 'Rooms',
    resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors',
    events: 'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline'
  });

  calendar.render();
});