import {
  line,
  scaleLinear,
  axisBottom,
  max,
  extent,
  axisLeft,
  curveNatural,
  easeLinear,
  transition,
  min,
  scaleTime,
} from "d3";

/**
 * Please use the fluent syntax to give the pie the following properties:
 * @param width
 * @param height
 * @param data
 * @returns
 */

export const linePlot = () => {
  let width;
  let height;
  let data;
  let margin;

  const format = timeFormat("%Y-%m-%d");

  function plot(selection) {
    const fromValueToPixelX = scaleTime()
      .domain(extent(data, (d) => d[0]))
      .range([0, width]);

    const fromValueToPixelY = scaleLinear()
      .domain([0, max(data, (d) => d[1])])
      .range([height - margin.bottom, margin.top]);

    const generator = line()
      .curve(curveNatural)
      .x((d) => {
        console.log(d[0], fromValueToPixelX());
        return fromValueToPixelX(d[0]);
      })
      .y((d) => fromValueToPixelY(d[1]));

    const path = generator(data);
    const t = transition().duration(1000);

    selection
      .selectAll("g.y-axis")
      .data([null]) // * It means, there's just one thing
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .transition(t)
      .call(axisLeft(fromValueToPixelY));

    //? x axis
    // selection
    //   .selectAll("g.x-axis")
    //   .data([null])
    //   .join("g")
    //   .attr("class", "x-axis")
    //   .attr("transform", `translate(0, ${height - margin.bottom})`)
    //   .transition(t)
    //   .call(axisBottom(fromValueToPixelX));

    const linePath = selection
      .selectAll("path")
      .data(data)
      // .transition()
      // .duration(3000)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", `#334379`)
      .attr("stroke-width", "2px");

    const offset = linePath.node().getTotalLength();

    linePath
      .attr("stroke-dasharray", offset + " " + offset)
      .attr("stroke-dashoffset", offset)
      .transition()
      .ease(easeLinear)
      .attr("stroke-dashoffset", 0)

      .duration(1500);
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
