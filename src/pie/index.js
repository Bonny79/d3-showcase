import { arc, select } from "d3";
import { pieLegend } from "./userInteraction";
import { piePlot } from "./plot";
import "../../style.css";

const width = window.innerWidth;
const legendWidth = window.innerWidth;
const height = window.innerHeight;

const data = [
  { id: "Italy", index: 0, value: 25, color: "#4FDDB0", checked: false },
  { id: "Germany", index: 1, value: 25, color: "#FFC061", checked: true },
  { id: "Spain", index: 2, value: 25, color: "#FF7777", checked: true },
  { id: "France", index: 3, value: 25, color: "#77A6FF", checked: true },
];

const svg = select("#chart")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("width", width)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

const legendDiv = select("#chart")
  .append("div")
  .attr("class", "legend")
  .attr("width", legendWidth)
  .attr("height", height);

(() => {
  const plot = piePlot().width(width).height(height).data(data);

  svg.call(plot);

  legendDiv.call(
    pieLegend()
      .data(data)
      .on("change", (event) => svg.call(plot.data(event)))
  );
})();
