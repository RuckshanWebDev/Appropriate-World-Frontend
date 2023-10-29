import React, { useState } from 'react'
import './Footer.css'
import { FaTwitter, FaInstagram, FaTwitch } from 'react-icons/fa'
import { SiOpensea } from 'react-icons/si'
import { BsFillPersonFill, BsFillVolumeMuteFill } from 'react-icons/bs'
import { AiFillSound } from 'react-icons/ai'
import { useEffect } from 'react'

function Footer() {

    const [mute, setMute] = useState()

    const muteHandler = () => {
        if (localStorage.getItem('mute') === 'true') {
            localStorage.setItem('mute', false)
            setMute(false)
        } else {
            setMute(true)
            localStorage.setItem('mute', true)
        }
    }

    // const footerPosition = () => {
    //     const mainEl = document.querySelector('.main')
    //     const footerEl = document.querySelector('footer')

    //     console.log(mainEl.offsetHeight >= window.innerHeight);
    //     if (mainEl.offsetHeight == window.innerHeight) {
    //         const footerCoor = footerEl.getBoundingClientRect()
    //         const margin = window.innerHeight - footerEl.getBoundingClientRect().bottom
    //         console.log(mainEl.offsetHeight, window.innerHeight, margin);
    //         footerEl.style.marginTop = `${(window.innerHeight - footerEl.getBoundingClientRect().bottom) + 100}px`
    //     } else if (mainEl.offsetHeight < window.innerHeight) {
    //         footerEl.style.marginTop = 0
    //     }
    // }

    // window.addEventListener('resize', () => {
    //     footerPosition()
    // })



    useEffect(() => {

        // footerPosition()

        if (localStorage.getItem('mute') === 'true') {
            setMute(true)
        } else {
            setMute(false)
        }
    }, [])

    return (
        <footer  >
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
                            {
                                mute ?
                                    <AiFillSound onClick={muteHandler} /> :
                                    <BsFillVolumeMuteFill onClick={muteHandler} />
                            }
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
