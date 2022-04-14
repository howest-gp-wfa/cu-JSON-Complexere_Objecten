"use strict";

window.addEventListener('load', initialize);

const lessonsData = {
  "BST1": [
    {
      "subject": "Web Frontend Advanced",
      "module": "WFA",
      "day": "maandag",
      "room": "K1.012"
    },
    {
      "subject": "Web Backend",
      "module": "WBA",
      "day": "Dinsdag",
      "room": "U.002"
    }
  ],
  "BST5": {
    "subject": "Datacommunicatie Intro",
    "module": "DCI",
    "day": "Woensdag",
    "room": "B208"
  }
};

let divJSONFeedback;
let divJSONAsString;
let divJSONExtended;
let slcLocation;


function initialize() {
  // DOM elementen ophalen
  divJSONFeedback = document.querySelector("#divJSONFeedback");
  divJSONExtended = document.querySelector("#divJSONExtended");
  slcLocation = document.querySelector("#slcLocation");
  divJSONAsString = document.querySelector("#divJSONAsString");

  // Eventlisteners toevoegen
  slcLocation.addEventListener("change", showLessonsContent);

  // Startup Functies na inladen DOM
  displayInfo();
  fillSelectLocations();
  showLessonsContent();
}


// Functies

function fillSelectLocations() {
  for (let location in lessonsData) {
    slcLocation[slcLocation.length] = new Option(location, location);
  }
}

function showLessonsContent() {
  divJSONExtended.innerHTML = '';

  const chosenLocation = slcLocation[slcLocation.selectedIndex].text;
  //console.log(chosenLocation);
  if (Array.isArray(lessonsData[chosenLocation])) {
    for (let i = 0; i < lessonsData[chosenLocation].length; i++) {
      divJSONExtended.appendChild(createDivision(lessonsData[chosenLocation][i]));
    }
  }
  else {
    divJSONExtended.appendChild(createDivision(lessonsData[chosenLocation]));
  }
}


//Creates a division from JSON-object
function createDivision(objectLesson) {
  const divLesson = document.createElement('div');
  let content = '';
  for (let lessonHeader in objectLesson) {
    content += `${lessonHeader} : ${objectLesson[lessonHeader]} <br/> `;
  }
  divLesson.classList.add("les");
  divLesson.innerHTML = content;
  return divLesson;
}

function displayInfo() {
  let content = '';
  // INFO :
  // Wanneer de JSON-file van een server komt moeten we deze omzetten naar een JSON-Object 
  // let lessons = JSON.parse(JSONBinnenkomend);

  // Wijzigen/aanvullen van de inhoud
  lessons.subject = "Web Frontend Advanced";
  lessons.lector = "Lector X";

  // Dot notatie
  divJSONFeedback.innerHTML = `De lessons <strong>${lessons.subject}</strong> gaan door in 
    <strong>${lessons.room}</strong> op <strong>${lessons.day}</strong> en worden gegeven door <strong>${lessons.lector}</strong>`;

  // Array notatie
  divJSONFeedback.innerHTML += ` <br/> De lessons <strong>${lessons['subject']}</strong> gaan door in gebouw <strong>${lessons['building']}</strong>`;

  // Eventueel terug omzetten naar een string 
  content = JSON.stringify(lessons);
  divJSONAsString.textContent = content;

}
