import React from 'react'
import Layout from '../components/Layout'
import './PaymentConfirm.css'
import { Link } from 'react-router-dom'

function PaymentConfirm() {
    return (
        <Layout>
            <div className="container pc-conatiner">
                <h1 className='title-big-color' >Congratulations</h1>

                <img src="/card/card3.webp" alt="" />

                <h1 style={{ textAlign: "center", margin: 0 }} >Hooray!🎉, Now you're a  <br /> <span className='text-color '>GOLD </span> User in Appropriate World</h1>

                <h5 style={{ textAlign: "center", margin: '30px auto 100px', textTransform: 'capitalize' }} >Thank you so much for the contribution, <Link to={'/profile'} >Profile</Link> </h5>

            </div>
        </Layout>
    )
}

export default PaymentConfirm
