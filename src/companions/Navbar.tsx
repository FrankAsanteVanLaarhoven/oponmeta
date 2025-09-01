import React from 'react';
import { Link } from 'react-router-dom';
import NavItems from "@/components/NavItems";

const Navbar = () => {
    return (
        <nav className="navbar bg-gradient-to-b from-brand-blue-top to-brand-blue-bottom text-white">
            <Link to="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <img
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={44}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <div>
                    <button className="btn-signin">Sign In</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
