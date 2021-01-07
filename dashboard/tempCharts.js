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

        // Loop through locations to fill arrays
        for (i in locations) {
            // Access and save properties
            let names = locations[i].name;
            let lat = locations[i].lat;
            let long = locations[i].long;
            
            // Push properties to their arrays
            stateNames.push(names);
            stateLat.push(lat);
            stateLong.push(long);
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
            console.log(stateCurrHospital)
            // Define data trace
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
                    size: stateCurrHospital,
                    sizeref: 10,
                    sizemin: 0,
                    sizemode: 'area',
                    opacity: 0.8,
                    colorscale: 'picnic',
                    showscale: true,
                }
                //textfont: {
                    //size: define size,
                    //color: if it needs to change based on the color scale
                //}
            }];

            var layout = {
                title: "Current US Hospitalizations by State",
                colorbar: true,
                geo: {
                    scope: 'usa',
                    projection: { type: 'albers usa'},
                },
                showland: true,
                // landcolor: set default color probably grey or white but based on colorscale,
                paper_bgcolor: '#EAEAEA',
                plot_bgcolor: '#EAEAEA',
                // hovermode: unsure if necessary
            };

            var config = {responsive: true};
            
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