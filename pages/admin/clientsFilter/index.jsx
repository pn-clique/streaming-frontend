

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

// AXIOS
import { Api } from "../../../api/axios";

import ModalNewService from "../ModalNewService";
import ModalEditionService from "../ModalEditionService";
import ModalAddAccountService from "../ModalAddAccountService";
import ModalEditAccountService from "../ModalEditAccountService";
export default function clientsFilter() {

  const [modalAddService, setModalAddService] = useState(false);
  const [modalEditAccountService, setModalEditAccountService] = useState(false);
  const [modalDeleteAccountService, setModalDeleteAccountService] = useState(false)

  const [accountServiceId, setAccountServiceId] = useState('')

  const navigate = useRouter();

  const [ourClients, setOurClients] = useState([]);
  const [myAccountServices, setMyAccountServices] = useState([]);
  const [services, setServices] = useState([]);
  const [ourClientId, setOurClientId] = useState("");

  // MODAL
  const [isOpen, setIsOpen] = useState(false);

  // Function open modal
  function modalIsOpen() {
    setIsOpen(true);
  }
  // Function close modal
  function closeModal() {
    setIsOpen(false);
  }

    // FUNCTIONS DELETE ACCOUNT SERVICES
    function openModalDeleteAccountService() {
      setModalDeleteAccountService(true);
    }
    function closeModalDeleteAccountService() {
      setModalDeleteAccountService(false);
    }


  useEffect(() => {
    Api.get("/clients")
      .then((res) => {
        res.data.user;
        setOurClients(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/my-account-services")
      .then((res) => {
          res.data.accountServicesOfTheUser;
        setMyAccountServices(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/services")
      .then((res) => {
        res.data.services;
        setServices(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));
  }, []);


        // FUNCTION CONFIRM DELETE ACCOUNT SERVICE
        const [deleteClient, setDeleteClient] = useState('');
        const [image, setImage] = useState('');
        const [name, setName] = useState('');

        function handlerDeleteAccountService(id) {
          Api.delete(`user/${deleteClient}`)
            .then((res) => {
              console.log('delete account services : ', res.data.message);
              // window.location.reload();
              console.log(name);
            })
            .catch((error) => console.log("Erro in delete account: ", error));
        }

        const [search, setSearch] = useState('')
        const [myResult, setMyResult] = useState(false)
      
        const data = Object.values(ourClients)
        function search_account_services(account) {
          return account.filter(item => {
            if(
              item.id == search || 
              item.name == search || 
              item.email == search
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
              // onClick={handlerLogout}
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
              <h2>Todos clientes</h2>
              <span>Todos clientes disponiveis</span>
            </div>
          </header>

          <div className={styles.filter}>
          <input
              type="text"
              placeholder="Pesquisar pelo nome do cliente"
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
              {myResult ? (<>
                {search_account_services(data).map((account, index) => (
                <div key={index} className={styles.card}>
                <div>
                  <img
                    src={`https://api-streaming.onrender.com/uploads/${account.photo_profile}`}
                    alt={account.name || ''}
                    
                  />
                  <span>{account.name}</span>
                </div>
                <div className={styles.button_group}>
                  
                  <button
                   type="button"
                    className="btn_default"
                    onClick={() => {
                      openModalDeleteAccountService()
                      setImage(account.photo_profile);
                          setName(account.name)
                          setDeleteClient(account._id);
                    }}
                    >
                    Eliminar
                  </button>
                </div>
              </div>
              ))}
              </>) : 
              (<>
              {ourClients.map((account, index) => (
                <div key={index} className={styles.card}>
                <div>
                  <img
                    src={`https://api-streaming.onrender.com/uploads/${account.photo_profile}`}
                    alt={account.name || ''}
                    
                  />
                  <span>{account.name}</span>
                </div>
                <div className={styles.button_group}>
                  
                  <button
                   type="button"
                    className="btn_default"
                    onClick={() => {
                      openModalDeleteAccountService()
                      setImage(account.photo_profile);
                          setName(account.name)
                          setDeleteClient(account._id);
                    }}
                    >
                    Eliminar
                  </button>
                </div>
              </div>
              ))}
              </>)}

              <Modal
                    isOpen={modalDeleteAccountService}
                    onRequestClose={closeModalDeleteAccountService}
                    ariaHideApp={false}
                    className={styles.modal_delete}
                    overlayClassName={styles.modal_delete_overlay}
                  >
                    <img 
                        src={`https://api-streaming.onrender.com/uploads/${image}`}
                        alt={name}
                    />
                    <p>{name}</p>
                    <span>Tem a certeza que deseja eliminar este cliente?</span>
                    <div className={styles.button_group}>
                      <button 
                      className={`btn_default ${styles.btn_delete}`}
                      onClick={() => {
                        handlerDeleteAccountService()

                      }}
                      >Confirmar</button>
                    </div>
                  </Modal>
          </div>
        </div>
      </section>


    </>
  );
}
