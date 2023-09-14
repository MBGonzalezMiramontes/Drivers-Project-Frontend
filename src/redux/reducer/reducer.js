import {
  GET_DRIVERS_SUCCESS,
  CHANGE_PAGE,
  CHANGE_SORT_OPTION,
  GET_TEAMS_SUCCESS,
  GET_DRIVERSBYID_SUCCESS,
  SET_SEARCH_QUERY,
  SET_FILTER_BY_TEAM,
  SET_FILTER_BY_CREATED,
} from "../actions/actions-types";

import { performSearch } from "../actions/actions";

let initialState = {
  allDrivers: [],
  allDriversBackup: [],
  currentPage: 1,
  sortBy: "",
  teams: [],
  driverDetails: {},
  searchQuery: "",
  searchResults: [],
  filterByTeam: null,
  filterByCreated: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS_SUCCESS:
      const searchedDrivers = performSearch(action.payload, state.searchQuery);
      return {
        ...state,
        allDrivers: action.payload,
        allDriversBackup: action.payload,
        searchResults: searchedDrivers,
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload, // Actualiza la página actual
      };

    case CHANGE_SORT_OPTION:
      return {
        ...state,
        sortBy: action.payload,
      };

    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
      };

    case GET_DRIVERSBYID_SUCCESS:
      return {
        ...state,
        driverDetails: action.payload,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case SET_FILTER_BY_TEAM:
      return {
        ...state,
        filterByTeam: action.payload,
      };
    case SET_FILTER_BY_CREATED:
      return {
        ...state,
        filterByCreated: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
