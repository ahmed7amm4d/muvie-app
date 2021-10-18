import React from "react";
import { NavLink } from "react-router-dom";

import './Header.css';
import { MdWhatshot } from "react-icons/md";
import { RiMovieFill } from "react-icons/ri";
import { IoTv } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";

const Header = () => {
    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="logo">
                    <NavLink className="link" to='/'>
                        <span className="text">muvie</span>
                        <HiOutlineChevronDoubleLeft className="svg" />
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className="link" to='/trending'>
                        <MdWhatshot className="svg" />
                        <span className="text">Trending</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className="link" to='/movies'>
                        <RiMovieFill className="svg" />
                        <span className="text">Movies</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className="link" to='/shows'>
                        <IoTv className="svg" />
                        <span className="text">Shows</span>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink className="link" to='/search'>
                        <IoSearch className="svg" />
                        <span className="text">Search</span>
                    </NavLink>
                </li>
                <li className="item item-scroll">
                    <div className="link scroll" onClick={()=> window.scroll(0,0)}>
                        <HiOutlineChevronDoubleLeft className="svg svg-scroll" />
                        <span className="text">Scroll</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Header;