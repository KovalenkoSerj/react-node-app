import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, error, request, clearError } = useHttp()
    const message = useMessage();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message)
        } catch (error) { }
    }



    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId)
        } catch (error) { }
    }
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Slice th link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field ">
                                <input
                                    placeholder="Enter Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className='yellow-input'
                                    onChange={changeHandler}
                                    value={form.email}
                                />

                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input
                                    placeholder="Enter Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    className='yellow-input'
                                    onChange={changeHandler}
                                    value={form.password}

                                />

                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-2"
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        <button
                            className='btn green lighten-1 white-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}