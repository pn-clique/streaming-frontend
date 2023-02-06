import Image from "next/image";
import React from "react";
import { sozinho } from "../../../assets";


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
            value="action"
            checked={data.step3 === "action"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Ação</span>
        </label>
        <label htmlFor="romance">
          <input 
            type="radio" 
            name="genero" 
            id="romance" 
            value="romance"
            checked={data.step3 === "romance"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Romance</span>
        </label>
        <label htmlFor="drama">
          <input 
            type="radio" 
            name="genero" 
            id="drama" 
            value="drama"
            checked={data.step3 === "drama"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Drama</span>
        </label>
        <label htmlFor="terror">
          <input 
            type="radio" 
            name="genero" 
            id="terror" 
            value="terror"
            checked={data.step3 === "terror"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
             />
          <span>Terror</span>
        </label>
        <label htmlFor="aventura">
          <input 
            type="radio" 
            name="genero" 
            id="aventura" 
            value="aventura"
            checked={data.step3 === "aventura"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Aventura</span>
        </label>
        <label htmlFor="desenho">
          <input 
            type="radio" 
            name="genero" 
            id="desenho" 
            value="desenho"
            checked={data.step3 === "desenho"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Desenho animado</span>
        </label>
        <label htmlFor="guerra">
          <input 
            type="radio" 
            name="genero" 
            id="guerra" 
            value="guerra"
            checked={data.step3 === "guerra"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Guerra</span>
        </label>
        <label htmlFor="adulto">
          <input 
            type="radio" 
            name="genero" 
            id="adulto" 
            value="adulto"
            checked={data.step3 === "adulto"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>+18</span>
        </label>
        <label htmlFor="desporto">
          <input 
            type="radio" 
            name="genero" 
            id="desporto" 
            value="desporto"
            checked={data.step3 === "desporto"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Desporto</span>
        </label>
        <label htmlFor="biografia">
          <input 
            type="radio" 
            name="genero" 
            id="biografia" 
            value="biografia"
            checked={data.step3 === "biografia"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Biográfia</span>
        </label>
        <label htmlFor="documentario">
          <input 
            type="radio" 
            name="genero" 
            id="documentario" 
            value="documentario"
            checked={data.step3 === "documentario"}
            onChange={(event) => updateFieldHandler("step3", event.target.value)}
            />
          <span>Documentário</span>
        </label>
      </div>
    </div>
  );
}

export default Step3;
