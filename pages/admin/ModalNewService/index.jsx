import Modal from "react-modal";

import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";

export default function ModalNewService({ ModalIsOpen, closeModal }) {
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
          <input type="text" placeholder="Digite o nome do serviço:" />
        </div>

        <div>
          <input type="text" placeholder="Digite a comissão:" />
          <input type="text" placeholder="Digite a duração do serviço:" />
        </div>

        <div>
          <input type="text" placeholder="Digite a capacidade::" />
          <input type="text" placeholder="Digite o pontos:" />
          <input type="text" placeholder="Digite o preço:" />
        </div>

        <div>
          <textarea name="" id="" cols="30" rows="10" placeholder="Digite uma observação:"></textarea>
        </div>
        
        <div>
          <button onClick={closeModal}>Adicionar</button>
        </div>
      </form>
    </Modal>
  );
}
