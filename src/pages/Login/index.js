import React, {useState} from 'react';
import './login.css';

import Logo from '../../components/Logo'
import Input from '../../components/Input';

import {auth} from '../../services/FirebaseConnection';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from'react-router-dom';

import {toast} from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then( () => {
      toast.success("Seja bem vindo 😀")
      navigate("/admin", { replace: true });
    } )
    .catch( () => {
      toast.error("E-mail ou senha incorreto");
      console.log("Erro ao fazer login");
    } )
    
  }


  return (
    <div className='login-container'>
      <Logo />
      
      <form className='form' onSubmit={handleLogin}>
        <Input 
          type="email" 
          placeholder='Digite seu E-mail' 
          value={email}
          onChange={ (e) => setEmail(e.target.value) }
        />
        
        <Input 
          type="password" 
          placeholder='Digite sua senha' 
          autoComplete='on'
          value={password}
          onChange={ (e) => setPassword(e.target.value) }
        />

        <button type='submit' className='btn'>Acessar</button>
      </form>

      
    </div>
  )
}

export default Login;