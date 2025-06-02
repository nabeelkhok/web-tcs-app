import React from 'react';

function AboutPartners() {
    // Array of partner companies with their logos (using SVG icons as placeholders)
    const partners = [
        { name: "FedEx", logo: "F" },
        { name: "DHL", logo: "DHL" },
        { name: "UPS", logo: "UPS" },
        { name: "Amazon Logistics", logo: "A" },
        { name: "Maersk", logo: "M" }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Our Trusted Partners</h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                    Collaborating with industry leaders to deliver excellence worldwide
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {partners.map((partner, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center w-40 h-40"
                        >
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {partner.logo}
                            </div>
                            <span className="text-sm font-medium text-gray-700 mt-2">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutPartners;