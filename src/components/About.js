import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [userData,setUserData] = useState({})
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch('https://vartavibesback.onrender.com/about', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      
      setUserData(data);

      // if(!(res.status===200)){
      //   throw new Error(res.error);
      //   // throw error;
      // }

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
    callAboutPage();
  },[]);

  return (
    <div>
      <form method='GET'>
        <h1>{userData?.name}</h1>
      </form>
    </div>
  )
}

export default About