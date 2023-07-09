import React, { useState } from 'react'
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

  const [navOpen, setNavOpen] = useState(false)
  const { user } = useSelector(state => state.local)

  const navHandler = () => {
    console.log("click");
    setNavOpen(!navOpen)
  }

  return (
    <nav>
      <div className='container navigation' >
        <div id='logo' >
          <Link to={'/'}>
            {/* <img src='/logo.jpg' /> */}
            <video muted autoPlay loop src='/logo.mp4' ></video>
          </Link>
        </div>
        <div id='icons' >
          <CiStreamOn />
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

        <div id='menu-icon' onClick={navHandler} >
          {navOpen ? <CgClose /> :
            <TbMenu2 />}
        </div>
      </div>

      <div className='mobile-nav' style={{ display: navOpen ? "flex" : 'none' }} >
        <CiStreamOn />
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

        <Link to="/profile">
          <BsFillPersonFill />
        </Link>
        <Link to="/login">
          <MdAccountCircle />
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
