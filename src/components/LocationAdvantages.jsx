import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const LocationAdvantages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-advantages?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const locationAdvantages = data?.location_advantages || [];
  const heading = data?.page?.[0]?.heading || "Location Highlights";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locationAdvantages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [locationAdvantages]);

  return (
    <div className="bg-[#170505] py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-amber-500 mb-6">{heading}</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentIndex((prev) => (prev - 1 + locationAdvantages.length) % locationAdvantages.length)} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => setCurrentIndex((prev) => (prev + 1) % locationAdvantages.length)} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="w-full flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {locationAdvantages.map((item, index) => (
              <div key={index} className="flex-none w-full px-3">
                <div className="bg-[#5f7858] rounded-lg p-6 border border-gray-700 hover:border-amber-500 shadow-xl flex flex-col items-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-black/80 rounded-full shadow-md mb-4">
                    <MapPin size={30} className="text-amber-400" />
                  </div>
                  <h4 className="text-lg font-bold text-[#312223]">{item.location}</h4>
                  <p className="text-gray-400 text-sm">{item.distance}</p>
                  <p className="text-gray-300 text-center mt-2">{item.description}</p>
                  <a href="#" className="text-amber-400 flex items-center mt-4 hover:underline">
                    View on map <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {locationAdvantages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full transition-all ${currentIndex === index ? "bg-amber-500 scale-125" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default LocationAdvantages;
