import Modal from "react-modal";

import Image from "next/image";

import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";
import { movie05 } from "../../../assets";

export default function ModalInfo({ ModalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
    >
      <form className={styles.form}>
            <button onClick={closeModal}>X</button>
        

        <div className={styles.movie_info}>
          <div>
            <Image src={movie05} />
          </div>
          <div>
            <h4>Título:</h4>
            <span>As Aventras de Lucas</span>
          </div>
          <div>
            <h4>Gênero:</h4>
            <span>Desenho animado</span>
          </div>
          <div>
            <h4>Ano de lançamento:</h4>
            <span>2021</span>
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ha rum earum obcaecati modi et, excepturi nam, id quae possimus ali as. Suscipit ducimus necessitatibus modi labore excepturi eius, id laborum.</p>
          </div>
        </div>
      </form>
    </Modal>
  );
}
