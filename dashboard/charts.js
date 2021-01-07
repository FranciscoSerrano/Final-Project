// Build init function 
function init() {

    // * Locations may need to move to the stateCharts function, TBD
    // Build locations array to pass into later functions
    d3.json("locations.json").then((locations) => { 

        // Grab a reference to the dropdown select element
        // * Make sure the selector will work inside this function
        //var selector = d3.select("#selDataset");
    
        // Instantiate list of options for the selector

        // Use the first option from the lists to build the initial plots
        //var initCharts = stateNames[0];
        //buildCharts(initCharts);

        // FOR TESTING: Run usCharts 
        usCharts();
    });
};

// Initialize Dashboard
init();

// Build optionChanged function - parameter likely to change based on what we decide for filters
//function optionChanged(newState) {
    //Conditional: If newState = "Entire US" usCharts(newState), else stateCharts(newState)
//}

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
        var currICU = [];
        var currVent = [];
        var recovered = [];

        // Loop through the data set to fill Covid arrays
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

              // Create current ICU total
              let icu = data[i].inIcuCurrently
              currICU.push(icu);

              // Create current ventilator total
              let vent = data[i].onVentilatorCurrently;
              currVent.push(vent);

              // Create cumulative recovered total
              let rec = data[i].recovered;
              recovered.push(rec);
            }
        };
        
        // Transform arrays into ascending date order
        date.reverse();
        positive.reverse();
        positiveDelta.reverse();
        negative.reverse();
        negativeDelta.reverse();
        totalResults.reverse();
        currHospital.reverse();
        currICU.reverse(),
        currVent.reverse();
        recovered.reverse();
        
        // Total Cases vs. Recovered Cases Time Series
        // Notes to Self: Double check data integrity and change to curr Hosp/icu/ventilator triple line? Or maybe just acknowledge in statement.
        // Define frames
        var n = date.length;
        var frames = [];

        for (var i = 0; i < n; i++) {
            frames[i] = {data: [
                {x: [], y: []}, 
                {x:[], y: []}
            ]};
            frames[i].data[0].x = date.slice(0, (i)+1);
            frames[i].data[0].y = recovered.slice(0, (i)+1);
            frames[i].data[1].x = date.slice(0, (i)+1);
            frames[i].data[1].y = positive.slice(0,(i)+1);
        }
       
        // Define "Recovered" Trace
        var trace1 = {
            type: 'scatter',
            mode: 'lines',
            name: 'Recovered Cases',
            x: frames[30].data[0].x, 
            y: frames[30].data[0].y,
            line: {color: ' lightgrey'}
        }
        
        // Define "Total Cases" Trace
        var trace2 = {
            type: 'scatter',
            mode: 'lines',
            name: 'Total Cases',
            fill: 'tonexty',
            x: frames[30].data[1].x, 
            y: frames[30].data[1].y,
            line: {color: 'grey'}
        }

        // Create data object
        var data = [trace1, trace2];

        // Define Layout
        var xrange = [frames[n-1].data[0].x[0], frames[n-1].data[0].x[n-1]];
        var yrange = [frames[n-1].data[1].y[0], ((frames[n-1].data[1].y[n-1]) + 2000000)];

        var layout = {
            title: 'Total Cases vs. Recoveredgit  Cases in the US',
            xaxis: {
                title: 'Date',
                range: xrange,
                //type: 'date',
                //autorange: true,
                showgrid: false
            },
            yaxis: {  
                title: 'Number of Cases',
                range: yrange,
                rangemode: 'nonnegative',
                //autorange: true,
                showgrid: false
            },
            legend: {
                orientation:'h',
                x: 0.5,
                y: 1.2,
                xanchor: 'center'
            },
            updatemenus: [{
                x: 0.5,
                y: 0,
                yanchor: "top",
                xanchor: "center",
                showactive: false,
                direction: "left",
                type: "buttons",
                buttons: [{
                  method: "animate",
                  args: [null, {
                    fromcurrent: true,
                    transition: {
                      duration: 0,
                    },
                    frame: {
                      duration: 40,
                      redraw: false
                    }
                  }],
                  label: "Play" }, 
                  {
                  method: "animate",
                  args: [
                    [null],
                    {
                      mode: "immediate",
                      transition: {
                        duration: 0
                      },
                      frame: {
                        duration: 0,
                        redraw: false
                      }
                    }
                  ],
                  label: "Pause"
                }]
            }]
        };
        Plotly.newPlot('card long', data, layout).then(function() {
            Plotly.addFrames('card long', frames);
        });
    });
};    

// We need to be sure to add a "Last Updated" note at the bottom of the page, which can be filled via a ref to the API's "dateChecked" field
