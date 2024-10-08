"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scheduleData } from "./scheduleData";

const days = [
  { full: "Søndag", abbr: "Søn" },
  { full: "Mandag", abbr: "Man" },
  { full: "Tirsdag", abbr: "Tir" },
  { full: "Onsdag", abbr: "Ons" },
  { full: "Torsdag", abbr: "Tor" },
  { full: "Fredag", abbr: "Fre" },
  { full: "Lørdag", abbr: "Lør" },
];

export default function Classes() {
  const [currentDay, setCurrentDay] = useState(() => {
    const today = new Date().getDay();
    return days[today].full === "Lørdag" || days[today].full === "Søndag"
      ? "Mandag"
      : days[today].full;
  });

  return (
    <div className="mx-auto py-8">
      <h2 className="text-xl sm:text-3xl font-bold mb-6 text-center">
        Timeplan i Dojo
      </h2>
      <p className="text-sm text-gray-600 pb-8">
        Vennligst merk at dersom du er nybegynner og ikke har anledning til å
        delta på de dagene hvor nybegynnerklasser er satt opp, er du velkommen
        til å delta på en annen dag som passer deg bedre.
      </p>
      <Tabs value={currentDay} onValueChange={setCurrentDay} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          {scheduleData.map((day) => (
            <TabsTrigger
              key={day.day}
              value={day.day}
              className="text-sm sm:text-base shadow-md bg-purple-200"
            >
              <span className="hidden sm:inline">{day.day}</span>
              <span className="sm:hidden">
                {days.find((d) => d.full === day.day)?.abbr}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {scheduleData.map((day) => (
          <TabsContent key={day.day} value={day.day}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {day.classes.map((class_, index) => (
                <Card
                  key={index}
                  className={`${class_.color} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <CardContent className="p-4">
                    <div className="font-bold text-lg mb-2">{class_.time}</div>
                    <div className="font-medium mb-1">{class_.name}</div>
                    <div className="text-sm opacity-75">{class_.room}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {day.classes.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                Ingen klasser planlagt for denne dagen.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>EGENTRENING ETTER AVTALE</p>
      </div>
    </div>
  );
}
