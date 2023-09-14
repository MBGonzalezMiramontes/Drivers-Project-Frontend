import axios from "axios";
import {
  GET_DRIVERS_SUCCESS,
  CHANGE_PAGE,
  CHANGE_SORT_OPTION,
  GET_TEAMS_SUCCESS,
  GET_DRIVERSBYID_SUCCESS,
  SET_SEARCH_QUERY,
  SET_FILTER_BY_TEAM,
  SET_FILTER_BY_CREATED,
} from "./actions-types";

export function postDriver(state) {
  return async function () {
    try {
      const response = await axios.post("http://localhost:3001/drivers", state); //cuando haga el deploy hay q cambiar el deploy
      console.log(response.data);
    } catch (error) {
      console.error("Error al crear un conductor:", error);
    }
  };
}

export function getDrivers(query = "") {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/drivers?name=${query}`
      );
      dispatch({
        type: GET_DRIVERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener conductores:", error);
    }
  };
}

export const changePage = (pageNumber) => {
  return {
    type: CHANGE_PAGE,
    payload: pageNumber,
  };
};

export const changeSortOption = (option) => {
  return {
    type: CHANGE_SORT_OPTION,
    payload: option,
  };
};

export function getTeams() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/teams");
      dispatch({
        type: GET_TEAMS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener la lista de equipos:", error);
    }
  };
}

export function getDriverById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers/${id}`);
      const driverData = response.data;

      dispatch({
        type: GET_DRIVERSBYID_SUCCESS,
        payload: driverData,
      });
    } catch (error) {
      console.error("Error al obtener el conductor por ID:", error);
    }
  };
}

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export function performSearch(allDrivers, query) {
  return allDrivers.filter((driver) =>
    driver.name.toLowerCase().includes(query.toLowerCase())
  );
}

export const setFilterByTeam = (team) => ({
  type: SET_FILTER_BY_TEAM,
  payload: team,
});

export const setFilterByCreated = (created) => ({
  type: SET_FILTER_BY_CREATED,
  payload: created,
});
