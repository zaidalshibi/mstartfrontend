import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login () {
    let history = useNavigate();
    const [ loading, setLoading ] = useState( false );
    const handleLogin = ( e ) => {
        e.preventDefault();
        setLoading( true );
        const username = e.target.username.value;
        const password = e.target.password.value;
        axios.post( `${process.env.REACT_APP_BACKEND}/api/auth/login`, { username, password } )
            .then( res => {
                localStorage.setItem( 'token', res.data.token );
                localStorage.setItem('id', res.data.id);
                localStorage.setItem( 'role', res.data.role );
                Swal.fire( {
                    icon: 'success',
                    title: 'Admin Login Successful',
                    text: 'You will be redirected to the home page',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                } );
                setTimeout( () => {
                    setLoading( false );
                    history( '/admin' );
                }
                    , 3000 );
            } )
            .catch( err => {
                console.log( err );
                setLoading( false );
            }
            );
    };
    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h2>Welcome Back!</h2>
                <fieldset>
                    <legend>Log In</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" required />
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" required />
                        </li>
                    </ul>
                </fieldset>
                <button type='Submit' disabled={loading}>Login</button>
            </form>
        </div>
    );
}

export default Login;