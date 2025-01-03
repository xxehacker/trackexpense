import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#39248f] to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">MoneyHack</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We're dedicated to transforming financial management through
              innovative solutions that empower individuals and businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500 transition-colors">
                <Link to="https://github.com/xxehacker" target="_blank">
                  <FaGithub size={20} />
                </Link>
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <Link to="https://www.instagram.com/mridupawan0x1" target="_blank"><FaInstagram size={20} /></Link>
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <Link to="https://www.linkedin.com/in/mridupawan503" target="_blank"><FaLinkedin size={20} /></Link>
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <Link to="https://twitter.com/xxehacker0x1" target="_blank"><FaTwitter size={20} /></Link>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {Object.entries({
                Home: "/",
                "About Us": "/about",
                Services: "/",
                "Contact Us": "#contact",
                Portfolio: "https://mridupawan-portfolio.vercel.app/",
              }).map(([name, href]) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-sm hover:text-purple-500 transition-colors flex items-center gap-2"
                  >
                    <span className="h-px w-4 bg-purple-500/50"></span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-purple-500 mt-1" />
                <span>Guwahati, Assam</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-purple-500" />
                <span>+91 7099550167</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>mridupawan503@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MoneyHack. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Made with ❤️ by{" "}
              <Link
                to="https://mridupawan-portfolio.vercel.app/"
                className="text-purple-500 hover:underline"
              >
                Mridupawan Bordoloi
              </Link>
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-purple-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-purple-500 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
