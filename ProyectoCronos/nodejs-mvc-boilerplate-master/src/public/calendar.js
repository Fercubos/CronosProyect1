



// SIDEBAR TOGGLE ############################################
document.addEventListener("DOMContentLoaded", function(event) {
   
	const showNavbar = (toggleId, navId, bodyId, headerId) =>{
	const toggle = document.getElementById(toggleId),
	nav = document.getElementById(navId),
	bodypd = document.getElementById(bodyId),
	headerpd = document.getElementById(headerId)
	
	// Validate that all variables exist
	if(toggle && nav && bodypd && headerpd){
	toggle.addEventListener('click', ()=>{
	// show navbar
	nav.classList.toggle('show')
	// change icon
	toggle.classList.toggle('bx-x')
	// add padding to body
	bodypd.classList.toggle('body-pd')
	// add padding to header
	headerpd.classList.toggle('body-pd')
	})
	}
	}
	
	showNavbar('header-toggle','nav-bar','body-pd','header')
	
	/*===== LINK ACTIVE =====*/
	const linkColor = document.querySelectorAll('.nav_link')
	
	function colorLink(){
	if(linkColor){
	linkColor.forEach(l=> l.classList.remove('active'))
	this.classList.add('active')
	}
	}
	linkColor.forEach(l=> l.addEventListener('click', colorLink))
	
	 // Your code to run since DOM is loaded and ready
	});
// SIDEBAR TOGGLE ############################################

function convertToEvents(calendarCronos, userId, projectId = null) {
  if (!Array.isArray(calendarCronos)) {
      throw new TypeError('calendarCronos debe ser un arreglo');
  }
  const projectTaskCount = {};
  const lastEventEndTime = {}; // Almacenar la última hora de finalización por fecha

  // Ordenar pasos por proyecto_id y fecha_de_los_pasos para garantizar que se procesan secuencialmente por proyecto y fecha
  calendarCronos.sort((a, b) => a.proyecto_id - b.proyecto_id || new Date(a.fecha_de_los_pasos) - new Date(b.fecha_de_los_pasos));

  return calendarCronos.map(step => {
      if (!projectTaskCount[userId]) {
          projectTaskCount[userId] = { projectIdCounter: 0, taskIdCounter: {}, projectIds: {} };
      }

      // Verificar si el proyecto_id es nuevo
      if (projectTaskCount[userId].projectIds[step.proyecto_id] === undefined) {
          projectTaskCount[userId].projectIds[step.proyecto_id] = projectTaskCount[userId].projectIdCounter;
          projectTaskCount[userId].taskIdCounter[step.proyecto_id] = 0; // Iniciar el contador de tareas para este proyecto
          projectTaskCount[userId].projectIdCounter++;
      } else {
          projectTaskCount[userId].taskIdCounter[step.proyecto_id]++;
      }

      const projectIdIndex = projectTaskCount[userId].projectIds[step.proyecto_id];
      const taskIdIndex = projectTaskCount[userId].taskIdCounter[step.proyecto_id];

      // Formato de fecha sin tiempo para usar como clave en lastEventEndTime
      const dateKey = new Date(step.fecha_de_los_pasos).toDateString();
      if (!lastEventEndTime[dateKey]) {
          // Establecer la hora inicial de los eventos de ese día a las 12 PM
          const noon = new Date(step.fecha_de_los_pasos);
          noon.setHours(12, 0, 0, 0); // Ajustar a las 12 PM
          lastEventEndTime[dateKey] = noon;
      } else {
          // Asegurarse de que el nuevo evento comience una hora después del último evento de ese día
          lastEventEndTime[dateKey] = new Date(lastEventEndTime[dateKey].getTime() + 60 * 60 * 1000);
      }

      return {
          title: step.descripcion,
          start: lastEventEndTime[dateKey].toISOString(),
          end: new Date(lastEventEndTime[dateKey].getTime() + 60 * 60 * 1000).toISOString(),
          url: `/Proyects?projectId=${projectIdIndex}&taskId=${taskIdIndex}&usuario1=${userId}`
      };
  });
}





  

// Pasar los datos de calendarCronos al JavaScript
   document.addEventListener('DOMContentLoaded', function () {
    // Aquí puedes agregar más código que utilice dataArray
    //var dataArray2 = dataArray
    var dataArray1 = JSON.parse(dataArray);
    //console.log(dataArray2);
// Pasar los datos de calendarCronos al JavaScript
    console.log("dead");
    var userIds1 = JSON.parse(userIds);
    const events = convertToEvents(dataArray1, userIds1);

const calendarEl3 = document.getElementById("calendar23");



//get today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd
}
if(mm<10) {
    mm = '0'+mm
}
today = yyyy + '-' + mm + '-' + dd;
console.log(today);



// necesitamos hacerlo un poco a la izq el calendario
//calendarEl.style.marginLeft = "-1rem";
const calendar4 = new FullCalendar.Calendar(calendarEl3, {
    themeSystem: 'bootstrap5',
    initialView: "dayGridMonth",
    initialDate: today,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: events,
    eventColor: '#a5834a',
    eventDisplay: 'block',
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
  });

  calendar4.render();

});


