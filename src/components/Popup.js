import React from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import './Popup.css'
import { useDispatch, useSelector } from 'react-redux'
import { togglePopup } from '../features/localSlice'

function Popup() {

    const { popup } = useSelector(state => state.local)
    const dispatch = useDispatch()

    return <>
        {
            popup && <div id='popup-container' >
                <div className="popup-model container">
                    <RiCloseCircleFill className='close-icon' onClick={() => dispatch(togglePopup())} />
                </div>
            </div>
        }
    </>

}

export default Popup
