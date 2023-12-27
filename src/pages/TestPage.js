import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { useCreateSessionMutation } from '../features/paymentApi';

function TestPage() {

    const [createSession] = useCreateSessionMutation()

    const stripePromise = loadStripe('pk_test_51Nnw7qF40YQ3vkpscae5w6XGoTd8HCCzVsp7o4B53kwsV1mmweY60pfzqDfLM8CGwXeXcQA8PfklEoWC3sHgIWsx00Pv0jCcL2');

    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        stripePromise.then(setStripe);
    }, []);

    const handleCheckout = async () => {

        if (stripe) {

            const response = await createSession().unwrap()
            console.log(response);

            // // Redirect to Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: response.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        }
    }

    return (
        <div>
            <button onClick={handleCheckout} >Subscribe</button>
        </div>
    )
}

export default TestPage
