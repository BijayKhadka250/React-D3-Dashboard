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
    label: ""
  }
];





const Dashboard = () => {
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [faculty, setFaculty] = useState("");
  const [year,setYear] = useState("");
  const [countries, setCountries] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [years, setYears] = useState([]);
  const [levels, setLevels] = useState([]);
  const [genders, setGenders] = useState(defaultGender);
  const [genderies,setGenderies] = useState([])
  const [StudentsByYearArray, setStudentsByYears] = useState([]);
  const [GradUnderGradArray, setGradUnderGrad] = useState([]);
  const [data1, setdata1] = useState([])
  const [data2, setdata2] = useState([])
  
  const [JsonCountries, setJsonCountries] = useState([]);
  const[GradData,setGradData] = useState(null)
  const[color,setColor] = useState("")
  const[studentsByAge,setStudentsByAge] = useState([])

  
  
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

    const fetchGrad = async() => {
      try {
        const Grad = await fetch("GET", endpoints.fetchGrad);
        // console.log(Grad);
        // data1 = Grad
        setdata1(Grad)
        
        // console.log(JsonCountry.features);

        //const countryArray = resp.map(country => country.citizenship);
        // setJsonCountries(JsonCountry);
        // console.log(JsonCountries);
        
        // setGradData(Grad)


      } catch (e) {
        console.log(e);
      }
    };

    const fetchUnderGrad = async() => {
      try {
        const UnderGrad = await fetch("GET", endpoints.fetchUnderGrad);
        // console.log(UnderGrad);
        // console.log(JsonCountry.features);

        //const countryArray = resp.map(country => country.citizenship);
        // setJsonCountries(JsonCountry);
        // console.log(JsonCountries);
        setdata2(UnderGrad)


      } catch (e) {
        console.log(e);
      }
    };

    const fetchStudentsByYear = async() => {
      try {
        const StudentsByYear = await fetch("GET", endpoints.fetchStudentsByYear);
        // console.log(StudentsByYear);
        const students = StudentsByYear.map(student => ({
          Enroll_Year: +student.Enroll_Year,
          total: student.total
        }));
        // console.log(students)
        setStudentsByYears(students)
        // console.log(StudentsByYearArray)
        
      }
      catch (e) {
        console.log(e);
      }
    }

      
     
    
    const fetchGendersByCountry = async () => {
      const body = {
        country
      };
      console.log(body)
      const resp = await fetch("POST", endpoints.fetchGenderByCountry, body);
      console.log(resp)
      const genders = resp.map(gender => ({
        value: gender.count,
        label: gender.gender
      }));
      // console.log(genders)
      setGenders(genders);
      // console.log(genders);
      // console.log(countries);
    };
    const fetchStudentsByAge = async() => {
      const resp = await fetch("GET",endpoints.fetchStudentsByAge)
      var array = []
      // console.log(resp)
      resp.map(student => {
        var a = {"group" : "10-20","value": student.age10to20}
        array.push(a)
        var b = {"group" : "20-30","value": student.age20to30}
        array.push(b)
        var c = {"group" : "30-40","value": student.age30to40}
        array.push(c)
        var d = {"group" : "40-50","value": student.age40to50}
        array.push(d)
        var e = {"group" : "50-60","value": student.age50to60}
        array.push(e)        
      })        
      // console.log(array)
       setStudentsByAge(array)
    }

    const fetchAgeByCountry = async() => {
      const body = {
        country
      };
      const resp = await fetch("POST", endpoints.fetchAgeByCountry, body);
      console.log(resp)
      var array = []
      
      resp.map(student => {
        var a = {"group" : "10-20","value": student.age10to20}
        array.push(a)
        var b = {"group" : "20-30","value": student.age20to30}
        array.push(b)
        var c = {"group" : "30-40","value": student.age30to40}
        array.push(c)
        var d = {"group" : "40-50","value": student.age40to50}
        array.push(d)
        var e = {"group" : "50-60","value": student.age50to60}
        array.push(e)        
      })        
      console.log(array)
       setStudentsByAge(array)

    }
    const fetchAgeByFaculty = async() => {
      const body = {
        faculty
      };
      console.log(body)
      
      const resp = await fetch("POST", endpoints.fetchAgeByFaculty, body);
      console.log(resp)
      var array = []
      
      resp.map(student => {
        var a = {"group" : "10-20","value": student.age10to20}
        array.push(a)
        var b = {"group" : "20-30","value": student.age20to30}
        array.push(b)
        var c = {"group" : "30-40","value": student.age30to40}
        array.push(c)
        var d = {"group" : "40-50","value": student.age40to50}
        array.push(d)
        var e = {"group" : "50-60","value": student.age50to60}
        array.push(e)        
      })        
      console.log(array)
       setStudentsByAge(array)
      // setStudentsByAge(resp)

    }

    const fetchAgeByFacultyAndCountry = async() => {
      const body = {
        faculty,
        country
      };
      console.log(body)
      
      const resp = await fetch("POST", endpoints.fetchAgeByFacultyAndCountry, body);
      console.log(resp)
      var array = []
      
      resp.map(student => {
        var a = {"group" : "10-20","value": student.age10to20}
        array.push(a)
        var b = {"group" : "20-30","value": student.age20to30}
        array.push(b)
        var c = {"group" : "30-40","value": student.age30to40}
        array.push(c)
        var d = {"group" : "40-50","value": student.age40to50}
        array.push(d)
        var e = {"group" : "50-60","value": student.age50to60}
        array.push(e)        
      })        
      console.log(array)
       setStudentsByAge(array)
    }

  setYears(["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"])
  console.log(years)

  setGenderies(["Male","Female"])

  setLevels(["Graduate","UnderGraduate"])


    if (countries.length < 1) fetchCountries();
    if(country) fetchGendersByCountry();
    if (country && faculty == false) fetchAgeByCountry();
    fetchStudentsByYear();
    if(faculties.length<1) fetchFaculties();
    if(faculty && country == false) fetchAgeByFaculty();
    if(faculty && country) fetchAgeByFacultyAndCountry();
    
    
    // fetchGradUnderGrad();
    fetchGrad();
    fetchJsonCountries();
    fetchUnderGrad();
    if (country == false) fetchStudentsByAge();
  }, [countries, country,faculties,faculty]);

  

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
  
  const handleChangeData = (d,color) => {
    // setData(generateData(null, Math.floor(Math.random() * 10 + 1)));
    setGradData(d)
    setColor(color)
   
  };

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
            Filter
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
          <ListItem>
          <Autocomplete
              id="country-selector"
              options={countries}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Country" variant="outlined" />
              )}
              onChange={handleCountryChange}
            />                  
          </ListItem>
          <ListItem>
          <Autocomplete
              id="faculties-selector"
              options={faculties}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Faculty" variant="outlined" />
              )}
              onChange={handleFacultiesChange}
            />
          </ListItem>
          <ListItem>
          <Autocomplete
              id="year-selector"
              options={years}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Year" variant="outlined" />
              )}
              onChange={handleYearsChange}
            />                  
          </ListItem>
          <ListItem>
          <Autocomplete
              id="gender-selector"
              options={genderies}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Gender" variant="outlined" />
              )}
              // onChange={handleYearsChange}
            />                  
          </ListItem>
          <ListItem>
          <Autocomplete
              id="level-selector"
              options={levels}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                // {console.log(params)}
                <TextField {...params} label="Level" variant="outlined" />
              )}
              // onChange={handleYearsChange}
            />                  
          </ListItem>
          </List>
      </div>
       
    </Drawer>
    <main className={classes.content}>
      <Toolbar />
      <div className={classes.root1}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <GeoMap data={data} api={JsonCountries}/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <AgeBarGraphs data = {studentsByAge}/> 
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Doughnut data={genders} />
          </Paper>
        </Grid>
      </Grid>
      </div>
      
    </main>
    </div>

    // <div>
    // <Box display="flex" p={2}>
    //   <Card>
    //     <Grid
    //       container
    //       classes={{ root: classes.gridMain }}
    //       alignItems="center"
    //       justify="center"
    //       spacing={4}
    //     >
    //       <Grid item>
    //         <Autocomplete
    //           id="country-selector"
    //           options={countries}
    //           getOptionLabel={option => option}
    //           style={{ width: 300 }}
    //           renderInput={params => (
    //             // {console.log(params)}
    //             <TextField {...params} label="Country" variant="outlined" />
    //           )}
    //           onChange={handleCountryChange}
    //         />
    //       </Grid>
    //       <Grid item>
    //         <Doughnut data={genders} />
    //       </Grid>
    //     </Grid>
    //     </Card>

    //     <Card className="lineChart">
    //     <Grid  container
    //       classes={{ root: classes.gridMain }}
    //       alignItems="center"
    //       justify="center"
    //       spacing={4}>
    //         <Grid item>
    //           <LineChart data={StudentsByYearArray}/>
    //         </Grid>
        

    //     </Grid>

    //   </Card>    
     
    // </Box>

    // <Box display="flex" p={2}>
    //    <Card>
    //    <button id="grad" onClick = {() => handleChangeData(data1,"#f0fc03")}>Graduate</button>
    //    <button id="undergrad" onClick={()=>handleChangeData(data2,"#0bfc03")}>UnderGraduate</button>
    //     <Grid  container
    //       classes={{ root: classes.gridMain }}
    //       alignItems="center"
    //       justify="center"
    //       spacing={4}>
           
    //         <Grid item>
                   
    //            <Switch data={GradData||data1} color={color||"f0fc03"}/>
    //         </Grid>
    //     </Grid>
    //   </Card>
    //   <Card>
    //     <Grid container
    //       classes={{ root: classes.gridMain }}
    //       alignItems="center"
    //       justify="center"
    //       spacing={4}>
    //       <Grid>
    //         <GeoMap data={data} api={JsonCountries}/>
    //       </Grid>
    //     </Grid>
    //   </Card>
    // </Box>
    // <Box>
    // <Card>
    //     <Grid container
    //       classes={{ root: classes.gridMain }}
    //       alignItems="center"
    //       justify="center"
    //       spacing={4}>
    //       <Grid>
    //       <Autocomplete
    //           id="country-selector-age"
    //           options={countries}
    //           getOptionLabel={option => option}
    //           style={{ width: 300 }}
    //           renderInput={params => (
    //             // {console.log(params)}
    //             <TextField {...params} label="Country" variant="outlined" />
    //           )}
    //           onChange={handleCountryChange}
    //         />
           
    //       </Grid>
    //       <Grid
    //       >
    //       <Autocomplete
    //           id="faculties-selector"
    //           options={faculties}
    //           getOptionLabel={option => option}
    //           style={{ width: 300 }}
    //           renderInput={params => (
    //             // {console.log(params)}
    //             <TextField {...params} label="Faculties" variant="outlined" />
    //           )}
    //           onChange={handleFacultiesChange}
    //         />
    //       </Grid>
    //     </Grid>
    //   </Card>
    // <Card>
    //     <Grid container
    //       classes={{ root: classes.gridMain }}
    //       alignItems="center"
    //       justify="center"
    //       spacing={4}>
    //       <Grid>
    //         <AgeBarGraphs data = {studentsByAge}/>
    //       </Grid>
    //     </Grid>
    //   </Card>
    // </Box>
    // </div>
  );
};

export default Dashboard;
