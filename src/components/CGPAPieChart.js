import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import './CGPAPieChart.css'
// import { tooltipContext } from "./useTooltip";
// import {Tooltip} from "recharts";



    const size = {
       
        innerRadius: 0,
        outerRadius: 150
      };

      const CGPAPieChart = props => {
        // console.log(props.data)
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

        // const tooltipContent = ({ active, payload }) => {
        //   if (active) {
        //     return (
        //       <div
        //         style={{
        //           backgroundColor: "white",
        //           border: "1px solid black",
        //           borderRadius: "2px",
        //           padding: "3px",
        //         }}
        //       >
        //         <p
        //           style={{
        //             fontWeight: "bold",
        //           }}
        //         >
        //           Hi
        //           {/* {`${payload[0].payload.residency} : ${payload[0].payload.count}`} */}
        //           </p>
        //       </div>
        //     );
        //   }
        // };

       
        useEffect(() => {
        ref.current.innerHTML = null;

        var div = d3.select("body").append("div")	
        .attr("class", "tooltip2")				
        .style("opacity", 0);
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
            .attr("class", "tooltip2")				
            .style("opacity", 0)
      
          const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"))
            .on("mouseover", function(d) {
              console.log(d)		
              div.transition()		
                  .duration(200)		
                  .style("opacity", .9);		
              div	.html("CGPA: " + d.data.group+"<br>"+d.data.value)	
                  .style("left", (d3.event.pageX) + "px")		
                  .style("top", (d3.event.pageY - 28) + "px");	
              })					
      .on("mouseout", function(d) {		
              div
              // .transition()		
              // .duration(500)		
              .style("opacity", 0);	
          });  
            
            // .on("mouseenter",function(){
            //   tooltip.style("display",null)
            // })
            // .on("mouseout",function(){
            //   tooltip.style("display","none")

            // })
            // .on("mousemove",function(d){
            //   console.log(d)
            //   var xPos = d3.mouse(this)[0] - 15;           
            //   var yPos = d3.mouse(this)[1]-55;
            //   tooltip.attr("transform","translate("+xPos+","+yPos+")");
              
            //   tooltip
            //   .select("text")
            //   .html(function(){return "hi <br> bijay"})
              
            // })

          // var tooltip = group.append("g")
          // .attr("class","tooltip2")
          // .style("display","none")
          // .style("position","absolute")
          // .style("text-align","center")
          // // .style("fill","white")
          

          // tooltip.append("text")
          // .attr("x",15)
          // .attr("dy","1.2em")
          // .attr("font-size","1.25em")
          // .attr("font-weight","bold")
          // .attr("background-color","white")
      //     var div = d3.select("body").append("div")	
      // .attr("class", "tooltip2")				
      // .style("display", "none")

                      
          path
            .attr("class", "arc")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(i))
               
      
          const text = groupWithUpdate
            .append("text")
            .merge(groupWithData.select("text"));
      
        

        }, [props.data]);
      
        return (
          <svg width={width+margin.left+margin.right} height={height+margin.bottom+margin.top}>
            <g
              className="PieChartGrad"
              ref={ref}
              transform={`translate(${size.outerRadius} ${size.outerRadius})`}
            />
            {/* <Tooltip content={tooltipContent} payload={props.data}/> */}
          </svg>
        );
}

export default CGPAPieChart;