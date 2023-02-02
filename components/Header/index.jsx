
import Image from "next/image";
import Link from "next/link";

import logo from '../../assets'


import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.header_nav}>
        <div>
          <Link href="#">
            <Image 
              src={logo}
              alt="PN Clique logo"
              className={styles.logo}
            />
          </Link>
          <nav>
            <div className="buttons_auth">
              <Link href={"#"}>Entrar</Link>
              <Link href={"#"}>Registrar</Link>
            </div>
          </nav>
        </div>
      </header>
  )
}