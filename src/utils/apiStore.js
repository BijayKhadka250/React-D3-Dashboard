import fetch from "./fetch";
import endpoints from "./endpoints";

const fetchStudentsByYear = async (
  setStudentsByYears,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  try {
    let genderFilterModified = [];

    if (genderFilter.length > 0) {
      genderFilter.forEach((item) => {
        if (item === "Male") {
          genderFilterModified.push("M");
        } else if (item === "Female") {
          genderFilterModified.push("F");
        } else if (item === "Non-Binary") {
          genderFilterModified.push("N");
        }
      });
    }

    countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
    facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
    genderFilterModified =
      genderFilter.length === 0 ? "any" : genderFilterModified;
    yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
    gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

    const body = {
      country: countryFilter,
      faculty: facultyFilter,
      gender: genderFilterModified,
      year: yearFilter,
      level: gradStatusFilter,
    };

    const StudentsByYear = await fetch(
      "POST",
      endpoints.fetchStudentsByYear,
      body
    );
    const students = StudentsByYear.map((student) => ({
      Enroll_Year: +student.Enroll_Year,
      total: student.total,
    }));
    setStudentsByYears(students);
  } catch (e) {
    console.log(e);
  }
};

const fetchCountries = async (setCountries) => {
  try {
    const resp = await fetch("GET", endpoints.fetchCountries);
    const countryArray = resp.map((country) => country.citizenship);
    setCountries(countryArray);
  } catch (e) {
    console.log(e);
  }
};


const fetchFaculties = async (setFaculties) => {
  try {
    const resp = await fetch("GET", endpoints.fetchFaculties);
    const facultiesArray = resp.map((faculties) => faculties.faculty);
    setFaculties(facultiesArray);
  } catch (e) {
    console.log(e);
  }
};

const fetchJsonCountries = async (setJsonCountries) => {
  try {
    const JsonCountry = await fetch("GET", endpoints.fetchApi);
    setJsonCountries(JsonCountry);
  } catch (e) {
    console.log(e);
  }
};

// const fetchJsonCountries = async (
//   setMapData,
//   countryFilter,
//   facultyFilter,
//   genderFilter,
//   yearFilter,
//   gradStatusFilter
// ) => {
//   let genderFilterModified = [];

//   if (genderFilter.length > 0) {
//     genderFilter.forEach((item) => {
//       if (item === "Male") {
//         genderFilterModified.push("M");
//       } else if (item === "Female") {
//         genderFilterModified.push("F");
//       } else if (item === "Non-Binary") {
//         genderFilterModified.push("N");
//       }
//     });
//   }

//   countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
//   facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
//   genderFilterModified =
//     genderFilter.length === 0 ? "any" : genderFilterModified;
//   yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
//   gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

//   const body = {
//     country: countryFilter,
//     faculty: facultyFilter,
//     gender: genderFilterModified,
//     year: yearFilter,
//     level: gradStatusFilter,
//   };

//   const resp = await fetch("POST", endpoints.fetchApi, body);
//   setMapData(resp);
// };


// const fetchGeoJsonCountries =async (setGeoJsonCountries) => {
//   try {
//     const GeoJsonCountries = await fetch("GET", "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
//     console.log(GeoJsonCountries);

//     setGeoJsonCountries(GeoJsonCountries);
//     console.log(GeoJsonCountries);


//   } catch (e) {
//     console.log(e);
//   }
// }

const fetchGenders = async (
  setGendersData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchGenders, body);
  setGendersData(resp);
};

const fetchAge = async (
  setAgeData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchAge, body);
  let studentsByAgeArray = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(3, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByAgeArray.push(tempObj);
  });

  setAgeData(studentsByAgeArray);
};


const fetchTotalStudents = async (
  setTotalStudentsfiltered,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchTotalStudents, body);

  setTotalStudentsfiltered(resp[0].count);
};


//adding facultybargraph
const fetchFaculty = async (
  setFacultyData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchFaculty, body);

  setFacultyData(resp);
};

//adding cgpa graph
const fetchCGPA = async (
  setCGPA,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchCGPA, body);
  let studentsByCGPA = [];
  Object.entries(resp[0]).forEach(([key, value]) => {
    let tempObj = {};
    tempObj.group = `${key.substring(4, 5)}-${key.substring(7)}`;
    tempObj.value = value;
    studentsByCGPA.push(tempObj);
  });

  setCGPA(studentsByCGPA);
};

// adding residency pie chart
const fetchResidency = async (
  setResidencyData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchResidency, body);

  setResidencyData(resp);
};


// adding level(grad and undergrad) pie chart
const fetchLevel = async (
  setLevelData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };
  
  const resp = await fetch("POST", endpoints.fetchLevel, body);
  setLevelData(resp);
};

const fetchPtFt = async (
  setPtFtData,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  let genderFilterModified = [];

  if (genderFilter.length > 0) {
    genderFilter.forEach((item) => {
      if (item === "Male") {
        genderFilterModified.push("M");
      } else if (item === "Female") {
        genderFilterModified.push("F");
      } else if (item === "Non-Binary") {
        genderFilterModified.push("N");
      }
    });
  }

  countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
  facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
  genderFilterModified =
    genderFilter.length === 0 ? "any" : genderFilterModified;
  yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
  gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

  const body = {
    country: countryFilter,
    faculty: facultyFilter,
    gender: genderFilterModified,
    year: yearFilter,
    level: gradStatusFilter,
  };

  const resp = await fetch("POST", endpoints.fetchPtFt, body);

  setPtFtData(resp);
};

const fetchCountriesStudent = async (
  setCountriesByStudentCount,
  countryFilter,
  facultyFilter,
  genderFilter,
  yearFilter,
  gradStatusFilter
) => {
  try {
    let genderFilterModified = [];

    if (genderFilter.length > 0) {
      genderFilter.forEach((item) => {
        if (item === "Male") {
          genderFilterModified.push("M");
        } else if (item === "Female") {
          genderFilterModified.push("F");
        } else if (item === "Non-Binary") {
          genderFilterModified.push("N");
        }
      });
    }

    countryFilter = countryFilter.length === 0 ? "any" : countryFilter;
    facultyFilter = facultyFilter.length === 0 ? "any" : facultyFilter;
    genderFilterModified =
      genderFilter.length === 0 ? "any" : genderFilterModified;
    yearFilter = yearFilter.length === 0 ? "any" : yearFilter;
    gradStatusFilter = gradStatusFilter.length === 0 ? "any" : gradStatusFilter;

    const body = {
      country: countryFilter,
      faculty: facultyFilter,
      gender: genderFilterModified,
      year: yearFilter,
      level: gradStatusFilter,
    };
    const resp = await fetch("POST", endpoints.fetchCountriesStudent, body);
    setCountriesByStudentCount(resp);
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchStudentsByYear,
  fetchCountries,
  fetchFaculties,
  // fetchGeoJsonCountries,
  fetchGenders,
  fetchAge,
  fetchTotalStudents,
  fetchFaculty,
  fetchLevel,
  fetchCGPA,
  fetchResidency,
  fetchPtFt,
  fetchJsonCountries,
  fetchCountriesStudent
};
