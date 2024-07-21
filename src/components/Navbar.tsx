// frontend/src/components/Navbar.tsx
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>Logo</div>
                    <div>Links</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;