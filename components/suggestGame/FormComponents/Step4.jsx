import React from "react";

import Image from "next/image";

import { acompanhado, familia, sozinho } from "../../../assets";

// STYLES
import styles from '../styles.module.scss';

function Step4({ data, updateFieldHandler }) {
  return (
    <div className={styles.step_4}>
      <header>
        <h4>04.</h4>
        <h2>Qual sugestão deseja assistir?</h2>
      </header>

      <div>
      <label htmlFor="movie1">
          <input 
            type="radio" 
            name="box" 
            id="movie1" 
            required
            value="movie1"
            checked={data.step4 === "movie1"}
            onChange={(event) => updateFieldHandler("step4", event.target.value)}
            />
          <Image src={sozinho} alt="Assistir filme 1" />
          <figcaption>Movie 1</figcaption>
        </label>
        <label htmlFor="movie2">
          <input 
            type="radio" 
            name="box" 
            id="movie2" 
            required
            value="movie2"
            checked={data.step4 === "movie2"}
            onChange={(event) => updateFieldHandler("step4", event.target.value)}
            />
          <Image src={sozinho} alt="Assistir filme 2" />
          <figcaption>Movie 2</figcaption>
        </label>
        <label htmlFor="movie3">
          <input 
            type="radio" 
            name="box" 
            id="movie3" 
            required
            value="movie3"
            checked={data.step4 === "movie3"}
            onChange={(event) => updateFieldHandler("step4", event.target.value)}
            />
          <Image src={sozinho} alt="Assistir filme 3" />
          <figcaption>Movie 3</figcaption>
        </label>
      </div>
    </div>
  );
}

export default Step4;
