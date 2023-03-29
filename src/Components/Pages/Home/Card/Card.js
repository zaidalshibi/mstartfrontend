import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";
import "./Card.css";

export default function Card ( { name, description, currency, amount, id, getDeals } ) {
    const [ loading, setLoading ] = useState( false );
    const handleClaim = ( e ) => {
        e.preventDefault();
        setLoading( true );
        axios.post( `${process.env.REACT_APP_BACKEND}/api/user/claimDeal`, {
            id,
            userId: localStorage.getItem( 'id' )
        },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem( 'token' )}`
                }
            } )
            .then( res => {
                setLoading( false );
                Swal.fire(
                    'Deal Claimed!',
                    'You have successfully claimed the deal!',
                    'success'
                );
                getDeals();
            } )
            .catch( err => {
                setLoading( false );
                console.log( err );
            } );
    };
    return (
        <div className="cardhome">
            <h1 className="titlehome" >
                {name}
            </h1>
            <p >
                {description}
            </p>
            <div className="price-boxhome">
                <p className="pricehome" >
                    {amount} {currency}
                </p>
            </div>
            <div className="button-boxhome">
                <button className="purchasehome" onClick={handleClaim} disabled={loading}>
                    Claim
                </button>
            </div>
        </div>
    );
}
