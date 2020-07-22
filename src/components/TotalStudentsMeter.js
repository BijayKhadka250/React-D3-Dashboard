import React from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function TotalStudentsMeter(props) {
  const { data } = props;
  const TOTAL_STUDENTS = 159950;

  return (
    <div>
      <CircularProgressbar
        value={data}
        text={` ${((data / TOTAL_STUDENTS) * 100).toFixed(2)}%`}
        maxValue={TOTAL_STUDENTS}
        styles={{ root: { padding: "10px" }, text: { fontSize: "10px" } }}
      />
    </div>
  );
}
