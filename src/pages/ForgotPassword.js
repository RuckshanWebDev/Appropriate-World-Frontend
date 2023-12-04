import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import './Login.css'
import { useForgotPasswordMutation, useLoginUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [forgotPasswordFn, forgotPasswordData] = useForgotPasswordMutation()


    const formHandler = (e) => {



        e.preventDefault()

        console.log(e.target.email.value);
        forgotPasswordFn({ email: e.target.email.value })

    }
    if (forgotPasswordData.isLoading) {
        var popup = toast.loading("Please wait...")
    }

    if (forgotPasswordData.isSuccess) {

        toast.update(popup, { render: "Success", type: "success", isLoading: false });
        toast.dismiss()
    } else if (forgotPasswordData.isError) {
        toast.update(popup, { render: "Error", type: "error", isLoading: false });
        toast.dismiss()

    }
    // if (user && user._id) {
    //     navigate('/profile')
    // }

    useEffect(() => {

    }, [])

    return (
        <Layout>
            <div className='container' >
                <div className="grid align__item">

                    <div className="register">

                        <img src='/logo.gif' style={{ width: '80%', marginBottom: "50px" }} />

                        <h2>Forgot Password</h2>

                        <form className="form" onSubmit={formHandler} >

                            <div className="form__field">
                                <input type="email" placeholder="Email" name='email' required />
                            </div>

                            <div className="form__field">
                                <input type="submit" value={false ? "Loading..." : 'Send Mail'} disabled={''} />
                            </div>

                        </form>

                        <p>Create an new account? <Link to="/register" style={{ color: 'blue' }}  >Register</Link></p>

                        <p style={{ paddingTop: '20px' }}  >Already have a account?<Link to="/login" style={{ color: 'blue', paddingTop: '20px' }}  >Login</Link></p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword
