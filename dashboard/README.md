## Dashboard 
This directory will house all testing and in progress work for the dashboard while in development. It includes the charts file, a test index to view progress, and planning documents. 

### Goals
* Create a clean, interesting, and engaging set of visualizations to educate about statistics and facts regarding COVID 19
* Utilize new tools, or new aspects of known tools, to push our own boundaries
* Build something beautiful

### Data Sources
Much of our data will be retrieved using <a href="https://covidtracking.com/data/api">The COVID Tracking Project's</a> collection of APIs. Additional data for infographics and mask information will be cited as individual sources. They are currently being compiled below, but will eventually live in their own document, as well as on the final product. 

### Viz Planning and Ideas
* US map bubble chart for current hospitalizations
    * Seen this done with tableau, lets explore other options
    * Limited interactivity - some sort of tooltip/infobox 
    * Could feasibly be "filterable" based on date/month
    * Leaflet.js?

* Line Chart - positive tests/cumulative cases over time
    * Potential to filter for a state? Region (based on US Census)?

* Something for critical/severe cases vs "regular" cases

* Chord diagram w/ hierarchical edge bundling - US Death Rate
    * States around the edge bundling into the middle with chord size relative to contribution to overall rate
    * Requires normalization - per 100,000? per million?
    * Potentially use YLL instead? More unique for sure 
    * Any rate information requires me to code calculations (this is fine, just a note)

* Stacked Bar - positive/negative out of the overall number
    * X Option 1: Time series, filterable by state
    * X Option 2: State, filterable by time (day, week, month)

* Network diagram - transmission 'explosion'
    * Could be more useful to make this with the infographic website, rather than sigma (TBD)

* Mask vs Unmasked Infographic to go with results declaration 
    * Should we show only the optimal N-95 masks? Show homemade/cloth masks?
    * Laser refraction analysis of droplets shows that bandanas reduce droplet emission by almost 50% while homemade cloth masks can reduce droplet count by up to 80%. Surgical masks reduce droplet emission by up to 96%. - (Fischer, Emma P., et al. “Low-Cost Measurement of Face Mask Efficacy for Filtering Expelled Droplets during Speech.” Science Advances, vol. 6, no. 36, 2020, doi:10.1126/sciadv.abd3083.) NOTE: This is based on droplet counts
    * Based on METHODS, adoption of a universal face mask, even a homemade one that only offers 5% protection/containment would reduce total deaths by 3-5%. If that is coupled with targetted distribution of surgical masks for the elderly and symptomatic, the effect at least doubles. (Worby, C.J., Chang, HH. Face mask use in the general population and optimal resource allocation during the COVID-19 pandemic. Nat Commun 11, 4049 (2020). https://doi.org/10.1038/s41467-020-17922-x)
    * The above statistics are the basis for the mask infographic, but will need to be couched in very specific language to avoid misrepresentation

* Color Scales
    * Built in: "Picnic"
    * Custom:
        * Start: #fb0279 (251, 2, 121)
        * Middle: #a5358d  (165, 53, 141)
        * End: #5d5e9e (93, 94, 158)
