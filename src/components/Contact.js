import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  })
  // const navigate = useNavigate();

  const userContact = async () => {
    try {
      const res = await fetch('https://vartavibesback.onrender.com/getdata', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      setUserData({ ...userData, name: userData.name, email: userData.email });


      // if(!(res.status===200)){
      //   throw new Error(res.error);
      //   // throw error;
      // }

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }
    } catch (err) {
      console.log(err);
      // navigate('/login');
    }
  }

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // send message to the server and save it to the database

  const sendMessage =async (e) => {
    e.preventDefault();

    const { name, email, message } = userData;

    const response = await fetch("https://vartavibesback.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, message
            }),
            credentials: "include",
        })

        const data = response.json();
        // console.log(data);

        if(data){
          alert("Message sent.")
          setUserData({...userData, message:""});
        }
        else{
          alert("message not sent");
          console.log("message not sent");
        }
  }

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' >
      <div className='shadow-lg p-5 rounded' style={{ width: "80%", marginTop: "10%" }}>
        <h1 className='mb-3'>Get in touch</h1>
        <form method='POST' className="">
          <div>
            <div className="mb-3">
              {/* <label className="form-label" htmlFor="email">Email</label> */}
              <input className="form-control" type="text" id="name" name="name" value={userData.name} onChange={handleInputs} placeholder='Your name' required />
            </div>
            <div className="mb-3">
              {/* <label className="form-label" htmlFor="password">Password</label> */}
              <input className="form-control" type="email" id="email" name="email" value={userData.email} onChange={handleInputs} placeholder='Your email' required />
            </div>
          </div>
          <div>
            <textarea className="form-control mb-3" name='message' value={userData.message} onChange={handleInputs} placeholder="Leave a message here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
            {/* <label for="floatingTextarea2">Comments</label> */}
          </div>
          <button type='submit' onClick={sendMessage} className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact