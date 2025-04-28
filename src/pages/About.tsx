import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  BookOpen,
  Trophy,
  Medal,
  GraduationCap,
  Globe,
  Building,
  Users,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-varsity-blue text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="text-varsity-gold">Varsity</span>Hub
              </h1>
              <p className="text-xl opacity-90">
                Connecting campus life at Varsity University
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  VarsityHub was created to enhance campus life by connecting
                  students, faculty, and staff with events, news, and activities
                  happening around Varsity University.
                </p>
                <p className="text-gray-700 mb-4">
                  Our platform aims to foster a more engaged university
                  community by providing a central hub for all campus-related
                  information and events.
                </p>
                <p className="text-gray-700">
                  We believe that a well-connected campus community leads to a
                  richer university experience, better collaboration, and
                  stronger relationships among all members of Varsity
                  University.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-50 hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-10 w-10 text-varsity-blue mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Information</h3>
                    <p className="text-sm text-gray-600">
                      Centralizing campus resources
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <Users className="h-10 w-10 text-varsity-blue mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Community</h3>
                    <p className="text-sm text-gray-600">
                      Bringing people together
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-10 w-10 text-varsity-blue mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Engagement</h3>
                    <p className="text-sm text-gray-600">
                      Encouraging participation
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <HeartHandshake className="h-10 w-10 text-varsity-blue mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Connection</h3>
                    <p className="text-sm text-gray-600">
                      Linking students and faculty
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* University Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Varsity University</h2>
              <p className="text-gray-700">
                A brief overview of our prestigious institution and its rich
                history
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <Building className="h-8 w-8 text-varsity-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">Founded in 1896</h3>
                  <p className="text-gray-700">
                    Varsity University was established over 125 years ago and
                    has grown to become one of the leading research institutions
                    in the country.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <GraduationCap className="h-8 w-8 text-varsity-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">35,000+ Students</h3>
                  <p className="text-gray-700">
                    Our diverse student body represents all 50 states and over
                    100 countries, creating a rich multicultural learning
                    environment.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <Medal className="h-8 w-8 text-varsity-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">Top 50 University</h3>
                  <p className="text-gray-700">
                    Consistently ranked among the top 50 universities worldwide
                    for academic excellence and research innovation.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <BookOpen className="h-8 w-8 text-varsity-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">12 Colleges</h3>
                  <p className="text-gray-700">
                    Our university encompasses 12 colleges offering over 200
                    undergraduate and 150 graduate degree programs.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <Trophy className="h-8 w-8 text-varsity-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">25 Sports Teams</h3>
                  <p className="text-gray-700">
                    Our varsity athletics program has won 75 national
                    championships across various sports competitions.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <Globe className="h-8 w-8 text-varsity-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">Global Network</h3>
                  <p className="text-gray-700">
                    With over 250,000 alumni worldwide, Varsity graduates make a
                    difference in every field and industry globally.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                  <p className="text-gray-700 mb-6">
                    Have questions about VarsityHub or need assistance? We're
                    here to help! Reach out to our team through any of the
                    following channels.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-varsity-blue">
                        support@varsityhub.edu
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p>(123) 456-7890</p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p>
                        1 Jan Smuts Avenue
                        <br />
                        Braamfontein
                        <br />
                        Johannesburg, 2000
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-1">Office Hours</h3>
                      <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-200 rounded-lg h-64 md:h-auto flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Campus Map</p>
                    <p className="text-sm text-gray-400">
                      (Interactive map will be displayed here)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
