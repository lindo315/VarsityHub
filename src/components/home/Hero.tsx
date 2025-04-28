import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-varsity-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-varsity-blue to-black/40 mix-blend-multiply" />
      </div>

      <div className="relative container mx-auto px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Discover what's happening</span>
            <span className="block text-varsity-gold">
              at Varsity University
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-white/80 sm:text-xl md:mt-5 md:max-w-3xl lg:mx-0">
            Your central hub for all campus events, sports matches, news, and
            activities. Stay connected and never miss out.
          </p>

          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md bg-varsity-gold text-black hover:bg-varsity-gold/90">
                Browse Events
              </Button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md bg-transparent border-white text-white hover:bg-white/10"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
