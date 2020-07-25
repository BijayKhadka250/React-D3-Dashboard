import React,{useEffect,useRef,useState,Component} from 'react'
import * as d3 from 'd3'
import {select,geoPath, geoMercator} from 'd3'
import './Geomap.css'




function Geomap(props)  {

    // console.log("Geomap")

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    const svgRef= useRef(); 
    const wrapperRef = useRef();
  
    
    

    var color = d3.scaleThreshold()
    .domain([0,10,30,50,70,100,250,500,1000,2000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

    const svg = d3.select(svgRef.current)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr('class', 'map');

    var projection = geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

    var path = geoPath().projection(projection);
    var data = d3.map();
    
useEffect(() => {
  var color = d3.scaleThreshold()
    .domain([0,10,30,50,70,100,250,500,1000,2000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

    const svg = d3.select(svgRef.current)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr('class', 'map');

    var projection = geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

    var path = geoPath().projection(projection);
    var data = d3.map();
    
  props.data.features.forEach(function(d1) { 
    
    props.api.forEach(function(d2) { 
        
        if(d1.properties.name == d2.name){
           d1.count = d2.count 
        }
     });
 });

 var div = d3.select("body").append("div")	
      .attr("class", "tooltip6")				
      .style("opacity", 0)

    svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(props.data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", 
      // "red"
      function(d) { 
         var a = d.count||0; 
        return color(a)
      }
      )
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      .on("mouseover", function(d) {
        console.log(d)		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div	.html(d.properties.name +": "+d.count)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
.on("mouseout", function(d) {		
        div
        // .transition()		
        // .duration(500)		
        .style("opacity", 0);	
    });  


   

        svg.append("circle").attr("cx",20).attr("cy",220).attr("r", 8).style("fill", "rgb(247,251,255)")
        svg.append("circle").attr("cx",20).attr("cy",250).attr("r", 8).style("fill", "rgb(222,235,247)")
        svg.append("circle").attr("cx",20).attr("cy",280).attr("r",8).style("fill", "rgb(198,219,239)")
        svg.append("circle").attr("cx",20).attr("cy",310).attr("r", 8).style("fill", "rgb(158,202,225)")
        svg.append("circle").attr("cx",20).attr("cy",340).attr("r", 8).style("fill", "rgb(107,174,214)")
        svg.append("circle").attr("cx",20).attr("cy",370).attr("r", 8).style("fill", "rgb(66,146,198)")
        svg.append("circle").attr("cx",20).attr("cy",400).attr("r", 8).style("fill", "rgb(33,113,181)")
        svg.append("circle").attr("cx",20).attr("cy",430).attr("r", 8).style("fill", "rgb(8,81,156)")
        svg.append("circle").attr("cx",20).attr("cy",460).attr("r", 8).style("fill", "rgb(8,48,107)")
        svg.append("circle").attr("cx",20).attr("cy",490).attr("r", 8).style("fill", "rgb(3,19,43)")
        svg.append("text").attr("x", 40).attr("y", 220).text("0-10 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 250).text("10-30 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 280).text("30-50 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 310).text("50-70 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 340).text("70-100 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 370).text("100-250 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 400).text("250-500 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 430).text("500-1000 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 460).text("1000-2000 students").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 40).attr("y", 490).text(">2000 students").style("font-size", "15px").attr("alignment-baseline","middle")
            
      },[props.data,props.api])  
    
   
  
        
        
   

//  },[svg,props.api,projection,colors] )
  

    
   

 
     return (
        //  <h1>hi</h1>
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        
      <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} ref={svgRef}></svg>
    </div>
  );
  

 }

export default Geomap;

