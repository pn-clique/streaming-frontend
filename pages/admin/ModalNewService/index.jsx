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

// STYLES
import styles from "./styles.module.scss";
import axios from "axios";

export default function ModalNewService({ ModalIsOpen, closeModal }) {
  const refImage = useRef(null);

  const navigate = useRouter();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [preco, setPreco] = useState("");
  const [pontos, setPontos] = useState("");
  const [duracao, setDuracao] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [comissao, setComissao] = useState("");
  const [obs, setObs] = useState("");

  const [inputFile, setInputFile] = useState("");

  const [smsError, setSmsError] = useState(false);

  function handlerSubmit(e) {
    e.preventDefault();

    const file = refImage.current.files[0];

    const form = new FormData();
    form.append("name", name);
    form.append("recarga", obs);
    form.append("preco", preco);
    form.append("pontos", pontos);
    form.append("duracao", duracao);
    form.append("capacidade", capacidade);
    form.append("comissao", comissao);
    form.append("image", file);

    const token = localStorage.getItem("token");
    const url = "https://api-streaming.onrender.com/services/create/";
    axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        closeModal();
        window.location.reload();
        setSmsError(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setSmsError(true);
      });
  }

  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
      ariaHideApp={false}
    >
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handlerSubmit}
      >
        <span className={""}>
          {smsError ? (
            <div className={styles.message_error}>
              <p>Preencha todos os campos correctamente!</p>
            </div>
          ) : (
            ""
          )}
        </span>
        <header>
          <div className={styles.title}>
            <h2>Adicionar serviço</h2>
            <span>Adicionar novo serviços</span>
          </div>
          <button onClick={closeModal}>X</button>
        </header>

        <div className={styles.image_service}>
          <label className={styles.label_image}>
            <MdOutlineAddToPhotos />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) => {
                setInputFile(e.target.files[0].name);
              }}
              ref={refImage}
            />

            <span>
              {inputFile === ""
                ? "Adicione uma imagem para o serviço"
                : inputFile}
            </span>
          </label>
        </div>

        <div className={styles.name_service}>
          <input
            type="text"
            placeholder="Digite o nome do serviço:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.commission_service}>
          <input
            type="text"
            placeholder="Digite a comissão:"
            value={comissao}
            onChange={(e) => setComissao(e.target.value)}
          />
          <input
            type="text"
            placeholder="Digite a duração do serviço:"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
        </div>

        <div className={styles.data_service}>
          <input
            type="text"
            placeholder="Digite a capacidade:"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Digite o pontos:"
            value={pontos}
            onChange={(e) => setPontos(e.target.value)}
          />
          <input
            type="text"
            placeholder="Digite o preço:"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>

        <div className={styles.code_service}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Digite uma observação:"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.btn_service}>
          <button type="submit" onClick={handlerSubmit}>
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}
