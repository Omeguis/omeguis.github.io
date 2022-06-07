/*
IDEA DE PROYECTO FINAL: 

Herramienta online para jugadores de CoD WARZONE, es para trackear la sesión de juego actual.
Al iniciar un stream/directo se resetean los stats manualmente con un botón de Reset.
Permite a un usuario cargar partida a partida sus resultados y en base a eso ir listando las partidas con estadisticas promediadas de KD, posición y algún que otro dato de color.
Permitirá también filtrar las mejores partidas.

Tendrá un link para abrir en una nueva ventana con fondo Chroma una serie de stats promediados para que el streamer pueda utilizar esta URL/Ventana en su directo y así colocar los stats generales de la sesión a disposición de sus espectadores.

*/
/*
PARA ESTA ENTREGA HICE LO SIGUIENTE:
- Agregué inputs y un dropdown y logre traer sus valores en vez de prompt
- Con ayuda de la ultima clase de DOM pude dibujar cada una de las "partidas" en una tabla
- Calculo el KD sumando elementos de distintos objetos y obteniendo un valor final (calculateOverall)
- Arme una funcion para eliminar la ultima
- Arme una funciona para dibujar la tabla de nuevo porque creo que lo voy a necesitar luego
*/

let overallKD;
let loadedMatches = 0;
let loadedMatchesID = 0;
let Partidas = [];
let KDCollection = [];
let totalWins = [];
let overallWinRatio;
let totalKillsMatches; 
const matchesWrapper = document.getElementById("matchList");
let hasLocalStorage = false;
const noMatchesWrapper = document.getElementById("noMatchesDisclaimer");


let getMatchesPrevSession = localStorage.getItem('matches');
let MatchesPrevSession = ('getMatchesPrevSession: ', JSON.parse(getMatchesPrevSession));
MatchesPrevSession === null ? hasLocalStorage = false : Partidas = MatchesPrevSession;
redrawTable(Partidas);
getWinPercentage();
Partidas.length === 0 ? noMatchesWrapper.classList.add("show-me") : noMatchesWrapper.classList.remove("show-me")

function deleteAllMatches(){
  localStorage.removeItem('matches');
  localStorage.removeItem('overallKD');
  localStorage.removeItem('suma de kills');
  localStorage.removeItem('win percentage');
  Partidas = [];
  getWinPercentage();
  redrawTable(Partidas);
  noMatchesWrapper.classList.add("show-me");
}

class brMatch{
    constructor(type, killsAmt, deathAmt, pos, timeStamp){
        this.type=type;
        this.killsAmt=killsAmt; 
        this.deathAmt=deathAmt;
        this.pos=pos;
        this.FirstPos = false;
        this.Domination = false;
        this.timeStamp=timeStamp;
    }
    won(){
        console.log("Gané la partida");
        this.FirstPos = true;
    }
    calculateKD(){
        if (this.deathAmt === 0){
            this.matchKD = this.killsAmt;
            this.Domination = true;
        } else {
            this.matchKD = (this.killsAmt / this.deathAmt).toFixed(2); 
        }
    }
}
function loadMatch(){
document.getElementById("emptyInputsError").style.display = "none";
let currentMatchMode = document.getElementById("inputMatchType").value; 
let currentMatchPos = document.getElementById("inputMatchPosition").valueAsNumber; 
let currentMatchKills = document.getElementById("inputMatchKills").valueAsNumber; 
let currentMatchDeaths = document.getElementById("inputMatchDeaths").valueAsNumber;
let currentMatchTimestamp = new Date().format("dd/m/yy, HH:MM");

    if (inputMatchKills.value === "" || inputMatchDeaths.value === ""  || inputMatchPosition.value === "" ){
      document.getElementById("emptyInputsError").style.display = "block";
      return;
    } else {
    let newMatch = new brMatch(currentMatchMode, currentMatchKills,currentMatchDeaths, currentMatchPos, currentMatchTimestamp); 
    Partidas.push(newMatch); //Add the match to my arr of matches
    newMatch.calculateKD(); //Obtain the KD from the loaded match
    loadedMatches = Partidas.length;
    obtainTotalKills();
    }
    Toastify({
      text: "Cargaste la partida con éxito",
      gravity:"bottom",
      duration: 3000
      }).showToast();

      //Guardamos el KD
      //Dibujamos la tabla
      redrawTable(Partidas);

      KDCollection = Partidas.map((el) => el.matchKD);
      overallKD = calculateOverall(KDCollection);
      //Save to LocalStorage for Visor
      localStorage.setItem("overallKD", overallKD);
      
      //Clear inputs to see labels again
      clearInput(inputMatchPosition);
      clearInput(inputMatchKills);
      clearInput(inputMatchDeaths);

      noMatchesWrapper.classList.remove("show-me");
      getWinPercentage();
} 

function clearInput(id){
  id.value = '';
}

function obtainTotalKills(){
    //Obtain total kills
    let sessionTotalKillsAmt = Partidas.map((el) => el.killsAmt);  
    totalKillsMatches = sessionTotalKillsAmt.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    //Save to LocalStorage for Visor
    localStorage.setItem("suma de kills", totalKillsMatches);
}

function calculateOverall(arr) {
  let sumaKD = arr.reduce(
    function (valorAcumulado = 0, nuevoElemento) {
      return parseInt(valorAcumulado) + parseInt(nuevoElemento);
    }
  );
  let promedioKD = parseFloat(sumaKD) / arr.length;
  return promedioKD;
}

function deleteLastMatch(arr){
  if (Partidas.length >= 1){
    arr.pop();
    redrawTable(arr);
    if (Partidas.length == 0) {
      noMatchesWrapper.classList.add("show-me");
    }
  }
  if (Partidas.length >= 1){
    KDCollection = Partidas.map((el) => el.matchKD);
    overallKD = calculateOverall(KDCollection);
  } else {
    overallKD = 0;
  }
  //Save to LocalStorage for Visor
  localStorage.setItem("overallKD", overallKD);
  
  Toastify({
    text: "Eliminaste la última carga",
    gravity:"bottom",
    duration: 3000
    }).showToast();  
    obtainTotalKills();
    getWinPercentage();
}
  
function filterTop5(arr){
  if (onlyTopFilter.checked){
    const top5matches = arr.filter(match => match.pos <= 5);
    redrawTable(top5matches);
  } else {
    redrawTable(Partidas);
  }
}

function getWinPercentage(totalWinsAmt, amountPlayed){
  totalWins = [];
  for (const partida of Partidas) {
    if (partida.pos === 1) {
      totalWins.push(partida);
    }
  }
  amountPlayed = Partidas.length;
  totalWinsAmt = totalWins.length;
  overallWinRatio = ((totalWinsAmt/amountPlayed)*100).toFixed(2);
  localStorage.setItem('win percentage', overallWinRatio);
  return overallWinRatio;
}

function redrawTable(arr){
  let matchesWrapper = document.getElementById("latest-matches");
  matchesWrapper.innerHTML = ""; //Empty everything to render again

  //now Render Partidas
  
  arr.forEach( (brMatch => {
      loadedMatchesID++;
      let contenedor = document.createElement("div");
      contenedor.className = "match";
      contenedor.id = loadedMatchesID;
      //Definimos el innerHTML del elemento con una plantilla de texto
      contenedor.innerHTML = `<div class="position"> ${brMatch.pos}<sup>to</sup></div>
                              <div class="mode"> ${brMatch.type}</div>
                              <div class="kills">${brMatch.killsAmt} Kills</div>
                              <div class="Gulag">${brMatch.timeStamp}</div>
                              <div class="deaths">${brMatch.deathAmt} Deaths</div>
                              <div class="Match KD"> K/D RATIO ${brMatch.matchKD}</div>`;
      matchesWrapper.append(contenedor);

  }));

  //SAVE TO LOCAL STORAGE HERE: 
  localStorage.setItem("matches", JSON.stringify(Partidas));
}

//Eventos de Btns
const submitMatchBtn = document.getElementById("submitMatch");
const deleteMatchBtn = document.getElementById("deleteMatchBtn");
//const redrawMatchesBtn = document.getElementById("redrawMatchesBtn");
const onlyTopFilter = document.getElementById("onlytop5");
submitMatchBtn.addEventListener("click", loadMatch);
deleteMatchBtn.addEventListener("click", () => deleteLastMatch(Partidas));
//redrawMatchesBtn.addEventListener("click", () => redrawTable(Partidas));
onlyTopFilter.addEventListener("click", () => filterTop5(Partidas));

function openChroma(){
  var winFeature = "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes";
  window.open('visor.html','null',winFeature);
}

