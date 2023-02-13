import { useState, useRef } from "react";

import { useRouter } from "next/router";

// OTHERS
import FormData from "form-data";


// MODAL
import Modal from "react-modal";


// iCONS
import { MdOutlineAddToPhotos } from "react-icons/md";


// AXIOS API
import { Api } from '../../../api/axios'


// STYLES
import styles from "./styles.module.scss";
import axios from "axios";
import { useEffect } from "react";




export default function ModalEditionService({ ModalIsOpen, closeModal, id }) {
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

  const loadingServices = () => {
    Api.get(`services/${id}`)
    .then(res => {
      setName(res.data.service.name);
      setPreco(res.data.service.preco);
      setPontos(res.data.service.pontos);
      setDuracao(res.data.service.duracao)
      setCapacidade(res.data.service.capacidade);
      setComissao(res.data.service.comissao);
      setRecarga(res.data.service.recarga)
      setImage(res.data.service.image)
    })
    .catch(error => console.log('Erro: ', error));
  }

  function handlerSubmit(e) {
    
    e.preventDefault()
    closeModal()



    const file = refImage.current.files[0];
    console.log({
      file,
      name,
      preco,
      pontos,
      duracao,
      capacidade,
      comissao,
      recarga
    })


    const form = new FormData();
    form.append('name', name);
    form.append('recarga', recarga);
    form.append('preco', preco);
    form.append('pontos', pontos);
    form.append('duracao', duracao);
    form.append('capacidade', capacidade);
    form.append('comissao', comissao);
    form.append('image', file);


    const token = localStorage.getItem('token')
    const url = `https://api-streaming.onrender.com/services/${id}`
    axios.put(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":  `Bearer ${token}`
      }
    }).then(res => {
      window.location.reload();
      console.log('Success: ', res)
    })
    .catch(error => console.log('Error: ', error))
  }

  useEffect(() => {
    loadingServices();
  }, [])

  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
      ariaHideApp={false}
    >
      <form className={styles.form} encType="multipart/form-data" onSubmit={handlerSubmit}>
        <div>
          <div>
            <h2>Editar serviço</h2>
            <span>Edite o serviço</span>
          </div>
          <button onClick={closeModal}>X</button>
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
            value={recarga}
            onChange={(e) => setRecarga(e.target.value)}
          ></textarea>
        </div>

        <div>
          <button type="submit" onClick={handlerSubmit}>Adicionar</button>
        </div>
      </form>
    </Modal>
  );
}
