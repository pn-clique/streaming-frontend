
import { Skeleton } from './Skeleton';

import { motion } from 'framer-motion';

import { useRef } from 'react';

import styles from "./styles.module.scss";

export default function LayoutSkeleton() {

  const width = useRef(window.innerWidth / 3);

  const slider_wrapper = useRef();

  // conts [d]

  return (
    <div className={styles.container}>
      <div className={styles.slider_wrapper}>
        <div className={styles.inner_carousel}>
          {[1,2,3,4].map((movie) => (
            <div className={styles.card} style={{width: width}}>
              <Skeleton width={'width'} height={'100%'} borderRadius={'0.25rem'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}