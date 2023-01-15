import { select } from "d3";

import "../../style.css";
import { areaPlot } from "./plot";

const margin = {
  top: 50,
  right: 30,
  bottom: 50,
  left: 30,
};
const width = window.innerWidth - (margin.right + margin.left);
const height = window.innerHeight;

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

// Test
(() => {
  const plot = areaPlot().width(width).height(height).data(data).margin(margin);

  svg.call(plot);
})();
