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
  ChevronRight,
  ExternalLink,
  ArrowUp,
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-varsity-blue py-10 border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
              <p className="text-white/80">
                Subscribe to our newsletter for campus events, news, and
                announcements
              </p>
            </div>
            <div>
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

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Logo and About */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-varsity-gold" />
              <div className="font-bold text-2xl ml-2">
                Varsity<span className="text-varsity-gold">Hub</span>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              VarsityHub is your central hub for all Varsity University events,
              sports, news, and activities. Stay connected and never miss out on
              campus life.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-varsity-gold hover:text-black transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-varsity-gold hover:text-black transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-varsity-gold hover:text-black transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-varsity-gold hover:text-black transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-varsity-gold">
              Navigation
            </h3>
            <ul className="space-y-2 text-white/70">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="flex items-center hover:text-varsity-gold transition-colors group"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-varsity-gold">
              Resources
            </h3>
            <ul className="space-y-2 text-white/70">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center hover:text-varsity-gold transition-colors group"
                  >
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-varsity-gold">
              Contact
            </h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-1 text-varsity-gold" />
                <span>
                  1 Jan Smuts Avenue, Braamfontein, Johannesburg, 2000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-varsity-gold" />
                <span>+27 11 717 1000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-varsity-gold" />
                <span>connect@varsity.ac.za</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Varsity Campus Connect. All rights
            reserved.
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="hover:text-varsity-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-varsity-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-varsity-gold transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-varsity-gold transition-colors">
              Cookie Policy
            </a>
          </div>
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-varsity-gold hover:text-black"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Back to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
