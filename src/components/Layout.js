import React from 'react'

import Footer from './Footer'
import Navigation from './Navigation'

function Layout({ children }) {
  return (
    <>
      <div className='main' >
        <Navigation />
        <div style={{ minHeight: ' calc(100vh - 310px)' }} >
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
