import React, { useState, useEffect } from 'react';
import "../styles/LoginPage.css";
import Loader from "../assets/icons/loadingspinner.svg";
import Button from '@mui/material/Button';
import Header from '../Components/Header';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    var BtnText = "Register"
    async function register() {
        setLoading(true);
        await axios.post('https://teaching-app-back-end.onrender.com/api/auth/registerUser', {
            email: email,
            password: password
        }).then((res) => {
            Swal.fire({
                title: 'Success',
                text: 'User Registration Success',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            navigate("/loginUser");
        })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Email Already Registered!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            });
        setLoading(false);
    }
    return (
        <div>
            <Header />
            <div>
                <Button className='switch-btn' size="small" color='secondary' variant='contained' onClick={() => navigate("/registerAdmin")}>Admin</Button>
            </div>
            <form className="inp-box" onSubmit={(e) => { e.preventDefault(); register(); }}>
                <div className="email-input">
                    <TextField
                        required
                        sx={{ width: '50%' }}
                        id="outlined-required"
                        variant='filled'
                        label="Email"
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
                <div className="login-btn">
                    <Button type="submit" variant="contained">{loading ? <img src={Loader} alt="Loader" /> : BtnText}</Button>
                </div>
                <a className="switch" href='/loginUser'>Already have an account? Login</a>
            </form>
        </div>
    )
}

export default RegisterUser