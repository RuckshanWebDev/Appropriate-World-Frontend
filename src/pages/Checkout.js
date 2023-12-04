import Layout from '../components/Layout'
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { AddressElement, CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentQuery, usePaymentConfirmMutation, usePaymentIntentMutation } from '../features/paymentApi';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

let stripePromise = await loadStripe('pk_test_51OAcXEImpSftCiTAEcdfWs0YKnbuPf7xNTWSWbe8L8B0DvUJ1RTnAE2EKUU9gOreOcEYSI2SdHgJJarh2FNNXtYe00ZaOJHEH2')

function Checkout() {

    let paymentIntentId;

    // Client Secrect
    const clientSecrent = useCreatePaymentIntentQuery()
    console.log(clientSecrent.data?.data.client_secret);

    // Payment Intent Id
    if (clientSecrent.isSuccess) {
        paymentIntentId = clientSecrent?.data?.data.id
        console.log(paymentIntentId);
    }

    // Form UI
    const appearance = {
        theme: 'night',
        variables: {
            fontFamily: 'Sohne, system-ui, sans-serif',
            fontWeightNormal: '500',
            borderRadius: '8px',
            colorBackground: '#24216d',
            colorPrimary: '#EFC078',
            colorPrimaryText: '#1A1B25',
            colorText: 'white',
            colorTextSecondary: 'white',
            colorTextPlaceholder: '#727F96',
            colorIconTab: 'white',
            colorLogo: 'dark'
        },
        rules: {
            '.Input, .Block': {
                backgroundColor: '#24216d',
                border: '1.5px solid var(--colorPrimary)'
            },
            '.Tab:hover': {
                color: '#0A2540',
            },
        }
    };
    const options = {
        appearance: appearance,
        clientSecret: clientSecrent.data?.data?.client_secret
    };



    useEffect(() => {
        let popup;
        if (clientSecrent.isLoading) {
            popup = toast.loading("Please wait...")
        }
        if (clientSecrent.isError) {
            toast.update(popup, { render: "Something went wrong, Please try again later.", type: "success", isLoading: false });
            toast.dismiss()
        }
        if (clientSecrent.isSuccess) {
            toast.dismiss()
        }
    }, [clientSecrent.data])

    return (
        <Layout>
            {clientSecrent.isSuccess && clientSecrent.data?.data && <Elements stripe={stripePromise} options={options}   >
                <Form paymentIntentId={paymentIntentId} clientSecrent={clientSecrent.data?.data.client_secret} />
            </Elements>}
        </Layout>
    )
}



const Form = ({ paymentIntentId, clientSecrent }) => {

    const [packageSelected, setPackageSelected] = useState('')
    const [paymentIntentFn, paymentIntentData] = usePaymentIntentMutation()
    const [paymentIntentConfirmFn, paymentIntentConfirmData] = usePaymentConfirmMutation()

    const elements = useElements()
    const stripe = useStripe();
    const naviagate = useNavigate()

    // Form Handler
    const formHandler = async (e) => {
        let popup = toast.loading("Please wait...")
        let _amount = 0;

        if (packageSelected === 'VIOLET') _amount = 35.99
        else if (packageSelected === 'ONYX') _amount = 99.99

        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Step 01 : Creating a Payment Method
        // const {
        //     error,
        //     paymentMethod
        // } = await stripe.createPaymentMethod({
        //     elements,
        //     params: {
        //         type: "card",
        //         // card: elements.getElement(CardElement),
        //         // billing_details: elements.getElement(AddressElement)
        //     }
        // });
        // console.log(AddressElement)
        // console.log(paymentMethod);

        // if (error) {
        //     console.log('Error', error);
        // }

        // Step 02 : send the amount to the backend to create the update the payment Intent
        const paymentIntentResponse = await paymentIntentFn({ amount: _amount, paymentIntentId }).unwrap()
        console.log(paymentIntentResponse);

        // const result = await stripe.confirmCardPayment(clientSecrent, {
        //     payment_method: paymentMethod.id,
        // });

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {

                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/checkout",
            },

        });
        console.log(error);
        console.log(paymentIntent);

        if (error) {
            console.log('......');
            toast.error(error.message, { delay: 500, autoClose: 5000, });
        }

        if (!error) {
            console.log('4242 4242 4242 4242');
            const responese = await paymentIntentConfirmFn({ paymentIntentId }).unwrap()
            console.log(responese);
            toast.update(popup, { render: "Your payment has been success", type: "success", isLoading: false });
            toast.dismiss()
            if (responese.message === 'Success') {
                naviagate(`/payment-confirm#type=${packageSelected}`)
            }
        } else {
            toast.update(popup, { render: "Something went wrong, Please try again later.", type: "error", isLoading: false });
            toast.dismiss()
        }

    }

    useEffect(() => {
        if (window.location.hash) {

            setPackageSelected(window.location.hash.substr(1).split('=')[1])
        } else {
            //    Redirect to the packages page
        }
    }, [])

    return (

        <div className="container">

            <h1 style={{ textAlign: "center", marginTop: '50px' }} >Congrats! One last step to
                becoming a  <br /> <span className='text-color '>JustCreate premium member</span></h1>

            <h5 style={{ textAlign: "center", marginTop: '30px', textTransform: 'capitalize' }} >You have selected {packageSelected} Package,  <Link to={'/packages'} >packages</Link> </h5>

            <form className='checkout' onSubmit={formHandler} >
                <AddressElement options={{ mode: 'billing' }} />
                <PaymentElement />
                {/* <CardElement /> */}
                <button disabled={!stripe || !elements} className='checkout-button' type='submit' >Submit</button>
            </form>

        </div>
    )
}






export default Checkout













// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.

//


// function LoadStripeForm() {

//     const stripe = useStripe();
//     const elements = useElements();

//     const formHandler = (e) => {
//         e.preventDefault()
//         console.log(e);
//     }

//     const [packageSelected, setPackageSelected] = useState('')

//     useEffect(() => {
//         if (window.location.hash) {

//             setPackageSelected(window.location.hash.substr(1).split('=')[1])
//         } else {
//             //    Redirect to the packages page
//         }
//     }, [])

//     return (
//         <Layout>
//             <div className="container">
//                 <h1 style={{ textAlign: "center", marginTop: '50px' }} >Hooray!🎉, One last step to join with the <br /> <span className='text-color '>Appropriate World</span></h1>
//                 <h5 style={{ textAlign: "center", marginTop: '30px', textTransform: 'capitalize' }} >You have selected {packageSelected} Package,  <Link to={'/packages'} >packages</Link> </h5>
//                 <form className='checkout' onSubmit={formHandler} >
//                     {/* <AddressElement options={{ mode: 'billing' }} /> */}
//                     <PaymentElement />
//                     <button className='checkout-button'>Submit</button>
//                 </form>
//             </div>
//         </Layout>
//     )
// }



// export default function Checkout() {

//     // const [secrectFn, secrectData] = useGetSecrectMutation()
//     // const [clientSecret, setClientSecrect] = useState()
//     // console.log(secrectData);
//     // console.log(secrectData.data?.data.client_secret);

//     const appearance = {
//         theme: 'night',
//         variables: {
//             fontFamily: 'Sohne, system-ui, sans-serif',
//             fontWeightNormal: '500',
//             borderRadius: '8px',
//             colorBackground: '#24216d',
//             colorPrimary: '#EFC078',
//             colorPrimaryText: '#1A1B25',
//             colorText: 'white',
//             colorTextSecondary: 'white',
//             colorTextPlaceholder: '#727F96',
//             colorIconTab: 'white',
//             colorLogo: 'dark'
//         },
//         rules: {
//             '.Input, .Block': {
//                 backgroundColor: '#24216d',
//                 border: '1.5px solid var(--colorPrimary)'
//             },
//             '.Tab:hover': {
//                 color: '#0A2540',
//             },
//         }
//     };

//     const options = {
//         appearance: appearance,
//         mode: 'setup',
//         value: '100',
//     };

//     useEffect(() => {

//     }, [])

//     return (
//         <>
//             <Elements stripe={loadStripe('pk_test_51Nnw7qF40YQ3vkpscae5w6XGoTd8HCCzVsp7o4B53kwsV1mmweY60pfzqDfLM8CGwXeXcQA8PfklEoWC3sHgIWsx00Pv0jCcL2')} options={options} >
//                 <LoadStripeForm />
//             </Elements>
//         </>
//     );
// };



