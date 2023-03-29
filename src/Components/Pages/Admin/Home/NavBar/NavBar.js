import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Hamburger } from './menu-icon.svg';
import './navbar.css';

const AdminNavbar = () => {
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
        const role = localStorage.getItem( 'role' );
        
        if ( role === 'admin'  ) {
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
                                    <NavLink to="/admin/login">Login</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/admin/users">Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/deals">Deals</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/claimeddeals">Claimed Deals</NavLink>
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

export default AdminNavbar;