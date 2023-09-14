import React, { useState, useEffect } from "react";
import styles from "./create.module.css";
import validate from "./validation/validation";
import { postDriver, getTeams } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

const Create = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);

  const [state, setState] = useState({
    name: "",
    lastname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: [],
  });

  const [error, setError] = useState({
    name: "",
    lastname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });

    validate({ ...state, [name]: value }, name, error, setError);
  };

  const handleTeamSelection = (event) => {
    const { options } = event.target;
    const selectedTeamNames = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.textContent); // Obtén el texto de la opción

    setState((prevState) => ({
      ...prevState,
      teams: [...prevState.teams, ...selectedTeamNames],
    }));
  };

  const handleRemoveTeam = (teamName) => {
    // Elimina un equipo seleccionado del estado de equipos seleccionados
    const newSelectedTeams = state.teams.filter((name) => name !== teamName);
    setState({
      ...state,
      teams: newSelectedTeams,
    });
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    validate({ ...state, teams: state.teams }, "teams", error, setError);

    if (state.teams.length === 0) {
      setError({
        ...error,
        teams: "Debes seleccionar al menos una Escudería", // Aquí estableces el mensaje de error
      });
      return;
    }
    const teamNames = state.teams;
    const driverData = {
      ...state,
      teams: teamNames,
    };
    dispatch(postDriver(driverData));
  };

  return (
    <div className={styles.createContainer}>
      <h1>Crear nuevo Conductor</h1>

      <form onSubmit={handleSubmit} className={styles.createForm}>
        <label>Nombre:</label>
        <input name="name" onChange={handleChange} type="text" />
        <label className={styles.formErrors}>{error.name}</label>

        <label>Apellido:</label>
        <input name="lastname" onChange={handleChange} type="text" />
        <label className={styles.formErrors}>{error.lastname}</label>

        <label>Nacionalidad:</label>
        <input name="nationality" onChange={handleChange} type="text" />
        <label className={styles.formErrors}>{error.nationality}</label>

        <label>Fecha de nacimiento:</label>
        <input
          name="dob"
          onChange={handleChange}
          type="text"
          placeholder="AAAA-MM-DD"
        />
        <label className={styles.formErrors}>{error.dob}</label>

        <label>Escuderías:</label>
        <select
          name="teams"
          onChange={handleTeamSelection}
          multiple
          value={state.teams}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
        <label className={styles.formErrors}>{error.teams}</label>
        <div className={styles.teams}>
          <ul>
            {state.teams.map((teamName) => (
              <li key={teamName}>
                {teamName}
                <button
                  type="button"
                  onClick={() => handleRemoveTeam(teamName)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>

        <label>Imagen:</label>
        <input name="image" onChange={handleChange} type="text" />
        <label className={styles.formErrors}>{error.image}</label>

        <label>Descripción:</label>
        <input name="description" onChange={handleChange} type="text" />
        <label className={styles.formErrors}>{error.description}</label>
        <input type="submit" value="Crear" />
      </form>
    </div>
  );
};

export default Create;
