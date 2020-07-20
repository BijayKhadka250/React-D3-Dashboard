/* eslint-disable */
import React, { useEffect, useRef,useState } from "react";
import * as d3 from "d3";

const Switch = (props) =>{
            console.log(props.data)
            console.log(props.color)
            // const [data,setData] = useState([])
            // setData(data)
          
            const ref = useRef(null);

            var margin = {top: 20, right: 0, bottom: 40, left: 40};
            var width = 600 - margin.left - margin.right;
            var height = 400 - margin.top - margin.bottom;

            useEffect(() => {
              ref.current.innerHTML = null;
              
              // var  height = 300;
              // var  width = 600;
              const svg = d3.select(ref.current)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              const x = d3.scaleBand()
                            .domain(props.data.map(function(d){return d.citizenship}))
                            .rangeRound([0, width])
                            .paddingInner(0.05)
                            .align(0.1);

              const y = d3.scaleLinear()
              .domain([0, d3.max(props.data,function(d){return d.Value})]).nice()
              .rangeRound([height, 0]);

              svg
              .selectAll(".bar")
              .data(props.data)
              .enter().append("rect")
              .attr("class", "bar")
              
              .attr("x", function(d) { return x(d.citizenship); })
              .attr("y", function(d) { return y(d.Value); })
              .attr("height", function(d) { return height- y(d.Value) })
              .attr("width", x.bandwidth())              
              .style("fill",function(d){return props.color})
              
              .on("mouseover", function() { tooltip.style("display", null); })
              .on("mouseout", function() { tooltip.style("display", "none"); })
              .on("mousemove", function(d) {
    console.log(d);
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").html(d.citizenship+": "+ d.Value);
  });
  svg.transition()
              .duration(1000).delay(1000)

              svg.append("g")
      .attr("class", "axis x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

      svg.append("g")
      .attr("class", "axis y")
      .call(d3.axisLeft(y).ticks(null, "s"))

      var Tooltip = d3.select("#div_template")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
 
var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

      tooltip.append("text")
      .attr("x", 30)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")  
      .style("text-align", "center")

              
              },[margin,height,width,props.data]);

            return (
              <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} >
       <g
        className = "Stack"
        ref={ref}
        />
    </svg>
              );
}

export default Switch;