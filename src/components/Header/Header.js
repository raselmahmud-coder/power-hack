import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo512.png";

const Header = () => {
  const menu1 = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      {
        <li>
          <Link to={"/log-in"}>Log In</Link>
        </li>
      }
    </>
  );
  const menu2 = (
    <>
      <li>
        <Link to={"/"}>Registration</Link>
      </li>

      {
        <li>
          <Link to={"/log-in"}>Paid Total: </Link>
        </li>
      }
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="5" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="4"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu1}
            </ul>
          </div>
          <img className="btn-circle w-20" src={logo} alt=".." />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menu1}</ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal p-0">{menu2}</ul>
        </div>
      </div>
    </>
  );
};

export default Header;
