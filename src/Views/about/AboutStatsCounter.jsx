import React, { useState, useEffect } from 'react';

function AboutStatsCounter() {
    const [counters, setCounters] = useState([
        { value: 0, target: 10, text: "Deliveries Made", suffix: "M+" },
        { value: 0, target: 500, text: "Cities Covered", suffix: "+" },
        { value: 0, target: 99, text: "Customer Satisfaction", suffix: "%" }
    ]);

    useEffect(() => {
        const duration = 2000; // Animation duration in ms
        const startTime = Date.now();

        const animateCounters = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);

            setCounters(prev => prev.map((counter, index) => {
                // Different easing for each counter for staggered effect
                const ease = 1 - Math.pow(1 - progress, index + 1);
                return {
                    ...counter,
                    value: Math.floor(ease * counter.target)
                };
            }));

            if (progress < 1) {
                requestAnimationFrame(animateCounters);
            }
        };

        animateCounters();
    }, []);

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {counters.map((counter, index) => (
                        <div 
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500"
                        >
                            <div className="flex items-end justify-center space-x-1">
                                <h3 className="text-4xl md:text-5xl font-bold text-blue-600">
                                    {counter.value}
                                </h3>
                                <span className="text-xl font-semibold text-blue-500 mb-1">
                                    {counter.suffix}
                                </span>
                            </div>
                            <p className="mt-3 text-lg font-medium text-gray-600">
                                {counter.text}
                            </p>
                            <div className="mt-4 h-1 w-16 bg-yellow-400 mx-auto rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutStatsCounter;