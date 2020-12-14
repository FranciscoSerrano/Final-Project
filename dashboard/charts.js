// Build init function 
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Instantiate list of options for the selector
    var stateNames = ["Entire U.S", "AL","AK","AZ","AR","CA","CO","CT","DE","DC",
        "FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT",
        "NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
        "VT","VA","WA","WV","WI","WY"
    ];

    // Use the first option from the lists to build the initial plots
    var initCharts = stateNames[0];
    buildCharts(initCharts);
}

// Initialize Dashboard
init();

// Build optionChanged function - parameter likely to change based on what we decide for filters
function optionChanged(newState) {
    // If we have an info panel it will be inserted here (aka buildInfo(newSelection);)
    //Conditional: If newState = "Entire US" usCharts(newState), else stateCharts(newState)
}

// If we decide to include an info panel, fxn to build it goes here

// Build Charts Function
function usCharts(state) {
    
    // Use d3 to retrieve API data
    d3.json("https://api.covidtracking.com/v1/us/daily.json").then((data) => {
    
    // Create variables to hold data of interest for the chart X values

    // Create yticks objects

    // Create traces 

    // Create layouts

    // Use plotly to plot with the applicable data, layout, etc. 

})}; 

// Build Charts Function
function stateCharts(state) {

    // Use d3 to retrieve API data
    s3.json("https://api.covidtracking.com/v1/states/daily.json").then((data) => {
    // Create variables to hold data of interest for the chart X values

    // Create yticks objects

    // Create traces 

    // Create layouts

    // Use plotly to plot with the applicable data, layout, etc. 

})};
