import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { getDriverById } from "../../redux/actions/actions";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driverDetails = useSelector((state) => state.driverDetails);
  const [state, setState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDriverById(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <img
        src={driverDetails.image}
        alt={`${driverDetails.name} ${driverDetails.lastname}`}
        className={styles.image}
      />
      <div className={styles.information}>
        <h1 className={styles.title}>
          {driverDetails.name} {driverDetails.lastname}
        </h1>
        <p className={styles.details}>
          Nacionalidad: {driverDetails.nationality}
        </p>
        <p className={styles.details}>
          Fecha de Nacimiento: {driverDetails.dob}
        </p>
        <p className={styles.details}>Escuderías:</p>
        <p>{driverDetails.teams}</p>
        {/* <ul className={styles.details}>
          {driverDetails.teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul> */}
        <div className={styles.description}>
          <p>{driverDetails.description}</p>
        </div>
        <button onClick={handleGoBack}>Volver</button>
      </div>
    </div>
  );
};

export default Details;
