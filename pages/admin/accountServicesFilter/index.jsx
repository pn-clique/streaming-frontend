

// NEXT
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// REACT
import { useState, useEffect, useRef } from "react";

// MOTION
import { motion } from "framer-motion";

// MODAL
import Modal from 'react-modal'


// STYLES
import styles from "./styles.module.scss";

// ASSETS
import { logo, netflix } from "../../../assets";


import ModalNewService from "../ModalNewService";
import ModalEditionService from "../ModalEditionService";
import ModalAddAccountService from "../ModalAddAccountService";
import ModalEditAccountService from "../ModalEditAccountService";
import { Api } from "../../../api/axios";
export default function ServicesFilter() {

  const [modalAddService, setModalAddService] = useState(false);
  const [modalEditAccountService, setModalEditAccountService] = useState(false);
  const [modalDeleteAccountService, setModalDeleteAccountService] = useState(false)

  const [accountServiceId, setAccountServiceId] = useState('')

  const navigate = useRouter();

  // FUNCTION LOGOUT
  function handlerLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("permission");

    navigate.push("/login");
  }


  // FUNCTIONS ADD ACCOUNT SERVICES
  function openModalAddService() {
    setModalAddService(true);
  }
  function closeModalAddService() {
    setModalAddService(false);
  }

  // FUNCTIONS EDIT ACCOUNT SERVICES
  function openModalEditAccountService() {
    setModalEditAccountService(true);
  }
  function closeModalEditAccountService() {
    setModalEditAccountService(false);
  }

  // FUNCTIONS DELETE ACCOUNT SERVICES
  function openModalDeleteAccountService() {
    setModalDeleteAccountService(true);
  }
  function closeModalDeleteAccountService() {
    setModalDeleteAccountService(false);
  }

  const [accountService, setAccountService] = useState([])

  // = useState([]) API 
  useState(() => {
    Api.get('/account-service')
    .then(res => {
      setAccountService(res.data.accountServices)
      console.log(res.data.accountServices)
    })
    .catch(error => console.log('Erro: ', error))
  },[])

  // FUNCTION CONFIRM DELETE ACCOUNT SERVICE
  const [deleteAccount, setDeleteAccount] = useState('');
  const [image, setImage] = useState('');
  

  function handlerDeleteAccountService() {
    Api.delete(`account-service/${deleteAccount}`)
      .then((res) => {
        console.log('delete account services : ', res.data.message);
        window.location.reload();
      })
      .catch((error) => console.log("Erro in delete account: ", error));
  }

  const [search, setSearch] = useState('')
  const [myResult, setMyResult] = useState(false)

  const data = Object.values(accountService)
  function search_account_services(account) {
    return account.filter(item => {
      if(
        item.id == search || 
        item.service_id.name == search || 
        item.count_service_email == search ||
        item.in_day == search
      ) {
        return item
      }
    }) 
  }


  return (
    <>
      <header className={styles.header_nav}>
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="PN Clique logo" className={styles.logo} />
          </Link>
          <nav>
            <button
              onClick={handlerLogout}
              className={"btn_default"}
              type="button"
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      <section className={styles.filterServices}>
        <div className={styles.container}>
          <header>
            <div className={styles.title}>
              <h2>Todas contas de serviços</h2>
              <span>Todas contas de serviços disponiveis</span>
            </div>
            <ModalAddAccountService
              ModalIsOpen={modalAddService}
              closeModal={closeModalAddService}

            />
            <button
              className="btn_default"
              onClick={openModalAddService}
            >
              Adicionar conta de serviço
            </button>
          </header>

          <div className={styles.filter}>
          <input
              type="text"
              placeholder="Pesquisar pela conta de serviço(Email, nome de serviço e condição)"
              value={search}

              onChange={(e) => {
                setSearch(e.target.value);
                e.target.value == '' ? setMyResult(false) : setMyResult(true)
                
              }}

              onKeyPress={(e) => {
                setSearch(e.target.value);
                setMyResult(true)
              }}
              
            />
          </div>

          <div className={styles.table_services}>
             {myResult ?
              <>
                 {search_account_services(data).map((account, index) => (
                <div key={index} className={styles.card}>
                <div>
                  <img
                    src={`https://api-streaming.onrender.com/uploads/${account.service_id.image}`}
                    alt={account.count_service_email}
                    
                  />
                  <span>{account.count_service_email}</span>
                </div>
                <ModalEditAccountService
                  ModalIsOpen={modalEditAccountService}
                  closeModal={!modalEditAccountService}
                  accountServiceId={accountServiceId}
                  setAccountServiceId={setModalEditAccountService}
                  modalEditionAccountServiceIsOpen={modalEditAccountService}
                  setModalEditionAccountServiceIsOpen={setModalEditAccountService}
                />
                <div className={styles.button_group}>
                  <button
                   type="button"
                    className="btn_default"
                    onClick={() => {
                      setAccountServiceId(account._id);
                      openModalEditAccountService();
                    }}>
                    Editar
                  </button>
                  
                  <button
                   type="button"
                    className="btn_default"
                    onClick={() => {
                      openModalDeleteAccountService()
                      setImage(account.service_id.image)
                      setDeleteAccount(account._id)
                    }}
                    >
                    Eliminar
                  </button>
                </div>
              </div>
              ))}
              </> :
               <>
               {accountService.map((account, index) => (
              <div key={index} className={styles.card}>
              <div>
                <img
                  src={`https://api-streaming.onrender.com/uploads/${account.service_id.image}`}
                  alt={account.count_service_email}
                  
                />
                <span>{account.count_service_email}</span>
              </div>
              <ModalEditAccountService
                ModalIsOpen={modalEditAccountService}
                closeModal={!modalEditAccountService}
                accountServiceId={accountServiceId}
                setAccountServiceId={setModalEditAccountService}
                modalEditionAccountServiceIsOpen={modalEditAccountService}
                setModalEditionAccountServiceIsOpen={setModalEditAccountService}
              />
              <div className={styles.button_group}>
                <button
                 type="button"
                  className="btn_default"
                  onClick={() => {
                    setAccountServiceId(account._id);
                    openModalEditAccountService();
                  }}>
                  Editar
                </button>
                
                <button
                 type="button"
                  className="btn_default"
                  onClick={() => {
                    openModalDeleteAccountService()
                    setImage(account.service_id.image)
                    setDeleteAccount(account._id)
                  }}
                  >
                  Eliminar
                </button>
              </div>
            </div>
            ))}
            </>  
            }

<Modal
                    isOpen={modalDeleteAccountService}
                    onRequestClose={closeModalDeleteAccountService}
                    ariaHideApp={false}
                    className={styles.modal_delete}
                    overlayClassName={styles.modal_delete_overlay}
                  >
                    <img 
                        src={`https://api-streaming.onrender.com/uploads/${image}`}
                    />
                    <span>Tem a certeza que deseja eliminar esta conta de serviço?</span>
                    <div className={styles.button_group}>
                      <button className="btn_default">Bloquear</button>
                      <button 
                      className={`btn_default ${styles.btn_delete}`}
                      onClick={() => handlerDeleteAccountService()}
                      >Confirmar</button>
                    </div>
                  </Modal>
          </div>
        </div>
      </section>


    </>
  );
}
