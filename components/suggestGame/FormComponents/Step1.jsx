import Image from "next/image";
import React from "react";
import { acompanhado, familia, sozinho } from "../../../assets";


// STYLES
import styles from '../styles.module.scss';

function Step1({ data, updateFieldHandler }) {
  return (
    <div className={styles.step_2}>
      <header>
        <h4>01.</h4>
        <h2>Com quem deseja assistir?</h2>
      </header>
      <p>Ajude nos a encontrar o que deseja assistir, respondendo á 5 questões.</p>
      <div>
        <label htmlFor="sozinho">
          <input 
          type="radio" 
          name="step1" 
          id="sozinho" 
          required
          value="14"
          checked={data.step1 === "14"}
          onChange={(event) => updateFieldHandler("step1", event.target.value)}
          />
          <Image src={sozinho} alt="Assistir sozinho" />
          <figcaption>Sozinho</figcaption>
        </label>

        <label htmlFor="amor">
          <input 
          type="radio" 
          name="step1" 
          id="amor" 
          required
          value="10749"
          checked={data.step1 === '10749'}
          onChange={(event) => updateFieldHandler("step1", event.target.value)}
          />
          <Image src={acompanhado} alt="Assistir acompanhado" />
          <figcaption>Acompanhado</figcaption>
        </label>

        <label htmlFor="familia">
          <input 
          type="radio" 
          name="step1" 
          id="familia" 
          required
<<<<<<< HEAD
          value="10770"
          checked={data.step1 === '10770'}
=======
          value="10751"
          checked={data.step1 === '10751'}
>>>>>>> 8fd464509611ab344f72d9e0cb80e173043a4453
          onChange={(event) => updateFieldHandler("step1", event.target.value)}
          />
          <Image src={familia} alt="Assistir com a familia" />
          <figcaption>Familia</figcaption>
        </label>

        <label htmlFor="outros">
          <input 
          type="radio" 
          name="step1" 
          id="outros" 
          required
          value="28"
          checked={data.step1 === '28'}
          onChange={(event) => updateFieldHandler("step1", event.target.value)}
          />
          <Image src={sozinho} alt="Assistir com outros" />
          <figcaption>Outros</figcaption>
        </label>
      </div>
    </div>
  );
}

export default Step1;
