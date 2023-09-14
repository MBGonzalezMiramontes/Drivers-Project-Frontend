import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.landingContainer}>
      <div className={style.smallContainer}>
        <h1> ¡Bienvenido a La Plataforma de Conductores! </h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
