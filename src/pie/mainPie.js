import { arc, select } from "d3";
import { pieLegend } from "./legend";
import { piePlot } from "./pieChart";
import "../../style.css";

const width = (window.innerWidth * 3) / 4;
const legendWidth = window.innerWidth / 4;
const height = window.innerHeight;
const margin = 40;

const data = [
  { id: "Italy", index: 0, value: 25, color: "#324477", checked: false },
  { id: "Germany", index: 1, value: 25, color: "#F38D77", checked: true },
  { id: "Spain", index: 2, value: 25, color: "#936EFE", checked: true },
  { id: "France", index: 3, value: 25, color: "#EEF2F5", checked: true },
];

const svg = select("#chart")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("width", width)
  // .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

const legendDiv = select("#chart")
  .append("div")
  .attr("class", "legend")
  .attr("width", legendWidth)
  .attr("height", height);

const generateArc = () =>
  arc()
    .innerRadius(Math.min(width, height) / 2.5 - margin * 0.75)
    .outerRadius(Math.min(width, height) / 2 - margin);

(() => {
  const plot = piePlot()
    .width(width)
    .height(height)
    .data(data)
    .margin(margin)
    .arcInstance(generateArc());

  svg.call(plot);

  legendDiv.call(
    pieLegend()
      .data(data)
      .on("change", (event) => svg.call(plot.data(event)))
  );
})();
