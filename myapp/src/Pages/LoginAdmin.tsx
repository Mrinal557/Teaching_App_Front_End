import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "../styles/LoginPage.css";
import Loader from '../assets/icons/loadingspinner.svg';
import Button from '@mui/material/Button';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    var BtnText = "Login";
    const navigate = useNavigate();
    const login = async () => {
        setLoading(true);
        var errorSection = document.getElementById('emailError');
        if (errorSection) {
            errorSection.style.display = "block";
        }
        try {
            if (email === 'm123@gmail.com' || email === 'mrinal.annand@gmail.com') {
                const response = await axios.post('https://teaching-app-back-end.onrender.com/api/auth/loginAdmin', { email, password });
                const token = response.data.token;
                console.log('response: ', response);
                localStorage.setItem('adminToken', token);
                navigate("/homeAdmin");
            }
            else {
                setError("Email entered is not a valid admin email!");
                if (errorSection) {
                    errorSection.style.display = 'block';
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Account Not Found, Try Again',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
        setLoading(false);
    }
    return (
        <div>
            <Header />
            <div>
                <Button className='switch-btn' size="small" color='secondary' variant='contained' onClick={() => navigate("/loginUser")}>User</Button>
            </div>
            <form className="inp-box" onSubmit={(e) => { e.preventDefault(); login(); }}>
                <div className="email-input">
                    <TextField
                        required
                        sx={{ width: '50%' }}
                        id="outlined-required"
                        label="Email"
                        variant='filled'
                        type="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='pass-input'>
                    <TextField
                        required
                        sx={{ width: '50%' }}
                        id="outlined-password-input"
                        label="Password"
                        variant='filled'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <a className='forgot-pass' href='#'>Forgot Password?</a>
                <p id="emailError" style={{ color: "red", display: "block" }}>{error}</p>
                <div className="login-btn">
                    <Button variant="contained" type='submit'>{loading ? <img src={Loader} alt="Loader" /> : BtnText}</Button>
                </div>
                <a className='switch' href="/registerAdmin">Don't have an account? Register</a>
            </form>
        </div>
    )
}

export default LoginAdmin