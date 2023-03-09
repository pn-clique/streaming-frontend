

// COMPONENTS
import HeaderAuth from "../components/HeaderAuth";

// STYLES
import styles from "../styles/contacts.module.scss";

export default function Contacts() {

  const contacts = []

  return (
    <>
      <HeaderAuth />

      <section className={styles.contacts}>
        <div className={styles.container}>
          <header>
            <h2>Contate-nos</h2>
            <p>Entre em contato conosco para obter mais informações.</p>
            <hr />
          </header>

          <div className={styles.datas}>
            <div className={styles.email}>
              <span>pncliquestreaming@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}