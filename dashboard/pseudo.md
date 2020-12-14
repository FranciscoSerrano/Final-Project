## charts.js pseudocode plan
1. Build init function - what is shown initially
    * Reference a selector (dropdown or other interactable element)
    * Populate the selector based on dataset and filter desires
        * As it stands, a list with first entry being "entire us" and followed by state abbreviations 
    * Use the first sample from the list(s) to build initial plots
    * Build in the results display here? --> potentially its own step, maybe not in this file
        * BLOCKER - Website design plan
        * Results display will also need to include whichever mask transmission graphic applies

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
    * This will need to include conditional for data retrieval differentiating between the US API and the States API if we don't separate them. 

5. Build additional visualizations TBD
