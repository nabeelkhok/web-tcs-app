import React from 'react';
import { 
  FaFacebookF as FaFacebook, 
  FaTwitter, 
  FaLinkedinIn as FaLinkedin, 
  FaInstagram, 
  FaEnvelope, 
  FaPhoneAlt as FaPhone,
  FaArrowUp
} from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white w-full">
      {/* Main content container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4">TCS</h3>
              <p className="text-gray-400">
                Leading technology solutions provider committed to excellence and innovation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'Services', 'Careers', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <a href="mailto:info@tcs.com" className="hover:text-white transition">
                    info@tcs.com
                  </a>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-2" />
                  <a href="tel:+92123456789" className="hover:text-white transition">
                    +92 123 456789
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook />, label: 'Facebook' },
                  { icon: <FaTwitter />, label: 'Twitter' },
                  { icon: <FaLinkedin />, label: 'LinkedIn' },
                  { icon: <FaInstagram />, label: 'Instagram' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-white transition text-2xl"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} TCS. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
                <a
                  key={policy}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  {policy}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;