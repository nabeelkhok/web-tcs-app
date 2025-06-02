import React from 'react';

function AboutMissionVision() {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                {/* Main Heading with Underline */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    <span className="relative inline-block pb-2">
                        Our Mission & Vision
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
                    </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Mission Card */}
                    <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all hover:scale-[1.02] hover:shadow-2xl border-t-4 border-blue-600">
                        <div className="text-blue-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To provide <span className="font-semibold text-blue-600">fast</span>, <span className="font-semibold text-blue-600">reliable</span>, and <span className="font-semibold text-blue-600">affordable</span> courier services, ensuring customer satisfaction through innovation and efficiency.
                        </p>
                    </div>
                    
                    {/* Vision Card */}
                    <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all hover:scale-[1.02] hover:shadow-2xl border-t-4 border-yellow-400">
                        <div className="text-yellow-500 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To become the <span className="font-semibold text-yellow-500">global leader</span> in logistics and courier services by embracing <span className="font-semibold text-yellow-500">cutting-edge technology</span> and <span className="font-semibold text-yellow-500">sustainable practices</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMissionVision;