import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <footer className="footer-distributed">
                <div className="footer-left">
                    <h3>MSTART<span>logo</span></h3>
                    <p className="footer-links">
                        <Link to="/" className="link-1">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </p>
                    <p className="footer-company-name">Zaid Alshibi © 2023</p>
                </div>
                <div className="footer-center">
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p>Ein Maoun Street - Amman, Jordan</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPhone} />
                        <p>+962-799-092-056</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p><a href="mailto:zaidealshibi@gmail.com">zaidealshibi@gmail.com</a></p>
                    </div>
                </div>
                <div className="footer-right">
                    <p className="footer-company-about">
                        <span>About the company</span>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;