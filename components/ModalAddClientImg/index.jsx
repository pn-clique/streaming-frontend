import Modal from "react-modal";

import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";

export default function ModalRegister({ ModalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
    >
      <form className={styles.form}>
        <div>
            <div>
              <h2>Adicionar serviço</h2>
              <span>Adicionar novo serviços</span>
            </div>
            <button onClick={closeModal}>X</button>
        </div>

        <div>
          <label htmlFor="imgService">
            <MdOutlineAddToPhotos />
            <input type="image" src="" id="imgService" /> 
          </label>
          <label htmlFor="imgService">Adicione uma imagem para o serviço</label>
        </div>
        
        <div>
          <button onClick={closeModal}>Adicionar</button>
        </div>
      </form>
    </Modal>
  );
}
