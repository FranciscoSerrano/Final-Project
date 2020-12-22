// Build init function 
function init() {

    //Build locations array
    d3.json("locations.json").then((locations) => { 

        // Grab a reference to the dropdown select element
        // * Make sure the selector will work inside this function
        //var selector = d3.select("#selDataset");
    
        // Instantiate list of options for the selector
        // * Change this to full names instead of abbreviations
        // * Might need to move into the previous code block 
        // * Finalize how we're going to toggle between National and State data
        //var stateNames = ["Entire U.S", "AL","AK","AZ","AR","CA","CO","CT","DE","DC",
            //"FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT",
            //"NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
            //"VT","VA","WA","WV","WI","WY"
        //];

        //Run usCharts and pass in the locations object
        usCharts(locations);
        // Use the first option from the lists to build the initial plots
        //var initCharts = stateNames[0];
        //buildCharts(initCharts);
    });
};

// Initialize Dashboard
init();

// Build optionChanged function - parameter likely to change based on what we decide for filters
//function optionChanged(newState) {
    // If we have an info panel it will be inserted here (aka buildInfo(newSelection);)
    //Conditional: If newState = "Entire US" usCharts(newState), else stateCharts(newState)
//}

// If we decide to include an info panel, fxn to build it goes here

// Build Charts Function
function usCharts(locations) {
    // Declare arrays from locations data
    var stateNames = [];
    var stateLat = [];
    var stateLong = [];    

    // Loop through locations to fill arrays
    for (i in locations) {
        // Access and save properties
        let names = locations[i].name;
        let lat = locations[i].latitude;
        let long = locations[i].longitude

        // Push properties to their arrays
        stateNames.push(names);
        stateLat.push(lat);
        stateLong.push(long);
    };
    console.log(locations);
    // Use d3 to retrieve API data
    d3.json("https://api.covidtracking.com/v1/us/daily.json").then((data) => {
        
        // Create arrays to hold data of interest for the chart X values
        var date = [];
        var positive = [];
        var positiveDelta = [];
        var negative = [];
        var negativeDelta = [];
        var totalResults = [];
        var currHospital = [];
        var cumHospital = [];
        
        // Loop through the data set to fill Covid arrays
        for (let i in data) {

            // Create date object array
            let str = data[i].date.toString();
            let month = str.slice(4,6);
            let day = str.slice(6,);
            let year = str.slice(0,4);
            let fDate = new Date(year, (month-1), day).toLocaleDateString()
            date.push(fDate);

            // Create cumulative positive results array
            let totPos = data[i].positive;
            positive.push(totPos);

            // Create positive delta array
            let pos = data[i].positiveIncrease;
            positiveDelta.push(pos);
            
            // Create cumulatve negative results array
            let totNeg = data[i].negative;
            negative.push(totNeg);

            //Create negative delta array
            let neg = data[i].negativeIncrease;
            negativeDelta.push(neg);

            // Create cumulative  total results array
            let tot = data[i].totalTestResultsIncrease;
            totalResults.push(tot);

            // Create current hospital total
            let curr = data[i].hospitalizedCurrently;
            currHospital.push(curr);

            // Create cumulative hospital total
            let cum = data[i].hospitalizedCumulative;
            cumHospital.push(cum);
        };

        // US Map - Scatter of Hospital vs. ICU vs. Ventilator
        
        // Define hoverText
        var hoverText = [];

        for (i in stateNames, currHospital) {
            var currentText = stateNames[i] + "\nCurrent Hospitalizations: " + currHospital[i];
            hoverText.push(currentText); 
        };
        console.log(stateLong)
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
                size: currHospital, 
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
            title: "US Hospitalization Rates by State",
            colorbar: true,
            geo: {
                scope: 'usa',
                projection: { type: 'albers usa'},
            },
            showland: true,
            // landcolor: set default color probably grey or white but based on colorscale,
            // paper_bgcolor: '#EAEAEA',
            // plot_bgcolor: '#EAEAEA',
            // hovermode: unsure if necessary
        };

        var config = {responsive: true};
        Plotly.newPlot('CHARTDIV2', data, layout, config);
});
};    

// We need to be sure to add a "Last Updated" note at the bottom of the page, which can be filled via a ref to the API's "dateChecked" field