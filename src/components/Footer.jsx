import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-dark-100 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Footer Menu Items */}
        <div className="flex justify-around items-end mb-6">
          <div>
            <h4 className="font-semibold text-lg text-left mb-2">Watch</h4>
            <ul className="space-y-2 text-left">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Spotlight
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  TV
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Free
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-left mb-2">My Account</h4>
            <ul className="space-y-2 text-left">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Setting
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Manage Devices
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-left mb-2">Help</h4>
            <ul className="space-y-2 text-left">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Additional Information */}
        <div className="border-t border-gray-600 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
