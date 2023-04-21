import React from 'react';
import Link from 'next/link'
function Navbar(props) {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
                <li>
                    <Link href="/contact">Contact us</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;