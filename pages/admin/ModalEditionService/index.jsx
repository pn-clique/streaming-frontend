import { useState, useRef } from "react";

import { useRouter } from "next/router";

// OTHERS
import FormData from "form-data";

// MODAL
import Modal from "react-modal";

// iCONS
import { MdOutlineAddToPhotos } from "react-icons/md";

// AXIOS API
import { Api } from "../../../api/axios";
import axios from "axios";

// STYLES
import styles from "./styles.module.scss";
import { useEffect } from "react";

export default function ModalEditionService({
  ModalIsOpen,
  serviceId,
  setServiceId,
  modalEditionServiceIsOpen,
  setModalEditionServiceIsOpen,
}) {
  const refImage = useRef(null);

  const navigate = useRouter();

  const [smsError, setSmsError] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [preco, setPreco] = useState("");
  const [pontos, setPontos] = useState("");
  const [duracao, setDuracao] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [comissao, setComissao] = useState("");
  const [recarga, setRecarga] = useState("");

  const [services, setServices] = useState([]);

  function closeEditionService() {
    setServiceId("");
    setName();
    setPreco("");
    setPontos("");
    setDuracao("");
    setCapacidade("");
    setComissao("");
    setRecarga("");
    setImage("");

    console.log("service_id : ", serviceId);

    setModalEditionServiceIsOpen(!modalEditionServiceIsOpen);
  }

  const loadingServices = () => {
    Api.get("services")
      .then((res) => {
        res.data.services;
        setServices(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));
  };

  function handlerSubmit(e, data) {
    e.preventDefault();

    const file = refImage.current.files[0];

    const form = new FormData();
    form.append("name", name == "" ? data.name : name);
    form.append("recarga", recarga == "" ? data.recarga : recarga);
    form.append("preco", 200);
    form.append("pontos", pontos == "" ? data.pontos : pontos);
    form.append("duracao", duracao == "" ? data.duracao : duracao);
    form.append("capacidade", capacidade == "" ? data.capacidade : capacidade);
    form.append("comissao", comissao == "" ? data.comissao : comissao);
    form.append("image", file == undefined ? data.image : file);

    console.log("files : ", file == undefined ? file : data.image);
    console.log("name : ", name == '' ? data.name : name);

    console.log(data.name);

    const token = localStorage.getItem("token");
    const url = `https://api-streaming.onrender.com/services/${serviceId}`;
    axios
      .put(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
        closeModal()
        res;
      })
      .catch((error) => {
        console.log("Error: ", error);
        setSmsError(true);
      });
  }

  useEffect(() => {
    // EditService()
    loadingServices();
  }, []);

  const [inputFile, setInputFile] = useState("");

  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeEditionService}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
      ariaHideApp={false}
    >
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handlerSubmit}
      >
        {services.map((data, key) => {
          if (data._id == serviceId)
            return (
              <>
                <>
                  {smsError ? (
                    <div className={styles.message_error}>
                      <p>Preencha todos os campos correctamente!</p>
                    </div>
                  ) : (
                    ""
                  )}
                </>
                <header>
                  <div>
                    <h2>Editar serviço</h2>
                    <span>Edite o serviço</span>
                  </div>
                  <button onClick={closeEditionService}>X</button>
                </header>

                <div className={styles.image_service}>
                  <label className={styles.label_image}>
                    <MdOutlineAddToPhotos />
                    <input
                      required
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => {
                        setInputFile(e.target.files[0].name);
                      }}
                      ref={refImage}
                    />

                    <span>
                      {inputFile === "" ? "Atualizar imagem" : inputFile}
                    </span>
                  </label>
                </div>

                <div className={styles.name_service}>
                  <input
                    required
                    type="text"
                    placeholder={data.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.comission_service}>
                  <input
                    required
                    type="text"
                    placeholder={data.comissao}
                    onChange={(e) => setComissao(e.target.value)}
                  />
                  <input
                    required
                    type="text"
                    placeholder={data.duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                  />
                </div>

                <div className={styles.data_service}>
                  <input
                    required
                    type="text"
                    placeholder={data.capacidade}
                    onChange={(e) => setCapacidade(e.target.value)}
                  />
                  <input
                    required
                    type="text"
                    placeholder={data.pontos}
                    onChange={(e) => setPontos(e.target.value)}
                  />
                  <input
                    required
                    type="text"
                    placeholder={data.preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </div>

                <div className={styles.code_service}>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder={data.recarga}
                    onChange={(e) => setRecarga(e.target.value)}
                  ></textarea>
                </div>

                <div className={styles.btn_service}>
                  <button type="submit" onClick={(e) => handlerSubmit(e, data)}>
                    Salvar
                  </button>
                </div>
              </>
            );
        })}
      </form>
    </Modal>
  );
}
