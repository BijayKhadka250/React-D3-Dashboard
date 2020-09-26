import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import fetch from "./utils/fetch";
import endpoints from "./utils/endpoints";
import Doughnut from "./components/doughnut";
import LineChart from "./components/LineChart"

import Stack from './components/Stack'
import GeoMap from './components/GeoMap'
import data from './components/GeoChart.world.geo.json'
// import Worldmap from './components/WorldMap'
import Switch from './components/Switch'
import { color } from "d3";
import './dashboard.css'
import PieChartGrad from './components/PieChartGrad'
import AgeBarGraphs from './components/AgeBarGraph'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { ListItem } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FacultyBarGraph from './components/FacultyBarGraph'
import CGPAPieChart from './components/CGPAPieChart'
import ResidencyBarGraph from './components/ResidencyBarGraph'
import DoughnutChart from './components/DoughnutChart'
import PieChartResidency from './components/PieChartResidency'
import StudentEnrolledLineChart from './components/StudentEnrolledLineChart'
import PieChartPTFT from './components/PieChartPTFT'
import Modal from "@material-ui/core/Modal";
import TotalStudentsMeter from './components/TotalStudentsMeter';
import BarGraphCountryPop from './components/BarGraphCountryPop';
const drawerWidth = 350;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  gridMain: {
    padding: "16px"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  toolbar: theme.mixins.toolbar
  
}));

const defaultGender = [
  {
    value: 0,
    level: ""
  }
];

const defaultGradUnder = [
  {
    count: 0,
    label: ""
  }
];
const defaultGeoJson = {
  type : "",
  features : []
}






const Dashboard = () => {
  const classes = useStyles();
  const [country, setCountry] = useState('any');
  const [faculty, setFaculty] = useState('any');
  const [year,setYear] = useState('any');
  const [gender,setGender] = useState('any');
  const [level,setLevel] = useState('any');
  const [countries, setCountries] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [years, setYears] = useState([]);
  const [levels, setLevels] = useState([]);
  const [genders, setGenders] = useState(defaultGender);
  const [genderies,setGenderies] = useState([])
  const [StudentsByYear, setStudentsByYear] = useState([]);
  const [GradUnderGrad, setGradUnderGrad] = useState(defaultGradUnder);
  const [data1, setdata1] = useState([])
  const [data2, setdata2] = useState([])
  const [multipleCountry, setMultipleCountry] = useState("")
  
  const [JsonCountries, setJsonCountries] = useState([]);
  const[GradData,setGradData] = useState(null)
  const[color,setColor] = useState("")
  const[studentsByAge,setStudentsByAge] = useState([])
  const[studentsByFaculty,setStudentsByFaculty] = useState([])
  const [GeoJsonCountries, setGeoJsonCountries] = useState(defaultGeoJson);
  const[studentCGPA,setstudentCGPA] = useState([]);
  const[studentResidency,setStudentResidency] = useState([]);
  const[studentsGender,setStudentGender] = useState([]);
  const[fullPart,setFullPart] = useState([]);
  const [openModal, toggleModal] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState("age");
  const[totalStudents,setTotalStudents] = useState(0)
  const[StudentsByCountry,setStudentsByCountry] = useState([])

  const visualizations = {
    mapGraph: (
      <Card className={classes.map}>
        <GeoMap data={GeoJsonCountries} api={JsonCountries} />
      </Card>
    ),
    genderDunotGraph: (
      <Card className={classes.pieCard}>
        <DoughnutChart data={studentsGender} />
      </Card>
    ),
    ageGraph: (
      <Card className={classes.ageBar}>
        <AgeBarGraphs data={studentsByAge} />
      </Card>
    ),
    
    lineGraph: (
      <Card className={classes.lineChart}>
        <StudentEnrolledLineChart data={StudentsByYear} />
      </Card>
    ),
    // meterGraph: (
    //   <Card className={classes.meter}>
    //     <TotalStudentsMeter data={totalStudentsfiltered} />
    //     <h1 style={{ marginTop: 0 }}>Students</h1>
    //   </Card>
    // ),
    facultyBarGraph: (
      <Card className={classes.facultySpikyBar}>
        <FacultyBarGraph data={studentsByFaculty} />
      </Card>
    ),
    gradPieChart: (
      <Card className={classes.gradStat}>
        <PieChartGrad data={GradUnderGrad} />
      </Card>
    ),
    cgpaPieChart: (
      <Card>
        <CGPAPieChart data={studentCGPA} />
      </Card>
    ),
    ResidencyhalfPieChart: (
      <Card className={classes.halfPie}>
        <PieChartResidency data={studentResidency} />
      </Card>
    ),
    ptftPieChart: (
      <Card className={classes.ptftPie}>
        <PieChartPTFT data={fullPart} />
      </Card>
    )

    // countryPop: (
    //   <Card className={classes.countrypop}>
    //     <BarGraphCountryPop data={countriesByStudentCount} />
    //   </Card>
    // ),
    
  };


  
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const resp = await fetch("GET", endpoints.fetchCountries);
        // console.log(resp);
        const countryArray = resp.map(country => country.citizenship);
        console.log(countryArray)
        setCountries(countryArray);
        // console.log(countries);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchFaculties = async() => {
      try {
        const resp = await fetch("GET", endpoints.fetchFaculties);
        // console.log(resp);
        const facultiesArray = resp.map(faculties => faculties.faculty);
        setFaculties(facultiesArray);
       
      } catch (e) {
        console.log(e);
      }

    }

    


    

    const fetchJsonCountries = async() => {
      try {
        const JsonCountry = await fetch("GET", endpoints.fetchApi);
        // console.log(JsonCountry);
        // console.log(JsonCountry.features);

        //const countryArray = resp.map(country => country.citizenship);
        setJsonCountries(JsonCountry);
        // console.log(JsonCountries);


      } catch (e) {
        console.log(e);
      }
    };

    const fetchGeoJsonCountries =async() => {
      try {
        const JsonCountry = await fetch("GET", "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
        console.log(JsonCountry);
        // console.log(JsonCountry.features);

        //const countryArray = resp.map(country => country.citizenship);
        setGeoJsonCountries(JsonCountry);
        console.log(GeoJsonCountries);


      } catch (e) {
        console.log(e);
      }
    }



    
    const fetchAges = async() => {
      const body = {
        gender,
        country,
        level,
        year,
        faculty
        
      }
      if (body.gender.length == 0){
        body.gender = "any"
      }
      if (body.country.length == 0){
        body.country = "any"
      }
      if (body.level.length == 0){
        body.level = "any"
      }
      if (body.year.length == 0){
        body.year = "any"
      }
      if (body.faculty.length == 0){
        body.faculty = "any"
      }
      console.log(body)
      const resp = await fetch("POST", endpoints.fetchAges, body);
      console.log(resp)
      var array = []
      
      resp.map(student => {
        var a = {"group" : "15-20","value": student.age15to20}
        array.push(a)
        var b = {"group" : "20-25","value": student.age20to25}
        array.push(b)
        var c = {"group" : "25-30","value": student.age25to30}
        array.push(c)
        var d = {"group" : "30-35","value": student.age30to35}
        array.push(d)
        var e = {"group" : "35-40","value": student.age35to40}
        array.push(e)   
        var f = {"group" : "40-45","value": student.age40to45}
        array.push(f) 
        var g = {"group" : "45-50","value": student.age45to50}
        array.push(g)   
        var h = {"group" : "50-55","value": student.age50to55}
        array.push(h)
        var i = {"group" : "55-60","value": student.age55to60}
        array.push(i)    
      })        
      console.log(array)
       setStudentsByAge(array)
    }

    const fetchGradAndUnderGrad = async() => {
      const body = {
        gender,
        country,
        level,
        year,
        faculty
        
      }

      
       if (body.gender.length == 0){
        body.gender = "any"
      }
      if (body.country.length == 0){
        body.country = "any"
      }
      if (body.level.length == 0){
        body.level = "any"
      }
      if (body.year.length == 0){
        body.year = "any"
      }
      if (body.faculty.length == 0){
        body.faculty = "any"
      }
     
      console.log(body)
      console.log(body.gender)
      const resp = await fetch("POST", endpoints.fetchGradUndergrad,body);
      console.log(resp)
      setGradUnderGrad(resp)
     
    }

    const fetchStudentsByFaculties = async() => {
      const body = {
        gender,
        country,
        level,
        year,
        faculty
        
      }
      if (body.gender.length == 0){
        body.gender = "any"
      }
      if (body.country.length == 0){
        body.country = "any"
      }
      if (body.level.length == 0){
        body.level = "any"
      }
      if (body.year.length == 0){
        body.year = "any"
      }
      if (body.faculty.length == 0){
        body.faculty = "any"
      }
      const resp = await fetch("POST", endpoints.fetchStudentsByFaculty,body);
      console.log(resp)
      setStudentsByFaculty(resp)    
     
    }

    const fetchcgpa = async() => {
      const body = {
        gender,
        country,
        level,
        year,
        faculty
        
      }
      if (body.gender.length == 0){
        body.gender = "any"
      }
      if (body.country.length == 0){
        body.country = "any"
      }
      if (body.level.length == 0){
        body.level = "any"
      }
      if (body.year.length == 0){
        body.year = "any"
      }
      if (body.faculty.length == 0){
        body.faculty = "any"
      }

      const resp = await fetch("POST", endpoints.fetchCGPA, body);
      console.log(resp)
      var array = []
      
      resp.map(student => {
        var a = {"group" : "0-1","value": student.cgpa0to1}
        array.push(a)
        var b = {"group" : "1-2","value": student.cgpa1to2}
        array.push(b)
        var c = {"group" : "2-3","value": student.cgpa2to3}
        array.push(c)
        var d = {"group" : "3-4","value": student.cgpa3to4}
        array.push(d)
        var e = {"group" : "4-4.3","value": student.cgpa4to5}
        array.push(e)        
      }) 
      setstudentCGPA(array)       
      console.log(array)
    }

    const fetchResidency = async() => {
      
        const body = {
          gender,
          country,
          level,
          year,
          faculty
          
        }
        if (body.gender.length == 0){
          body.gender = "any"
        }
        if (body.country.length == 0){
          body.country = "any"
        }
        if (body.level.length == 0){
          body.level = "any"
        }
        if (body.year.length == 0){
          body.year = "any"
        }
        if (body.faculty.length == 0){
          body.faculty = "any"
        }
        console.log(body)
        const resp = await fetch("POST", endpoints.fetchResidency,body);
        console.log(resp);
        setStudentResidency(resp)    
    
    }

    const fetchGenders = async() => {
      
      const body = {
        gender,
        country,
        level,
        year,
        faculty
        
      }
      if (body.gender.length == 0){
        body.gender = "any"
      }
      if (body.country.length == 0){
        body.country = "any"
      }
      if (body.level.length == 0){
        body.level = "any"
      }
      if (body.year.length == 0){
        body.year = "any"
      }
      if (body.faculty.length == 0){
        body.faculty = "any"
      }
      console.log(body)
      const resp = await fetch("POST", endpoints.fetchGender,body);
      console.log(resp);
      setStudentGender(resp)    
  
  }

  const fetchStudentsByYear = async() => {
      
    const body = {
      gender,
      country,
      level,
      year,
      faculty
      
    }
    if (body.gender.length == 0){
      body.gender = "any"
    }
    if (body.country.length == 0){
      body.country = "any"
    }
    if (body.level.length == 0){
      body.level = "any"
    }
    if (body.year.length == 0){
      body.year = "any"
    }
    if (body.faculty.length == 0){
      body.faculty = "any"
    }
    console.log(body)
    const resp = await fetch("POST", endpoints.fetchStudentsByYear,body);
    console.log(resp);
    setStudentsByYear(resp)    

}

const fetchFulltimeParttime = async() => {
      
  const body = {
    gender,
    country,
    level,
    year,
    faculty
    
  }
  if (body.gender.length == 0){
    body.gender = "any"
  }
  if (body.country.length == 0){
    body.country = "any"
  }
  if (body.level.length == 0){
    body.level = "any"
  }
  if (body.year.length == 0){
    body.year = "any"
  }
  if (body.faculty.length == 0){
    body.faculty = "any"
  }
  console.log(body)
  const resp = await fetch("POST", endpoints.fetchFulltimeParttime,body);
  console.log(resp);
  setFullPart(resp)    

}
const fetchTotalStudents = async() => {
      
  const body = {
    gender,
    country,
    level,
    year,
    faculty
    
  }
  if (body.gender.length == 0){
    body.gender = "any"
  }
  if (body.country.length == 0){
    body.country = "any"
  }
  if (body.level.length == 0){
    body.level = "any"
  }
  if (body.year.length == 0){
    body.year = "any"
  }
  if (body.faculty.length == 0){
    body.faculty = "any"
  }
  console.log(body)
  const resp = await fetch("POST", endpoints.fetchTotalStudents,body);
  console.log(resp[0].count);
  setTotalStudents(resp[0].count)    

}

const fetchStudentsByCountry = async() => {
      
  const body = {
    gender,
    country,
    level,
    year,
    faculty
    
  }
  if (body.gender.length == 0){
    body.gender = "any"
  }
  if (body.country.length == 0){
    body.country = "any"
  }
  if (body.level.length == 0){
    body.level = "any"
  }
  if (body.year.length == 0){
    body.year = "any"
  }
  if (body.faculty.length == 0){
    body.faculty = "any"
  }
  console.log(body)
  const resp = await fetch("POST", endpoints.fetchStudentsByCountry,body);
  console.log(resp);
  setStudentsByCountry(resp)    

}

  setYears(["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"])
  console.log(years)

  setGenderies(["M","F"])

  setLevels(["Graduate","UnderGraduate"])


    if (countries.length < 1) fetchCountries();
    
    if(faculties.length<1) fetchFaculties();
    
    fetchJsonCountries();

    fetchGradAndUnderGrad();
    
      fetchAges();
      fetchStudentsByFaculties();
      fetchGeoJsonCountries();
      fetchcgpa();
      fetchResidency();
      fetchGenders();
      fetchStudentsByYear();
      fetchFulltimeParttime();
      fetchTotalStudents();
      fetchStudentsByCountry();
  }, [countries, country,faculties,faculty,year,multipleCountry,level,gender]);

  

  const handleCountryChange = async (event, country) => {
    // console.log(country)
    setCountry(country);

  };
  const handleFacultiesChange = async (event, fac) => {
    console.log(fac)  
    setFaculty(fac)
    // console.log(faculty)
  }
  const handleYearsChange = async(event, year) =>{
    console.log(year)
    setYear(year)
  }

  const handleGenderChange = async(event,gender) => {
    setGender(gender)
  }
  
  const handleLevelChange = async(event,level) => {
      setLevel(level)
  }
  const handleOpen = (value) => {
    setCurrentVisualization(value);
    toggleModal(true);
  };

  const handleClose = () => {
    toggleModal(false);
  };
  
 

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            SMU Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    <Drawer
    className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        // anchor="left"
    >
       <Toolbar />
       <div className={classes.drawerContainer} >
          <Toolbar />
          <Typography variant="h6" align="center" noWrap>
            Filters
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
          <ListItem>
          <Autocomplete
              multiple
              id="checkboxes-country-selector"
              options={countries}
              disableCloseOnSelect
              getOptionLabel={option => option}
              
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Country" placeholder="Favorites" variant="outlined" />
              )}
              onChange={handleCountryChange}
            />                  
          </ListItem>
          <ListItem>
          <Autocomplete
              multiple
              id="faculties-selector"
              
              options={faculties}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    // style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Faculty" variant="outlined" placeholder="Favorites" />
              )}
              onChange={handleFacultiesChange}
            />
          </ListItem>
          <ListItem>
          <Autocomplete
              multiple
              id="year-selector"
              options={years}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    // style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Year" variant="outlined" placeholder="Favorites" />
              )}
              onChange={handleYearsChange}
            />                  
          </ListItem>
          <ListItem>
          <Autocomplete
              multiple
              id="gender-selector"
              options={genderies}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    // style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Gender" variant="outlined" placeholder="Favorites"/>
              )}
              onChange={handleGenderChange}
            />                  
          </ListItem>
          <ListItem>
          <Autocomplete
              multiple
              id="level-selector"
              options={levels}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    // style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Level" variant="outlined" placeholder="Favorites" />
              )}
              onChange={handleLevelChange}
            />                  
          </ListItem>
          
          </List>
      </div>
       
    </Drawer>
    <main className={classes.content}>
      <Toolbar />

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
      <div className={classes.root1}>
      <Grid container spacing={3}>
        <Grid item xs={12} 
        onClick={() => handleOpen("mapGraph")}
        >
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center" noWrap>
            Students From Various Country in SMU
          </Typography>
            <GeoMap data={GeoJsonCountries} api={JsonCountries}/>
          </Paper>
        </Grid>
        <Grid 
        item xs={6} 
        onClick={() => handleOpen("ageGraph")}
        >
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center" noWrap>
            Age-group vs Students 
          </Typography>
            <AgeBarGraphs data = {studentsByAge}/> 
          </Paper>
        </Grid>
        <Grid item xs={6} 
        onClick={() => handleOpen("lineGraph")}
        >
        
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center" noWrap>
            SMU Students By Year
          </Typography>
            <StudentEnrolledLineChart data={StudentsByYear} />
          </Paper>
        </Grid>
        <Grid item xs={6} 
        onClick={() => handleOpen("gradPieChart")}
        >
        
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center" noWrap>
            Graduate and UnderGraduate Students 
          </Typography>
            <PieChartGrad data = {GradUnderGrad}/>
          </Paper>
        </Grid>
        <Grid item xs={6}  
        onClick={() => handleOpen("facultyBarGraph")}
        >
        
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center" noWrap>
            Faculties 
          </Typography>
            <FacultyBarGraph data={studentsByFaculty}/>
          </Paper>
        </Grid>
        <Grid item xs={6} 
        onClick={() => handleOpen("cgpaPieChart")}
        >
        
          <Paper className={classes.paper}>
          <Typography variant="h6" align="center" noWrap>
            Students CGPA 
          </Typography>
            <CGPAPieChart data = {studentCGPA}/>
          </Paper>
        </Grid>
        <Grid item xs={6} 
        onClick={() => handleOpen("ResidencyhalfPieChart")}
        >
        
        <Paper className={classes.paper}>
        <Typography variant="h6" align="center" noWrap>
          Residency Status
        </Typography>
          <PieChartResidency data = {studentResidency}/>
        </Paper>
      </Grid>
      <Grid item xs={6} 
      onClick={() => handleOpen("genderDunotGraph")}
      >
        
        <Paper className={classes.paper}>
        <Typography variant="h6" align="center" noWrap>
          Students Gender
        </Typography>
           <DoughnutChart data = {studentsGender}/>
        </Paper>
      </Grid>
      <Grid item xs={6} 
      onClick={() => handleOpen("ptftPieChart")}
      >
        
        <Paper className={classes.paper}>
        <Typography variant="h6" align="center" noWrap>
          Full-Time Part-Time Students
        </Typography>
           <PieChartPTFT data = {fullPart}/>
        </Paper>
      </Grid>
      {/* <Card
        className={classes.meter}
           onClick={() => handleOpen("meterGraph")}>
           <TotalStudentsMeter data={totalStudents} />
          <h3 style={{ marginTop: 0 }}>% of students from each category vs overall student count(%)</h3>
        </paper>
       </Card> */}
      <Grid item xs={6} 
      // onClick={() => handleOpen("ptftPieChart")}
      >
        
        <Paper className={classes.paper}>
        <Typography variant="h6" align="center" noWrap>
          % of students from each category vs overall students count
        </Typography>
           <TotalStudentsMeter data={totalStudents} />
        </Paper>
      </Grid>
      <Grid item xs={6} 
      // onClick={() => handleOpen("ptftPieChart")}
      >
        
        <Paper className={classes.paper}>
        <Typography variant="h6" align="center" noWrap>
          Students in SMU from top 10 countries
        </Typography>
           <BarGraphCountryPop data={StudentsByCountry} />
        </Paper>
      </Grid>

      </Grid>

      
      
      </div>
      
    </main>
    </div>

   
  );
};

export default Dashboard;
