import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import './Login.css'
import { useRegisterUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { setUser } from '../features/localSlice'
import { useDispatch, useSelector } from 'react-redux'

function Register() {

  const navigate = useNavigate()
  const [registerUser, data] = useRegisterUserMutation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.local)
  console.log(data);

  const formHandler = (e) => {
    e.preventDefault()
    registerUser({
      name: e.target.names.value,
      email: e.target.email.value,
      password: e.target.password.value
    })

  }

  useEffect(() => {
    console.log(user);
    if (user && user._id) {
      navigate('/profile')
    }

    if (data.isError) {
      toast.error("Invalid Email or Password")
    }
    if (data.isSuccess) {
      toast.success("Successfully Registered")
      dispatch(setUser(data.data.data))
    }
  }, [user, data])

  return (
    <Layout>
      <div className='container' >
        <div className="grid align__item">

          <div className="register">

            <img src="/logo.png" alt="" />

            <h2>Register</h2>

            <form className="form" onSubmit={formHandler} >

              <div className="form__field">
                <input type="text" placeholder="John Doe" name='names' required />
              </div>

              <div className="form__field">
                <input type="email" placeholder="info@mailaddress.com" name='email' required />
              </div>

              <div className="form__field">
                <input type="password" placeholder="••••••••••••" name='password' required />
              </div>
              {data.isLoading ?
                <p>Loading</p> :
                <div className="form__field">
                  <input type="submit" value={data.isLoading ? "Loading..." : 'Sign Up'} disabled={data.isLoading} />
                </div>
              }
            </form>

            <p>Already have an accout? <Link to="/login" >Login</Link></p>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register
