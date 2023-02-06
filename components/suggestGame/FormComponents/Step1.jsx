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
          value="sozinho"
          checked={data.step1 === "sozinho"}
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
          value="acompanhado"
          checked={data.step1 === 'acompanhado'}
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
          value="familia"
          checked={data.step1 === 'familia'}
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
          value="outros"
          checked={data.step1 === 'outros'}
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
