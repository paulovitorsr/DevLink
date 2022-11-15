import './header.css';


import {BiLogOut} from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../services/FirebaseConnection';
import {signOut} from 'firebase/auth'


const Header = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/", { replace: true })


  }  

  return (
    <header className='admin-header'>
        <nav className='nav-header'>
            <button onClick={handleLogout}>
            <BiLogOut size={28} color="#db2629" />
            </button>

            <Link to="/admin" >
                Links
            </Link>

            <Link to="/admin/social" >
                Redes sociais
            </Link>
        </nav>
    </header>
  )
}

export default Header