/* Generate a grid of plots of a single bbob function */
const func_names = ["Sphere", "Ellipsoid separable", "Rastrigin Separable",
  "Skew-Rastrigin-Bueche", "Linear Slope", "Attractive Sector", "Step-Ellipsoid",
  "Rosenbrock Original", "Rosenbrock Rotated", "Ellipsoid", "Discus", "Bent Cigar",
  "Sharp Ridge", "Sum of Different Powers", "Rastrigin", "Weierstrass",
  "Schaffer F7, Condition 10", "Schaffer F7, Condition 1000", "Griewank-Rosenbrock F8F2",
  "Schwefel x*sin(x)", "Gallagher 101 Peaks", "Gallagher 21 peaks", "Katsuura",
  "Lunacek bi-Rastrigin"];

window.onload=function() {
    const plotGrids = document.getElementsByClassName("plot-grid");
    for (var i = 0; i < plotGrids.length; i++) {
        var plotGrid = plotGrids[i];
        var func = plotGrid.getAttribute("data-num");
        var short = plotGrid.getAttribute("data-short") || "false";
        if (short == "true") {
          var dims = ["2"];
          var valuesTyp = ["level-sets", "heatmap-rank", "cuts-lin-lin"];
        } else {
	        var dims = ["2", "5", "20"];
          var valuesTyp = ["level-sets", "heatmap-rank", "cuts-lin-lin", "cuts-lin-log", "cuts-log-log"];
        }


        plotGrid.innerHTML = ""; // Clear any existing content
        for (var iDim = 0; iDim < dims.length; iDim++) {
            var description = document.createElement("div");
            description.style.width = (100 / dims.length) + "%";
            description.style.textAlign = "center";
            if (short == "true"){
              description.innerText = func_names[func-1] + "; " + dims[iDim] +"-D";
              tmp = description;
              description = document.createElement('a');
              description.style.width= "100%";
              description.href = "/testsuites/bbob/functions/f"+pad(func,2)+".html";
              description.appendChild(tmp);
            }else{
              description.innerText = dims[iDim] + "-D";
            }
            plotGrid.appendChild(description);
        }
        for (var iTyp = 0; iTyp < valuesTyp.length; iTyp++) {
            for (var iDim = 0; iDim < dims.length; iDim++) {
			    var plotName = valuesTyp[iTyp] + "-500/bbob_f" + pad(func, 3) + "_i01_d" + pad(dims[iDim]) + "_" + pad(valuesTyp[iTyp]) + ".png";
			    var plotDiv = document.createElement("div");
			    plotDiv.className = "plot";
          if (short == "true") {
            plotDiv.style.width = (100 / valuesTyp.length) + "%";
          }else{
            plotDiv.style.width = (100 / dims.length) + "%";
          }
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
}
