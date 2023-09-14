import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, lastname, image, teams }) => {
  
  return (
    <Link to={`/home/${id}`} className={styles.link}>
      <div className={styles.cardContainer}>
        <img src={image} alt="Image" className={styles.cardImage} />
        <div>
          <h4 className={styles.cardName}>{name + " " + lastname}</h4>
        </div>
        <div>
          <p className={styles.cardTeams}>{teams}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
