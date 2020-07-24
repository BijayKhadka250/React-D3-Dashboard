import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class PieChartResidency extends PureComponent {
  render() {
    let { data } = this.props;
    data = data.length > 0 ? data : [{ residency: "Resident", count: 100 }];

    const tooltipContent = ({ active, payload }) => {
      if (active) {
        return (
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "2px",
              padding: "3px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
              }}
            >{`${payload[0].payload.residency} : ${payload[0].payload.count}`}</p>
          </div>
        );
      }
    };

    return (
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={150}
          cy={250}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={tooltipContent} payload={data} />
      </PieChart>
    );
  }
}
