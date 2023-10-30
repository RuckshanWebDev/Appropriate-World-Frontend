import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './PaymentConfirm.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PaymentConfirm() {

    const { accountType } = useSelector(state => state.local?.user?.profile)
    const [packages, setPackage] = useState('ONYX')
    console.log(accountType);
    useEffect(() => {
        if (window.location.hash) {

            setPackage(window.location.hash.substr(1).split('=')[1])
        } else {
            setPackage(accountType)
        }
    }, [])

    return (
        <Layout>
            <div className="container pc-conatiner">
                <h1 className='title-big-color' >Congratulations</h1>

                {
                    packages === 'LAVENDER' ?
                        <img src="/card/LAVENDER.gif" alt="" />
                        :
                        packages === 'VIOLET' ?
                            <img src="/card/VIOLET.gif" alt="" />
                            :
                            <img src="/card/ONYX.gif" alt="" />
                }

                <h1 style={{ textAlign: "center", margin: 0 }} >Hooray!🎉, Now you're a  <br /> <span className='text-color '>GOLD </span> User in Appropriate World</h1>

                <h5 style={{ textAlign: "center", margin: '30px auto 100px', textTransform: 'capitalize' }} >Thank you so much for the contribution, <Link to={'/profile'} >Profile</Link> </h5>

            </div>
        </Layout>
    )
}

export default PaymentConfirm
