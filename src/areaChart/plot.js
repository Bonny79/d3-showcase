import {
  scaleLinear,
  axisBottom,
  max,
  extent,
  axisLeft,
  curveNatural,
  easeLinear,
  area,
  transition,
} from "d3";

/**
 * Please use the fluent syntax to give the pie the following properties:
 * @param width
 * @param height
 * @param data
 * @returns
 */
export const areaPlot = () => {
  let width;
  let height;
  let data;
  let margin;

  function plot(selection) {
    const fromValueToPixelX = scaleLinear()
      .domain([0, max(data, (d) => d[0])])
      .range([margin.left, width - margin.right]);

    const fromValueToPixelY = scaleLinear()
      .domain([0, max(data, (d) => d[1])])
      .range([height - margin.bottom, margin.top]);

    const generator = area()
      .curve(curveNatural)
      .x((d) => fromValueToPixelX(d[0]))
      .y0(fromValueToPixelY(0))
      .y1((d) => fromValueToPixelY(d[1]));

    const path = generator(data);

    const generateGradient = () => {
      selection
        .append("defs")
        .append("linearGradient")
        .attr("id", `gradient`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", `#334379`)
        .attr("stop-opacity", 0.8);

      selection
        .select("defs")
        .select("linearGradient")
        .attr("id", `gradient`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", `#334379`)
        .attr("stop-opacity", 0);
    };

    selection
      .append("g")
      .call(axisBottom(fromValueToPixelX))
      .attr("transform", `translate(0,${height - margin.top})`);

    selection
      .append("g")
      .call(axisLeft(fromValueToPixelY))
      .attr("transform", `translate(${margin.left},0)`);

    var t = transition().duration(1500);
    var t2 = t.transition();

    const areaPath = selection
      .append("g")
      .selectAll("path")
      .data([null])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", `#334379`)
      .attr("d", path)
      .attr("stroke-width", "2px");

    const offset = areaPath.node().getTotalLength();

    areaPath
      .attr("stroke-dasharray", offset + " " + offset)
      .attr("stroke-dashoffset", offset)
      .transition(t)
      .ease(easeLinear)
      .attr("stroke-dashoffset", 0)
      .call(generateGradient)
      .transition(t2)
      .attr("fill", `url(#gradient)`);
  }

  plot.width = function (_) {
    return arguments.length ? ((width = +_), plot) : width;
  };

  plot.height = function (_) {
    return arguments.length ? ((height = +_), plot) : height;
  };

  plot.data = function (_) {
    return arguments.length ? ((data = _), plot) : data;
  };

  plot.margin = function (_) {
    return arguments.length ? ((margin = _), plot) : margin;
  };

  return plot;
};
