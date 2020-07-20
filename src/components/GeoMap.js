import React,{useEffect,useRef,useState} from 'react'
import * as d3 from 'd3'
import {select,geoPath, geoMercator} from 'd3'
import './Geomap.css'




function Geomap(props)  {

    // var format = d3.format(",");
    // console.log(props.api)
    // console.log(props.data)

    // var tip = d3.tip()
    //         .attr('class', 'd3-tip')
    //         .offset([-10, 0])
    //         .html(function(d) {
    //           return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
    //         })
    
    const svgRef= useRef(); 
    const wrapperRef = useRef();
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
    // var populationById = {};
    
    props.data.features.forEach(function(d1) { 
        // console.log(d1.properties.name)
        props.api.forEach(function(d2) { 
            // console.log(d2.name)
            if(d1.properties.name == d2.name){
               d1.count = d2.count 
            }
         });
     });

//   console.log(props.api)
//   console.log(props.data)
//   console.log(populationById)

    svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(props.data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { 
         var a = d.count||0; 
        return color(a)
      })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)

    // console.log(data)
    // console.log(props.api) 
    // const [geographies, setGeographies] = useState([])

    // fetch("http://140.184.230.103:5000/api")
    //     .then(response => {
    //         if (response.status !== 200){
    //             console.log(`there was a problem:`)
    //             return
    //         }
    //         response.json().then(worlddata => {
    //             // console.log(worlddata)
    //             setGeographies(worlddata)
    //             // console.log(geographies)
    //         })
    //     })
    // console.log(data.features)   

    // const svgRef= useRef(); 
    // const wrapperRef = useRef();
    // var margin = {top: 0, right: 0, bottom: 0, left: 0};

    // var width = 960 - margin.left - margin.right;
    // var height = 500 - margin.top - margin.bottom;

     // console.log(Countries.features)
    //  const svg = d3.select(svgRef.current).insert("svg");

     //  use resized dimensions
         // but fall back to getBoundingClientRect, if no dimensions yet.
         // const { width, height } =
         //   dimensions || wrapperRef.current.getBoundingClientRect();
        //  const projection = geoMercator().scale(130).translate([width/2,height/1.5]);
        // const pathGenerator = geoPath().projection(projection);

    // svg.selectAll(".country")
    //    .data(props.data.features)
    //    .join("path")
    //    .attr("class","country")
    //    .attr("d",feature => pathGenerator(feature))
    //    .attr("fill","#ccc")
    //    .style("stroke", "black")
    //       .style("stroke-width", 0.5)
    //    .on("mouseover", function(d) {
    //     //    console.log(d)
    //     d3.select(this).style("fill","#6C0")
    //         .append("svg")
    //         .text(d.properties.name);})
    // .on("mouseout", function(d) {
    //     d3.select(this).style("fill","#ccc");});

        // var colors = d3.scaleThreshold()
        // .domain([0,10,50,100,500,20289])
        // .range(['#000000','#ffab00','#00c853','#3e2723','#304ffe','#d50000'])

        


//   








//  will be called initially and on every data change
//  useEffect(() => {
//     console.log(api) 

  
// svg
// .append("g")
// .attr("class", "bubble")    
// .selectAll(".circles")
//     .data(props.api)
//     .enter().append("circle")
//     .attr("class","circles")
//     .attr("cx",function(d){ return projection([d.longitude,d.latitude])[0]; })
//     .attr("cy",function(d){ return projection([d.longitude,d.latitude])[1]; })
//         .attr("r",function(d){return 5})
//         .attr("opacity",1)
//         .attr("fill", function(d){
//         return colors(d.count)
//         }) 
// 0,10,30,50,70,100,250,500,1000,2000
// "rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"  
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
            
        
    
   
  
        
        
   

//  },[svg,props.api,projection,colors] )

 
     return (
        //  <h1>hi</h1>
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        
      <svg width={width+ margin.left + margin.right} height={height + margin.top + margin.bottom} ref={svgRef}></svg>
    </div>
  );
  

 }

export default Geomap;

