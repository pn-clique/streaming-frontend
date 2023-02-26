import { motion } from "framer-motion";

import { useEffect, useState, useRef } from "react";

import {
  netflix,
  movie01,
  movie02,
  movie03,
  movie04,
  movie05,
} from "../../assets";

import Image from "next/image";
import styles from "./styles.module.scss";
import { newReleases } from "../../dataAPI/DataAdmin/Datas";

// AXIOS API
import { Api, ApiMovies } from "../../api/axios";
import axios from "axios";
import Skeleton from "./../Skeleton";

export function CarouselMyServices({myAccounts, services}) {
  const [width, setWidth] = useState(0);
  const slider_wrapper = useRef();


  useEffect(() => {

    setWidth(
      slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
    );
  }, [width]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.slider_wrapper}
        ref={slider_wrapper}
        whileTap={{ cursor: "grabbing" }}
      >
       {
        myAccounts == '' ? (
          <div className={styles.container_skeleton}>
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
            </div>
        ) : (
          (
          <motion.div
            className={styles.inner_carousel}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {myAccounts.map((data) => {
              return services.map((item) => {
                if (data.service_id == item._id)
                return (
                  <motion.div
                    className={styles.card}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    key={data._id}
                  >
                    <div className={styles.card_image}>
                      <img src={`https://api-streaming.onrender.com/uploads/${item.image}`} />
                    </div>
                  </motion.div>
                )
              })
            })}
          </motion.div>
          )
        )
       }
      </motion.div>
    </div>
  );
}

