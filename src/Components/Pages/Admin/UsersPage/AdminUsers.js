import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Footer from "../Home/Footer/Footer";
import AdminNavbar from "../Home/NavBar/NavBar";

export default function Users () {
    const [ users, setUsers ] = useState( [] );
    const [ page, setPage ] = useState( 1 );
    const getUsers = async () => {
        await axios.get( `${process.env.REACT_APP_BACKEND}/api/admin/users?page=${page}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem( 'token' )}`
                }
            } )
            .then( res => {
                setUsers( res.data.users.rows );
            } )
            .catch( err => {
                console.log( err );
            }
            );
    };
    const handleDelete = async ( e, id ) => {
        e.preventDefault();
        Swal.fire( {
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        } ).then( async ( result ) => {
            if ( result.isConfirmed ) {
                await axios.post( `${process.env.REACT_APP_BACKEND}/api/admin/deleteUser`,
                    {
                        ids: [ id ]
                    },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem( 'token' )}`
                        }
                    } )
                    .then( res => {
                        getUsers();
                        Swal.fire(
                            {
                                icon: 'success',
                                title: 'User Deleted',
                                text: 'User has been deleted successfully',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                showCancelButton: false,
                                willOpen: () => {
                                    Swal.showLoading();
                                }
                            }
                            
                        );
                    } )
                    .catch( err => {
                        console.log( err );
                    }
                    );
            }
        } );

    };

    const handleNextPage = () => {
        setPage( page + 1 );
        getUsers();
    };
    const handlePrevPage = () => {
        setPage( page - 1 );
        getUsers();
    };
    useEffect( () => {
        getUsers();
    }, [] );
    return (
        <div>
            <AdminNavbar />
            {users?.length > 0 ? users.map( user => {
                return (
                    <div className="main-container" key={user.id}>
                        <div className="user-profile">
                            <section className="user-profile-section">
                                <img src={user.avatar} alt={user.name} />
                            </section>
                            <section className="user-profile-info">
                                <h1>Username: {user.username}</h1>
                                <h3>Email: {user.email}</h3>
                                <h3>Phone: {user.phone}</h3>
                                <h3>Gender: {user.gender.toUpperCase()}</h3>
                                <h3>Date of Birth: {user.date_of_birth}</h3>
                                <h3>Status: {user.status}</h3>
                                <div className="button-box">
                                    <button className="purchase" onClick={( e ) => handleDelete( e, user.id )}>
                                        Delete User
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div >
                );
            } ) : <h1>No Users</h1>}
            <div className="button-box">
                <button onClick={handlePrevPage} className="purchase" disabled={page === 1}>Prev</button>
                <button onClick={handleNextPage} className="purchase" disabled={users.length < 10}>Next</button>
            </div>
            <Footer />
        </div >
    );
};;