import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import "./ClaimedDeals.css";

export default function DealsCard ( { name, description, amount, currency, status, id, getDeals } ) {
    const handleChangeStatus = ( e ) => {
        e.preventDefault();
        Swal.fire(
            {
                title: 'Change Status',
                footer: 'Select a status',
                icon: 'info',
                input: 'select',
                inputOptions: {
                    'Active': 'active',
                    'In Active': 'in Active',
                    'Deleted': 'deleted',
                    'Expired': 'expired'
                },
                inputPlaceholder: 'Select a status',
                showCancelButton: true,
                inputValidator: ( value ) => {
                    if ( !value ) {
                        return 'You need to choose something!';
                    }
                }
            }
        ).then( ( result ) => {
            if ( result.isConfirmed ) {
                axios.put( `${process.env.REACT_APP_BACKEND}/api/user/changeDealStatus`, {
                    status: result.value,
                    id,
                },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem( 'token' )}`
                        }
                    } )
                    .then( res => {
                        Swal.fire(
                            'Status Changed!',
                            'You have successfully changed the status of the deal!',
                            'success'
                        );
                        getDeals();
                    }
                    )
                    .catch( err => {
                        console.log( err );
                    }
                    );
            }
        } );
    };
    return (
        <div className="card">
            <h1 className="title" >
                {name}
            </h1>
            <p>
                {description}
            </p>
            <p>
                {status}
            </p>
            <div className="price-box">
                <p className="price" >
                    {amount} {currency}
                </p>
            </div>
            <div className="button-box">
                <button className="purchase" onClick={handleChangeStatus}>
                    Change Status
                </button>
            </div>
        </div>
    );
}
