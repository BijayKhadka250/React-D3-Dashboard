const baseURL = "http://140.184.230.103:4545/";
export default {
  fetchCountries: `${baseURL}country`,
  fetchStudentsByYear: `${baseURL}students`,
  fetchGenderByCountry: `${baseURL}country/genders`,
  fetchGradUnderGrad: `${baseURL}gradundergrad`,
  fetchUnderGrad: `${baseURL}undergrad`,
  fetchGrad: `${baseURL}grad`,
  fetchStudentsByAge: `${baseURL}studentsbyage`,
  fetchAgeByCountry: `${baseURL}country/age`,
  fetchAgeByFaculty: `${baseURL}faculty/age`,
  fetchAgeByYear: `${baseURL}year/age`,
  fetchAgeByYearAndFaculty: `${baseURL}yearandfaculty/age`,
  fetchAgeByYearAndCountryAndFaculty: `${baseURL}yearandcountryandfaculty/age`,
  
  fetchAgeByFacultyAndCountry: `${baseURL}facultyandcountry/age`,
  fetchFaculties: `${baseURL}faculties`,
  fetchMultipleCountry: `${baseURL}multiplecountry`,
  fetchAges: `${baseURL}ages`,

  fetchApi: `${baseURL}api`  
};
