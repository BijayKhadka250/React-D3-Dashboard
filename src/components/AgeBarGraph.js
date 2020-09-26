import React, { useEffect, useRef,useState } from "react";
import * as d3 from "d3";
import './AgeBarGraphs.css'

const AgeBarGraph = (props) => {
    // console.log(props.data)
    const ref = useRef(null);

    
    var margin = {top: 20, right: 0, bottom: 50, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

   

    useEffect(() => {

        var div = d3.select("body").append("div")	
      .attr("class", "tooltip4")				
      .style("opacity", 0)
      
        ref.current.innerHTML = null;
        // div.style("opacity", 0);
    const svg = d3.select(ref.current)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      // Define the div for the tooltip
      

    const x = d3.scaleBand()
                  .domain(props.data.map(function(d){return d.group}))
                  .range([0, width])
                  .paddingInner(0.05)
                  .padding(0.3)
                  .align(0.1);

    const y = d3.scaleLinear()
    .domain([0, d3.max(props.data,function(d){return d.value})]).nice()
    .rangeRound([height, 0]);

    var bar = svg
    .selectAll(".bar")
    .data(props.data)

    
    
    .enter().append("rect")
    // .transition().duration(200)
    .attr("class", "bar")
    
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height- y(d.value) })
    .attr("width", x.bandwidth())   
    .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div	.html("Age: " + d.group+"<br>"+d.value)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
// .on("mouseout", function(d) {		
//         div
        // .transition()		
        // .duration(500)		
    //     .style("opacity", 0);	
    // });  
    // div.remove()

    d3.select(window).on('mouseout', () => {
        d3.selectAll('.tooltip4').style('opacity', '0');
        });
    
    
    // div.remove()
      
      

//     svg.selectAll("rect")
//   .transition()
//   .duration(800)
//   .attr("y", function(d) { return y(d.value); })
//   .attr("height", function(d) { return height - y(d.value); })
//   .delay(function(d,i){console.log(i) ; return(i*100)})
  
  
    
    
   

    svg.append("g")
.attr("class", "axis x")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Age-Group");

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

    
},[props.data])
    


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