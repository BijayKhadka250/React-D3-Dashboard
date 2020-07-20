import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {stack} from 'd3-shape'
import './Stack.css'

const Stack = (props) => {
  // console.log(props.data)
    const ref = useRef();
    
    var margin = {top: 20, right: 0, bottom: 35, left: 30};

    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;


var svg = d3.select(ref.current)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set x scale
var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

// set y scale
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// set the colors
var z = d3.scaleOrdinal()
    .range(["#98abc5", "#ff8c00"]);

var keys = ['UnderGraduate','Graduate'];

x.domain(props.data.map(function(d) { return d.citizenship; }));
  y.domain([0, d3.max(props.data, function(d) {console.log(d); return d.total; })]).nice();
  z.domain(keys);

  

  svg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(props.data))
    .enter().append("g")
      .attr("fill", function(d) {console.log(d); return z(d.key); })
    .selectAll("rect")
    .data(function(d) {console.log(d); return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.citizenship); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    console.log(d.data);
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").html(d.data.citizenship+"<br>"+ (d[1]-d[0]));
  });
      
  

  svg.append("g")
      .attr("class", "axis x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("class", "axis y")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

      // Prep the tooltip bits, initial display is hidden
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

// tooltip.append("rect")
//   .attr("width", 100)
//   .attr("height", 20)
//   .attr("fill", "white")
//   .style("opacity", 0.5)
//   .style("text-align", "center")

tooltip.append("text")
  .attr("x", 30)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold")  
  .style("text-align", "center")


// legend
  var legend = svg.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
.selectAll("g")
.data(keys.slice().reverse())
.enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("x", width - 19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", z);

legend.append("text")
  .attr("data-html", "true")
  .attr("x", width - 24)
  .attr("y", 9.5)
  .attr("dy", "0.32em")
  .text(function(d) { return d; });

  svg.append("text")
  .attr("x", width - 400)
  .attr("y", 0)
  .attr("dy", "0.32em")
  .attr("font-weight",600)
  .text(function(d) { return "Students from Top 10 Countries"; });


return(
    <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} >
       <g
        className = "Stack"
        ref={ref}
        />
    </svg>
)
}

export default Stack;



