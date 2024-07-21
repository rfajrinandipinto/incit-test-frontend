// frontend/src/components/Layout.tsx

import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;