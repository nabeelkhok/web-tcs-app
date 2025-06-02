import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function AboutHeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center py-20 md:py-24 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400 rounded-full animate-pulse mix-blend-overlay"></div>
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-yellow-400 rounded-full animate-pulse mix-blend-overlay" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 transform transition duration-500 hover:scale-105">
                    About <span className="text-yellow-300">Tranzum</span> Courier Services
                </h1>
                <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90">
                    Delivering <span className="font-medium text-yellow-300">reliability</span> and <span className="font-medium text-yellow-300">speed</span> to millions worldwide
                </p>
                
                {/* Decorative divider */}
                <div className="w-24 h-1 bg-yellow-400 mx-auto mt-8 mb-6 rounded-full"></div>
                
                <div className="flex justify-center space-x-4 mt-8">
                    <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                        Our Services
                    </button>
                    
                    {/* Contact Us button with Link */}
                    <Link 
                        to="/contact" 
                        className="px-6 py-3 border-2 border-white hover:border-yellow-300 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:text-yellow-300"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default AboutHeroSection;