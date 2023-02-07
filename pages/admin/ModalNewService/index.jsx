import Modal from "react-modal";

import { MdOutlineAddToPhotos } from "react-icons/md";

import { useState } from "react";

import { Api } from '../../../api/axios'

import styles from "./styles.module.scss";

export default function ModalNewService({ ModalIsOpen, closeModal }) {
  const [service, setService] = useState();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [preco, setPreco] = useState("");
  const [pontos, setPontos] = useState("");
  const [duracao, setDuracao] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [comissao, setComissao] = useState("");

  function handlerSubmit(e) {
    e.preventDefault();

    closeModal

    const data = {
      image,
      name,
      preco,
      pontos,
      duracao,
      capacidade,
      comissao
    }
    
    const res = Api.post('services/create', data);

    console.log(data);


  }

  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
      ariaHideApp={false}
    >
      <form className={styles.form} onSubmit={handlerSubmit}>
        <div>
          <div>
            <h2>Adicionar serviço</h2>
            <span>Adicionar novo serviços</span>
          </div>
          <button onClick={closeModal}>X</button>
        </div>

        <div>
          <label htmlFor="imgService">
            <MdOutlineAddToPhotos />
            <input
              type="file"
              src=""
              id="imgService"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label htmlFor="imgService">
          {image === ''? 'Adicione uma imagem para o serviço' : (image) }
          </label>
        </div>

        <div>
          <input
            type="text"
            placeholder="Digite o nome do serviço:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Digite a comissão:" 
            value={comissao} 
          onChange={(e) => setComissao(e.target.value)}
            />
          <input type="text" placeholder="Digite a duração do serviço:" 
          value={duracao} 
          onChange={(e) => setDuracao(e.target.value)}
          />
        </div>

        <div>
          <input type="text" placeholder="Digite a capacidade:"
          value={capacidade} 
          onChange={(e) => setCapacidade(e.target.value)}
          />
          <input type="text" placeholder="Digite o pontos:"
          value={pontos} 
          onChange={(e) => setPontos(e.target.value)}
          />
          <input type="text" placeholder="Digite o preço:"
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
            placeholder="Digite uma observação:"
          ></textarea>
        </div>

        <div>
          <button type="submit" onClick={handlerSubmit}>Adicionar</button>
        </div>
      </form>
    </Modal>
  );
}
