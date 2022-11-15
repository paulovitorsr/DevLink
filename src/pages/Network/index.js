import React, {useState, useEffect} from 'react'

import './network.css';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Logo from '../../components/Logo';

import {toast} from 'react-toastify';

import { db } from '../../services/FirebaseConnection';
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore';

import {MdAddLink} from 'react-icons/md';

const Network = () => {
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    useEffect( () => {
        function loadingLink(){
            const docRef = doc( db, "social", "links" );
            getDoc(docRef)
            .then( (snapshot) => {
                
                if (snapshot.data() !== undefined) {
                    
                    setFacebook(snapshot.data().facebook);
                    setInstagram(snapshot.data().instagram);
                    setYoutube(snapshot.data().youtube);

                }

            } )
            .catch( (err) => {
                console.log(err)
            } )
        }

        loadingLink();
    }, [] )


    const handleSave = (e) => {
        e.preventDefault()

        if (facebook === '' || instagram === '' || youtube === '') {
            toast.warn("Preencha todos os links")
            return;
        }

        setDoc( doc(db, "social", "links"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then( () => {
            toast.success("Lins salvo com sucesso!");
            setFacebook('');
            setInstagram('');
            setYoutube('');
        } )
        .catch( (err) => {
            console.log(err);
        } )

    };

  return (
    <div className='admin-container'>
        <Header/>
        <Logo />

        <h1 className='title-social'>Suas redes sociais</h1>

        <form className='form' onSubmit={handleSave}>
            <label className='label'>Link do Facebook</label>

            <Input 
                placeholder="Digite a url do facebook..."
                value={facebook}
                onChange={ (e) => setFacebook(e.target.value) }
            />
            <label className='label'>Link do Instagram</label>

            <Input 
                placeholder="Digite a url do Instagram..."
                value={instagram}
                onChange={ (e) => setInstagram(e.target.value)}
            />

            <label className='label'>Link do Youtube</label>

            <Input 
                placeholder="Digite a url do Youtube..."
                value={youtube}
                onChange={ (e) => setYoutube(e.target.value)}
            />

            <button type='submit' className='btn-register' >
                Salvar links <MdAddLink size={24} color="#fff" />
            </button>
        </form>
    </div>
  )
}

export default Network