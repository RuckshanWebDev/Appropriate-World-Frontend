import React from 'react'

import Footer from './Footer'
import Navigation from './Navigation'
import LoaderContainer from './LoaderContainer';

function Layout({ children, loader }) {
  console.log(loader);
  return (
    <>
      <div className='main' >
        <Navigation />
        <div style={{ minHeight: ' calc(100vh - 210px)' }} >
          {loader && <LoaderContainer />}
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
