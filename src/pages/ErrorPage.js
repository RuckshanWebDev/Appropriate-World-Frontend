import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <Layout>
      <div className='container'  >
          <img src='/404.png' style={{ margin : '80px auto 0', display : 'block', width : '100%', maxWidth : '600px' }} />
          <Link className='link' >Go Back</Link>
      </div>
    </Layout>
  )
}

export default ErrorPage
