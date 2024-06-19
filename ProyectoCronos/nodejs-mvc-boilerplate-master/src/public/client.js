

$(document).ready(function() {
    // Aplicar resaltado basado en localStorage al cargar la página
	
    var projectId = localStorage.getItem('projectId');
    var taskId = localStorage.getItem('taskId');
    

    $("[id^='proyectf']").click(function() {
        var projectId = parseInt(this.id.replace('proyectf', ''));
		localStorage.setItem('projectId', projectId);  // Guarda en localStorage

        // Resaltar el proyecto seleccionado y quitar el resaltado de los demás
        $("[id^='proyectf']").removeClass('highlight');

        // Resaltar la primera tarea del proyecto seleccionado
        if ($("#taskf0").length) {
            localStorage.setItem('taskId', 0);  // Selecciona automáticamente la primera tarea
        } else {
            localStorage.removeItem('taskId');  // Si no hay tareas, elimina el taskId
        }

        // Construye una nueva URL con el projectId como parámetro de consulta
        var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?projectId=' + projectId 
        // Redirige a la nueva URL
        window.location.href = newUrl;
    });
    
    $("[id^='taskf']").click(function() {
        var taskId = parseInt(this.id.replace('taskf', ''));
		if (projectId == null) {
			projectId = 0;
		}

		if (taskId == null) {
			taskId = 0;
		}
		
        localStorage.setItem('taskId', taskId);  // Guarda en localStorage

        // Resaltar la tarea seleccionada y quitar el resaltado de las demás

        var newUrl2 = window.location.protocol + "//" + window.location.host + window.location.pathname + '?projectId=' + projectId + '&taskId=' + taskId 
        window.location.href = newUrl2;
    });
});








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



const dbForm = document.getElementById("databaseForm"); //important, this is the form that we gonna use to create the database

// const pageForm = document.getElementById("pageForm");
// const blocksForm = document.getElementById("blocksForm");
// const commentForm = document.getElementById("commentForm");

// Table cells where API responses will be appended
const dbResponseEl = document.getElementById("dbResponse"); //this is where we gonna do the append in our code

//the nexts doestn care, but i will let it here for reference

// const pageResponseEl = document.getElementById("pageResponse");
// const blocksResponseEl = document.getElementById("blocksResponse");
// const commentResponseEl = document.getElementById("commentResponse");

/**
 * Functions to handle appending new content to /views/index.html
 */

//$("html").css("background-color", "black");
$(".menuhide").click(function () {
	//esto lo hice para que se esconda el menu de arriba
	$(".upperPart").slideToggle();
});
// Appends the API response to the UI
const appendApiResponse = function (apiResponse, el) {
	//esto significa que vamos a agregar la respuesta de la api a la interfaz de usuario
	//console.log(apiResponse);

	// Add success message to UI
	const newParagraphSuccessMsg = document.createElement("p");
	newParagraphSuccessMsg.style.marginTop = "2rem";
	newParagraphSuccessMsg.textContent = "Result: " + apiResponse.message;
	el.appendChild(newParagraphSuccessMsg);
	// See browser console for more information
	if (apiResponse.message === "error") return;

	// Add ID of Notion item (db, page, comment) to UI
	const newParagraphId = document.createElement("p");
	newParagraphId.textContent = "ID: " + apiResponse.data.id;
	el.appendChild(newParagraphId);

	// Add URL of Notion item (db, page) to UI
	// if (apiResponse.data.url) {
	//   const newAnchorTag = document.createElement("a")
	//   newAnchorTag.setAttribute("href", apiResponse.data.url)
	//   newAnchorTag.innerText = apiResponse.data.url
	//   el.appendChild(newAnchorTag)
	// }
	if (apiResponse.data.url) {
		//esto es para que se cree un link en la interfaz de usuario
		const newAnchorTag = document.createElement("a");
		idurlOfNotionItem = apiResponse.data.id.replace(/-/g, "");
		urlofNotionItem = "http://aaronproject1.notion.site/" + idurlOfNotionItem;
		newAnchorTag.setAttribute("href", urlofNotionItem);
		newAnchorTag.innerText = urlofNotionItem;
		el.appendChild(newAnchorTag);
		//volvemos todo a la normalidad
		$("#dbSubmit").css("background-color", "#ffed84");
		$("#dbSubmit").prop("disabled", false);
		if (window.innerWidth > 1200 && $(".upperPart").hasClass("minimize")) {
			$(".upperPart").toggleClass("minimize");
			$("table").animate({ "margin-top": "-0.1rem" });
			$(".menuhide").show();
		}
	}
};

// Appends the blocks API response to the UI esto significa que vamos a agregar la respuesta de los bloques a la interfaz de usuario
const appendBlocksResponse = function (apiResponse, el) {
	console.log(apiResponse);

	// Add success message to UI
	const newParagraphSuccessMsg = document.createElement("p");
	newParagraphSuccessMsg.textContent = "Result: " + apiResponse.message;
	el.appendChild(newParagraphSuccessMsg);

	// Add block ID to UI
	const newParagraphId = document.createElement("p");
	newParagraphId.textContent = "ID: " + apiResponse.data.results[0].id;
	el.appendChild(newParagraphId);
};

/**
 * Attach submit event handlers to each form included in /views/index.html
 */

// Attach submit event to each form
// dbForm.onsubmit = async function (event) { //this is the function that will be called when the form is submitted
//   event.preventDefault()

//   const dbName = event.target.dbName.value
//   const body = JSON.stringify({ dbName })

//   const newDBResponse = await fetch("/databases", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body,
//   })
//   const newDBData = await newDBResponse.json()

//   appendApiResponse(newDBData, dbResponseEl)
// }

// client.js
//dbform is null what can i do

// Attach submit event to each form


document.addEventListener('DOMContentLoaded', function() {
    const dbForm = document.getElementById('databaseForm');
    const dbResponseEl = document.getElementById('dbResponse');

    if (dbForm) {
        dbForm.onsubmit = async function(event) {
            event.preventDefault();
            const dbName = event.target.dbName.value;
            const body = JSON.stringify({ dbName });
            const NameUser = 'user_id1';  // Asegúrate de definir 'user_id1' o cambiarlo por una variable válida.
            console.log("que carajo?");
            const newAnchorTag1 = document.createElement("a");

            // Cambiamos el color del botón submit
            $("#dbSubmit").css("background-color", "red");
            // Deshabilitamos el botón
            $("#dbSubmit").prop("disabled", true);

            newAnchorTag1.innerText = "CARGANDO!!!!";
            newAnchorTag1.classList.add("loading-text");
            dbResponseEl.appendChild(newAnchorTag1);

            const newDBResponse = await fetch("/databases", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: dbName, NameUser: NameUser }),
            });
            const newDBData = await newDBResponse.json();

            console.log("this is the response of the api: ");
            console.log(newDBResponse);
            console.log(newDBData);

            if (newDBData && newDBData.projectDetails && newDBData.projectDetails.Steps) {
                console.log(newDBData.projectDetails.Steps[1]);
            }

            appendApiResponse(newDBData, dbResponseEl);
			appendApiResponseToCronosUI(newDBData.projectDetails);
            dbResponseEl.removeChild(newAnchorTag1);
        };
    } else {
        console.error('Form not found!');
    }
});


//hacer que mande un fetch a la front basura para que me de los proyectos con jquery en el boton de proyectos
//este es el boton de tareas             <button class="brown-buttonforTasks" id ="task<%=i%>"> <%= proyectosCronos.proyectos[3].tareas[i].pasos[0].descripcion%></button>





//############################################################################################################
//hacemos una funcion para agregar la respuesta de la api a la interfaz de usuario de Cronos
appendApiResponseToCronosUI = function (data) {
	//esto es para agregar la respuesta de la api a la interfaz de usuario de Cronos
	// Append project details to Cronos UI
	// Crear contenedor principal



	const container = document.getElementById("content-container");
	container.style.width = "50%";
	container.style.border = "1px solid #ccc";
	container.style.padding = "10px";
	container.style.margin = "10px";
	container.style.borderRadius = "10px";
	container.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";

	// Crear título
	const title = document.createElement("h2");
	title.textContent = "Detalles de la Base de Datos";
	title.style.textAlign = "center";
	container.appendChild(title);

	// Agregar nombre de la base de datos y número de tareas
	function addSingleElement(label, item) {
		const singleContainer = document.createElement("div");
		singleContainer.style.marginBottom = "20px";

		const singleTitle = document.createElement("h3");
		singleTitle.textContent = label;
		singleContainer.appendChild(singleTitle);

		const singleItem = document.createElement("p");
		singleItem.textContent = item;
		singleContainer.appendChild(singleItem);
		container.appendChild(singleContainer);
	}

	addSingleElement("Nombre de la Base de Datos", data.DatabaseName[0]);
	addSingleElement("Número de Tareas", data.NumberOfTasks[0]);

	// Agregar pasos, fechas y resúmenes intercalados
	function addIntercalatedElements(steps, dates, summaries) {
		for (let i = 0; i < steps.length; i++) {
			const stepContainer = document.createElement("div");
			stepContainer.style.marginBottom = "20px";

			const stepTitle = document.createElement("h3");
			stepTitle.textContent = `Paso ${i + 1}`;
			stepContainer.appendChild(stepTitle);

			const stepItem = document.createElement("p");
			stepItem.textContent = `Paso: ${steps[i]}`;
			stepContainer.appendChild(stepItem);

			const dateItem = document.createElement("p");
			dateItem.textContent = `Fecha: ${dates[i]}`;
			stepContainer.appendChild(dateItem);

			const summaryItem = document.createElement("p");
			summaryItem.textContent = `Resumen: ${summaries[i]}`;
			stepContainer.appendChild(summaryItem);

			container.appendChild(stepContainer);
		}
	}

	addIntercalatedElements(data.Steps, data.dateOfSteps, data.StepsInsideResume);

	// Inicializar FullCalendar y añadir eventos

	const calendarEl = document.getElementById("calendar");

	// necesitamos hacerlo un poco a la izq el calendario
	//calendarEl.style.marginLeft = "-1rem";
	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "dayGridMonth",
		events: data.dateOfSteps.map((date, index) => ({
			title: data.Steps[index],
			start: date,
			description: data.StepsInsideResume[index],
		})),
		headerToolbar: {
			left: "prev,next today",
			center: "title",
			right: "dayGridMonth,timeGridWeek,timeGridDay",
		},
		eventClick: function (info) {
			alert(
				"Event: " +
					info.event.title +
					"\nDescription: " +
					info.event.extendedProps.description
			);
		},
		dateClick: function (info) {
			alert("Date: " + info.dateStr);
		},
		editable: true,
		selectable: true,
		select: function (info) {
			alert("Selected: " + info.startStr + " to " + info.endStr);
		},
		eventDrop: function (info) {
			alert("Event dropped to " + info.event.start.toISOString());
		},
		eventResize: function (info) {
			alert("Event resized to " + info.event.end.toISOString());
		},
		eventMouseEnter: function (info) {
			info.el.style.backgroundColor = "lightblue";
		},
		eventMouseLeave: function (info) {
			info.el.style.backgroundColor = "";
		},
		eventRender: function (info) {
			var tooltip = new Tooltip(info.el, {
				title: info.event.extendedProps.description,
				placement: "top",
				trigger: "hover",
				container: "body",
			});
		},
	});

	calendar.render();
};


