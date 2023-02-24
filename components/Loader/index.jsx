
import Image from 'next/image';
import { ImageLoader } from 'next/image';
import { amigos, loader, allIcones } from '../../assets';

import styles from './styles.module.scss';

export function Loader() {

  return (
    <div className={styles.loader}>
      <Image src={amigos} width={250} alt="Loader" />
      <h4>Carregando...</h4>

    </div>
  )
}