import React, { useEffect, useRef,useState } from "react";
import * as d3 from "d3";


const ResidencyBarGraph = (props) => {
    console.log(props.data)
    const ref = useRef(null);

    
        var margin = {top: 20, right: 0, bottom: 150, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    useEffect(() => {
        ref.current.innerHTML = null;
    const svg = d3.select(ref.current)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

    var z = d3.scaleOrdinal()
    .range(["#E24712", "#DEE212","#12E255","#12DAE2","#123EE2","#DB12E2"]);

    const x = d3.scaleBand()
                  .domain(props.data.map(function(d){return d.residency}))
                  .range([0, width])
                  .paddingInner(0.05)
                  .padding(0.3)
                  .align(0.1);

    const y = d3.scaleLinear()
    .domain([0, d3.max(props.data,function(d){return d.count})]).nice()
    .rangeRound([height, 0]);

    svg
    .selectAll(".bar")
    .data(props.data)

    
    
    .enter().append("rect")
    .attr("class", "bar")
    
    .attr("x", function(d) { return x(d.residency); })
    .attr("y", function(d) { return y(d.count); })
    .attr("height", function(d) { return height- y(d.count) })
    .attr("width", x.bandwidth())  
    .style("fill",function(d){return z(d.residency)}) 
    .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div	.html(d.count)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
.on("mouseout", function(d) {		
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    });          
  

svg.append("g")
.attr("class", "axis x")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".50em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");


svg.append("g")
.attr("class", "axis y")
.call(d3.axisLeft(y))

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("No. of Students");

    
},[margin,height,width,props.data])
    


return (
    <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} >
<g
className = "ResidencyBarGraph"
ref={ref}
/>
</svg>
    );

}

export default ResidencyBarGraph;