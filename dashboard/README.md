## Dashboard 
### Goals
* Create a clean, interesting, and engaging set of visualizations to educate about statistics and facts regarding COVID 19
* Utilize new tools, or new aspects of known tools, to push our own boundaries
* Build something beautiful

### Data Sources
Much of our data will be retrieved using The COVID Tracking Project's collection of APIs. Additional data for inforgraphics and mask information will be cited as individual sources. They are currently being compiled below, but will eventually live in their own document, as well as on the final product. 

### Viz Planning and Ideas
* US map bubble chart for current hospitalizations
    * Seen this done with tableau, lets explore other options
    * Limited interactivity - some sort of tooltip/infobox 
    * Could feasibly be "filterable" based on date/month

* Line Chart - positive tests/cumulative cases over time
    * Potential to filter for a state? Region (based on US Census)

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
    * Additional research TBD (sources procured, just need to read them)