'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {cn} from "@/lib/utils";

const navItems = [
    { label:'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
    { label: 'Student Portal', href: '/student-portal' },
    { label: 'Instructor Portal', href: '/instructor-portal' },
]

const NavItems = () => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({ label, href }) => (
                <Link
                    to={href}
                    key={label}
                    className={cn(pathname === href && 'text-primary font-semibold')}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems
