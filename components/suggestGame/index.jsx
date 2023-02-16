import Welcome from "./FormComponents/Welcome";
import Step1 from "./FormComponents/Step1";
import Step2 from "./FormComponents/Step2";
import Step3 from "./FormComponents/Step3";
import Step4 from "./FormComponents/Step4";

import { suggestGameHook } from "../../hooks/suggestGameHook";

import Modal from "react-modal";
import { useState } from "react";

// STYLES
import styles from './styles.module.scss';


export default function SuggestGame({ isOpen, closeModal, movie }) {
  const formTemplate = {
    step1: "",
    step2: "",
    step3: "",
    step4: "",
  };
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {

      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <Welcome data={data}/>,
    <Step1 data={data} updateFieldHandler={updateFieldHandler} />,
    <Step2 data={data} updateFieldHandler={updateFieldHandler} />,
    <Step3 data={data} updateFieldHandler={updateFieldHandler} />,
    <Step4 movie={movie} data={data} updateFieldHandler={updateFieldHandler} />,
  ];

  let {
    currentStep,
    currentComponents,
    changeStep,
    isFirstStep,
    isLastStep,
    setCurrentSte,
  } = suggestGameHook(formComponents);

  function handlerSubmit(e) {
    e.preventDefault();

    setCurrentSte(0);
    setData({
      step1: "",
      step2: "",
      step3: "",
      step4: "",
    });
    closeModal(true);
  }



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modal_content}
      overlayClassName={styles.modal_overlay}
      ariaHideApp={false}
    >
      <form action="" onSubmit={handlerSubmit}>
        <button onClick={closeModal} type="button" className={styles.btn_close}>X</button>

        <div className={styles.form_container}>{currentComponents}</div>

        <div className={styles.actions}>
          {!isFirstStep ? ('') : (
              <button className="btn_default" type="button" onClick={() => changeStep(currentStep - 1)}>
                Voltar
              </button>
          )}

          {isLastStep ? (
            <button className="btn_default" type="submit" onClick={handlerSubmit}>
              Enviar
            </button>
          ) : (
            <button
            className="btn_default"
              type="submit"
              onClick={(e) => changeStep(currentStep + 1, e)}
            >
              Proximo
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
