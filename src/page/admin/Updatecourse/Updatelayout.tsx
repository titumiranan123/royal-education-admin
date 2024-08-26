import React from 'react';
import { Outlet } from 'react-router-dom';

const Updatelayout: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Updatelayout;