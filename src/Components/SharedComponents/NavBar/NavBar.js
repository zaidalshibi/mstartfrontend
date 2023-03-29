import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Hamburger } from './menu-icon.svg';
import './navbar.css';

const Navbar = () => {
    const [ showNavbar, setShowNavbar ] = useState( false );
    const [ user, setUser ] = useState( false );
    const history = useNavigate();

    const handleShowNavbar = () => {
        setShowNavbar( !showNavbar );
    };

    const handleLogOut = () => {
        localStorage.clear();
        setUser( false );
        history( '/' );
    };

    useEffect( () => {
        const user = localStorage.getItem( 'token' );
        if ( user ) {
            setUser( true );
        }
    }, [] );

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    MSTART
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <Hamburger />
                </div>
                <div className={`nav-elements  ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup">Signup</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/newdeal">Add New Deal</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/" onClick={handleLogOut}>Logout</NavLink>
                                </li>
                            </>
                        )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;