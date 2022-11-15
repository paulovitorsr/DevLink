import {useState, useEffect} from 'react';

import {auth} from '../../src/services/FirebaseConnection';
import {onAuthStateChanged} from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { async } from '@firebase/util';

export default function Private({children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect( () => {

        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {

                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    };

                    //Salvando no localStare do computador
                    localStorage.setItem("@datailUser", JSON.stringify(userData))
                    //Se tem usuário logado os estados mudam
                    setLoading(false);
                    setSigned(true);
                }else{
                    //Se não tem usuário logado
                    setLoading(false);
                    setSigned(false);
                }

            })
        }

    checkLogin();

    }, [] )

    if (loading) {
        return(
            <div></div>
        )
    }

    if (!signed) {
        return <Navigate to='/login' />
    }

    return children;
}