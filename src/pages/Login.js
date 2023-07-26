import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import './Login.css'
import { useLoginUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/localSlice'


const Login = () => {

  const navigate = useNavigate()
  const [loginUser, data] = useLoginUserMutation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.local)


  const formHandler = (e) => {
    e.preventDefault()
    loginUser({
      email: e.target.email.value,
      password: e.target.password.value
    })
  }

  useEffect(() => {
    if (user && user._id) {
      navigate('/profile')
    }
    console.log(user);

    if (data.isError) {
      toast.error("Invalid Email or Password")
    }
    if (data.isSuccess) {
      toast.success("Successfully Registered")
      dispatch(setUser(data.data.data))
    }

  }, [data])

  return (
    <Layout>
      <div className='container' >
        <div className="grid align__item">

          <div className="register">

            <video muted autoPlay loop src='/logo.mp4' ></video>

            <h2>Sign Up</h2>

            <form className="form" onSubmit={formHandler} >

              <div className="form__field">
                <input type="email" placeholder="Email" name='email' required />
              </div>

              <div className="form__field">
                <input type="password" placeholder="Password" name='password' required />
              </div>

              <div className="form__field">
                <input type="submit" value={data.isLoading ? "Loading..." : 'Sign In'} disabled={data.isLoading} />
              </div>

            </form>

            <p>Create an new accout? <Link to="/register" >Register</Link></p>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
