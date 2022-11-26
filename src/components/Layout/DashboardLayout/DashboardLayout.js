// import React, { useContext } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { AuthContext } from '../../Context/AuthProvider';
// import UseAdmin from '../../Hooks/UseAdmin';
// import Navbar from '../../Shared/Navbar/Navbar';

import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Navbar from "../../Share/Navbar/Navbar";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    // const [isAdmin] = UseAdmin(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    <Outlet></Outlet>

                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        <li><Link to="/dashboard/admin">Admin</Link></li>
                        <li><Link to="/dashboard/allbuyers">All Buyers</Link></li>
                        <li><Link to="/dashboard/allsellers">All Seller</Link></li>
                        <li><Link to="/dashboard/repoteditems">Repoted Items</Link></li>
                        <li><Link to="/dashboard/buyer">Buyer</Link></li>
                        <li><Link to="/dashboard/myorders">My Orders</Link></li>
                        <li><Link to="/dashboard/reporttoadmin">Report To Admin</Link></li>
                        <li><Link to="/dashboard/seller">Seller</Link></li>
                        <li><Link to="/dashboard/addproducts">Add Products</Link></li>
                        <li><Link to="/dashboard/mybuyers">My Buyers</Link></li>
                        <li><Link to="/dashboard/myProducts">My Products</Link></li>
                        {/* {
                            isAdmin && <>
                            
                            </>
                        } */}
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;