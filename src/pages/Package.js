import React from 'react'
import Layout from '../components/Layout'

import './package.css'
import { Link } from 'react-router-dom'


function Package() {
    return (
        <Layout>
            <div className="container packages-container">

                <h1 className='title-big-color' >SELECT MEMBERSHIP</h1>

                <div className="package-container">
                    <div className="package-item">
                        <img src="/card/LAVENDER.gif" alt="" />
                        <div>
                            <h2>LAVENDER</h2>
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
                        <img src="/card/ONYX.gif" alt="" />
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
                            <button>
                                <Link to={'/checkout#type=ONYX'} style={{ textDecoration: 'none', color: '#fff' }} >99.99</Link>
                            </button>
                        </div>
                    </div>
                    <div className="package-item">
                        <img src="/card/VIOLET.gif" alt="" />
                        <div>
                            <h2>VIOLET</h2>
                            <div className="content">
                                <span>Basic Social Network Access</span>
                                <span>Premium Content Access</span>
                                <span>Content Hosting</span>
                                <span>All Access to IRL Events/classes</span>
                                <span>Community Voting Rights</span>
                                <span>Digital Bundle Box</span>
                            </div>
                            <button>
                                <Link to={'/checkout#type=VIOLET'} style={{ textDecoration: 'none', color: '#fff' }} >35.99</Link>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Package
