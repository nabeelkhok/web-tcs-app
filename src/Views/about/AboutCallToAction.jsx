import React from 'react';

function AboutCallToAction() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .floating-circle {
          animation: float 6s ease-in-out infinite;
        }
        .floating-circle.delay {
          animation-delay: 1s;
        }
        .cta-button:hover {
          transform: translateY(-3px);
        }
        .title:hover {
          transform: scale(1.05);
        }
      `}</style>

      <section className="relative py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Decorative elements with inline styles */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="absolute top-20 left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-overlay floating-circle"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          ></div>
          <div 
            className="absolute bottom-10 right-20 w-32 h-32 bg-yellow-400 rounded-full mix-blend-overlay floating-circle delay"
            style={{ animation: 'float 6s ease-in-out infinite 1s' }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6 transition-all duration-300 title"
            style={{ display: 'inline-block' }}
          >
            Ready to Ship with <span className="text-yellow-300">TCS</span>?
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
            Join thousands of satisfied customers shipping worldwide with our reliable services.
          </p>
          <button 
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-full shadow-lg transition-all duration-300 cta-button"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(0)'
            }}
          >
            Get Started Today
          </button>
        </div>
      </section>
    </>
  );
}

export default AboutCallToAction;