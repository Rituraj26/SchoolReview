import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item mr-5">
                        <Link className="nav-link" to="/dashboard/main">
                            Dashboard <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
