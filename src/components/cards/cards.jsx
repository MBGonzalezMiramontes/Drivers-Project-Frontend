import React from "react";
import Card from "../card/card";
import styles from "./cards.module.css";

const Cards = ({ info }) => {
  return (
    <div className={styles.cardsContainer}>
      {info?.map((driver) => (
        <Card
          key={driver.id}
          id={driver.id}
          name={driver.name}
          lastname={driver.lastname}
          image={driver.image}
          teams={driver.teams}
        />
      ))}
    </div>
  );
};

export default Cards;
