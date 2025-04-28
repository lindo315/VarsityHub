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
  GraduationCap,
  Calendar,
  BookOpen,
  Trophy,
  Newspaper,
  Info,
  Heart,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const quickLinks = [
    {
      title: "Events",
      href: "/events",
      icon: <Calendar className="h-4 w-4" />,
    },
    { title: "Sports", href: "/sports", icon: <Trophy className="h-4 w-4" /> },
    { title: "News", href: "/news", icon: <Newspaper className="h-4 w-4" /> },
    { title: "About Us", href: "/about", icon: <Info className="h-4 w-4" /> },
  ];

  const resourceLinks = [
    { title: "Academic Calendar", href: "#" },
    { title: "Varsity University", href: "#" },
    { title: "Student Portal", href: "#" },
    { title: "Campus Map", href: "#" },
    { title: "Library", href: "#" },
  ];

  return (
    <footer className="bg-varsity-blue text-white">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-white" />
              <div className="font-bold text-2xl ml-2">
                Varsity<span className="text-varsity-gold">Hub</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Your central hub for all varsity University events, sports, news,
              and activities. Stay connected and never miss out on campus life.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-varsity-gold transition-colors bg-white/10 p-2 rounded-full"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:text-varsity-gold transition-colors bg-white/10 p-2 rounded-full"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-varsity-gold transition-colors bg-white/10 p-2 rounded-full"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="hover:text-varsity-gold transition-colors bg-white/10 p-2 rounded-full"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-varsity-gold transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-varsity-gold transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin size={16} className="shrink-0 mt-1" />
                <span>
                  1 Jan Smuts Avenue, Braamfontein, Johannesburg, 2000
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Phone size={16} />
                <span>+27 11 717 1000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Mail size={16} />
                <span>connect@varsity.ac.za</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-l-md rounded-r-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white/10 text-white placeholder:text-white/50"
                />
                <Button className="rounded-l-none bg-varsity-gold text-black hover:bg-varsity-gold/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/20">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <div className="mb-2 md:mb-0">
              © {new Date().getFullYear()} Varsity Campus Connect. All rights
              reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
