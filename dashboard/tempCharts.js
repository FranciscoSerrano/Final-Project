// Build init function 
function init() {

    // * Locations may need to move to the stateCharts function, TBD
    // Build locations array to pass into later functions
     

        // Grab a reference to the dropdown select element
        // * Make sure the selector will work inside this function
        //var selector = d3.select("#selDataset");
    
        // Instantiate list of options for the selector

        // Use the first option from the lists to build the initial plots
        //var initCharts = stateNames[0];
        //buildCharts(initCharts);

        // FOR TESTING: Run usCharts 
        stateCharts();
};

// Initialize Dashboard
init();

// Build stateCharts Function
function stateCharts() {
    d3.json("locations.json").then((locations) => {
        // Declare arrays from locations data
        var stateNames = [];
        var stateLat = [];
        var stateLong = [];    
        var statePop = [];

        // Loop through locations to fill arrays
        for (i in locations) {
            // Access and save properties
            let names = locations[i].name;
            let lat = locations[i].lat;
            let long = locations[i].long;
            let pop = locations[i].pop;
            
            // Push properties to their arrays
            stateNames.push(names);
            stateLat.push(lat);
            stateLong.push(long);
            statePop.push(pop);
        };
        
        // Use d3 to retrieve API data
        d3.json("https://api.covidtracking.com/v1/states/current.json").then((data) => {
        
            // Create arrays to hold data of interest for the chart X values
            var stateDate = [];
            var statePositive = [];
            var statePositiveDelta = [];
            var stateNegative = [];
            var stateNegativeDelta = [];
            var stateTotalResults = [];
            var stateCurrHospital = [];
            var stateCumHospital = [];

            // Set Scale
            var scale = 100  
            
            // Loop through the data set to fill arrays
            for (let i in data) {
                
                var tempName = data[i].state;

                // Skip territories and DC
                if (tempName == "AS" || tempName == "GU" || tempName == "MP" || tempName == "PR" || tempName == "VI") {
                    console.log('Skipped Territory ' + tempName)
                }
                else {
                    // Create date object array
                    let str = data[i].date.toString();
                    let month = str.slice(4,6);
                    let day = str.slice(6,);
                    let year = str.slice(0,4);
                    let fDate = new Date(year, (month-1), day).toLocaleDateString()
                    stateDate.push(fDate);

                    // Create cumulative positive results array
                    let totPos = data[i].positive;
                    statePositive.push(totPos);

                    // Create positive delta array
                    let pos = data[i].positiveIncrease;
                    statePositiveDelta.push(pos);
                    
                    // Create cumulatve negative results array
                    let totNeg = data[i].negativeTestsViral;
                    stateNegative.push(totNeg);

                    //Create negative delta array
                    let neg = data[i].negativeIncrease;
                    stateNegativeDelta.push(neg);

                    // Create cumulative  total results array
                    let tot = data[i].totalTestResultsIncrease
                    stateTotalResults.push(tot);

                    // Create current hospital total
                    let curr = (data[i].hospitalizedCurrently);
                    stateCurrHospital.push(curr);
                    
                    // Create cumulative hospital total
                    let cum = data[i].hospitalizedCumulative;
                    stateCumHospital.push(cum);
                    
                    // Calculate curr. hospital proportion
                    var hospitalRatio = new Array(stateCurrHospital.length)
                    for(i=0; i<stateCurrHospital.length; i++) {
                        hospitalRatio[i] = (stateCurrHospital[i] / statePop[i]) *100;
                    }
                    
                    // POTENTIALLY: Add info for hospital delta
                    // POTENTIALLY: Add info for ventilator and ICU curr vs. cum. and deltas
                }    
            };

            // US Map - Scatter of Current Hospital Rates
            // Add selector for vs. ICU vs. Ventilator
            
            // Define hoverText
            var hoverText = [];

            for (i in stateNames, stateCurrHospital) {
                var currentText = stateNames[i] + "<br>Current Hospitalizations: " + stateCurrHospital[i];
                hoverText.push(currentText); 
            };
            
            // Define data trace
            // Define characteristics - marker size
            var marksize = [];
            for (i in hospitalRatio) {
                var ratio = hospitalRatio[i] * 500
                marksize.push(ratio);
            };

            // Define characteristics - color scale
            var minColor = Math.min.apply(Math, hospitalRatio)
            var maxColor = Math.max.apply(Math, hospitalRatio);

            var data = [{
                type: 'scattergeo',
                locationmode: 'USA-states',
                lon: stateLong,
                lat: stateLat,
                hoverinfo: 'text',
                text: hoverText,
                mode: 'markers',
                marker: {
                    symbol: 'circle',
                    size: marksize,
                    opacity: 0.8,
                    color: hospitalRatio,
                    colorscale: 'Jet',
                    cmin: minColor,
                    cmax: maxColor,
                    showscale: true,
                }
            }];

            var layout = {
                title: "Current US Hospitalizations by State",
                colorbar: true,
                geo: {
                    
                    scope: 'usa',
                    projection: { type: 'albers usa'},
                },
                landcolor: '#EAEAEA',
                paper_bgcolor: '#EAEAEA',
                plot_bgcolor: '#EAEAEA',
            };

            var config = {
                scale: 0.5,
                responsive: true};
            
            Plotly.newPlot('CHARTDIV2', data, layout, config);
            // https://code.tutsplus.com/tutorials/create-interactive-charts-using-plotlyjs-bubble-and-dot-charts--cms-29209
            // https://towardsdatascience.com/visualization-with-plotly-express-comprehensive-guide-eb5ee4b50b57
            // https://nodepit.com/node/org.knime.dynamic.js.v30.DynamicJSNodeFactory%23Bubble%20Chart%20(Plotly)
            // https://plotly.com/javascript/bubble-charts/#marker-size-on-bubble-charts
            // https://plotly.com/javascript/bubble-maps/
            // https://plotly.com/javascript/map-animations/
            // https://plotly.com/javascript/gapminder-example/                                         
        });
    },
    console.log("Loaded!"));
};