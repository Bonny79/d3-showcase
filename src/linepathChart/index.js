// with line generator

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

import { select } from "d3";

import "../../style.css";
import { linePlot } from "./plot";

const margin = {
  top: 50,
  right: 30,
  bottom: 50,
  left: 30,
};
const width = window.innerWidth - (margin.right + margin.left);
const height = window.innerHeight - (margin.top + margin.bottom);

const data = [
  [0, 5],
  [1, 9],
  [2, 7],
  [3, 5],
  [4, 3],
  [5, 3.5],
  [6, 4],
  [7, 2],
  [8, 3],
  [9, 2],
];

const svg = select("#chart")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", [0, 0, width, height])
  .attr("width", width);
// .attr("height", height)

// Test
(() => {
  const plot = linePlot().width(width).height(height).data(data).margin(margin);

  svg.call(plot);
})();
