// utils/googlePay.js
export const onGooglePayLoaded = () => {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getTransactionInfo();

    const button = paymentsClient.createButton({
        onClick: () => onGooglePaymentButtonClicked(paymentsClient, paymentDataRequest)
    });

    document.getElementById('googlePayButtonContainer').appendChild(button);
};

const getGooglePaymentDataRequest = () => {
    const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA']
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
    return paymentDataRequest;
};

const getTransactionInfo = () => {
    return {
        countryCode: 'IN',
        currencyCode: 'INR',
        totalPriceStatus: 'FINAL',
        totalPrice: '1.00',
        totalPriceLabel: 'Total'
    };
};

const onGooglePaymentButtonClicked = async (paymentsClient, paymentDataRequest) => {
    try {
        const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
        console.log('Payment successful:', paymentData);
        alert('Payment successful');
    } catch (err) {
        console.error('Error:', err);
        alert('Payment failed. Please try again.');
    }
};
