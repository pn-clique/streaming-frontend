

import styles from './styles.module.scss';

function Skeleton ({width, height, borderRadius}) {


  return (
    <div className={styles.skeleton} style={{width, height, borderRadius}} />
  )
}


export {
  Skeleton
}