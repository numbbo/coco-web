/* Url to the plots */
plotPathBbob = "https://raw.githubusercontent.com/numbbo/bbob-plots/main/bbob/"
plotPathBiobj = "https://raw.githubusercontent.com/numbbo/bbob-biobj-plots/gh-pages/plots_currData_Sep2020/"

/* Display number with leading zeros */
function pad(num, size=2) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

