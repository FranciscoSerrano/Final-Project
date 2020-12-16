// Build init function 
function init() {
    usCharts();
    // Grab a reference to the dropdown select element
    //var selector = d3.select("#selDataset");
  
    // Instantiate list of options for the selector
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
function usCharts() {
    
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
        
        // Loop through the data set to fill arrays
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

            // POTENTIALLY: Add info for hospital delta
            // POTENTIALLY: Add info for ventilator and ICU curr vs. cum. and deltas
        };

        // Stacked Positive and Negative Results Bar Chart
        // Create yticks objects

        // Create Trace
        var negTrace = {
            x: date,
            y: negative,
            name: 'Negative Tests',
            type: 'scatter'
        };
        
        var posTrace = {
            x: date,
            y: positiveDelta,
            name: 'Positive Tests',
            type: 'scatter'
        };
        
        var resultsTrace = [posTrace];
        
        // Create layout
        //var layout = { barmode: 'stack'};

        // Use plotly to plot with the applicable data, layout, etc. 
        Plotly.newPlot('line', resultsTrace);    
})}; 

// Build stateCharts Function
function stateCharts(state) {

    // Use d3 to retrieve API data
    s3.json("https://api.covidtracking.com/v1/states/daily.json").then((data) => {
    
        // Create arrays to hold data of interest for the chart X values
        var stateDate = [];
        var statePositive = [];
        var statePositiveDelta = [];
        var stateNegative = [];
        var stateNegativeDelta = [];
        var stateTotalResults = [];
        var stateCurrHospital = [];
        var stateCumHospital = [];
        
        // Loop through the data set to fill arrays
        for (let i in data) {

            // Create date object array
            let str = data[i].date.toString();
            let month = str.slice(4,6);
            let day = str.slice(6,);
            let year = str.slice(0,4);
            let fDate = new Date(year, (month-1), day).toLocaleDateString()
            stateDate.push(fDate);

            // Create cumulative positive results array
            let totPos = data[i].positiveTestsViral;
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
            let tot = data[i].totalTestResultsIncrease;
            stateTotalResults.push(tot);

            // Create current hospital total
            let curr = data[i].hospitalizedCurrently;
            stateCurrHospital.push(curr);

            // Create cumulative hospital total
            let cum = data[i].hospitalizedCumulative;
            stateCumHospital.push(cum);
        };
    // Create yticks objects

    // Create traces 

    // Create layouts

    // Use plotly to plot with the applicable data, layout, etc. 

})};

// We need to be sure to add a "Last Updated" note at the bottom of the page, which can be filled via a ref to the API's "dateChecked" field