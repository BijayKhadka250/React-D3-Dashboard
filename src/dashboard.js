import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import endpoints from "./utils/endpoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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
import BarGraphCountryPop from "./components/BarGraphCountryPop";
import Gmap1 from "./components/Geomap1";

import {
  fetchStudentsByYear,
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchAge,
  fetchGenders,
  fetchTotalStudents,
  fetchFaculty,
  fetchLevel,
  fetchCGPA,
  fetchResidency,
  fetchPtFt,
  fetchCountriesStudent
  // fetchGeoJsonCountries,
} from "./utils/apiStore";

const drawerWidth = 280;
const height = "500px";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `100%`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  cardStd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: height
  },

  pieCard: {
    maxWidth: 500,
    margintop: 10
  },

  ageBar: {
    maxWidth: 500,
    marginLeft: 10
  },
  lineChart: {
    maxWidth: 600,
    margintop: 8
  },
  meter: {
    width: 300,
    marginLeft: 10
  },
  halfPie: {
    maxWidth: 350,
    margintop: 4
  },
  cgpaGraph: {
    maxWidth: 370
  },
  ptftPie: {
    maxWidth: 500,
    marginLeft: 10
  },
  facultySpikyBar: {
    maxWidth: 415
  },
  gradStat: {
    maxWidth: 370,
    marginLeft: 10
  },
  map: {
    marginBottom: 10
  },
  countrypop: {
    marginLeft: 10
  },
  hide: {
    display: "none"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginLeft: 10
  },
  screenWidth: {
    width: "100vw"
  }
}));

const defaultGeoJson = {
  type: "",
  features: []
};

export default function DashboardMain(props) {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme => theme.breakpoints.down("sm"));

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
  // const [JsonCountries1, setJsonCountries1] = useState([]);
  const [openModal, toggleModal] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState("age");
  const [totalStudentsfiltered, setTotalStudentsfiltered] = useState(0);
  const [facultyData, setFacultyData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [cgpa, setCGPA] = useState([]);
  const [residencyData, setResidencyData] = useState([]);
  const [ptftData, setptftData] = useState([]);
  const [countriesByStudentCount, setCountriesByStudentCount] = useState([]);
  const [open, setOpen] = React.useState(false);
  // const [GeoJsonCountries, setGeoJsonCountries] = useState(defaultGeoJson);
  // const [GeoJsonCountries1, setGeoJsonCountries1] = useState(defaultGeoJson);
  // const [MapData, setMapData] = useState([]);

  const visualizations = {
    mapGraph: (
      <Card className={classes.map}>
        <GeoMap data={data} api={JsonCountries} />
      </Card>
    ),
    mapGraph1: (
      <Card className={classes.map}>
        <Gmap1 data={data} api={JsonCountries} />
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

    countryPop: (
      <Card className={classes.countrypop}>
        <BarGraphCountryPop data={countriesByStudentCount} />
      </Card>
    )
  };

  const FilterBarProps = {
    setGenderFilter,
    setCountryFilter,
    countries,
    faculties,
    setFacultyFilter,
    setYearFilter,
    setGradStatusFilter
  };

  useEffect(() => {
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
    gradStatusFilter
  ]);

  const handleOpen = value => {
    setCurrentVisualization(value);
    toggleModal(true);
  };

  const handleClose = () => {
    toggleModal(false);
  };

  const handleShift = (shift, none) => {
    if (!sm) {
      return shift;
    }
    return open ? shift : none;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={handleShift(classes.appBarShift, classes.appBar)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={open || !sm ? classes.hide : null}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {`Saint Mary's University Students Data Dashboard`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        open={open}
        variant={
          useMediaQuery(theme => theme.breakpoints.down("sm"))
            ? "persistent"
            : "permanent"
        }
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={() => setOpen(false)}
            className={!sm ? classes.hide : null}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <FilterBar {...FilterBarProps} />
      </Drawer>

      <Modal open={openModal} onClose={handleClose}>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => handleClose()}
        >
          {visualizations[currentVisualization]}
        </div>
      </Modal>

      <main className={handleShift(classes.contentShift, classes.content)}>
        <Grid
          container
          alignItems="center"
          justifyContent={sm ? "center" : "space-between"}
          flexDirection="row"
          spacing={2}
        >
          <Grid item xs={12} className={{ item: classes.screenWidth }}>
            <Card
              className={classes.map}
              onClick={() => handleOpen("mapGraph")}
            >
              <GeoMap data={data} api={JsonCountries} />
            </Card>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("genderGraph")}
            >
              {/* <Typography variant="h6" align="center" noWrap>
                   Genderwise Student data
              </Typography> */}
              <DoughnutChart data={gendersData} />
              <h3 style={{ marginTop: 0 }}>Genderwise Student Data</h3>
              {/* </paper>  */}
            </Card>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("ageGraph")}
            >
              <BarGraphForAge data={ageData} />
              <h3 style={{ marginTop: 0 }}>
                Student count for different age group
              </h3>
              {/* </paper>   */}
            </Card>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("meterGraph")}
            >
              <TotalStudentsMeter data={totalStudentsfiltered} />
              <h3 style={{ marginTop: 0 }}>
                % of students from each category vs overall student count(%)
              </h3>
              {/* </paper> */}
            </Card>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("halfPie")}
            >
              <PieChartResidency data={residencyData} />
              <h3 style={{ marginTop: 0 }}>Student data based on residence</h3>
            </Card>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("ptftPie")}
            >
              <PieChartPTFT data={ptftData} />
              <h3 style={{ marginTop: 0 }}>Part time vs Full time</h3>
            </Card>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("cgpaGraph")}
            >
              <CGPAPieChart data={cgpa} />
              <h3 style={{ marginTop: 0 }}>CGPA</h3>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("lineGraph")}
            >
              <StudentEnrolledLineChart data={studentByYearData} />
              <h3 style={{ marginTop: 0 }}>Student count from 2011 to 2020</h3>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("facultyGraph")}
            >
              <FacultyBarGraph data={facultyData} />
              <h3 style={{ marginTop: 0 }}>student count based on faculty</h3>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("countryPop")}
            >
              <BarGraphCountryPop data={countriesByStudentCount} />
              <h3 style={{ marginTop: 0 }}>
                Top 10 international countries based on different category
              </h3>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card
              className={classes.cardStd}
              onClick={() => handleOpen("gradStatusGraph")}
            >
              <PieChartGrad data={levelData} />
              <h3 style={{ marginTop: 0 }}>Graduate vs Undergraduate</h3>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
