import { useState } from 'react';
import "../styles/LoginPage.css";
import Loader from "../assets/icons/loadingspinner.svg";
import Button from '@mui/material/Button';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    var BtnText = "Login";
    const login = async () => {
        setLoading(true);
        var errorSection = document.getElementById('emailError');
        if (errorSection) {
            errorSection.style.display = "block";
        }
        try {
            const response = await axios.post('https://teaching-app-back-end.onrender.com/api/auth/loginUser', { email, password });
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            navigate("/homeUser");
        } catch (error) {
            console.log(error);
            setError("Email entered is not a valid user email!");
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
                <Button className='switch-btn' size="small" color='secondary' variant='contained' onClick={() => navigate("/loginAdmin")}>Admin</Button>
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
                        type="password"
                        variant='filled'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* <input type="text" className="email-input" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> */}
                {/* <input type="text" className="pass-input" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> */}
                <a className='forgot-pass' href='#'>Forgot Password?</a>
                <p id="emailError" style={{ color: "red", display: "block" }}>{error}</p>
                <div className="login-btn">
                    <Button variant="contained" type="submit">{loading ? <img src={Loader} alt="Loader" /> : BtnText}</Button>
                </div>
                <a className='switch' href="/registerUser">Don't have an account? Register</a>
            </form>
        </div>
    )
}

export default LoginUser