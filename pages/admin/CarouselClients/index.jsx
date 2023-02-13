
// NEXT JS
import Image from "next/image";
import styles from "./styles.module.scss";

// REACT
import { useEffect, useState, useRef } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// MODAL
import Modal from 'react-modal'

// ASSETS
import {
  netflix,
  movie01,
  movie02,
  movie03,
  movie04,
  movie05,
  sza,
} from "../../../assets/index";


// AXIOS API
import { Api, ApiMovies } from "../../../api/axios";
import axios from "axios";



export function CarouselClients() {
  const [width, setWidth] = useState(0);
  const slider_wrapper = useRef();

  const [dataMovie, setDataMovie] = useState([
    {
      id: 1,
      backdrop_path: sza,
    },
    {
      id: 2,
      backdrop_path: movie01,
    },
    {
      id: 3,
      backdrop_path: sza,
    },
    {
      id: 4,
      backdrop_path: sza,
    },
    {
      id: 5,
      backdrop_path: sza,
    },
    {
      id: 6,
      backdrop_path: sza,
    }
  ]);


  const [isOpen, setIsOpen] = useState(false);

    // Function open modal
  function modalIsOpen() {
    setIsOpen(true);
  }
    // Function close modal
  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    axios.get(ApiMovies).then((res) => setDataMovie(res.data.results));

    setWidth(
      slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
    );
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.slider_wrapper}
        ref={slider_wrapper}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className={styles.inner_carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {dataMovie.map((movie) => (
            <motion.div
              className={styles.card}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              key={movie.id}
              onClick={modalIsOpen}
            >
              <div className={styles.card_image}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="Image" />
              <Image src={movie.backdrop_path} alt="Image clients" width={200} height={200} />
            </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* MODAL INFO CLIENT */}
      <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      overlayClassName={styles.modal_overlay}
      className={styles.modal_content}
      >
        <div className={styles.modal_clients}>
          <Image src={sza} alt="Image client"  />
          <div className={styles.name_clients}>
            <h4>Nome:</h4>
            <span>SZA</span>
          </div>
          <div className={styles.email_clients}>
            <h4>Email:</h4>
            <span>sza@gmail.com</span>
          </div>
          <div className={styles.services_clients}>
            <h4>Serviços:</h4>
            <hr />
            <div>
              <Image src={netflix} alt="Serviços" width={160} height={160} />
              <Image src={netflix} alt="Serviços" width={160} height={160} />
              <Image src={netflix} alt="Serviços" width={160} height={160} />
              <Image src={netflix} alt="Serviços" width={160} height={160} />
            </div>
          </div>
          <div className={styles.btn_clients}>
            <button className={`${styles.btn_renovar} btn_default`}>Renovar</button>
            <button className={`${styles.btn_delete} btn_default`}>Eliminar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
