
import Modal   from 'react-modal'

import styles from './styles.module.scss'

export function ModalNewService({isOpen, closeModal}) {
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.modal_content}
        overlayClassName={styles.modal_overlay}
      >
        <div className={styles.container}>
          <form action="">
            
          </form>
        </div>
      </Modal>
  )
}