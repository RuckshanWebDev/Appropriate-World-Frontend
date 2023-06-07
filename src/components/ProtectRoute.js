import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom';

function ProtectRoute({ children }) {

    const { user } = useSelector(state => state.local)
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return (
        children
    )
}

export default ProtectRoute
