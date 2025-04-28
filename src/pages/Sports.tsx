import React, { useState } from "react";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sportsTeams, sportsFixtures } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Trophy, Info, Mail, Clock } from "lucide-react";

const Sports = () => {
  const [activeTab, setActiveTab] = useState("fixtures");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sports</h1>
          <p className="text-gray-500">
            Follow varsity University's sports teams and upcoming fixtures
          </p>
        </div>

        <Tabs
          defaultValue="fixtures"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="fixtures">Upcoming Fixtures</TabsTrigger>
            <TabsTrigger value="teams">Our Teams</TabsTrigger>
            <TabsTrigger value="results">Recent Results</TabsTrigger>
          </TabsList>

          {/* Fixtures Tab */}
          <TabsContent value="fixtures" className="w-full">
            <div className="grid gap-6">
              {sportsFixtures.map((fixture) => (
                <Card
                  key={fixture.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-varsity-blue text-white md:w-1/4 p-6 flex flex-col justify-center items-center">
                        <CalendarDays className="h-8 w-8 mb-2" />
                        <div className="text-center">
                          <div className="text-lg font-bold">
                            {format(new Date(fixture.fixtureDate), "EEE")}
                          </div>
                          <div className="text-2xl font-bold">
                            {format(new Date(fixture.fixtureDate), "d")}
                          </div>
                          <div className="text-lg">
                            {format(new Date(fixture.fixtureDate), "MMM yyyy")}
                          </div>
                          <div className="mt-2 text-sm">
                            {format(new Date(fixture.fixtureDate), "h:mm a")}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              className={
                                fixture.isHomeGame
                                  ? "bg-varsity-gold text-black"
                                  : "bg-gray-200 text-gray-700"
                              }
                            >
                              {fixture.isHomeGame ? "Home Game" : "Away Game"}
                            </Badge>
                            <Badge className="bg-varsity-blue">
                              {fixture.team.sport}
                            </Badge>
                          </div>

                          <h3 className="text-xl font-bold mb-2">
                            {fixture.isHomeGame
                              ? `${fixture.team.name} vs ${fixture.opponent}`
                              : `${fixture.opponent} vs ${fixture.team.name}`}
                          </h3>

                          <div className="space-y-2 text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{fixture.location.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>
                                {format(
                                  new Date(fixture.fixtureDate),
                                  "h:mm a"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {fixture.result && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="font-medium">
                              Result: {fixture.result}
                            </div>
                            {fixture.score && <div>Score: {fixture.score}</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportsTeams.map((team) => (
                <Card
                  key={team.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-varsity-blue text-white p-6 flex items-center justify-center">
                    <img
                      src={team.logoUrl}
                      alt={`${team.name} logo`}
                      className="h-24 w-24 object-contain"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                    <Badge className="mb-4">{team.sport}</Badge>

                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        <span>Coach: {team.coach}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <a
                          href={`mailto:${team.contactEmail}`}
                          className="text-varsity-blue hover:underline"
                        >
                          {team.contactEmail}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <div className="text-center py-12">
              <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Recent Results</h3>
              <p className="text-gray-500">
                Check back after upcoming fixtures for game results
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Sports;
