import React from 'react'
import './Footer.css'
import { FaTwitter, FaInstagram, FaTwitch } from 'react-icons/fa'
import { SiOpensea } from 'react-icons/si'

function Footer() {
    return (
        <footer>
            <div className='container' >
                <div className="footer">
                    <div className="contain">

                        <div className="social">
                            <a href="https://opensea.io/collection/appropriateworld" target='_blank'>
                                <SiOpensea />
                            </a>
                            <a href='https://twitter.com/appropriatewrld' target='_blank' >
                                <FaTwitter />
                            </a>
                            <FaTwitch />
                            <a href='https://www.instagram.com/appropriateworld/' target='_blank'  >
                                <FaInstagram />
                            </a>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
