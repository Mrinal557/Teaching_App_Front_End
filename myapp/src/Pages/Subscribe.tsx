import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../Components/Header';
// import PaymentPopup from '../Components/PaymentPopup';

const Subscribe = () =>
{
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const sub = queryParams.get('subject') || '';
    const sec = queryParams.get('section') || '';

    const [ paymentUrl, setPaymentUrl ] = useState<string>('');
    const [ paymentStatus, setPaymentStatus ] = useState<string>('');
    const [ error, setError ] = useState<string>('');
    const [ content, setContent ] = useState([]);
    const [ amount, setAmount ] = useState(0);
    const [ phoneNumber, setPhoneNumber ] = useState('');

    useEffect(() =>
    {
        const fetchContent = async () =>
        {
            try
            {
                const token = localStorage.getItem('userToken');
                if (!token) throw new Error('No token found');
                const response = await axios.get(`https://teaching-app-back-end.onrender.com/api/content/${sub}/${sec}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setContent(response.data);
                const calculatedAmount = calculatePrice(response.data);
                setAmount(calculatedAmount);
            } catch (error)
            {
                setError('Failed to fetch content');
            }
        };

        fetchContent();
    }, [ sub, sec ]);

    useEffect(() =>
    {
        if (amount > 0)
        {
            loadGooglePay();
        }
    }, [ amount ]);

    const calculatePrice = (content: any[]) =>
    {
        if (sec === 'videoLectures')
        {
            return content.length * 100;
        } else if (sec === 'testSeries')
        {
            return content.length * 150;
        }
        return 0;
    };

    const handlePaymentRequest = async () =>
    {
        try
        {
            const token = localStorage.getItem('userToken');
            if (!token) throw new Error('No token found');
            const response = await axios.post('https://teaching-app-back-end.onrender.com/api/subscriptions/subscribe', {
                subject: sub,
                section: sec,
                phoneNumber
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPaymentUrl(response.data.paymentUrl);
            setPaymentStatus('Redirecting to payment portal...');
            handlePaymentRedirect(response.data.paymentUrl);
        } catch (err)
        {
            console.error('Error subscribing:', err);
            setError('Subscription failed. Please try again.');
        }
    };

    const handlePaymentRedirect = (url: string) =>
    {
        if (url)
        {
            window.location.href = url;
        } else
        {
            console.log('Payment URL not found');
        }
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setPhoneNumber(event.target.value);
    };

    const loadGooglePay = () =>
    {
        const existingButton = document.getElementById('googlePayButton');
        if (existingButton) return;

        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.async = true;
        script.onload = () =>
        {
            const paymentsClient = new (window as any).google.payments.api.PaymentsClient({ environment: 'TEST' });

            const paymentDataRequest = getGooglePaymentDataRequest();
            paymentDataRequest.transactionInfo = getTransactionInfo();

            const button = paymentsClient.createButton({
                onClick: () => onGooglePaymentButtonClicked(paymentsClient, paymentDataRequest)
            });
            button.id = 'googlePayButton';

            document.getElementById('googlePayButtonContainer')?.appendChild(button);
        };
        document.body.appendChild(script);
    };

    const getGooglePaymentDataRequest = () =>
    {
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
                {
                    type: 'CARD',
                    parameters: {
                        allowedAuthMethods: [ 'PAN_ONLY', 'CRYPTOGRAM_3DS' ],
                        allowedCardNetworks: [ 'MASTERCARD', 'VISA' ]
                    },
                    tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'exampleMerchantId'
                        }
                    }
                }
            ],
            merchantInfo: {
                merchantId: 'BCR2DN4T3LUXQGKN',
                merchantName: 'Mrinal Anand'
            },
            transactionInfo: getTransactionInfo()
        };
    };

    const getTransactionInfo = () =>
    {
        return {
            countryCode: 'IN',
            currencyCode: 'INR',
            totalPriceStatus: 'FINAL',
            totalPrice: `${amount}`,
            totalPriceLabel: 'Total'
        };
    };

    const onGooglePaymentButtonClicked = async (paymentsClient: any, paymentDataRequest: any) =>
    {
        try
        {
            const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);

            const token = localStorage.getItem('userToken');
            if (!token) throw new Error('No token found');

            const response = await axios.post('https://teaching-app-back-end.onrender.com/api/subscriptions/subscribe', {
                subject: sub,
                section: sec,
                phoneNumber,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPaymentUrl(response.data.paymentUrl);
            setPaymentStatus('Redirecting to payment portal...');
            handlePaymentRedirect(response.data.paymentUrl);
        } catch (err)
        {
            console.error('Error:', err);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <div className='subs-container'>
                <div className='subs-txt'>
                    {(amount > 0) ? (<h1>Subscribe to {sec} of {sub} to view content</h1>) :
                        (<h1>Content will be available soon!</h1>)
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>Price: ₹{amount}</h3>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {paymentStatus && <p style={{ color: 'green' }}>{paymentStatus}</p>}
                </div>
            </div>

        </div>
    );
};

export default Subscribe;
