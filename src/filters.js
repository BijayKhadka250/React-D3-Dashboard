import React from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FilterBar(props) {
  const {
    setGenderFilter,
    setCountryFilter,
    countries,
    faculties,
    setFacultyFilter,
    setYearFilter,
    setGradStatusFilter,
  } = props;

  return (
    <div>
      <List>
        <Divider />
        <ListItem button key="gender-filter">
          <Autocomplete
            multiple
            id="gender-outlined"
            options={["Male", "Female", "Non-Binary"]}
            getOptionLabel={(option) => option}
            style={{ width: 280 }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Gender" />
            )}
            onChange={(_, value) => {
              setGenderFilter(value);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button key="country-filter">
          <Autocomplete
            multiple
            id="countries-outlined"
            options={countries}
            getOptionLabel={(option) => option}
            style={{ width: 280 }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Country" />
            )}
            onChange={(_, value) => {
              setCountryFilter(value);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button key="faculties-filter">
          <Autocomplete
            multiple
            id="faculties-outlined"
            options={faculties}
            getOptionLabel={(option) => option}
            style={{ width: 280 }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Faculty" />
            )}
            onChange={(_, value) => {
              setFacultyFilter(value);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button key="year-filter">
          <Autocomplete
            multiple
            id="year-outlined"
            options={[
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
            ]}
            getOptionLabel={(option) => option}
            style={{ width: 280 }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Year" />
            )}
            onChange={(_, value) => {
              setYearFilter(value);
            }}
          />
        </ListItem>
        <ListItem button key="grad-status-filter">
          <Autocomplete
            multiple
            id="gradStatus-outlined"
            options={["Graduate", "Undergraduate"]}
            getOptionLabel={(option) => option}
            style={{ width: 280 }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Grad Status" />
            )}
            onChange={(_, value) => {
              setGradStatusFilter(value);
            }}
          />
          <Divider />
        </ListItem>
      </List>
    </div>
  );
}
