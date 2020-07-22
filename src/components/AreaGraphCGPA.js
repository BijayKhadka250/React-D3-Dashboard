import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import './CGPAPieChart.css'


    const size = {
       
        innerRadius: 0,
        outerRadius: 150
      };

      const CGPAPieChart = props => {
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

        var margin = {top: 50, right: 0, bottom: 50, left: 50};
        var width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        useEffect(() => {
        ref.current.innerHTML = null;

        var div = d3.select("body").append("div")	
        .attr("class", "tooltip2")				
        .style("opacity", 0);
        const data = createPie(props.data);
        const group = d3.select(ref.current)
          
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          const groupWithData = group.selectAll("g.arc").data(data);
      
          groupWithData.exit().remove();
      
          const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc");
      
          const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"))
            .on("mouseover", function(d) {	
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                div	.html(d.data.group +": " + d.data.value)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {		
                div.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            });          
      
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
            .style("font-size", 20)
            .text(d => {return `${d.data.group}`});
      

        }, [colors, createArc, createPie, props, props.data,width,height,margin]);
      
        return (
          <svg width={width+margin.left+margin.right} height={height+margin.bottom+margin.top}>
            <g
              className="PieChartGrad"
              ref={ref}
              transform={`translate(${size.outerRadius} ${size.outerRadius})`}
            />
          </svg>
        );
}

export default CGPAPieChart;