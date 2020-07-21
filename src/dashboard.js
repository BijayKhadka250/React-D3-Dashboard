import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";

import GeoMap from "./components/GeoMap";
import data from "./components/GeoChart.world.geo.json";
import DoughnutChart from "./components/DoughnutChart";
import BarGraphForAge from "./components/BarGraphForAge";
import StudentEnrolledLineChart from "./components/StudentEnrolledLineChart";
import "react-circular-progressbar/dist/styles.css";

import FilterBar from "./filters";

import {
  fetchStudentsByYear,
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchAge,
  fetchGenders,
} from "./utils/apiStore";

const drawerWidth = 280;
// const TOTAL_STUDENTS = 159950;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  pieCard: {
    maxWidth: 500,
  },
  lineChart: {
    maxWidth: 600,
    marginLeft: 35,
  },
  meter: {
    width: 300,
  },
  ageBar: {
    maxWidth: 500,
    marginLeft: 18,
  },
  halfPie: {
    maxWidth: 400,
  },
  ptftPie: {
    maxWidth: 500,
    marginLeft: 35,
  },
  facultySpikyBar: {
    maxWidth: 415,
  },
  gradStat: {
    maxWidth: 500,
    marginLeft: 20,
  },
  map: {
    marginBottom: 20,
  },
  cgpaGraph: {
    marginBottom: 20,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function DashboardMain(props) {
  const classes = useStyles();

  const [countryFilter, setCountryFilter] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [gradStatusFilter, setGradStatusFilter] = useState([]);
  const [countries, setCountries] = useState([]);
  const [studentByYearData, setStudentByYearData] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [gendersData, setGendersData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [JsonCountries, setJsonCountries] = useState([]);
  const [openModal, toggleModal] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState("age");
  

  const visualizations = {
    mapGraph: (
      <Card className={classes.map}>
        <GeoMap data={data} api={JsonCountries} />
      </Card>
    ),
    genderGraph: (
      <Card className={classes.pieCard}>
        <DoughnutChart data={gendersData} />
      </Card>
    ),
    ageGraph: (
      <Card className={classes.ageBar}>
        <BarGraphForAge data={ageData} />
      </Card>
    ),
    
    lineGraph: (
      <Card className={classes.lineChart}>
        <StudentEnrolledLineChart data={studentByYearData} />
      </Card>
    ),
    
  };

  const FilterBarProps = {
    setGenderFilter,
    setCountryFilter,
    countries,
    faculties,
    setFacultyFilter,
    setYearFilter,
    setGradStatusFilter,
  };

  useEffect(() => {
    // fetchStudentsByYear(setStudentByYearData);
    fetchCountries(setCountries);
    fetchFaculties(setFaculties);
    fetchJsonCountries(setJsonCountries);
  }, []);

  useEffect(() => {
    fetchStudentsByYear(
      setStudentByYearData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
    fetchGenders(
      setGendersData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
    fetchAge(
      setAgeData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );

  
  }, [
    countryFilter,
    facultyFilter,
    genderFilter,
    yearFilter,
    gradStatusFilter,
  ]);

  const handleOpen = (value) => {
    setCurrentVisualization(value);
    toggleModal(true);
  };

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Saint Mary's University Students Data Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <FilterBar {...FilterBarProps} />
      </Drawer>
      

      <main className={classes.content}>
        <Card className={classes.map} onClick={() => handleOpen("mapGraph")}>
          <GeoMap data={data} api={JsonCountries} />
        </Card>
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <Card
            className={classes.pieCard}
            onClick={() => handleOpen("genderGraph")}
          >
            <DoughnutChart data={gendersData} />
          </Card>
          <Card
            className={classes.ageBar}
            onClick={() => handleOpen("ageGraph")}
          >
            <BarGraphForAge data={ageData} />
          </Card>
        </div>
        <div style={{ display: "flex", marginBottom: "25px" }}>
          
          <Card
            className={classes.lineChart}
            onClick={() => handleOpen("lineGraph")}
          >
            <StudentEnrolledLineChart data={studentByYearData} />
          </Card>
        </div>

      </main>
    </div>
  );
}
