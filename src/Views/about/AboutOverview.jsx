import React from 'react';

function AboutOverview() {
    return (
        <section className="relative py-16 bg-gradient-to-r from-blue-50 to-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-overlay animate-pulse"></div>
                <div className="absolute bottom-10 left-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-overlay animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                        <span className="relative z-10">
                            Who We Are
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform -translate-y-1"></span>
                        </span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                        <span className="font-semibold text-blue-600">TCS</span> is a leading courier service provider dedicated to{' '}
                        <span className="font-semibold text-blue-600">fast</span>,{' '}
                        <span className="font-semibold text-blue-600">secure</span>, and{' '}
                        <span className="font-semibold text-blue-600">reliable</span> deliveries across the globe.
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                            Learn More
                        </button>
                        <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1">
                            Our Services
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutOverview;