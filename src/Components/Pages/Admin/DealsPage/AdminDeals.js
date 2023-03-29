import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer/Footer";
import AdminNavbar from "../Home/NavBar/NavBar";
import "./AdminDeals.css";

export default function AdminDeals () {
    const [ deals, setDeals ] = useState( [] );
    const [ dealspage, setDealsPage ] = useState( 1 );
    const getDeals = async () => {
        await axios.get( `${process.env.REACT_APP_BACKEND}/api/admin/deals?page=${dealspage}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem( 'token' )}`
                }
            } )
            .then( res => {
                setDeals( res.data.deals.rows );
            } )
            .catch( err => {
                console.log( err );
            }
            );
    };

    const handleNextPage = () => {
        setDealsPage( dealspage + 1 );
        getDeals();
    };
    const handlePrevPage = () => {
        setDealsPage( dealspage - 1 );
        getDeals();
    };
    useEffect( () => {
        getDeals();
    }, [] );
    return (
        <div>
            <AdminNavbar />
            <div className="claimed-deals-admin">
                <h1>All Deals</h1>
                <div className="claimed-deals-container-admin">
                    {deals?.length > 0 ? deals.map( deal => {
                        return (
                            <div className="card-admin" key={deal.id}>
                                <h1 className="title" >
                                    {deal.name}
                                </h1>
                                <p >
                                    {deal.description}
                                </p>
                                <p>
                                    {deal.status}
                                </p>
                                <p>
                                    {deal.user.username}
                                </p>
                                <div className="price-box">
                                    <p className="price" >
                                        {deal.amount} {deal.currency}
                                    </p>
                                </div>
                            </div>
                        );
                    } ) : <h1>No Deals</h1>}
                </div >
            </div >
                    <div className="button-box">
                        <button onClick={handlePrevPage} className="purchase" disabled={dealspage === 1}>Prev</button>
                        <button onClick={handleNextPage} className="purchase" disabled={deals.length < 10}>Next</button>
                    </div>
                    <Footer />
        </div>
    );
};;;