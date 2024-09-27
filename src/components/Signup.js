import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, username, password, cpassword } = user;

        const response = await fetch("https://vartavibesback.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, username, password, cpassword
            })
        })

        const data = response.json();
        console.log(data);

        if (!data || data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else {
            window.alert(" Registration Successfull");
            console.log(" Registration Successfull");

            navigate("/login");
        }
    }

    return (
        <div className='d-flex flex-column align-items-center justify-content-center' >
            <div className='' style={{ width: "50%", marginTop: "10%" }}>
                <h1 className='mb-3'>Register</h1>
                <form method='POST' className="mb-3">
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="name">Name</label> */}
                        <input className="form-control" type="text" id="name" name="name" value={user.name} onChange={handleInputs} placeholder='Your name' required />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="name">Name</label> */}
                        <input className="form-control" type="text" id="username" name="username" value={user.username} onChange={handleInputs} placeholder='Username' required />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="email">Email</label> */}
                        <input className="form-control" type="email" id="email" name="email" placeholder='Your Email' value={user.email} onChange={handleInputs} required />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="password">Password</label> */}
                        <input className="form-control" type="password" id="password" name="password" placeholder='Password' value={user.password} onChange={handleInputs} required />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label" htmlFor="cpassword">Confirm Password</label> */}
                        <input className="form-control" type="password" id="cpassword" name="cpassword" placeholder='Confirm password' value={user.cpassword} onChange={handleInputs} required />
                    </div>
                    <button type='submit' onClick={PostData} className="btn btn-success w-100">Register</button>
                </form>
                <div className=''>
                    <p>Already Registered? <a className="" href="/login">login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;