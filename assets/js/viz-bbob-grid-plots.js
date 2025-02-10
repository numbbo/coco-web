/* Generate a grid of plots of a single bbob function */
window.onload=function() {
    var plotGrid = document.getElementById("plot-grid");
    var func = plotGrid.getAttribute("data-num");
    var short = plotGrid.getAttribute("short") || False;
    if (short){
      var dims = ["2"];
      var valuesTyp = ["level-sets", "heatmap-rank", "cuts-lin-lin"];
    }else{
      var dims = ["2", "5", "20"];
      var valuesTyp = ["level-sets", "heatmap-rank", "cuts-lin-lin", "cuts-lin-log", "cuts-log-log"];
    }
	  
    plotGrid.innerHTML = ""; // Clear any existing content
    for (var iDim = 0; iDim < dims.length; iDim++) {
        var description = document.createElement("div");
        description.style.width = (100 / dims.length) + "%";
        description.style.textAlign = "center";
        description.innerText = dims[iDim] + "-D";
        plotGrid.appendChild(description);
    }
    for (var iTyp = 0; iTyp < valuesTyp.length; iTyp++) {
        for (var iDim = 0; iDim < dims.length; iDim++) {
			var plotName = valuesTyp[iTyp] + "-500/bbob_f" + pad(func, 3) + "_i01_d" + pad(dims[iDim]) + "_" + pad(valuesTyp[iTyp]) + ".png";
			var plotDiv = document.createElement("div");
			plotDiv.className = "plot";
            plotDiv.style.width = (100 / dims.length) + "%";
			var plotImg = document.createElement("img");
			plotImg.setAttribute("src", plotPathBbob + plotName);
            var plotA = document.createElement('a');
            plotA.setAttribute("href", "/testsuites/bbob/viz.html?col=3&dim=" + dims[iDim] + "&fun=" + func + "&ins=all&typ=" + valuesTyp[iTyp]);
            plotA.appendChild(plotImg);
            plotDiv.appendChild(plotA);
			plotGrid.appendChild(plotDiv);
		}
    }
}
