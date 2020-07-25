import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import './PieChartGrad.css'
import { color, path } from "d3";

    const size = {
       
        innerRadius: 75,
        outerRadius: 150
      };

      const PieChartGrad = props => {
        // console.log(props.data)
        const ref = useRef(null);
        const createPie = d3
          .pie()
          .value(d => d.count)
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

        

        
        // const total = props.data.reduce((a, b) => ({ count: a.count + b.count }));
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

            var div = d3.select("body").append("div")
            .attr("class", "tooltip7")				
            .style("opacity", 0);
      
          const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"))
            .on("mouseover", function(d) {	
              console.log(d)	
              div.transition()		
                  .duration(200)		
                  .style("opacity", .9);		
              div	.html("hi")	
                  .style("left", (d3.mouse(this)[0]) + "px")		
                  .style("top", (d3.mouse(this)[1] - 28) + "px");	
              })					
          .on("mouseout", function(d) {		
              div
              // .transition()		
              //     .duration(500)		
                  .style("opacity", 0);	
          });
           
      
          path
            .attr("class", "arc")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(i))

          
         

            
          const text = groupWithUpdate
            .append("text")
            .merge(groupWithData.select("text"));
      
          text
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${createArc.centroid(d)})`)
            .style("fill", "white")
            .style("font-size", 10)
            .text(d => `${d.value}`);
      
        //   group
        //     .append("text")
        //     .attr("text-anchor", "middle")
        //     .style("font-size", 30)
        //     .text(total.value ? total.count : null);

            var keys = ['UnderGraduate','Graduate'];
            var z = d3.scaleOrdinal()
            .range(["#1f77b4", "#ff7f0e"]);
            var legend = group.append("g")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .attr("text-anchor", "end")
                        .selectAll("g")
                        .data(keys.slice().reverse())
                        .enter().append("g")
                        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
            .attr("x", width - 200)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

            legend.append("text")
            .attr("data-html", "true")
            .attr("x", width - 206)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        }, [ props, props.data]);
      
      
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

export default PieChartGrad;