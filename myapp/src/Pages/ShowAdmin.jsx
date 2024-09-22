import React from 'react'
import Header from '../Components/Header'
import UploadContent from '../Components/UploadContent';
import { Button } from '@mui/material';
import '../styles/ShowUser.css';
import { useNavigate } from 'react-router-dom';
const ShowAdmin = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('adminToken');
        window.location.replace('/loginAdmin');
        window.localStorage.clear();
        window.sessionStorage.clear();
    }
    function viewContent() {
        navigate("/show");
    }
    return (
        <>
            <Header />
            <div className='logout-btn'>
                <Button color='secondary' variant='contained' onClick={logout}>Logout</Button>
            </div>
            <div>
                <UploadContent />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button onClick={viewContent}>Show Content</button>
            </div>
        </>
    )
}

export default ShowAdmin