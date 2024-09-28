import React, { useState, useEffect } from 'react';
import "../styles/LoginPage.css";
import Button from '@mui/material/Button';
import Header from '../Components/Header';
import Loader from "../assets/icons/loadingspinner.svg";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
const RegisterAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    var BtnText = "Register";
    async function register(e: any) {
        e.preventDefault();
        setLoading(true);
        await axios.post('https://teaching-app-back-end.onrender.com/api/auth/registerAdmin', {
            email: email,
            password: password
        }).then((res) => {
            Swal.fire({
                title: 'Success',
                text: 'Admin Registration Success',
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            navigate("/loginAdmin");
        }).catch((err) => {
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
                <Button className='switch-btn' size="small" color='secondary' variant='contained' onClick={() => navigate("/registerUser")}>User</Button>
            </div>
            <form className="inp-box" onSubmit={(e) => {e.preventDefault();register(e);}}>
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
                        variant='filled'
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <a className='forgot-pass' href='#'>Forgot Password?</a>
                <div className="login-btn">
                    <Button type="submit" variant="contained">{loading ? <img src={Loader} alt="Loader" /> : BtnText}</Button>
                </div>
                <a className="switch" href='/loginAdmin'>Already have an account? Login</a>
            </form>
        </div>
    )
}

export default RegisterAdmin