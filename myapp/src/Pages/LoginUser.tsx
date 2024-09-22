import React, { useState, useEffect } from 'react';
import "../styles/LoginPage.css";
import Button from '@mui/material/Button';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
const LoginUser = () =>
{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const login= async()=> 
    {
        try
        {
            const response = await axios.post('https://teaching-app-back-end.onrender.com/api/auth/loginUser', { email, password });
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            navigate("/homeUser");
        } catch (error)
        {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Account Not Found, Try Again',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    }
    return (
        <div>
            <Header />
            <div>
                <Button className='switch-btn' size="small" color='secondary' variant='contained' onClick={() => navigate("/loginAdmin")}>Admin</Button>
            </div>
            <div className="inp-box">
                <input type="text" className="email-input" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" className="pass-input" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <a className='forgot-pass' href='#'>Forgot Password?</a>
                <div className="login-btn">
                    <Button variant="contained" onClick={() => login()}>Login</Button>
                </div>
                <a className='switch' href="/registerUser">Don't have an account? Register</a>
            </div>
        </div>
    )
}

export default LoginUser