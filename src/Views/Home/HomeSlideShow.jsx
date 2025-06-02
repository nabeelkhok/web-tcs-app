import React, { useState, useEffect } from 'react';

function HomeSlideshow() {
    const slides = [
        {
            src: "../../assets/package-delivery-service-vector-illustration-260nw-1549448496.jpg",
            alt: "Fast Delivery",
            caption: "Fast and Reliable Delivery"
        },
        {
            src: "../../assets/hand-drawn-courier-delivering-package-scooter_23-2148868602.jpg",
            alt: "Secure Handling",
            caption: "Secure and Safe Handling"
        },
        {
            src: "../../assets/png-clipart-package-delivery-courier-delivery-man-mail-delivery-man-tshirt-food.png",
            alt: "Efficient Service",
            caption: "Quick and Efficient Service"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const plusSlides = (n) => {
        let newIndex = (currentSlide + n) % slides.length;
        if (newIndex < 0) newIndex = slides.length - 1;
        setCurrentSlide(newIndex);
    };

    const currentSlideFunc = (n) => {
        setCurrentSlide(n);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            plusSlides(1);
        }, 5000); // Change slide every 5 seconds (adjust as needed)

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="relative w-full max-w-3xl mx-auto mt-16">
            {slides.map((slide, index) => (
                <div key={index} className={`mySlides fade ${index === currentSlide ? 'active' : ''}`}>
                    <img src={slide.src} alt={slide.alt} className="w-full rounded-lg shadow-lg" />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
                        {slide.caption}
                    </div>
                </div>
            ))}

            <button className="absolute top-1/2 left-4 bg-gray-800 text-white p-3 rounded-full opacity-75 hover:opacity-100" onClick={() => plusSlides(-1)}>&#10094;</button>
            <button className="absolute top-1/2 right-4 bg-gray-800 text-white p-3 rounded-full opacity-75 hover:opacity-100" onClick={() => plusSlides(1)}>&#10095;</button>

            <div className="flex justify-center mt-4">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot mx-2 w-4 h-4 bg-gray-400 rounded-full cursor-pointer ${index === currentSlide ? 'bg-gray-700' : ''}`}
                        onClick={() => currentSlideFunc(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default HomeSlideshow;