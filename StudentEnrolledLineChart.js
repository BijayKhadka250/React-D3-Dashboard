import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StudentEnrolledLineChart = (props) => {
  // console.log(props)
  const { data } = props;
  return (
    <LineChart
      width={750}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      // style={{ marginTop: "40px" }}
    >
      <XAxis dataKey="Enroll_Year" interval="preserveStart" />
      <YAxis dataKey="total" interval="preserveStart" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="total"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default StudentEnrolledLineChart;
