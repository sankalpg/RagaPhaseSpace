var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var CANVAS_WIDTH_LINEPLOT = Math.floor(screenWidth*0.48);
var CANVAS_HEIGHT_LINEPLOT = Math.floor(screenHeight*0.3);

var marginLinePlot = {top: 0, right: 20, bottom: 30, left: 50};
var widthLinePlot = CANVAS_WIDTH_LINEPLOT - marginLinePlot.left - marginLinePlot.right ;
var heightLinePlot = CANVAS_HEIGHT_LINEPLOT - marginLinePlot.top - marginLinePlot.bottom;

var xLinePlot; // scale variable for x
var yLinePlot; // scale variable for y

var binsPerOctave = 24;

function setBins(val){
    binsPerOctave = val;
    console.log(binsPerOctave);
    initDrawPhaseViz();    
}

var days = new Array(binsPerOctave);
var times = new Array(binsPerOctave);

/////// New variables /////////////////////////////
var data = [], cards, svg;
var margin;
var colorScale;


function initDataForGrid() {
  for (i = 0 ; i < binsPerOctave; i++) {
    for (j = 0; j < binsPerOctave; j++) {
       var objTmp = {
        day : +i,
       hour : +j,
       value : 12  
      };
      data.push(objTmp);
    };
  }
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
          width = 600 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom,
          gridSize = Math.floor(width / binsPerOctave),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]

   colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

}

function updateGrid(xPos, yPos) {
  xPos = Math.round(xPos);
  yPos = Math.round(yPos);
  var destGrid = svg.select("#x" + xPos + "y" + yPos).style("fill", "#084B8A").transition().duration(8000).style("fill", "#FFFFFF"); 
}

function initGrid() {
          cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("id", function(d) { return "x" + d.hour + "y" + d.day; })
              .attr("x", function(d) { return (d.hour) * gridSize; })
              .attr("y", function(d) { return (d.day) * gridSize; })
              .attr("rx", 10)
              .attr("ry", 10)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", "#ffffff");

          /*cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });*/

          //cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();

          /*var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();*/

        }

/**
* Created to initialize the variables using the d3 library.
*/
function initDrawPhaseViz() {
	
	initDataForGrid();
	d3.select("#chart").selectAll("*").remove();
	      
	svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      

      initGrid();
      
      /*var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
        .data(datasets);

      datasetpicker.enter()
        .append("input")
        .attr("value", function(d){ return "Dataset " + d })
        .attr("type", "button")
        .attr("class", "dataset-button")
        .on("click", function(d) {
          heatmapChart(d);
        });*/
}
