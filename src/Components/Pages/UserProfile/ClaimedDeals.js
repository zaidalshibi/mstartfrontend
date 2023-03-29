import React from "react";
import "./ClaimedDeals.css";

export default function ClaimedDealsCard ( { name, description, amount, currency, status } ) {
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
        </div>
    );
}
