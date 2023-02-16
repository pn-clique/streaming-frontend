
import { motion } from 'framer-motion'
import Image from "next/image";
import { useEffect, useRef, useState } from 'react'



import { movie01, movie02, movie03 } from '../../assets'

import styles from './styles.module.scss'

export function Ours_service() {

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  // useEffect(() => {
  //   console.log(carousel.current.scrollWidth);
  // }, [])

  return (
    <div className={styles.app}>
      <motion.div ref={carousel} className={styles.carousel}>
        <motion.div drag="x" dragConstraints={{right: 0}} className={styles.inner_carousel}>
          <motion.div className={styles.item}>
            <Image src={movie01} alt="ol" />
            <Image src={movie01} alt="d" />
            <Image src={movie01} alt="d" />
            <Image src={movie01} alt="f" />
            <Image src={movie01} alt="g" />
            <Image src={movie01} alt="g" />
            <Image src={movie01} alt="g" />
            <Image src={movie01} alt="g" />
            <Image src={movie01} alt="g" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}