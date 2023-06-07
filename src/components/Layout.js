import React from 'react'

import Footer from './Footer'
import Navigation from './Navigation'

function Layout({ children }) {
  return (
    <>
      <div className='main' >
        <Navigation />
        <div style={{}} >
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
