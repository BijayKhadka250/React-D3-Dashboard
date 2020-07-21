import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { select, geoPath, geoMercator } from "d3";
import "./Geomap.css";

function Geomap(props) {
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

  const svgRef = useRef();
  const wrapperRef = useRef();
  var margin = { top: 0, right: 0, bottom: 0, left: 0 };

  var width = 800 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  // console.log(Countries.features)
  const svg = d3.select(svgRef.current).insert("svg");

  //  use resized dimensions
  // but fall back to getBoundingClientRect, if no dimensions yet.
  // const { width, height } =
  //   dimensions || wrapperRef.current.getBoundingClientRect();
  const projection = geoMercator().scale(120).translate([400, 200]);
  const pathGenerator = geoPath().projection(projection);

  svg
    .selectAll(".country")
    .data(props.data.features)
    .join("path")
    .attr("class", "country")
    .attr("d", (feature) => pathGenerator(feature))
    .attr("fill", "#ccc")
    .style("stroke", "black")
    .style("stroke-width", 0.5)
    .on("mouseover", function (d) {
      //    console.log(d)
      d3.select(this)
        .style("fill", "#6C0")
        .append("svg")
        .text(d.properties.name);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", "#ccc");
    });

  var colors = d3
    .scaleThreshold()
    .domain([0, 10, 50, 100, 500, 20289])
    .range(["#000000", "#ffab00", "#00c853", "#3e2723", "#304ffe", "#d50000"]);

  //

  //  will be called initially and on every data change
  //  useEffect(() => {
  //     console.log(api)

  svg
    .append("g")
    // .attr("class", "bubble")
    .selectAll(".circles")
    .data(props.api)
    .enter()
    .append("circle")
    .attr("class", "circles")
    .attr("cx", function (d) {
      return projection([d.longitude, d.latitude])[0];
    })
    .attr("cy", function (d) {
      return projection([d.longitude, d.latitude])[1];
    })
    .attr("r", function (d) {
      return 5;
    })
    .attr("opacity", 1)
    .attr("fill", function (d) {
      return colors(d.count);
    });

  svg
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 250)
    .attr("r", 6)
    .style("fill", "#ffab00");
  svg
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 280)
    .attr("r", 6)
    .style("fill", "#00c853");
  svg
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 310)
    .attr("r", 6)
    .style("fill", "#3e2723");
  svg
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 340)
    .attr("r", 6)
    .style("fill", "#304ffe");
  svg
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 370)
    .attr("r", 6)
    .style("fill", "#d50000");
  svg
    .append("text")
    .attr("x", 40)
    .attr("y", 250)
    .text("0-10 students")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 40)
    .attr("y", 280)
    .text("10-50 students")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 40)
    .attr("y", 310)
    .text("50-100 students")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 40)
    .attr("y", 340)
    .text("100-500 students")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 40)
    .attr("y", 370)
    .text(">500 students")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");

  //  },[svg,props.api,projection,colors] )

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <p style={{ textAlign: "center" }}>Global BubbleChart</p>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        ref={svgRef}
      ></svg>
    </div>
  );
}

export default Geomap;
