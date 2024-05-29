// This file is run by the browser each time your view template is loaded

/**
 * Define variables that reference elements included in /views/index.html:
 */

// Forms

const dbForm = document.getElementById("databaseForm"); //important, this is the form that we gonna use to create the database

const pageForm = document.getElementById("pageForm");
const blocksForm = document.getElementById("blocksForm");
const commentForm = document.getElementById("commentForm");

// Table cells where API responses will be appended
const dbResponseEl = document.getElementById("dbResponse"); //this is where we gonna do the append in our code
//the nexts doestn care, but i will let it here for reference

const pageResponseEl = document.getElementById("pageResponse");
const blocksResponseEl = document.getElementById("blocksResponse");
const commentResponseEl = document.getElementById("commentResponse");

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
	console.log(apiResponse);

	// Add success message to UI
	const newParagraphSuccessMsg = document.createElement("p");
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
document.addEventListener("DOMContentLoaded", function () {});

dbForm.onsubmit = async function (event) {
	//esta funcion creo que es la que sobre cargue con todo lo que hice
	event.preventDefault();
	const name = event.target.dbName.value;
	const body = JSON.stringify({ dbName });
	console.log("que carajo?");
	const newAnchorTag1 = document.createElement("a");

	//cambiamos el color del type submit
	$("#dbSubmit").css("background-color", "red");
	//hacemos inservible el boton
	$("#dbSubmit").prop("disabled", true);
	//como hago que pase esto solo si el width de la pagina es mayor a 800px?
	if (window.innerWidth > 1200 && !$(".upperPart").is(":hidden")) {
		//escondemos el boton de esconder menu
		$(".menuhide").hide();
		//hacemos mas pequeño el menu de arriba
		//$(".upperPart").toggleClass("minimize");
		//subimos un poco la tabla de abajo cambiando el margen-top -4rem
		//$("table").animate({"margin-top": "-10rem"});
	}

	newAnchorTag1.innerText = "CARGANDO!!!!";
	//ponemos el mensaje de cargando con el estilo .loading-text
	newAnchorTag1.classList.add("loading-text");
	dbResponseEl.appendChild(newAnchorTag1);

	const newDBResponse = await fetch("/databases", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: name }),
	});
	const newDBData = await newDBResponse.json();

	//projectDetails have this things inside:DatabaseName: [],NumberOfTasks: [],Steps: [],dateOfSteps: [],completionOfSteps: [],StepsInsideResume: []

	console.log("this is the response of the api: ");
	console.log(newDBResponse);
	console.log(newDBData);
	//console.log(newDBData.projectDetails.DatabaseName)
	//mostramos el nombre de la tarea step 2
	//recuerda Step con mayuscula
	console.log(newDBData.projectDetails.Steps[1]);

	appendApiResponse(newDBData, dbResponseEl); //esto agregara la respuesta de la api a la interfaz de usuario usa como parametros la respuesta de la api y el elemento donde se va a agregar
	appendApiResponseToCronosUI(newDBData.projectDetails);
	dbResponseEl.removeChild(newAnchorTag1);
};

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

// Agregar el contenedor principal al cuerpo del documento

// Llamar a la función con los datos de ejemplo

//############################################################################################################
// pageForm.onsubmit = async function (event) {
// 	event.preventDefault();

// 	const dbID = event.target.newPageDB.value;
// 	const pageName = event.target.newPageName.value;
// 	const header = event.target.header.value;
// 	const body = JSON.stringify({ dbID, pageName, header });
// 	//  const dueDate = event.target.dueDate.value

// 	const newPageResponse = await fetch("/pages", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body,
// 	});

// 	const newPageData = await newPageResponse.json();
// 	appendApiResponse(newPageData, pageResponseEl);
// };

// blocksForm.onsubmit = async function (event) {
// 	event.preventDefault();

// 	const pageID = event.target.pageID.value;
// 	const content = event.target.content.value;
// 	const body = JSON.stringify({ pageID, content });

// 	const newBlockResponse = await fetch("/blocks", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body,
// 	});

// 	const newBlockData = await newBlockResponse.json();
// 	appendBlocksResponse(newBlockData, blocksResponseEl);
// };

// commentForm.onsubmit = async function (event) {
// 	event.preventDefault();

// 	const pageID = event.target.pageIDComment.value;
// 	const comment = event.target.comment.value;
// 	const body = JSON.stringify({ pageID, comment });
// 	// Selecciona el elemento main y aplica la clase de transformación

// 	const newCommentResponse = await fetch("/comments", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body,
// 	});

// 	const newCommentData = await newCommentResponse.json();
// 	appendApiResponse(newCommentData, commentResponseEl);
// };
