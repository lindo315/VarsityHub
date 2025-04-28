import React, { useState } from "react";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { newsArticles } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, ChevronRight } from "lucide-react";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(newsArticles.map((article) => article.category))
  );

  // Filter articles based on search and category
  const filteredArticles = newsArticles.filter((article) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === null || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">News & Announcements</h1>
          <p className="text-gray-500">
            Stay updated with the latest news and announcements from Varsity
            University
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Search</h3>
                <SearchInput
                  placeholder="Search news..."
                  onSearch={handleSearch}
                />
              </div>

              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Featured</h3>
                {newsArticles
                  .filter((article) => article.isFeatured)
                  .slice(0, 2)
                  .map((article) => (
                    <Card
                      key={article.id}
                      className="mb-4 hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <Badge className="mb-2">{article.category}</Badge>
                        <h4 className="font-medium line-clamp-2 mb-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {format(
                            new Date(article.publishDate),
                            "MMMM d, yyyy"
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {filteredArticles.length > 0 ? (
              <div className="space-y-8">
                {/* First article (featured/large) */}
                <div className="mb-12">
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-64 bg-gray-100">
                      <img
                        src={filteredArticles[0].imageUrl}
                        alt={filteredArticles[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge>{filteredArticles[0].category}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {format(
                            new Date(filteredArticles[0].publishDate),
                            "MMMM d, yyyy"
                          )}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-3">
                        {filteredArticles[0].title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {filteredArticles[0].summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          {filteredArticles[0].author}
                        </div>
                        <Button
                          variant="link"
                          className="text-varsity-blue font-medium flex items-center"
                          onClick={() => {
                            // Handle article navigation
                            console.log(
                              `View article ${filteredArticles[0].id}`
                            );
                          }}
                        >
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Rest of the articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.slice(1).map((article) => (
                    <Card
                      key={article.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-gray-100">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{article.category}</Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {format(
                              new Date(article.publishDate),
                              "MMM d, yyyy"
                            )}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            {article.author}
                          </div>
                          <Button
                            variant="link"
                            className="text-varsity-blue text-sm font-medium flex items-center p-0"
                            onClick={() => {
                              // Handle article navigation
                              console.log(`View article ${article.id}`);
                            }}
                          >
                            Read More
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
