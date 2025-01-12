import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { Button } from '@radix-ui/themes'

function ErrorPage() {
  return (
    <Layout>
      <div className='container text-center'  >
          <img src='/404.png' style={{ margin : '80px auto 0', display : 'block', width : '100%', maxWidth : '600px' }} />
          <Button className='!mt-20'>
            <Link className='link !text-white' to={'/'} >Go Back</Link>
          </Button> 
      </div>
    </Layout>
  )
}

export default ErrorPage
