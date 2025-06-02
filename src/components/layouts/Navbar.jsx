import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 shadow-lg z-10 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink 
                    to="/" 
                    className="text-3xl font-bold hover:text-yellow-400 transition duration-300 flex items-center"
                >
                    <span className="text-yellow-400">T</span>
                    <span className="text-blue-400">C</span>
                    <span className="text-pink-400">S</span>
                    <span className="ml-2 text-sm font-normal text-gray-300 hidden sm:inline">| Courier Services</span>
                </NavLink>
                
                <div className="hidden md:flex space-x-6">
                    <NavLink 
                        to="/" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-yellow-400 transition duration-300 flex items-center"
                        activeClassName="bg-gray-800 text-yellow-400"
                        end
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-yellow-400 transition duration-300 flex items-center"
                        activeClassName="bg-gray-800 text-yellow-400"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About Us
                    </NavLink>
                    <NavLink 
                        to="/contact" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-yellow-400 transition duration-300 flex items-center"
                        activeClassName="bg-gray-800 text-yellow-400"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Us
                    </NavLink>
                    <NavLink 
                        to="/tracking" 
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-yellow-400 transition duration-300 flex items-center"
                        activeClassName="bg-gray-800 text-yellow-400"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Track Order
                    </NavLink>
                </div>
                
                <button 
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none text-2xl transition duration-300" 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>
            
            <div 
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 text-center py-2 space-y-1`}
            >
                <NavLink 
                    to="/" 
                    className="block py-3 px-4 text-sm font-medium hover:bg-gray-700 hover:text-yellow-400 transition duration-300"
                    activeClassName="bg-gray-700 text-yellow-400"
                    onClick={toggleMenu}
                    end
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/about" 
                    className="block py-3 px-4 text-sm font-medium hover:bg-gray-700 hover:text-yellow-400 transition duration-300"
                    activeClassName="bg-gray-700 text-yellow-400"
                    onClick={toggleMenu}
                >
                    About Us
                </NavLink>
                <NavLink 
                    to="/contact" 
                    className="block py-3 px-4 text-sm font-medium hover:bg-gray-700 hover:text-yellow-400 transition duration-300"
                    activeClassName="bg-gray-700 text-yellow-400"
                    onClick={toggleMenu}
                >
                    Contact Us
                </NavLink>
                <NavLink 
                    to="/tracking" 
                    className="block py-3 px-4 text-sm font-medium hover:bg-gray-700 hover:text-yellow-400 transition duration-300"
                    activeClassName="bg-gray-700 text-yellow-400"
                    onClick={toggleMenu}
                >
                    Track Order
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;