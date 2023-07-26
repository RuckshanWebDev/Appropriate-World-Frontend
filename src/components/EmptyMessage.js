import React from 'react'

function EmptyMessage({ text }) {
    return (
        <div className='empty-message-container' >
            <h3>{text}</h3>
        </div>
    )
}

export default EmptyMessage
