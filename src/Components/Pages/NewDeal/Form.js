import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import currencyCodes from "currency-codes";
import "./Form.css";

function AddDeal () {
    const [loading, setLoading] = useState(false);
    let history = useNavigate();
    const handleAddDeal = (e) => {
        e.preventDefault();
        setLoading( true );
        const name = e.target.name.value;
        const description = e.target.description.value;
        const amount = e.target.amount.value;
        const currency = e.target.currency.value;
        const user_id = localStorage.getItem( 'id' );
        const deal = {
            name,
            description,
            amount,
            currency,
            user_id
        };
        axios.post(`${process.env.REACT_APP_BACKEND}/api/user/addDeal`, deal,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                Swal.fire( {
                    icon: 'success',
                    title: 'Deal Added Successfully',
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
                    history( '/' );
                }, 3000 );

            })
            .catch(err => {
                console.log(err);
                Swal.fire( {
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                } );
                setLoading( false );
            })
    };
    return (
        <div className="addDeal">
            <form onSubmit={handleAddDeal}>
                <h2>Add New Deal</h2>
                <fieldset>
                    <legend>Claim Now</legend>
                    <ul>
                        <li>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" required />
                        </li>
                        <li>
                            <label htmlFor="description">Description:</label>
                            <input type="description" id="description" required />
                        </li>
                        <li>
                            <label htmlFor="amount">Amount:</label>
                            <input type="number" id="amount" required />
                        </li>
                        <li>
                            <label htmlFor="currency">Currency:</label>
                            <select id="currency" required>
                                {currencyCodes.codes().map((currency, index) => {
                                    return (
                                        <option key={index} value={currency}>
                                            {currency}
                                        </option>
                                    );
                                })}
                            </select>
                        </li>
                    </ul>
                </fieldset>
                <button type="Submit" disabled={loading}>Add Deal</button>
            </form>
        </div>
    );
}

export default AddDeal;