import React from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import './Popup.css'
import { useDispatch, useSelector } from 'react-redux'
import { togglePopup } from '../features/localSlice'

function Popup({ children }) {

    const dispatch = useDispatch()

    return <>
        <div id='popup-container' >
            <div className="popup-model container">
                <RiCloseCircleFill className='close-icon' onClick={() => dispatch(togglePopup())} />

                {children}

            </div>
        </div>
    </>

}

export default Popup
