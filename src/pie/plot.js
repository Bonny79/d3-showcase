import { pie, transition, ascending, interpolate, arc } from "d3";

/**
 * Please use the fluent syntax to give the pie the following properties:
 * @param width
 * @param height
 * @param data
 * @returns
 */
export const piePlot = () => {
  let width;
  let height;
  let data;
  let arcInstance;

  function plot(selection) {
    if (!arcInstance) {
      arcInstance = arc()
        .innerRadius((Math.min(width, height) / 2) * 0.75)
        .outerRadius(Math.min(width, height) / 2);
    }

    const transform = pie()
      .value((d) => d[1].value)
      .sort((a, b) => ascending(a[1].index, b[1].index));

    const transformedData = transform(
      Object.entries(data).filter((x) => x[1].checked)
    ).sort((a, b) => a.index - b.index);

    var t = transition().duration(300);
    var t2 = t.transition();
    var t3 = t2.transition();

    selection
      .selectAll("path")
      .data(transformedData, (d) => d.data[1].id)
      .join(
        (enter) =>
          enter
            .append("path")
            .each(function (d) {
              //*this is the path itself, where we could store some data
              //* <path fill="#936EFE"></path>
              this.pieData = Object.assign({}, d, { endAngle: d.startAngle });
            })
            .attr("fill", (d) => d.data[1].color)
            .transition(t3)
            .attrTween("d", onUpdate),
        (update) => update.transition(t2).attrTween("d", onUpdate),
        (exit) => exit.transition(t).attrTween("d", onExit).remove()
      );

    function onUpdate(d) {
      //* get interpolator function
      var i = interpolate(this.pieData, d);
      this.pieData = d;
      return function (t) {
        return arcInstance(i(t));
      };
    }

    function onExit(d) {
      //avoid using spread op, Object.assign has better performance
      var pathToEndAngle = Object.assign({}, d, {
        startAngle: d.endAngle,
      });
      var i = interpolate(d, pathToEndAngle);
      return function (t) {
        return arcInstance(i(t));
      };
    }
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

  return plot;
};
