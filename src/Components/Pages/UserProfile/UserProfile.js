import axios from "axios";
import React, { useEffect, useState } from "react";
import ClaimedDealsCard from "./ClaimedDeals";
import DealsCard from './Deals';
import Swal from "sweetalert2";
import "./UserProfile.css";


const UserProfile = () => {
    const [ name, setName ] = useState( '' );
    const [ username, setUsername ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ phone, setPhone ] = useState( '' );
    const [ gender, setGender ] = useState( '' );
    const [ dob, setDob ] = useState( Date.now() );
    const [ avatar, setAvatar ] = useState( '' );
    const [ claimedDeals, setClaimedDeals ] = useState( [] );
    const [ deals, setDeals ] = useState( [] );
    const [ status, setStatus ] = useState( '' );
    const newDob = new Date( dob ).toISOString().slice( 0, 10 );
    const getUserData = async () => {
        axios.get( `${process.env.REACT_APP_BACKEND}/api/user/profile/${localStorage.getItem( 'id' )}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem( 'token' )}`
            }
        } )
            .then( ( res ) => {
                console.log( res.data.user );
                setUsername( res.data.user.username );
                setName( res.data.user.name );
                setEmail( res.data.user.email );
                setPhone( res.data.user.phone );
                setGender( res.data.user.gender );
                setDob( res.data.user.date_of_birth );
                setAvatar( res.data.user.avatar );
                setClaimedDeals( res.data.user.claimedDeals );
                setDeals( res.data.user.deals );
                setStatus( res.data.user.status );
                console.log( res.data.user.avatar );
            } )
            .catch( ( err ) => {
                console.log( err );
            } );
    };

    const handleChangeStatus = ( e ) => {
        e.preventDefault();
        Swal.fire(
            {
                title: 'Change Status',
                footer: 'Select a status',
                icon: 'info',
                input: 'select',
                inputOptions: {
                    'active': 'active',
                    'in Active': 'in Active',
                    'deleted': 'deleted',
                    'expired': 'expired'
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
                axios.put( `${process.env.REACT_APP_BACKEND}/api/user/changeUserStatus`, {
                    status: result.value,
                    id: parseInt( localStorage.getItem( 'id' ) ),
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
                        getUserData();
                    }
                    )
                    .catch( err => {
                        console.log( err );
                    }
                    );
            }
        } );
    };

    const handleChangeAvatar = ( e ) => {
        e.preventDefault();
        Swal.fire(
            {
                title: 'Change Avatar',
                footer: 'Select an avatar',
                icon: 'info',
                input: 'file',
                inputAttributes: {
                    'accept': 'image/*',
                    'aria-label': 'Upload your profile picture'
                },
                showCancelButton: true,
                inputValidator: ( value ) => {
                    if ( !value ) {
                        return 'You need to choose something!';
                    }
                }
            }
        ).then( ( result ) => {
            if ( result.isConfirmed ) {
                const formData = new FormData();
                formData.append( 'avatar', result.value );
                formData.append( 'id', localStorage.getItem( 'id' ) );
                axios.post( `${process.env.REACT_APP_BACKEND}/api/auth/upload`, formData, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem( 'token' )}`
                    }
                } )
                    .then( res => {
                        Swal.fire(
                            'Avatar Changed!',
                            'You have successfully changed the avatar of the deal!',
                            'success'
                        );
                        getUserData();
                    }
                    )
                    .catch( err => {
                        console.log( err );
                    }
                    );
            }
        } );
    };


    useEffect( () => {
        getUserData();
    }, [] );
    return (
        <div className="main-container">
            <div className="user-profile">
                <section className="user-profile-section">
                    <img src={avatar} alt={name} />
                </section>
                <section className="user-profile-info">
                    <h1>Username: {username}</h1>
                    <h3>Email: {email}</h3>
                    <h3>Phone: {phone}</h3>
                    <h3>Gender: {gender.toUpperCase()}</h3>
                    <h3>Date of Birth: {newDob}</h3>
                    <h3>Status: {status}</h3>
                    <div className="button-box">
                        <button className="purchase" onClick={handleChangeStatus}>
                            Change Status
                        </button>
                    </div>
                    <div className="button-box">
                        <button className="purchase" onClick={handleChangeAvatar}>
                            Change Avatar
                        </button>
                    </div>
                </section>
            </div>
            <div className="claimed-deals">
                <h1>My Deals</h1>
                <div className="claimed-deals-container">
                    {deals?.map( ( deal ) => {
                        return (
                            <DealsCard
                                key={deal.id}
                                id={deal.id}
                                name={deal.name}
                                description={deal.description}
                                amount={deal.amount}
                                currency={deal.currency}
                                status={deal.status}
                                getDeals={getUserData}
                            />
                        );
                    } )}
                </div>
            </div>
            <div className="claimed-deals">
                <h1>Claimed Deals</h1>
                <p>
                    {claimedDeals?.length > 0 ? `You have claimed ${claimedDeals.length} deals` : `You have not claimed any deals`}
                </p>
                <p>
                    Total Amount Spent: {claimedDeals?.map( ( deal ) => {
                        return deal.amount + ' ' + deal.currency + ', ';
                    } )
                    }
                </p>
                <div className="claimed-deals-container">
                    {claimedDeals?.map( ( deal ) => {
                        return (
                            <ClaimedDealsCard
                                key={deal.id}
                                name={deal.name}
                                description={deal.description}
                                amount={deal.amount}
                                currency={deal.currency}
                                status={deal.status}
                            />
                        );
                    } )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;;