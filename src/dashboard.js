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
import Doughnut from "./components/doughnut";
import BarGraphForAge from "./components/BarGraphForAge";
import StudentEnrolledLineChart from "./components/StudentEnrolledLineChart";
import "react-circular-progressbar/dist/styles.css";
import TotalStudentsMeter from "./components/TotalStudentsMeter";
import { color } from "d3";
import FacultyBarGraph from "./components/FacultyBarGraph";
import PieChartGrad from "./components/PieChartGradUngrad";
import CGPAPieChart from "./components/CGPAPieChart";
import PieChartResidency from "./components/PieChartResidency";

import FilterBar from "./filters";
import PieChartPTFT from "./components/PieChartPTFT";
// import BarGraphCountryPop from "./components/BarGraphCountryPop";

import {
  fetchStudentsByYear,
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchGeoJsonCountries,
  fetchAge,
  fetchGenders,
  fetchTotalStudents,
  fetchFaculty,
  fetchLevel,
  fetchCGPA,
  fetchResidency,
  fetchPtFt,
  fetchCountriesStudent,
} from "./utils/apiStore";

const drawerWidth = 280;
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

  ageBar: {
    maxWidth: 500,
    marginLeft: 18,
  },
  lineChart: {
    maxWidth: 600,
    marginLeft: 18,
  },
  meter: {
    width: 300,
    marginLeft: 18,
  },
  halfPie: {
    maxWidth: 350,
  },
  cgpaGraph: {
    maxWidth: 370,
    
  },
  ptftPie: {
    maxWidth: 500,
    marginLeft: 18,
  },
  facultySpikyBar: {
    maxWidth: 415,
  },
  gradStat: {
    maxWidth: 370,
    marginLeft: 18,
  },
  map: {
    marginBottom: 20,
  },

  countrypop: {
    marginLeft: 18,
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const defaultGeoJson = {
  type : "",
  features : []
}

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
  const [totalStudentsfiltered, setTotalStudentsfiltered] = useState(0);
  const [GeoJsonCountries, setGeoJsonCountries] = useState(defaultGeoJson);
  const [facultyData, setFacultyData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [cgpa, setCGPA] = useState([]);
  const [residencyData, setResidencyData] = useState([]);
  const [ptftData, setptftData] = useState([]);
  const [countriesByStudentCount, setCountriesByStudentCount] = useState([]);
  

  const visualizations = {
    mapGraph: (
      <Card className={classes.map}>
        <GeoMap data={data} api={GeoJsonCountries} />
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
    meterGraph: (
      <Card className={classes.meter}>
        <TotalStudentsMeter data={totalStudentsfiltered} />
        <h1 style={{ marginTop: 0 }}>Students</h1>
      </Card>
    ),
    facultyGraph: (
      <Card className={classes.facultySpikyBar}>
        <FacultyBarGraph data={facultyData} />
      </Card>
    ),
    gradStatusGraph: (
      <Card className={classes.gradStat}>
        <PieChartGrad data={levelData} />
      </Card>
    ),
    cgpaGraph: (
      <Card>
        <CGPAPieChart data={cgpa} />
      </Card>
    ),
    halfPie: (
      <Card className={classes.halfPie}>
        <PieChartResidency data={residencyData} />
      </Card>
    ),
    ptftPie: (
      <Card className={classes.ptftPie}>
        <PieChartPTFT data={ptftData} />
      </Card>
    ),

    // countryPop: (
    //   <Card className={classes.countrypop}>
    //     <BarGraphCountryPop data={countriesByStudentCount} />
    //   </Card>
    // ),
    
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
    fetchGeoJsonCountries(setGeoJsonCountries);
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
    fetchTotalStudents(
      setTotalStudentsfiltered,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
    fetchFaculty(
      setFacultyData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
    fetchLevel(
      setLevelData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
    fetchCGPA(
      setCGPA,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );
    fetchResidency(
      setResidencyData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );

    fetchPtFt(
      setptftData,
      countryFilter,
      facultyFilter,
      genderFilter,
      yearFilter,
      gradStatusFilter
    );

    fetchCountriesStudent(
      setCountriesByStudentCount,
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

      <Modal open={openModal} onClose={handleClose}>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => handleClose()}
        >
          {visualizations[currentVisualization]}
        </div>
      </Modal>
      


      <main className={classes.content}>
        <Card className={classes.map} onClick={() => handleOpen("mapGraph")}>
          <GeoMap data={data} api={GeoJsonCountries} />
        </Card>



    <div style={{ display: "flex", marginBottom: "25px" }}>
        <Card
           className={classes.pieCard}
            onClick={() => handleOpen("genderGraph")}>
              {/* <Typography variant="h6" align="center" noWrap>
                   Genderwise Student data 
              </Typography> */}
             <DoughnutChart data={gendersData} />
             <h3 style={{ marginTop: 0 }}>Genderwise Student Data</h3>
           {/* </paper>  */}
        </Card>

      <Card
          className={classes.ageBar}
          onClick={() => handleOpen("ageGraph")}>
          {/* <Typography variant="h6" align="center" noWrap>
             Student count for different age group 
          </Typography> */}
          <BarGraphForAge data={ageData} />
          <h3 style={{ marginTop: 0 }}>Student count for different age group</h3> 
        {/* </paper>   */}
     </Card>
     <Card
        className={classes.meter}
           onClick={() => handleOpen("meterGraph")}>
           {/* <Typography variant="h6" align="center" noWrap>
                      % contribution of each country 
           </Typography> */}
           <TotalStudentsMeter data={totalStudentsfiltered} />
          <h3 style={{ marginTop: 0 }}>Students</h3>
        {/* </paper> */}
       </Card>
    </div>

      <div style={{ display: "flex", marginBottom: "30px" }}>  
      <Card 
        className={classes.paper}
        onClick={() => handleOpen("facultyGraph")}>
          <FacultyBarGraph data={facultyData}/>
          <h3 style={{ marginTop: 0 }}>Faculty Department</h3>
      </Card>

       <Card
           className={classes.lineChart}
           onClick={() => handleOpen("lineGraph")}>
           {/* <Typography variant="h6" align="center" noWrap>
              Student count from 2011 to 2020 
           </Typography> */}
           <StudentEnrolledLineChart data={studentByYearData} />
           <h3 style={{ marginTop: 0 }}>Student count from 2011 to 2020</h3>
      </Card>
    </div>

    <div style={{ display: "flex", marginBottom: "25px" }}>
    <Card
            className={classes.halfPie}
            onClick={() => handleOpen("halfPie")}
          >
            <PieChartResidency data={residencyData} />
            <h3 style={{ marginTop: 0 }}>student data based on Residence</h3>
    </Card>
    <Card
            className={classes.ptftPie}
            onClick={() => handleOpen("ptftPie")}
          >
            <PieChartPTFT data={ptftData} />
            <h3 style={{ marginTop: 0 }}>part time v/s full time</h3>
    </Card>
    <Card
            className={classes.gradStat}
            onClick={() => handleOpen("gradStatusGraph")}
          >
            <PieChartGrad data={levelData} />
            <h3 style={{ marginTop: 0 }}>graduate / undergraduate data</h3>
    </Card> 
    </div>  

    <div style={{ display: "flex", marginBottom: "25px" }}>
    <Card
          className={classes.cgpaGraph}
          onClick={() => handleOpen("cgpaGraph")}
        >
          <CGPAPieChart data={cgpa} />
          <h3 style={{ marginTop: 0 }}>CGPA</h3>
    </Card> 


    </div> 

      </main>
    </div>
  );
}
