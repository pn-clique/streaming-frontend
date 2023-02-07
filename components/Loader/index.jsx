
import Image from 'next/image';
import { ImageLoader } from 'next/image';
import { amigos, loader } from '../../assets';

import styles from './styles.module.scss';

export function Loader() {

  return (
    <div className={styles.loader}>
      <Image src={loader} />
      <h4>Carregando...</h4>

    </div>
  )
}