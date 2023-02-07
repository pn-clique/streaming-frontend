

import { motion } from 'framer-motion'

import { useEffect, useState, useRef } from 'react';

import { netflix, movie01, movie02, movie03, movie04, movie05 } from '../../assets'

import Image from 'next/image';
import styles from './styles.module.scss';
import { newReleases } from '../../dataAPI/DataAdmin/Datas';

// AXIOS API
import { Api, ApiMovies } from "../../api/axios";
import axios from "axios";

export function Carousel() {

  const [width, setWidth] = useState(0);
  const slider_wrapper = useRef();

  const [dataMovie, setDataMovie] = useState([])

  useEffect(() => {

    axios.get(ApiMovies)
    .then((res) => setDataMovie(res.data.results))

    setWidth(slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth)
  }, [])


  return (
    <div className={styles.container}>
      <motion.div className={styles.slider_wrapper} 
        ref={slider_wrapper}
        whileTap={{cursor: 'grabbing'}}
        >
        <motion.div 
          className={styles.inner_carousel}
          drag="x"
          dragConstraints={{right:0, left: -width}}
          >
          {dataMovie.map((movie) => (
            <motion.div 
            className={styles.card}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{duration: 0.5}}
            key={movie.id}
            >
            <div className={styles.card_image}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="Image" />
            </div>
          </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}