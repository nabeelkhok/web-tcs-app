import React from 'react';

function AboutTestimonials() {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        <span className="inline-block pb-2 border-b-2 border-yellow-400">
                            Client Testimonials
                        </span>
                    </h2>
                    
                    <div className="bg-white text-blue-900 p-8 rounded-xl shadow-2xl relative">
                        {/* Quote icon */}
                        <svg 
                            className="absolute top-4 left-4 w-10 h-10 text-blue-200 opacity-30" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        
                        <p className="text-xl md:text-2xl italic font-medium mb-6 relative z-10">
                            "TCS is the most reliable courier service we've used! Their deliveries are consistently fast and secure. We've never experienced any issues in our 5 years of partnership."
                        </p>
                        
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                                NF
                            </div>
                            <div>
                                <p className="font-bold text-lg">Nabeel Farooq</p>
                                <p className="text-blue-600">CEO, Wilson Enterprises</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTestimonials;