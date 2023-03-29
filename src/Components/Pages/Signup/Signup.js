import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import "./Signup.css";
import axios from "axios";
import Swal from "sweetalert2";

function Signup () {
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    let history = useNavigate();
    const handleSignup = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = value;
        const gender = e.target.gender.value;
        const date_of_birth = e.target.date_of_birth.value;
        const password = e.target.password.value;
        const user = {
            username,
            name,
            email,
            phone,
            gender,
            date_of_birth,
            password
        };
        axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/register`, user)
            .then(res => {
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
            })
            .catch(err => {
                console.log(err);
            })
    };
    return (
        <div className="signup">
            <form onSubmit={handleSignup}>
                <h2>Sign Up!</h2>
                <fieldset>
                    <legend>Create Account</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" />
                        </li>
                        <li>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" required />
                        </li>
                        <li>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" required />
                        </li>
                        <li>
                            <label htmlFor="phone">Phone:</label>
                            <PhoneInput
                                value={value}
                                onChange={setValue} />
                        </li>
                        <li>
                            <label htmlFor="gender">Gender:</label>
                            <select name="gender" id="gender">
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="date_of_birth">Date of Birth:</label>
                            <input type="date" id="date_of_birth" required />
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" required />
                        </li>
                    </ul>
                </fieldset>
                <button type="Submit" disabled={loading}>Submit</button>
                <Link to="/login">
                    <button type="button" >Have an Account?</button>
                </Link>
            </form>
        </div>
    );
}

export default Signup;