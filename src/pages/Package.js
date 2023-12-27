import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './package.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateCustomerMutation, useCreateSessionMutation, useGetPricesQuery } from '../features/paymentApi'
import { setProfileId } from '../features/localSlice'
import { useLazyGetProfileQuery } from '../features/profileApi'
import { loadStripe } from '@stripe/stripe-js'

let stripePromise = loadStripe('pk_test_51Nnw7qF40YQ3vkpscae5w6XGoTd8HCCzVsp7o4B53kwsV1mmweY60pfzqDfLM8CGwXeXcQA8PfklEoWC3sHgIWsx00Pv0jCcL2')

function Package() {

    const [stripe, setStripe] = useState(null);

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.local)
    const [createCustomer, createCustomerData] = useCreateCustomerMutation()
    const [getProfileData, profileData] = useLazyGetProfileQuery()
    const [createSession] = useCreateSessionMutation()
    const prices = useGetPricesQuery()
    console.log(prices);

    const apiCall = async () => {
        const responce = await createCustomer({ profileId: user.profileId }).unwrap()
        console.log(responce);
        const profile = await getProfileData().unwrap()
        dispatch(setProfileId(profile.data[0]))
    }

    const handleCheckout = async (val) => {

        if (stripe) {
            console.log(val, user.profile.customerId);

            const response = await createSession({ customer: user.profile.customerId, price: val }).unwrap()
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

    useEffect(() => {
        user.profile.customerId || apiCall()
    }, [])

    useEffect(() => {
        stripePromise.then(setStripe);
    }, []);

    return (
        <Layout loader={createCustomerData.isLoading || profileData.isLoading || prices.isLoading} >
            <div className="container packages-container">

                <h1 className='title-big-color' >SELECT MEMBERSHIP</h1>

                <div className="package-container">
                    <div className="package-item">
                        <Link to={'/profile'} style={{ textDecoration: 'none', color: '#fff' }} >
                            <img src="/card/VIOLET.gif" alt="" />
                        </Link>
                        <div>
                            <h2>VIOLET</h2>
                            <div className="content">
                                <span>No Monthly Fee</span>
                                <span>Basic Social Network Access</span>
                                <span>Basic Content Access</span>
                                <span>Blog Access</span>
                            </div>
                            <button>
                                <Link to={'/profile'} style={{ textDecoration: 'none', color: '#fff' }} >Free</Link>
                            </button>
                        </div>
                    </div>
                    <div className="package-item">
                        <Link style={{ textDecoration: 'none', color: '#fff' }} >
                            <img src="/card/emerald.gif" alt="" />
                        </Link>
                        <div>
                            <h2>EMERALD</h2>
                            <div className="content">
                                <span>Basic Social Network Access</span>
                                <span>Premium Content Access</span>
                                <span>Content Hosting</span>
                                <span>All Access to IRL Events/classes</span>
                                <span>Community Voting Rights</span>
                                <span>Digital Bundle Box</span>
                            </div>
                            <button onClick={() => handleCheckout(prices.data?.data[0]?.id)} >
                                35.99
                            </button>
                            {/* <button>
                                <Link to={'/checkout#type=VIOLET'} style={{ textDecoration: 'none', color: '#fff' }} >35.99</Link>
                            </button> */}
                        </div>
                    </div>
                    <div className="package-item">
                        <Link style={{ textDecoration: 'none', color: '#fff' }} >
                            <img src="/card/ONYX.gif" alt="" />
                        </Link>
                        <div>
                            <h2>ONYX</h2>
                            <div className="content">
                                <span>Genesis Investor</span>
                                <span>Basic Social Network Access</span>
                                <span>Premium Content Access</span>
                                <span>Content Hosting</span>
                                <span>Blog Access</span>
                                <span>All Access to IRL Events/classes</span>
                                <span>Community Voting Rights</span>
                                <span>Priority Early Access</span>
                                <span>Digital Bundle Box</span>
                            </div>
                            <button onClick={() => handleCheckout(prices.data?.data[1]?.id)} >99.99
                            </button>
                            {/* <button>
                                <Link to={'/checkout#type=ONYX'} style={{ textDecoration: 'none', color: '#fff' }} >99.99</Link>
                            </button> */}
                        </div>
                    </div>


                </div>

            </div>
        </Layout>
    )
}

export default Package
