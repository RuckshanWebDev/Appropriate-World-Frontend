import React from 'react'
import Loader from './Loader'

function LoaderContainer() {
    return (
        <div style={{ position: 'absolute', left: '50%', top: "50%", transform: 'translate(-50%,-50%)' }} >
            <Loader />
        </div>
    )
}

export default LoaderContainer
