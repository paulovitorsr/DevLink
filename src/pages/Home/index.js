import React, {useState, useEffect} from 'react'

import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import Social from '../../components/Social';

//CSS
import './home.css';

import {db} from '../../services/FirebaseConnection';
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
} from 'firebase/firestore';
const Home = () => {
  const [links, setLinks] = useState([]);

  const [socialLinks, setSocialLinks] = useState({});
  

  useEffect( () => {

    function loadLinks(){
      const linkRef = collection( db, "links" );
      const queryRef = query(linkRef, orderBy("created", "asc"));

      getDocs(queryRef)
      .then( (snapshot) => {
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

        setLinks(lista)

      } )
    }

    loadLinks();

  }, [] )

  useEffect( () => {

    function socialLinks() {
      const docRef = doc(db, "social", "links");
      
      getDoc(docRef)
      .then( (snapshop) => {
        if (snapshop.data() !== undefined) {
          setSocialLinks({
            facebook: snapshop.data().facebook,
            instagram: snapshop.data().instagram,
            youtube: snapshop.data().youtube
          })
        }
      } )
    }

    socialLinks();

  }, [] )

  return (
    <div className='home-container'>
      <h1>Paulo Vitor</h1>
      <span>Veja meus links  👇</span>

     <main className='link'>
        
        {links.map( (item) => (
          <section className='link-area' style={{ backgroundColor: item.bg }} key={item.id}>
            <a href={item.url} target="blank">
              <p className='link-text' style={{ color: item.color }}>{item.name}</p>
            </a>
          </section>
        ) )}

        {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color="#ffffff"/>
            </Social>  

            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#ffffff"/>
            </Social>  
            
            <Social url={socialLinks.youtube}>
              <FaYoutube size={35} color="#ffffff"/>
            </Social>  
        </footer>
        )}

     </main>
    </div>
  )
}

export default Home