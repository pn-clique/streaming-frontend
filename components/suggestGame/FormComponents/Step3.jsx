
import React from "react";


// STYLES
import styles from '../styles.module.scss';

function Step3({ data, updateFieldHandler }) {
  return (
    <div className={styles.step_3}>
      <header>
        <h4>03.</h4>
        <h2>Qual é o gênero que deseja?</h2>
      </header>
      <p>Ajude nos a encontrar o que deseja assistir, respondendo á 5 questões.</p>
      <div>
        <label htmlFor="action">
          <input 
            type="radio" 
            name="genero" 
            id="action" 
            value="28"
            checked={data.step3 === "28"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Ação</span>
        </label>
        <label htmlFor="romance">
          <input 
            type="radio" 
            name="genero" 
            id="romance" 
            value="10749"
            checked={data.step3 === "10749"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Romance</span>
        </label>
        <label htmlFor="drama">
          <input 
            type="radio" 
            name="genero" 
            id="drama" 
            value="18"
            checked={data.step3 === "18"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Drama</span>
        </label>
        <label htmlFor="terror">
          <input 
            type="radio" 
            name="genero" 
            id="terror" 
            value="27"
            checked={data.step3 === "27"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
             />
          <span>Terror</span>
        </label>
        <label htmlFor="aventura">
          <input 
            type="radio" 
            name="genero" 
            id="aventura" 
            value="12"
            checked={data.step3 === "12"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Aventura</span>
        </label>
        <label htmlFor="desenho">
          <input 
            type="radio" 
            name="genero" 
            id="desenho" 
            value="13"
            checked={data.step3 === "13"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Desenho animado</span>
        </label>
        <label htmlFor="guerra">
          <input 
            type="radio" 
            name="genero" 
            id="guerra" 
            value="10752"
            checked={data.step3 === "10752"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Guerra</span>
        </label>
        <label htmlFor="adulto">
          <input 
            type="radio" 
            name="genero" 
            id="adulto" 
            value="14"
            checked={data.step3 === "14"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>+18</span>
        </label>
        <label htmlFor="desporto">
          <input 
            type="radio" 
            name="genero" 
            id="desporto" 
            value="29"
            checked={data.step3 === "29"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Desporto</span>
        </label>
        <label htmlFor="biografia">
          <input 
            type="radio" 
            name="genero" 
            id="biografia" 
            value="99"
            checked={data.step3 === "99"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Biográfia</span>
        </label>
        <label htmlFor="documentario">
          <input 
            type="radio" 
            name="genero" 
            id="documentario" 
            value="100"
            checked={data.step3 === "100"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Documentário</span>
        </label>
      </div>
    </div>
  );
}

export default Step3;
