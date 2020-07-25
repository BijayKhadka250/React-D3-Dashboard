import React, { useEffect, useRef,useState } from "react";
import * as d3 from "d3";

const AgeBarGraph = (props) => {
    // console.log(props.data)
    const ref = useRef(null);

    
        var margin = {top: 20, right: 0, bottom: 30, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    useEffect(() => {
        ref.current.innerHTML = null;
    const svg = d3.select(ref.current)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
                  .domain(props.data.map(function(d){return d.group}))
                  .range([0, width])
                  .paddingInner(0.05)
                  .align(0.1);

    const y = d3.scaleLinear()
    .domain([0, d3.max(props.data,function(d){return d.value})]).nice()
    .rangeRound([height, 0]);

    svg
    .selectAll(".bar")
    .data(props.data)
    .enter().append("rect")
    .attr("class", "bar")
    
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height- y(d.value) })
    .attr("width", x.bandwidth())              
    
    
    
svg.transition()
    .duration(1000).delay(1000)

    svg.append("g")
.attr("class", "axis x")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

svg.append("g")
.attr("class", "axis y")
.call(d3.axisLeft(y))
    
},[margin,height,width,props.data])
    


return (
    <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} >
<g
className = "AgeBarGraph"
ref={ref}
/>
</svg>
    );

}

export default AgeBarGraph;