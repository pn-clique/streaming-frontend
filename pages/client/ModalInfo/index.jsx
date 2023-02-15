import Modal from "react-modal";

import Image from "next/image";

import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";
import { movie05 } from "../../../assets";

export default function ModalInfo({ ModalIsOpen, closeModal, suggestion, suggestionMovieId }) {
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

        {
           suggestion.map((data, key) => {
            if (data.id == suggestionMovieId)
              return (
                <div className={styles.movie_info} key={key}>
                  <div>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt="Image" />
                  </div>
                  <div>
                    <h4>Título:</h4>
                    <span>{data.original_title}</span>
                  </div>
                  <div>
                    <h4>Gênero:</h4>
                    <span>Desenho animado</span>
                  </div>
                  <div>
                    <h4>Ano de lançamento:</h4>
                    <span>{data.release_date}</span>
                  </div>
                  <div>
                    <p>{data.overview}</p>
                  </div>
                </div>
             )
           })
        }
        
      </form>
    </Modal>
  );
}
