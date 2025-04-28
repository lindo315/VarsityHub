
import React from 'react';
import Hero from '@/components/home/Hero';
import EventCategories from '@/components/home/EventCategories';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <EventCategories />
        <FeaturedEvents />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
