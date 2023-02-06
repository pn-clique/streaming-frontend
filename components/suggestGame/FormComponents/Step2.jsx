import Image from "next/image";
import React from "react";
import { sozinho, acompanhado, familia } from "../../../assets";


// STYLES
import styles from '../styles.module.scss';

function Step2({ data, updateFieldHandler }) {
  return (
    <div className={styles.step_2}>
      <header>
        <h4>02.</h4>
        <h2>Onde deseja assistir?</h2>
      </header>
      <p>Selecione um local onde vai assistir.</p>
      <div>
        <label htmlFor="Sala">
          <input 
          type="radio" 
          name="step2" 
          id="Sala" 
          required
          value="Sala"
          checked={data.step2 === "Sala"}
          onChange={(event) => updateFieldHandler("step2", event.target.value)}
          />
          <Image src={familia} alt="Assistir na sala" />
          <figcaption>Sala</figcaption>
        </label>

        <label htmlFor="quarto">
          <input 
          type="radio" 
          name="step2" 
          id="quarto" 
          required
          value="quarto"
          checked={data.step2 === 'quarto'}
          onChange={(event) => updateFieldHandler("step2", event.target.value)}
          />
          <Image src={acompanhado} alt="Assistir no quarto" />
          <figcaption>Quarto</figcaption>
        </label>

        <label htmlFor="Carro">
          <input 
          type="radio" 
          name="step2" 
          id="Carro" 
          required
          value="Carro"
          checked={data.step2 === 'Carro'}
          onChange={(event) => updateFieldHandler("step2", event.target.value)}
          />
          <Image src={acompanhado} alt="Assistir no carro" />
          <figcaption>Familia</figcaption>
        </label>

        <label htmlFor="outros">
          <input 
          type="radio" 
          name="step2" 
          id="outros" 
          required
          value="outros"
          checked={data.step2 === 'outros'}
          onChange={(event) => updateFieldHandler("step2", event.target.value)}
          />
          <Image src={sozinho} alt="Assistir com outros" />
          <figcaption>Outros</figcaption>
        </label>
      </div>
    </div>
  );
}

export default Step2;
