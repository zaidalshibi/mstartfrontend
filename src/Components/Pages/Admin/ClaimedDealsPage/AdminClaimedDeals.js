import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer/Footer";
import AdminNavbar from "../Home/NavBar/NavBar";

export default function AdminClaimedDeals () {
    const [ claimedDeals, setClaimedDeals ] = useState( [] );
    const [ claimedDealspage, setClaimedDealsPage ] = useState( 1 );
    const getDeals = async () => {
        await axios.get( `${process.env.REACT_APP_BACKEND}/api/admin/claimedDeals?page=${claimedDealspage}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem( 'token' )}`
                }
            } )
            .then( res => {
                setClaimedDeals( res.data.claimedDeals.rows );
                console.log( res.data.claimedDeals.rows );
            } )
            .catch( err => {
                console.log( err );
            }
            );
    };

    const handleUserIdFilter = ( event ) => {
        const { value } = event.target;
        if ( value === "" ) {
            getDeals();
        }
        setClaimedDeals( claimedDeals.filter( deal => deal.user.id == value ) );
    };

    const handleNextPage = () => {
        setClaimedDealsPage( claimedDealspage + 1 );
        getDeals();
    };
    const handlePrevPage = () => {
        setClaimedDealsPage( claimedDealspage - 1 );
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
                <div className="filter-box">
                    <select placeholder="Filter by User Id" onChange={handleUserIdFilter} className='select'>
                    <option value="">Filter by User Id</option>
                    {claimedDeals?.length > 0 && claimedDeals.filter( ( deal, index, self ) =>
                        index === self.findIndex( ( t ) => (
                            t.user.id === deal.user.id
                        ) )
                    ).map( deal => {
                        return (
                            <option key={deal.id} value={deal.user.id}>{deal.user.id} : {deal.user.username}</option>
                        );
                    } )}
                    </select>
                </div>
                <div className="claimed-deals-container-admin">
                    {claimedDeals?.length > 0 ? claimedDeals.map( deal => {
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
                    } ) : <h1>No Claimed Deals</h1>}
                </div >
            </div >
            <div className="button-box">
                <button onClick={handlePrevPage} className="purchase" disabled={claimedDealspage === 1}>Prev</button>
                <button onClick={handleNextPage} className="purchase" disabled={claimedDeals.length < 10}>Next</button>
            </div>
            <Footer />
        </div>
    );
};;;