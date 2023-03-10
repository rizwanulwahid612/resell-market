import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { FaDiscord } from "react-icons/fa";


const Navbar = () => {
  const {user,logOut}=useContext(AuthContext)
  const handleLogOut=()=>{
    logOut()
    .then(() => {
     
    }).catch((error) => {
     console.log(error)
    });
  }
    const reactItem= <React.Fragment className="font-bold">
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/blogs'>Blogs</Link></li>
             {user?.uid?
             <>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <li><button className='btn btn-warning' onClick={handleLogOut}>LogOut</button></li>
          </>
           :
           <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
              </>
            }
    </React.Fragment>
    return (
        <div className="navbar bg-green-500 text-blue-900 flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
             {reactItem}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-xl"><FaDiscord/>Resell Store</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {reactItem}
          </ul>
        </div>
        <label htmlFor="my-drawer-2" tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
      </div>
    );
};

export default Navbar;