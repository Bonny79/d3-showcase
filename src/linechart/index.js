// Include the d3.js library in your HTML file.

// Define height/width/margins.

// Create an SVG element in your HTML file where the chart will be rendered.

// Use the d3.select() method to select the SVG element in your JavaScript file.

// Use the d3.line() method to create a line generator.

// Use the d3.scaleLinear() method to create a linear scale for the chart's x and y axes.

// Use the d3.axisBottom() and d3.axisLeft() methods to create the x and y axes.

// Use the data() method to bind your data to the line generator.

// Use the enter() method to create a new group for each data point.

// Use the append() method to add a path element to the group, and use the attr() method to set the "d" attribute of the path element to the output of the line generator.

// Use the call() method to attach the x and y axes to the chart.

import {
  line,
  select,
  scaleLinear,
  axisBottom,
  max,
  extent,
  axisLeft,
} from "d3";

import "../../style.css";

const margin = {
  top: 50,
  right: 30,
  bottom: 50,
  left: 30,
};
const width = window.innerWidth - (margin.right + margin.left);
const height = window.innerHeight - (margin.top + margin.bottom);

var data = [
  { x: 0, y: 5 },
  { x: 1, y: 9 },
  { x: 2, y: 7 },
  { x: 3, y: 5 },
  { x: 4, y: 3 },
  { x: 5, y: 3.5 },
  { x: 6, y: 4 },
  { x: 7, y: 2 },
  { x: 8, y: 3 },
  { x: 9, y: 2 },
];

const svg = select("#chart")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("width", width);
// .attr("height", height)

const execute = () => {
  var x = scaleLinear()
    .domain([0, max(data, (d) => d.x)])
    .range([margin.left, width - margin.right]);

  var y = scaleLinear()
    .domain(extent(data, (d) => d.y))
    .range([height - margin.bottom, margin.top]);

  const transformedData = data
    .map((d, i, array) => {
      if (!array[i + 1]) {
        return null;
      }
      return {
        x1: x(d.x),
        y1: y(d.y),
        x2: x(array[i + 1]?.x || undefined),
        y2: y(array[i + 1]?.y || undefined),
      };
    })
    .filter((x) => x);

  svg
    .append("g")
    .selectAll("line")
    .data(transformedData)
    .join("line")
    .attr("x1", (d) => d.x1)
    .attr("y1", (d) => d.y1)
    .attr("x2", (d) => d.x2)
    .attr("y2", (d) => d.y2)
    .attr("stroke", "black");

  svg
    .append("g")
    .call(axisBottom(x))
    .attr("transform", `translate(0,${height - margin.top})`);

  svg
    .append("g")
    .call(axisLeft(y))
    .attr("transform", `translate(${margin.left},0)`);
};

execute();
