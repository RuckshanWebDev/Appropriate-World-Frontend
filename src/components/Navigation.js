import React, { useEffect, useState, useRef, useMemo } from 'react'
import './Navigation.css'
import { MdOutlineMessage, MdOutlineUnsubscribe } from 'react-icons/md'
import { FaBlogger, FaShoppingCart } from 'react-icons/fa'
import { BiWallet } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { TbMenu2 } from 'react-icons/tb'
import { CgClose } from 'react-icons/cg'
import { CiStreamOn } from 'react-icons/ci'
import { IoGameController } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navigation() {

  const navigation = useRef()

  const [navOpen, setNavOpen] = useState(false)
  const { user, notificationCount } = useSelector(state => state.local)

  const navHandler = () => {
    console.log("click");
    setNavOpen(!navOpen)
  }

  const audio = useMemo(() => {
    return {
      headerClickSound: new Audio('/music/HEADER_BUTTONS.wav'),
      enterPageSound: new Audio('/music/ENTER_PAGE.wav')
    }
  }, [])

  useEffect(() => {

    // 'a' tag Array
    const linkArray = [...navigation.current.querySelectorAll('a')]
    console.log(linkArray[2]);

    // Looping the array
    linkArray.map(singleLink => {

      // Adding eventlistener
      const event = singleLink.addEventListener('click', () => {

        // Volume Control
        audio.enterPageSound.volume = 0.5
        audio.headerClickSound.volume = 0.5

        // Play sound
        audio.headerClickSound.play()

        setTimeout(() => audio.enterPageSound.play(), 1000)

      })

      // Remove eventlistener
      singleLink.removeEventListener('click', event)

    })

  }, [])

  return (
    <nav ref={navigation}>
      <div className='container navigation' >
        <div id='logo' >
          <Link to={'/admin'}>
            {/* <img src='/logo.jpg' /> */}
            <video muted autoPlay loop src='/logo.mp4' ></video>
          </Link>
        </div>
        <div id='icons' >
          {/* <CiStreamOn /> */}
          <Link to={'/games'} >
            <IoGameController className='white-path' />
          </Link>
          <FaShoppingCart className='white-path' />
          <Link to={'/chat'} >
            <div style={{ position: 'relative' }} >
              <div className="notification-icon">{notificationCount}</div>
              <MdOutlineMessage />
            </div>
          </Link>
          <Link to={'/blogs'}>
            <FaBlogger />
          </Link>
          {user ?
            <Link to="/profile">
              <BsFillPersonFill />
            </Link>
            :
            <Link to="/login">
              <MdAccountCircle />
            </Link>
          }

        </div>

        <div id='menu-icon' onClick={navHandler} >
          {navOpen ? <CgClose /> :
            <TbMenu2 />}
        </div>
      </div>

      <div className='mobile-nav' style={{ display: navOpen ? "flex" : 'none' }} >
        {/* <CiStreamOn /> */}
        <Link to={'/games'} >
          <IoGameController className='white-path' />
        </Link>
        <FaShoppingCart className='white-path' />
        <Link to={'/chat'} >
          <MdOutlineMessage />
        </Link>
        <Link to={'/blogs'}>
          <FaBlogger />
        </Link>

        {user ?
          <Link to="/profile">
            <BsFillPersonFill />
          </Link>
          :
          <Link to="/login">
            <MdAccountCircle />
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navigation
