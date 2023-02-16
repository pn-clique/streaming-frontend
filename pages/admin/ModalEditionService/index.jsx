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
    setName("");
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
        // setName(res.data.service.name);
        // setPreco(res.data.service.preco);
        // setPontos(res.data.service.pontos);
        // setDuracao(res.data.service.duracao);
        // setCapacidade(res.data.service.capacidade);
        // setComissao(res.data.service.comissao);
        // setRecarga(res.data.service.recarga);
        // setImage(res.data.service.image);
      })
      .catch((error) => console.log("Erro: ", error));
  };

  function handlerSubmit(e, data) {
    e.preventDefault();

    const file = refImage.current.files[0];


    const form = new FormData();
    form.append("name", name == "" ? data.name : name);
    form.append("recarga", recarga == "" ? data.recarga : recarga);
    form.append("preco", preco == "" ? data.preco : preco);
    form.append("pontos", pontos == "" ? data.pontos : pontos);
    form.append("duracao", duracao == "" ? data.duracao : duracao);
    form.append("capacidade", capacidade == "" ? data.capacidade : capacidade);
    form.append("comissao", comissao == "" ? data.comissao : comissao);
    form.append("image", file == undefined ? data.image : file);

    console.log('files : ', file == undefined ? file : data.image);
    console.log('name : ', name == "" ? data.name : name);

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
        res
      })
      .catch((error) => console.log("Error: ", error));
  }

  useEffect(() => {
    loadingServices();
  }, []);

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
                <div>
                  <div>
                    <h2>Editar serviço</h2>
                    <span>Edite o serviço</span>
                  </div>
                  <button onClick={closeEditionService}>X</button>
                </div>

                <div>
                  <label htmlFor="imgService">
                    <MdOutlineAddToPhotos />
                    <input
                      type="file"
                      name="image"
                      id="imgService"
                      ref={refImage}
                    />
                  </label>
                  <label htmlFor="imgService">
                    {data.image === ""
                      ? "Adicione uma imagem para o serviço"
                      : data.image}
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder={data.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder={data.comissao}
                    value={comissao}
                    onChange={(e) => setComissao(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={data.duracao}
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder={data.capacidade}
                    value={capacidade}
                    onChange={(e) => setCapacidade(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={data.pontos}
                    value={pontos}
                    onChange={(e) => setPontos(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={data.preco}
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </div>

                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder={data.recarga}
                    value={recarga}
                    onChange={(e) => setRecarga(e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <button type="submit" onClick={(e) => handlerSubmit(e, data)}>
                    Adicionar
                  </button>
                </div>
              </>
            );
        })}
      </form>
    </Modal>
  );
}
