import fetch from "./fetch";
import endpoints from "./endpoints";

const fetchStudentsByYear = async (setStudentsByYears) => {
  try {
    const StudentsByYear = await fetch("GET", endpoints.fetchStudentsByYear);
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

// const fetchLevel = async (
//   setLevelData,
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

//   const resp = await fetch("POST", endpoints.fetchLevel, body);

//   setLevelData(resp);
// };

export {
  fetchStudentsByYear,
  fetchCountries,
  fetchFaculties,
  fetchJsonCountries,
  fetchGenders,
  fetchAge,
  // fetchLevel,
};
