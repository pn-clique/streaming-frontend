import React from "react";

// STYLES
import styles from '../styles.module.scss';

function Welcome({ data }) {

  let name = "";

  if (typeof window !== "undefined") {
    name = localStorage.getItem("name");
  }

  return (
    <div className={styles.step_1}>
      <header>
        <h4>Olá!, {name}.</h4>
        <h2>Seja bem-vindo/a ao jogo de sugestões</h2>
      </header>
      <p>Ajude nos a encontrar o que deseja assistir, respondendo à 5 questões.</p>
    </div>
  );
}

export default Welcome;
