import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Input from '../../components/Input';

import { MdAddLink } from 'react-icons/md';

import { FiTrash2 } from 'react-icons/fi'

import { toast } from 'react-toastify'

import { db } from '../../services/FirebaseConnection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore'

import './admin.css';




const Admin = () => {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [backgrounColorInput, setBackgroundColorInput] = useState('#f1f1f1');
  const [textColorInput, setTextColorInput] = useState('#121212');

  const [links, setLinks] = useState([])

  const handleRegister = async (e) => {
    e.preventDefault()

    if (nameInput === '' || urlInput === '') {
      toast.warn("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgrounColorInput,
      color: textColorInput,
      created: new Date(),
    })
    .then( () => {
      setNameInput('')
      setUrlInput('')
      toast.success("Link registrado com sucesso!");
    } )
    .catch( (err) => {
      toast.error("Link não registrado, favor entrar em contato com a TI");
      console.log(err);
    } )
  }

  useEffect( () => {

    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach( (doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      } )

      setLinks(lista);

    })

  }, [] )

  const handleDelete = async (id) => {

    const docRef = doc(db, "links", id)

    await deleteDoc(docRef)

  }


  return (
    <div className="admin-container">
      <Header />
      <Logo />

      <form className='form' onSubmit={handleRegister}>

        <label className='label'>Nome do link</label>
        <Input 
          placeholder="Nome do link" 
          type="text" 
          value={nameInput}
          onChange={ (e) => setNameInput(e.target.value) }
        />

        <label className='label'>Url do link</label>
        <Input 
          placeholder="Digite a Url" 
          type="url"
          value={urlInput}
          onChange={ (e) => setUrlInput(e.target.value) }
        />

        <section className='container-colors'>

          <div>
            <label className='label right'>Fundo do link</label>
            <input 
              type="color" 
              value={backgrounColorInput}
              onChange={ (e) => setBackgroundColorInput(e.target.value) }
            />
          </div>

          <div>
            <label className='label right'>Cor do link</label>
            <input 
              type="color" 
              value={textColorInput}
              onChange={ (e) => setTextColorInput(e.target.value) }
            />
          </div>

        </section>

        { nameInput !== '' && (
          <div className='preview'>
            <label className="label">Veja como está ficando</label>
            <article className='list' style={{marginBottom: 8 ,marginTop: 8, backgroundColor: backgrounColorInput} }>
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        ) }

        <button className='btn-register' type="submit">
          Cadastrar <MdAddLink size={24} color="#fff" />
        </button>

      </form>

      <h2 className='title'>
        Meus links
      </h2>

      {links.map( (item, index) => (

        <article 
          className='list animate-pop' 
          style={{ backgroundColor: item.bg, color: item.color }}
          key={index}
        >
          <p>{item.name}</p>
          <div>
            <button className='btn-delete' onClick={ () => handleDelete(item.id)}>
              <FiTrash2 size={18} color="#fff" />
            </button>
          </div>
        </article>

      ))}

    </div>
  )
}

export default Admin;