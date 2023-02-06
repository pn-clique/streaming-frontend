
import Image from 'next/image';
import { ImageLoader } from 'next/image';
import { amigos } from '../../assets';

import styles from './styles.module.scss';

export function Loader() {

  return (
    <div className={styles.loader}>
      <Image src={amigos} />
      <h4>Carregando...</h4>

    </div>
  )
}