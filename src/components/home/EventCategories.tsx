import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/data";

const EventCategories = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Browse Events by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/events?category=${category.id}`}
              className="flex flex-col items-center p-6 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-full bg-varsity-blue/10 text-varsity-blue group-hover:bg-varsity-blue group-hover:text-white transition-colors">
                <category.icon size={28} />
              </div>
              <h3 className="mt-4 font-medium text-lg">{category.name}</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
