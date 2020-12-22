// Build init function 
function init() {

    //Build locations array
    d3.json("locations.json").then((locations) => {
        var stateNames = [];
        var stateLat = [];
        var stateLong = [];

        for (let i in locations) {
            let name = locations[i].name;
            let lat = locations[i].lat;
            let long = locations[i].long;

            stateNames.push(name);
            stateLat.push(lat);
            stateLong.push(long);
        };
    });

    //Run usCharts and pass in the locations object
    usCharts(locations);

    // Grab a reference to the dropdown select element
    //var selector = d3.select("#selDataset");
  
    // Instantiate list of options for the selector
    // * Change this to full names instead of abbreviations
    // * Can just use stateNames from above, but have to figure out how to add entire us  
    //var stateNames = ["Entire U.S", "AL","AK","AZ","AR","CA","CO","CT","DE","DC",
        //"FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT",
        //"NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
        //"VT","VA","WA","WV","WI","WY"
    //];

    // Use the first option from the lists to build the initial plots
    //var initCharts = stateNames[0];
    //buildCharts(initCharts);
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

        // Positive Tests Time Series
        // Create yticks objects

        // Create Trace        
        var posTrace = {
            x: date,
            y: positiveDelta,
            name: 'Positive Tests',
            type: 'scatter'
        };
        
        var resultsTrace = [posTrace];
        
        // Create layout
        
        // Use plotly to plot with the applicable data, layout, etc. 
        Plotly.newPlot('line', resultsTrace); 

        // US Map - Scatter of Hospital vs. ICU vs. Ventilator
        var data = [{
            type: 'scattergeo',
            locationmode: 'USA-states',
            lon: stateLong,
            lat: stateLat,
            // hoverinfor: hospital rates or whatever we decide to show, 
            text: stateNames,
            mode: 'markers',
            marker: {
                symbol: 'circle',
                //size: figure out how to use sizeref, 
                opacity: 0.8,
                //color: color or array of colors (cmin/mid/max or colorscale?) base on sizeref;
                showscale: true,
            }
            //textfont: {
                //size: define size,
                //color: if it needs to change based on the color scale
            //}
        }];
        console.log(stateLong);

        var layout = [{
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
        }];
        Plotly.newPlot('CHARTDIV2', data, layout);
})};    

// We need to be sure to add a "Last Updated" note at the bottom of the page, which can be filled via a ref to the API's "dateChecked" field