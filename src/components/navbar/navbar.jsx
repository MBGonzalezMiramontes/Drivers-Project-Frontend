import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import { setSearchQuery, getDrivers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getDrivers(searchQuery));
  };

  return (
    <div className={style.navbarContainer}>
      <div className={style.linkContainer}>
        <Link to="/home" className={style.link}>
          Inicio
        </Link>
        <Link to="/form" className={style.link}>
          Crear Conductor
        </Link>
      </div>
      <div>
        <form className={style.searchBarContainer} onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => dispatch(setSearchQuery(event.target.value))}
          />
          <button type="submit">Buscar</button>{" "}
        </form>
      </div>
    </div>
  );
};

export default NavBar;
