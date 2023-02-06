import React from "react";

// STYLES
import styles from '../styles.module.scss';

function Welcome({ data }) {
  return (
    <div className={styles.step_1}>
      <header>
        <h4>Olá!, José Silva.</h4>
        <h2>Sejá bem-vindo/a ao jogo de sugestões</h2>
      </header>
      <p>Ajude nos a encontrar o que deseja assistir, respondendo á 5 questões.</p>
    </div>
  );
}

export default Welcome;
