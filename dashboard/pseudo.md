## charts.js pseudocode plan
1. Build init function - what is shown initially
    * Reference a selector (dropdown or other interactable element)
    * Populate the selector using a list of names for filter criteria (Entire country + 50 states? TBD)
    * Use the first sample from the list(s) (ie: "Entire Country" - TBD) to build initial plots
    * Build in the results display here? --> potentially its own step
        * BLOCKER - Website design 
        * Current thought: Results are stored in the db, so result is pulled from db for dashboard? and placed into a dedicated div at the top of the page
        * Results display will also need to include whichever mask transmission infographic applies

2. Initialize the Dashboard (run the init function)

3. Build the function that will change the charts based on selector value
    * Basically just fetches new data based on selection

4. Create the buildCharts function
    * Use d3 to load/retrieve api data and put that in an array
    * Create a variable that filters the data for the desired subset (ie: a specific state based on the selector - TBD)
    * Create variables that hold applicable keys from data (TBD)
    * Build desired charts
        * Create labels for tick marks, etc as necessary
        * Instantiate the trace
        * Instantiate config for responsiveness
        * Instantiate the layout 
        * Plot the chart

5. Build additional visualizations TBD

## Considerations for the Group
1. Multiple filter options in a panel for multidimensional interactivity
    * Current vs. Historical vs. Both?
    * What fields?
2. Some sort of basic info panel that just lists stats for the selected data?
3. Do we want to try to include racial/ethnic data, even though it is only available as a static dataset?
4. For the results declaration, do we want it incorporated as a heading on the mask transmission infographic or separate?
