import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, FiInfo, FiMail, FiTruck, FiUser, 
  FiLogIn, FiLogOut, FiUserPlus, FiMenu, FiX 
} from 'react-icons/fi';
import { auth } from '../../../config/firebaseconfig'; // Make sure to import your Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Close mobile menu when route changes
        setIsMobileMenuOpen(false);
        
        // Set up Firebase auth state listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            if (user) {
                setUserEmail(user.email);
                localStorage.setItem("user_idToken", user.uid);
            } else {
                setUserEmail('');
                localStorage.removeItem("user_idToken");
            }
        });
        
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Close mobile menu on route change
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Common styles
    const linkStyles = "px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center";
    const activeStyles = "bg-gray-800 text-yellow-400";
    const hoverStyles = "hover:bg-gray-800 hover:text-yellow-400";
    const authButtonStyles = "px-3 py-2 rounded-md text-sm font-medium text-white transition duration-300";

    return (
        <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 shadow-lg z-50 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Brand */}
                <NavLink 
                    to="/" 
                    className="text-3xl font-bold hover:text-yellow-400 transition duration-300 flex items-center"
                    aria-label="Home"
                >
                    <span className="text-yellow-400">T</span>
                    <span className="text-blue-400">C</span>
                    <span className="text-pink-400">S</span>
                    <span className="ml-2 text-sm font-normal text-gray-300 hidden sm:inline">| Courier Services</span>
                </NavLink>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    {/* Main Navigation Links */}
                    <NavLink 
                        to="/" 
                        className={`${linkStyles} ${hoverStyles}`}
                        activeclassname={activeStyles}
                        end
                    >
                        <FiHome className="mr-2" /> Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={`${linkStyles} ${hoverStyles}`}
                        activeclassname={activeStyles}
                    >
                        <FiInfo className="mr-2" /> About
                    </NavLink>
                    <NavLink 
                        to="/contact" 
                        className={`${linkStyles} ${hoverStyles}`}
                        activeclassname={activeStyles}
                    >
                        <FiMail className="mr-2" /> Contact
                    </NavLink>
                    <NavLink 
                        to="/tracking" 
                        className={`${linkStyles} ${hoverStyles}`}
                        activeclassname={activeStyles}
                    >
                        <FiTruck className="mr-2" /> Tracking
                    </NavLink>

                    {/* Authentication Links */}
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4 ml-4">
                            <div className="text-sm text-gray-300 hidden lg:block">
                                Welcome, {userEmail?.split('@')[0] || 'User'}
                            </div>
                            <NavLink 
                                to="/dashboard" 
                                className={`${linkStyles} ${hoverStyles}`}
                                activeclassname={activeStyles}
                            >
                                <FiUser className="mr-2" /> Dashboard
                            </NavLink>
                            <button 
                                onClick={handleLogout}
                                className={`${authButtonStyles} bg-red-600 hover:bg-red-700 flex items-center`}
                                aria-label="Logout"
                            >
                                <FiLogOut className="mr-2" /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-2 ml-4">
                            <NavLink 
                                to="/auth/login" 
                                className={`${authButtonStyles} bg-blue-600 hover:bg-blue-700 flex items-center`}
                            >
                                <FiLogIn className="mr-2" /> Login
                            </NavLink>
                            <NavLink 
                                to="/auth/signup" 
                                className={`${authButtonStyles} bg-green-600 hover:bg-green-700 flex items-center`}
                            >
                                <FiUserPlus className="mr-2" /> Sign Up
                            </NavLink>
                        </div>
                    )}
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none text-2xl transition duration-300 p-2" 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
            
            {/* Mobile Navigation */}
            <div 
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 text-center transition-all duration-300 ease-in-out`}
            >
                <div className="py-2 space-y-1">
                    {/* Mobile Navigation Links */}
                    <NavLink 
                        to="/" 
                        className={`block py-3 px-4 text-sm font-medium ${hoverStyles}`}
                        activeclassname={activeStyles}
                        onClick={toggleMenu}
                        end
                    >
                        <FiHome className="inline mr-2" /> Home
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={`block py-3 px-4 text-sm font-medium ${hoverStyles}`}
                        activeclassname={activeStyles}
                        onClick={toggleMenu}
                    >
                        <FiInfo className="inline mr-2" /> About
                    </NavLink>
                    <NavLink 
                        to="/contact" 
                        className={`block py-3 px-4 text-sm font-medium ${hoverStyles}`}
                        activeclassname={activeStyles}
                        onClick={toggleMenu}
                    >
                        <FiMail className="inline mr-2" /> Contact
                    </NavLink>
                    <NavLink 
                        to="/tracking" 
                        className={`block py-3 px-4 text-sm font-medium ${hoverStyles}`}
                        activeclassname={activeStyles}
                        onClick={toggleMenu}
                    >
                        <FiTruck className="inline mr-2" /> Tracking
                    </NavLink>

                    {/* Mobile Authentication Links */}
                    {isAuthenticated ? (
                        <>
                            <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-700">
                                Logged in as: {userEmail}
                            </div>
                            <NavLink 
                                to="/dashboard" 
                                className={`block py-3 px-4 text-sm font-medium ${hoverStyles}`}
                                activeclassname={activeStyles}
                                onClick={toggleMenu}
                            >
                                <FiUser className="inline mr-2" /> Dashboard
                            </NavLink>
                            <button 
                                onClick={handleLogout}
                                className={`w-full py-3 px-4 text-sm font-medium bg-red-600 hover:bg-red-700 text-white flex items-center justify-center`}
                            >
                                <FiLogOut className="inline mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="border-t border-gray-700"></div>
                            <NavLink 
                                to="/auth/login" 
                                className={`block py-3 px-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center`}
                                onClick={toggleMenu}
                            >
                                <FiLogIn className="inline mr-2" /> Login
                            </NavLink>
                            <NavLink 
                                to="/auth/signup" 
                                className={`block py-3 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white flex items-center justify-center`}
                                onClick={toggleMenu}
                            >
                                <FiUserPlus className="inline mr-2" /> Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;