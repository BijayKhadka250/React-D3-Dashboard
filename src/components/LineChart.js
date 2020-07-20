import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import './LineChart.css'

const LineChart = (props) => {
    // console.log(props.data)
  const ref = useRef();
 

    var margin = {left:40,right:20,top:50,bottom:50};
    var  width = 750-margin.left-margin.right;
    var  height = 350- margin.top - margin.bottom;
      
    
    var maxStudents = d3.max(props.data,function(d){return d.total});
        // console.log(maxStudents);
    var minDate = d3.min(props.data,function(d){return d.Enroll_Year});
        // console.log(minDate);
    var maxDate = d3.max(props.data,function(d){return d.Enroll_Year});
        // console.log(maxDate);
    // 5. X scale will use the index of our data
    var x = d3.scaleLinear()
    .domain([minDate, maxDate]) // input
    .range([0, width]); // output

     // 6. Y scale will use the randomly generate number
     var y = d3.scaleLinear()
     .domain([0, maxStudents]) // input
     .range([height, 0]); // output

     var yAxis = d3.axisLeft(y);
     var xAxis = d3.axisBottom(x);

     var svg = d3.select(ref.current).attr("class","chart")
                .append("g")
                .attr("transform","translate("+margin.left+","+margin.top+")");

    var line = d3.line()
    .x(function(d){ return x(d.Enroll_Year); })
    .y(function(d){ return y(d.total); });

    svg.append("path").attr("class","linegraph").attr("d",line(props.data)).style("stroke","green").style("fill","None");
    svg.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis);
    svg.append("g").attr("class","y axis").call(yAxis);

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height-6)
    .text("Year");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Students");

    svg.append("text")
  .attr("x", width - 500)
  .attr("y", 150)
  .attr("dy", "0.32em")
  .attr("font-weight",600)
  .text(function(d) { return "Total students in SMU from 2011 to 2019"; });


    return(
        <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} >
          
            <g
        className = "LineChart"
        ref={ref}
        />
        </svg>    
           
      
  ) 
      
     
    
}

export default LineChart
