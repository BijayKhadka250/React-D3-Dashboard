import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


const size = {
  width: 300,
  height: 300,
  innerRadius: 75,
  outerRadius: 150
};
const Doughnut = props => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(size.innerRadius)
    .outerRadius(size.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    ref.current.innerHTML = null;
    const total = props.data.reduce((a, b) => ({ value: a.value + b.value }));
    const data = createPie(props.data);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i));

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(d => `${d.data.label} - ${d.value}`);

    group
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", 30)
      .text(total.value ? total.value : null);
  }, [colors, createArc, createPie, props, props.data]);

  return (
    <svg width={size.width} height={size.height}>
      <g
        className="doughnut"
        ref={ref}
        transform={`translate(${size.outerRadius} ${size.outerRadius})`}
      />
    </svg>
  );
};

export default Doughnut;
