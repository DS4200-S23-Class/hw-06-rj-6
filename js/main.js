// Declare constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 70, right: 70, top: 70, bottom: 70};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;


// Frame1: scatter plot for length
const FRAME1 = d3.select("#length") 
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "scattor-length");

// Frame2: scatter plot for width
const FRAME2 = d3.select('#width')
		          		.append('svg')
		            		.attr('height', FRAME_HEIGHT)
		            		.attr('width', FRAME_WIDTH)
		            		.attr('class', 'scattor-width');

// Frame3: bar chart for species count
const FRAME3 = d3.select('#bar')
		          		.append('svg')
		            		.attr('height', FRAME_HEIGHT)
		            		.attr('width', FRAME_WIDTH)
		            		.attr('class', 'bar-chart');

d3.csv("data/iris.csv").then((data) => {

	MAX_X = d3.max(data, (d) => {return parseInt(d.Sepal_Length)});
	MAX_Y = d3.max(data, (d) => {return parseInt(d.Petal_Length)});

	// scale functions
	const X_SCALE = d3.scaleLinear()
						.domain([0, MAX_X + 1])
						.range([0, VIS_WIDTH]);

	const Y_SCALE = d3.scaleLinear()
						.domain([0, MAX_Y + 1])
						.range([VIS_HEIGHT, 0]);

	// create data points
	FRAME1.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr('cx', (d) => {
					return (X_SCALE(d.Sepal_Length) + MARGINS.left)
				})
				.attr("cy", (d) => {
					return (Y_SCALE(d.Petal_Length) + MARGINS.top)
				})
				.attr("r", 6)
				.attr('class', (d) => {return d.Species})
					.classed("eachpoint1", true);

	// create x and y axes
	FRAME1.append("g")
			.attr('transform', 'translate(' + MARGINS.left + "," + 
				(VIS_HEIGHT + MARGINS.top) + ')')
			.call(d3.axisBottom(X_SCALE).ticks(10))
				.attr('font-size', "12px");

	FRAME1.append("g")
			.attr('transform', 'translate(' + MARGINS.top + "," + 
				  MARGINS.left + ')')
			.call(d3.axisLeft(Y_SCALE).ticks(10))
				.attr('font-size', "12px");

	MAX_X2 = d3.max(data, (d) => {return parseInt(d.Sepal_Width)});
	MAX_Y2 = d3.max(data, (d) => {return parseInt(d.Petal_Width)});

	// scale functions
	const X_SCALE2 = d3.scaleLinear()
							.domain([0, MAX_X2 + 1])
							.range([0, VIS_WIDTH]); 

	const Y_SCALE2 = d3.scaleLinear()
							.domain([0, MAX_Y2 + 1])
							.range([VIS_HEIGHT, 0]);

	// create data points
	FRAME2.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr('cx', (d) => {
					return (X_SCALE2(d.Sepal_Width) + MARGINS.left)
				})
				.attr("cy", (d) => {
					return (Y_SCALE2(d.Petal_Width) + MARGINS.top)
				})
				.attr("r", 6)
				.attr('class', (d) => {return d.Species})
					.classed("eachpoint2", true);
				

	// create x and y axes
	FRAME2.append("g")
			.attr('transform', 'translate(' + MARGINS.left + "," + 
				(VIS_HEIGHT + MARGINS.top) + ')')
			.call(d3.axisBottom(X_SCALE2).ticks(10))
				.attr('font-size', "12px");

	FRAME2.append("g")
			.attr('transform', 'translate(' + MARGINS.top + "," + 
				  MARGINS.left + ')')
			.call(d3.axisLeft(Y_SCALE2).ticks(10))
				.attr('font-size', "12px");

	FRAME2.call(d3.brush() 
		.extent([[MARGINS.left, MARGINS.bottom], [VIS_WIDTH+MARGINS.left, VIS_HEIGHT+MARGINS.top]])
		.on("start brush", updateChart)
	);

	const myCircle1 = d3.selectAll('.eachpoint1')
    const myCircle2 = d3.selectAll('.eachpoint2')
    const myBar = d3.selectAll('.bar')

	function updateChart(event) {
	    extent = event.selection;
	    myCircle1.classed("selected", function(d){return isBrushed(extent, X_SCALE(d.Sepal_Length) + MARGINS.left, Y_SCALE(d.Petal_Length)+MARGINS.top)})
	    myCircle2.classed("selected", function(d){return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width)+MARGINS.top)})
		myBar.classed("selected", function(d){return isBrushed(extent, X_SCALE3(d.Species) + MARGINS.left, Y_SCALE3(50)+MARGINS.top)})
	};

	// A function that return TRUE or FALSE according if a dot is in the selection or not
	function isBrushed(brush_coords, cx, cy) {
	    let x0 = brush_coords[0][0],
	    	x1 = brush_coords[1][0],
	        y0 = brush_coords[0][1],
	        y1 = brush_coords[1][1];
	    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
	};
});

function barPlot() {
	const data = [{Species: 'versicolor'}, {Species: 'virginica'}, {Species: 'setosa'}];

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
		        .attr('class', (d) => {return d.Species})
		        .classed("bar", true);

	// create x and y axes
	FRAME3.append("g")
			.attr('transform', 'translate(' + MARGINS.left + "," + 
					(VIS_HEIGHT + MARGINS.top) + ')')
			.call(d3.axisBottom(X_SCALE3).ticks(10))
					.attr('font-size', "12px");

	FRAME3.append("g")
			.attr('transform', 'translate(' + MARGINS.top + "," + 
					MARGINS.left + ')')
			.call(d3.axisLeft(Y_SCALE3).ticks(10))
					.attr('font-size', "12px");
}

barPlot();