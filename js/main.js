// Declare constants
const FRAME_HEIGHT = 300;
const FRAME_WIDTH = 300;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40}

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

// Frame1: scatter plot for length
const FRAME1 = d3.select("#length") 
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "scattor-length"); 

function scattor_length_plot(){
	d3.csv("data/iris.csv").then((data) => {

		// scale functions
		const X_SCALE = d3.scaleLinear()
							.domain([0, (d3.max(data, (d) => {return d.Petal_Length})) + 1])
							.range([0, VIS_WIDTH]); 

		const Y_SCALE = d3.scaleLinear()
							.domain([0, (d3.max(data, (d) => {return d.Sepal_Length})) + 1])
							.range([VIS_WIDTH, 0]);

		// create data points
		FRAME1.selectAll("points")
				.data(data)
				.enter()
				.append("circle")
					.attr('cx', (d) => {
						return (X_SCALE(d.Petal_Length) + MARGINS.left)
					})
					.attr("cy", (d) => {
						return (Y_SCALE(d.Sepal_Length) + MARGINS.top)
					})
					.attr("r", 6)
					.attr('class', 'point');

		// create x and y axes
		FRAME1.append("g")
				.attr('transform', 'translate(' + MARGINS.left + "," + 
					(VIS_HEIGHT + MARGINS.top) + ')')
				.call(d3.axisBottom(X_SCALE).ticks(10))
					.attr('font-size', "15px");

		FRAME1.append("g")
				.attr('transform', 'translate(' + MARGINS.top + "," + 
					  MARGINS.left + ')')
				.call(d3.axisLeft(Y_SCALE).ticks(10))
					.attr('font-size', "15px");

		FRAME1.append("text")
			    .attr("x", FRAME_WIDTH / 2 )
			    .attr("y", MARGINS.top / 2)
			    .style("text-anchor", "middle")
			    .text("Petal_Length vs. Sepal_Length");

	})
}

scattor_length_plot();

// Frame2: scatter plot for width
const FRAME2 = d3.select('#width')
		          		.append('svg')
		            		.attr('height', FRAME_HEIGHT)
		            		.attr('width', FRAME_WIDTH)
		            		.attr('class', 'scattor-width');

function scattor_width_plot(){
	d3.csv("data/iris.csv").then((data) => {

		// scale functions
		const X_SCALE2 = d3.scaleLinear()
							.domain([0, (d3.max(data, (d) => {return d.Petal_Width})) + 1])
							.range([0, VIS_WIDTH]); 

		const Y_SCALE2 = d3.scaleLinear()
							.domain([0, (d3.max(data, (d) => {return d.Sepal_Width})) + 1])
							.range([VIS_WIDTH, 0]);

		// create data points
		FRAME2.selectAll("points")
				.data(data)
				.enter()
				.append("circle")
					.attr('cx', (d) => {
						return (X_SCALE(d.Petal_Width) + MARGINS.left)
					})
					.attr("cy", (d) => {
						return (Y_SCALE(d.Sepal_Width) + MARGINS.top)
					})
					.attr("r", 6)
					.attr('class', 'point');

		// create x and y axes
		FRAME2.append("g")
				.attr('transform', 'translate(' + MARGINS.left + "," + 
					(VIS_HEIGHT + MARGINS.top) + ')')
				.call(d3.axisBottom(X_SCALE2).ticks(10))
					.attr('font-size', "15px");

		FRAME2.append("g")
				.attr('transform', 'translate(' + MARGINS.top + "," + 
					  MARGINS.left + ')')
				.call(d3.axisLeft(Y_SCALE2).ticks(10))
					.attr('font-size', "15px");

		FRAME2.append("text")
			    .attr("x", FRAME_WIDTH / 2 )
			    .attr("y", MARGINS.top / 2)
			    .style("text-anchor", "middle")
			    .text("Petal_Width vs. Sepal_Width");

	})
}

scattor_width_plot();

// Frame3: bar chart for species count
const FRAME3 = d3.select('#bar')
		          		.append('svg')
		            		.attr('height', FRAME_HEIGHT)
		            		.attr('width', FRAME_WIDTH)
		            		.attr('class', 'bar-chart');

function bar_plot() {
	d3.csv('data/iris.csv').then((data) => {

		// scale functions
		const X_SCALE3 = d3.scaleBand()
							.domain(data.map((d) => {return d.Species}))
		  					.range([0, VIS_WIDTH])
		  					.padding(0.2);

		const Y_SCALE3 = d3.scaleLinear()
		            		.domain([0, 60])
		            		.range([VIS_HEIGHT, 0]);

		// create bar rectangles
		FRAME3.selectAll('bars')
		      	.data(data)
			    .enter()
			    .append('rect')
			        .attr('x', (d) => {
			          return (X_SCALE3(d.Species) + MARGINS.top)})
			        .attr('y', (d) => {
			          return (Y_SCALE3(50) + MARGINS.left)})
			        .attr('width', X_SCALE3.bandwidth())
			        .attr('height', (d) => {
			          return (VIS_HEIGHT - Y_SCALE3(50))})
			        .attr('class', 'bar');

		// create x and y axes
		FRAME3.append("g")
				.attr('transform', 'translate(' + MARGINS.left + "," + 
						(VIS_HEIGHT + MARGINS.top) + ')')
				.call(d3.axisBottom(X_SCALE3).ticks(10))
						.attr('font-size', "15px");

		FRAME3.append("g")
				.attr('transform', 'translate(' + MARGINS.top + "," + 
						MARGINS.left + ')')
				.call(d3.axisLeft(Y_SCALE3).ticks(10))
						.attr('font-size', "15px");

		FRAME3.append("text")
			    .attr("x", FRAME_WIDTH / 2 )
			    .attr("y", MARGINS.top / 2)
			    .style("text-anchor", "middle")
			    .text("Counts of Sepecies");
	})
}

// Group the data by species
		// const nestedData = d3.nest()
		    					// .key(function(d) { return d.species; })
		    					// .entries(data);

		  // Count the number of items in each group
		// const countedData = nestedData.map(function(d) {
			// return {
		      // species: d.key,
		      // count: d3.sum(d.values, function(v) { return v.count; });
bar_plot();
