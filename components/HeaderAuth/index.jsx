
import Link from "next/link";
import Image from "next/image";

// ASSETS
import { logo } from "../../assets";


// MOTION
import { motion } from 'framer-motion'

//STYLES
import styles from './styles.module.scss';

export default function HeaderAuth() {

  return (
    <header className={styles.header_nav}>
        <div>
          <motion.div
          initial={{x: -100, opacity: 0, scale: 0}}
          animate={{x: 0, opacity: 1, scale: 1}}
          transition={{duration: .5}}
          >
          <Link href="#">
            <Image 
              src={logo}
              alt="PN Clique logo"
              className={styles.logo}
            />
          </Link>
          </motion.div>
          <motion.nav
            initial={{x: 100, opacity: 0, scale: 0}}
            animate={{x: 0, opacity: 1, scale: 1}}
            transition={{duration: .5}}
          >
            <Link className="btn_default" href={'/'}>Pagina inicial</Link>
          </motion.nav>
        </div>
      </header>
  )
}