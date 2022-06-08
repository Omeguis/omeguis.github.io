//Read from localstorage
let visorOverallKD = localStorage.getItem("overallKD");
    let kdwrapper = document.getElementById("globalKD");

    if (visorOverallKD !== null) {
        kdwrapper.innerHTML = visorOverallKD;
    }
    

    let totalkillsLocal = localStorage.getItem("suma de kills");
    let killswrapper = document.getElementById("totalKills");
    if (totalkillsLocal !== null) {
        killswrapper.innerHTML = totalkillsLocal;
    }

setInterval(function() {
    let visorOverallKD = localStorage.getItem("overallKD");
    let kdwrapper = document.getElementById("globalKD");
    visorOverallKD !== null ? kdwrapper.innerHTML = visorOverallKD : kdwrapper.innerHTML = "N/A";
    kdwrapper.innerHTML = kdwrapper.innerHTML.substring(0,5);

    let totalkillsLocal = localStorage.getItem("suma de kills");
    let killswrapper = document.getElementById("totalKills");
    totalkillsLocal !== null ? killswrapper.innerHTML = totalkillsLocal : killswrapper.innerHTML = "N/A";

    let winpercentageLocal = localStorage.getItem("win percentage");
    let percentagewrapper = document.getElementById("winPercentage");
    totalkillsLocal !== null ? percentagewrapper.innerHTML = winpercentageLocal + "%" : percentagewrapper.innerHTML = "N/A";

}, 6000); 


//Eventos de Btns

const colorPickerSelectBtop = document.getElementById("colorpickerbtop");
const colorPickerSelectBbottom = document.getElementById("colorpickerbbottom");
const colorPickerSelectBgrid = document.getElementById("colorpickergrid");

colorPickerSelectBtop.addEventListener("input", selectColorBtop);
colorPickerSelectBbottom.addEventListener("input", selectColorBbottom);
colorPickerSelectBgrid.addEventListener("input", selectColorGrid);

let borderTopElement = document.getElementById('supBorder');
let borderBottomElement = document.getElementById('bottomBorder');
let borderBottomElementO = document.getElementById('first-cell');
let borderBottomElementT = document.getElementById('second-cell');
let borderBottomElementTh = document.getElementById('third-cell');

function selectColorBtop(){
    let selectedColor = colorPickerSelectBtop.value;
    borderTopElement.style.cssText = `background-color: ${selectedColor}`;
}

function selectColorBbottom(){
    let selectedColor = colorPickerSelectBbottom.value;
    borderBottomElement.style.cssText = `background-color: ${selectedColor}`;
}

function selectColorGrid(){
    let selectedColor = colorPickerSelectBgrid.value;
    borderBottomElementO.style.cssText = `background-color: ${selectedColor}`;
    borderBottomElementT.style.cssText = `background-color: ${selectedColor}`;
    borderBottomElementTh.style.cssText = `background-color: ${selectedColor}`;
}



