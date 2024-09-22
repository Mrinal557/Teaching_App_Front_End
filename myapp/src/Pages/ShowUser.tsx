import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import '../styles/ShowUser.css';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ShowUser = () => {
    const navigate = useNavigate();
    interface Subscription {
        videoLectures: boolean;
        testSeries: boolean;
    }

    interface Subscriptions {
        'physicalChemistry': Subscription;
        'inorganicChemistry': Subscription;
        'organicChemistry': Subscription;
    }
    const [subs, setSubs] = useState<Subscriptions>({
        "physicalChemistry": { videoLectures: false, testSeries: false },
        "inorganicChemistry": { videoLectures: false, testSeries: false },
        "organicChemistry": { videoLectures: false, testSeries: false },
    });

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const token = localStorage.getItem('userToken');
            // console.log('user token: ', token);
            if (!token) throw new Error('No token found');

            await axios.get('https://teaching-app-back-end.onrender.com/api/subscription/subscriptions', {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => { setSubs(res.data); })
                .catch((err) => console.log(err));
            // setSubscriptions(response.data);
        };

        fetchSubscriptions();
    }, []);

    const logout = () => {
        localStorage.removeItem('userToken');
        window.location.replace('/loginUser');
        window.localStorage.clear();
        window.sessionStorage.clear();
    };

    const showL = (sub: keyof Subscriptions) => () => {
        const isSubscribed = subs[sub].videoLectures;
        if (isSubscribed) {
            // `https://teaching-app-back-end.onrender.com/api/content/${subject}/${section}`
            // alert('redirecting you to VL page!');
            navigate(`/content/${sub}/videoLectures`);
        } else {
            // alert('not yet subscribed!');
            navigate(`/subscribe?subject=${sub}&section=videoLectures`);
        }
    };

    const showT = (sub: keyof Subscriptions) => () => {
        // console.log('subscriptions[sub]: ', subs);
        const isSubscribed = subs[sub].testSeries;
        if (isSubscribed) {
            // alert('navigating you to TS page!');
            navigate(`/content/${sub}/testSeries`);
        } else {
            // alert('not yet subscribed!');
            navigate(`/subscribe?subject=${sub}&section=testSeries`);
        }
    };
    return (
        <div>
            <Header />
            <div className='logout-btn'>
                <Button color='secondary' variant='contained' onClick={logout}>Logout</Button>
            </div>
            <div className='user-container'>
                <p style={{ textDecoration: "underline", fontSize: "18px" }}>Lectures on</p>
                <div className='lectures'>

                    <Button variant='contained' size='medium' onClick={showL("physicalChemistry")}>Physical</Button>
                    <br />
                    <Button variant='contained' size='medium' onClick={showL('inorganicChemistry')}>Inorganic</Button>
                    <br />
                    <Button variant='contained' size='medium' onClick={showL("organicChemistry")}>Organic</Button>
                </div>
                <p style={{ textDecoration: "underline", fontSize: "18px" }}>Test Series on</p>
                <div className='test-series'>
                    <Button variant='contained' size='medium' onClick={showT("physicalChemistry")}>Physical</Button>
                    <br />
                    <Button variant='contained' size='medium' onClick={showT("inorganicChemistry")}>Inorganic</Button>
                    <br />
                    <Button variant='contained' size='medium' onClick={showT("organicChemistry")}>Organic</Button>
                </div>
            </div>
        </div>
    )
}

export default ShowUser