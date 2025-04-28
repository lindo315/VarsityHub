import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-varsity-blue text-white pt-12 pb-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-varsity-gold">
              varsity Connect
            </h3>
            <p className="text-sm">
              Your central hub for all varsity University events, sports, news,
              and activities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-varsity-gold transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-varsity-gold transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-varsity-gold transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                className="hover:text-varsity-gold transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/sports"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  Event Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  Varsity University
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-varsity-gold transition-colors"
                >
                  Campus Map
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} />
                <span>1 Jan Smuts Avenue, Braamfontein</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} />
                <span>+27 11 717 1000</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} />
                <span>connect@varsity.ac.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Varsity Campus Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
