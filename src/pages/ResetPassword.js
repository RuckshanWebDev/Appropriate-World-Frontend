import React from 'react'
import Layout from '../components/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useResetPasswordMutation } from '../features/userApi'

function ResetPassword() {

    const navigate = useNavigate()
    const [resetPasswordFn, resetPasswordData] = useResetPasswordMutation()
    const { pathname } = useLocation()
    var result = pathname.split('/');
    var token = result[2];


    const formHandler = (e) => {
        e.preventDefault()
        resetPasswordFn({ token, password: e.target.password.value })

    }

    if (resetPasswordData.isSuccess) {
        navigate('/login')
    }
    console.log(resetPasswordData);

    return (
        <Layout>
            <div className='container' >
                <div className="grid align__item">

                    <div className="register">

                        <img src='/logo.gif' style={{ width: '80%', marginBottom: "50px" }} />

                        <h2>Reset Password</h2>

                        <form className="form" onSubmit={formHandler} >

                            <div className="form__field">
                                <input type="password" placeholder="New Password" name='password' required />
                            </div>

                            <div className="form__field">
                                <input type="submit" value={false ? "Loading..." : 'Reset Password'} disabled={''} />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ResetPassword
