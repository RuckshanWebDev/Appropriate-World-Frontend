import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function AddMenu({ title, link }) {
    return (
        <div className='popupMenu' >
            <Link to={link} >
                <AiOutlinePlus /> <span>{title}</span>
            </Link>
        </div>
    )
}

export default AddMenu
