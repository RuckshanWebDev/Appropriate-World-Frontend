import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Product from '../components/Product'

function HomePage() {
  return (
    <Layout >
      <div  >
        {/* <Header /> */}
        {/* <Product /> */}
        <div className="container" style={{ padding: '50px', background: '#16202b', borderRadius: '10px', marginTop: '50px' }} >
          <h1 className='title text-color ' style={{ textAlign: 'center' }} >Private Page</h1>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
