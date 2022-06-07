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

    let totalkillsLocal = localStorage.getItem("suma de kills");
    let killswrapper = document.getElementById("totalKills");
    totalkillsLocal !== null ? killswrapper.innerHTML = totalkillsLocal : killswrapper.innerHTML = "N/A";

    let winpercentageLocal = localStorage.getItem("win percentage");
    let percentagewrapper = document.getElementById("winPercentage");
    totalkillsLocal !== null ? percentagewrapper.innerHTML = winpercentageLocal + "%" : percentagewrapper.innerHTML = "N/A";

}, 6000); 