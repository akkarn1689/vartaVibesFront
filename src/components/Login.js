import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { userContext } from '../context/userContext';


const Login = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(userContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const response = await fetch('https://vartavibesback.onrender.com/signin', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
            credentials: 'include',
        });

        const data = response.json();
        // console.log(data);

        if (data.status === 400 || !data) {
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
        }
        else {
            window.alert("Login Successfull");
            console.log("Login Successfull");

            setIsLoggedIn(true);
            navigate("/chat");
        }
    }

    return (
        <div className='d-flex flex-column align-items-center justify-content-center' >
            <div className='' style={{ width: "50%", marginTop: "10%" }}>
                <h1 className='mb-3'>Login</h1>
                <form method='POST' className="">
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="email">Email</label> */}
                        <input className="form-control" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' required />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="password">Password</label> */}
                        <input className="form-control" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </div>
                    <button type='submit' onClick={loginUser} className="btn btn-success w-100">Login</button>
                </form>
                <div>
                    <p>Not registered yet? <a className="" href="/signup">register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;