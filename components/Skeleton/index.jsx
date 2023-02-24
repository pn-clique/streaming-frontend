

import styles from './styles.module.scss'


export default function Skeleton({width, height, borderRadius}) {

  return (
    <div className={styles.skeleton}>
      <div style={{width, height, borderRadius}} />
    </div>
  )
}