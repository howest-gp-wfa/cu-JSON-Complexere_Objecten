"use strict";

var divJSONFeedback;
var divJSONAsString;

window.addEventListener('load', Initieer);

var dataLessen = {
  "BST1": [
    {
      "lesinhoud": "Web Frontend Advanced",
      "module": "WFB",
      "dag": "maandag",
      "lokaal": "K1.012"
    },
    {
      "lesinhoud": "Web Backend",
      "module": "WBA",
      "dag": "Dinsdag",
      "lokaal": "U.002"
    }
  ],
  "BST5": {
    "lesinhoud": "Datacommunicatie Intro",
    "module": "DCI",
    "dag": "Woensdag",
    "lokaal": "B208"
  }
};

var divJSONUitgebreid;
var slcLocatie;


function Initieer() {
  // DOM elementen ophalen
  divJSONFeedback = document.querySelector("#divJSONFeedback");
  divJSONUitgebreid = document.querySelector("#divJSONUitgebreid");
  slcLocatie = document.querySelector("#slcLocatie");
  divJSONAsString = document.querySelector("#divJSONAsString");

  // Eventlistener
  slcLocatie.addEventListener("change", ToonInhoudLessen);


  // Functie
  VulInfo();
  VulSelect();
  ToonInhoudLessen();


}


// functies

function VulSelect() {
  for (let locatie in dataLessen) {
    slcLocatie[slcLocatie.length] = new Option(locatie, locatie);
  }
}

function ToonInhoudLessen() {
  divJSONUitgebreid.innerHTML = '';

  let keuze = slcLocatie[slcLocatie.selectedIndex].text;
  console.log(keuze);
  if (Array.isArray(dataLessen[keuze])) {
    for (let i = 0; i < dataLessen[keuze].length; i++) {
      divJSONUitgebreid.appendChild(CreateDivision(dataLessen[keuze][i]));       
    }
  }
  else {
      divJSONUitgebreid.appendChild(CreateDivision(dataLessen[keuze]));
    }

  }



function CreateDivision(objectLes){
  let toevoeging = document.createElement('div');
  let inhoudtoevoeging='';
  for (let gegeven in objectLes){
    inhoudtoevoeging += `${gegeven} : ${objectLes[gegeven]} <br/> `;
  }  
  toevoeging.classList.add("les");
  toevoeging.innerHTML = inhoudtoevoeging;
  return toevoeging;

}

function VulInfo() {
   //let lessen = {"lesinhoud":"JavaScript", "module" : "WFA", "dag" : "maandag", "lokaal" : "K1.016", "gebouw" : "BST1", "uren" : 4};
  
    // Wanneer de JSON-file van een server komt moeten we deze omzetten naar een JSON-Object 
   // let lessen = JSON.parse(JSONBinnenkomend);

  // Wijzigen van de inhoud
  lessen.lesinhoud = "Web Frontend Advanced"; 
  lessen.lesgever = "Lector X";

  // Dot notatie
  divJSONFeedback.innerHTML = `De lessen <strong>${lessen.lesinhoud}</strong> gaan door in <strong>${lessen.lokaal}</strong> op <strong>${lessen.dag}</strong> en worden gegeven door <strong>${lessen.lesgever}</strong>`;

  // Array notatie
  divJSONFeedback.innerHTML += ` <br/> De lessen ${lessen['lesinhoud']} gaan door in gebouw ${lessen['gebouw']}`;

  // Eventueel terug omzetten naar een string 
  let lesstring = JSON.stringify(lessen);
  divJSONAsString.innerHTML = lesstring;

}
