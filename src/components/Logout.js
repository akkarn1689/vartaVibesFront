import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Logout = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(userContext);

    const navigate = useNavigate();

    useEffect(()=>{
        fetch('https://vartavibesback.onrender.com/logout', {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Contet-Type": 'application/json'
            },
            credentials: "include",
        }).then((res)=>{
            setIsLoggedIn(false);
            navigate('/login', {replace: true});
            if(res.status!==200){
                throw new Error(res.error);
            }
        }).catch((err)=>{
            console.log(err);
        });
    })
  return (
    <div></div>
  )
}

export default Logout