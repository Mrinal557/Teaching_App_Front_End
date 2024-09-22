declare module 'google-payments' {
    export interface PaymentDataRequest {
        apiVersion: number;
        apiVersionMinor: number;
        allowedPaymentMethods: any[];
        merchantInfo: any;
        transactionInfo: any;
        shippingAddressRequired?: boolean;
        shippingAddressParameters?: any;
    }

    export interface PaymentData {
        paymentMethodData: any;
        paymentMethodToken: any;
    }

    export interface PaymentsClient {
        new (options: { environment: string }): PaymentsClient;
        createButton(options: { onClick: () => void }): HTMLButtonElement;
        loadPaymentData(request: PaymentDataRequest): Promise<PaymentData>;
    }

    export const google: {
        payments: {
            api: {
                PaymentsClient: new (options: { environment: string }) => PaymentsClient;
            };
        };
    };
}
