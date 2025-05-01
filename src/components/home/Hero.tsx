import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";

const Hero = () => {
  const { setSearchTerm, resetSearch } = useSearch();

  const handleSearchClick = () => {
    resetSearch();
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
      })
    );
  };

  return (
    <section className="relative">
      {/* Background overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay on top of image */}
        <div className="absolute inset-0 bg-gradient-to-r from-varsity-blue/95 via-varsity-blue/80 to-black/70" />

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjEyMTIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzBoLTYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4yIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PHBhdGggZD0iTTMwIDM2di02IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvZz48L3N2Zz4=')] opacity-20 mix-blend-overlay" />

        {/* Animated circles/blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-varsity-gold/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-varsity-blue/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-varsity-gold mr-2"></span>
              Welcome to Varsity University Hub
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              <span className="block">Discover what's</span>
              <span className="block text-varsity-gold">
                happening on campus
              </span>
            </h1>

            <p className="mt-3 max-w-md mx-auto lg:mx-0 text-lg text-white/80 sm:text-xl">
              Your central hub for all campus events, sports matches, news, and
              activities. Stay connected and never miss out.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/events">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-varsity-gold text-black hover:bg-varsity-gold/90"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Browse Events
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white border-white/30 text-black hover:bg-white/70"
                onClick={handleSearchClick}
              >
                <Search className="mr-2 h-5 w-5" />
                Search Campus
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/news"
                className="inline-flex items-center text-white hover:text-varsity-gold transition-colors"
              >
                <span>Latest News</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                to="/sports"
                className="inline-flex items-center text-white hover:text-varsity-gold transition-colors"
              >
                <span>Sports Fixtures</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Hero Feature Image */}
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-full h-full rounded-2xl border border-white/10 z-0"></div>
              <div className="absolute -bottom-12 -right-12 w-full h-full rounded-2xl border border-white/10 z-0"></div>

              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/20">
                {/* Replace with your actual PNG image */}
                <img
                  src="/people-festival.jpg"
                  alt="Varsity University Campus Life"
                  className="w-full h-auto object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-varsity-gold flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-black" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold">Campus Activities</h3>
                      <p className="text-sm text-white/80">
                        Stay connected with university life
                      </p>
                    </div>
                  </div>

                  <Link to="/events">
                    <Button
                      variant="outline"
                      className="w-full bg-secondary/70 border-white/30 text-white hover:bg-white/90"
                    >
                      Explore All Events
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave pattern at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white"
        >
          <path d="M0,32L60,37.3C120,43,240,53,360,64C480,75,600,85,720,80C840,75,960,53,1080,42.7C1200,32,1320,32,1380,32L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
