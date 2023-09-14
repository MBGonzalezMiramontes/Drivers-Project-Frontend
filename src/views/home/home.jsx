import React from "react";
import styles from "./home.module.css";
import Cards from "../../components/cards/cards";
import { useEffect } from "react";
import {
  getDrivers,
  changePage,
  changeSortOption,
  setFilterByTeam,
  setFilterByCreated,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const sortBy = useSelector((state) => state.sortBy);
  const filterByTeam = useSelector((state) => state.filterByTeam);
  const filterByCreated = useSelector((state) => state.filterByCreated);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(allDrivers.length / itemsPerPage);

  const sortDrivers = (drivers) => {
    switch (sortBy) {
      case "name-asc":
        return drivers.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return drivers.sort((a, b) => b.name.localeCompare(a.name));
      case "birthYear-asc":
        return drivers.sort((a, b) => a.dob.localeCompare(b.dob));
      case "birthYear-desc":
        return drivers.sort((a, b) => b.dob.localeCompare(a.dob));
      default:
        return drivers;
    }
  };

  const sortedDrivers = sortDrivers(allDrivers);

  useEffect(() => {
    dispatch(getDrivers());
    return () => {};
  }, [dispatch]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(changePage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(changePage(currentPage + 1));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDrivers.slice(indexOfFirstItem, indexOfLastItem);

  const handleSortChange = (event) => {
    dispatch(changeSortOption(event.target.value));
  };

  const handleTeamFilterChange = (event) => {
    const selectedTeam = event.target.value;
    dispatch(setFilterByTeam(selectedTeam));
  };

  const handleCreatedFilterChange = (event) => {
    const createdStatus = event.target.value;
    dispatch(setFilterByCreated(createdStatus));
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Listado de Conductores</h1>

      <div className={styles.filterContainer}>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Ordenar por Nombre: </label>
          <select
            className={styles.filterSelect}
            id="nameSort"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option className={styles.chooseOption} value="">
              Elegir...
            </option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>
            Ordenar por Fecha de Nacimiento:{" "}
          </label>
          <select
            className={styles.filterSelect}
            id="birthYearSort"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option className={styles.chooseOption} value="">
              Elegir...
            </option>
            <option value="birthYear-asc">Mayor</option>
            <option value="birthYear-desc">Menor</option>
          </select>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Filtrar por Equipo: </label>
          <select
            className={styles.filterSelect}
            onChange={handleTeamFilterChange}
            value={filterByTeam || ""}
          >
            <option value="">Todos</option>
            {/* Colocar teams disponibles */}
          </select>
        </div>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Filtrar por Origen: </label>
          <select
            className={styles.filterSelect}
            onChange={handleCreatedFilterChange}
            value={filterByCreated || ""}
          >
            <option value="">Todos</option>
            <option value="created">Creados por nosotros</option>
            <option value="not-created">De la API</option>
          </select>
        </div>
      </div>

      <div className="">
        <Cards info={currentItems} />
      </div>
      <div className={styles.paginationContainer}>
        <button className={styles.paginationButton} onClick={handlePrevPage}>
          Anterior
        </button>
        <div className={styles.paginationInfo}>
          Página {currentPage} de {totalPages}
        </div>
        <button className={styles.paginationButton} onClick={handleNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
