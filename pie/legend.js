import { dispatch, pie } from "d3";

export const pieLegend = () => {
  let data;
  const listeners = dispatch("change");

  const legend = (selection) => {
    const transform = pie().value((d) => d[1].value);

    const transformedData = transform(Object.entries(data));

    const inputSelection = selection
      .selectAll("div")
      .data(transformedData)
      .join("div")
      .attr("class", "regionCheckbox");

    inputSelection
      .append("input")
      .attr("type", "checkbox")
      .attr("id", (d) => d.data[1].id)
      .attr("name", (d) => d.data[1].id)
      .attr("checked", (d) => (d.data[1].checked ? true : undefined))
      .on("change", (event) => {
        const target = data.find(
          (x) => x.id === event.target.__data__.data[1].id
        );
        target.checked = !target.checked;

        const newSelection = data.filter(
          (x) => x.id !== event.target.__data__.data[1].id
        );

        return listeners.call("change", null, [...newSelection, target]);
      });

    inputSelection
      .append("label")
      .attr("for", (d) => d.data[1].id)
      .text((d) => d.data[1].id);
  };

  legend.data = function (_) {
    return arguments.length ? ((data = _), legend) : data;
  };

  legend.on = function () {
    let value = listeners.on.apply(listeners, arguments);
    return value === listeners ? legend : value;
  };

  return legend;
};
