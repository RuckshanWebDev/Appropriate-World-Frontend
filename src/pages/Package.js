import React from 'react'
import Layout from '../components/Layout'

import './package.css'
import { Link } from 'react-router-dom'


function Package() {
    return (
        <Layout>
            <div className="container packages-container">

                <h1 className='title-big-color' >Our Packages</h1>

                <div className="package-container">
                    <div className="package-item">
                        <img src="/card/card3.webp" alt="" />
                        <div>
                            <h2>Gold</h2>
                            <div className="content">
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                            </div>
                            <button>
                                <Link to={'/checkout#type=gold'} style={{ textDecoration: 'none', color: '#fff' }} >199</Link>
                            </button>
                        </div>
                    </div>
                    <div className="package-item">
                        <img src="/card/card2.webp" alt="" />
                        <div>
                            <h2>Premium</h2>
                            <div className="content">
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                            </div>
                            <button>
                                <Link to={'/checkout#type=premium'} style={{ textDecoration: 'none', color: '#fff' }} >299</Link>
                            </button>
                        </div>
                    </div>
                    <div className="package-item">
                        <img src="/card/card1.webp" alt="" />
                        <div>
                            <h2>Elite</h2>
                            <div className="content">
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                                <span>Some info about the package</span>
                            </div>
                            <button>
                                <Link to={'/checkout#type=Elite'} style={{ textDecoration: 'none', color: '#fff' }} >399</Link>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Package
