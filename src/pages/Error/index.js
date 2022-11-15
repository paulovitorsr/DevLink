import React from 'react'
import './erro.css';
import {Link} from 'react-router-dom';

//Logo
import Logo from '../../components/Logo';

const Error = () => {
  return (
    <div className='erro'>
        <Logo/>
        <h1>Error: 404</h1>
        <p>Essa página não existe.</p>

        <Link to='/' className='link'>
          Voltar para a Home
        </Link>
    </div>
  )
}

export default Error;