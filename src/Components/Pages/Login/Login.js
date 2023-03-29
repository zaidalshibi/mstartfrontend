import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Swal from 'sweetalert2';

function AdminLogin () {
    let history = useNavigate();
    const [ loading, setLoading ] = useState( false );
    const handleLogin = ( e ) => {
        e.preventDefault();
        setLoading( true );
        const username = e.target.username.value;
        const password = e.target.password.value;
        axios.post( `${process.env.REACT_APP_BACKEND}/api/auth/login`, {
            username,
            password
        } )
            .then( res => {
                Swal.fire( {
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You will be redirected to the home page',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                } );
                localStorage.setItem( 'token', res.data.token );
                localStorage.setItem('id', res.data.id);
                setTimeout( () => {
                    setLoading( false );
                    history( '/' );
                }, 3000 );
            } )
            .catch( err => {
                console.log( err );
                setLoading( false );
            } );
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
                <Link to="/signup">
                    <button type="button">Create an Account</button>
                </Link>
            </form>
        </div>
    );
}

export default AdminLogin;