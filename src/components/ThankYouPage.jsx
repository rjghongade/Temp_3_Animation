import React, { useEffect, useState } from "react";
import { Check, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import config from "../../config";

const ThankYouPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/header?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch header data");
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#170505]">
        <div className="animate-pulse text-[#d1b578]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#170505]">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#170505] flex flex-col">
      {/* Header/Logo Section */}
      <div className="w-full py-4 border-b border-[#312223] flex justify-center">
        {data?.logo && (
          <img
            src={data.logo}
            alt={data.property_name || "Amberwood"}
            className="h-12 max-w-[120px]"
          />
        )}
      </div>

      {/* Thank You Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-[#1e0c0c] border border-[#312223] rounded-lg p-8 max-w-md w-full shadow-2xl text-center animate-fadeIn">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#5f7858] to-[#3f5138] flex items-center justify-center">
              <Check size={32} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Thank You!
          </h1>
          
          <p className="text-[#d1b578] mb-6">
          We have received your message. Our team will contact you shortly !
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/"
              className="py-2 px-4 rounded-lg border border-[#d1b578] text-[#d1b578] flex items-center justify-center hover:bg-[#d1b578]/10 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Link>
            
            <Link 
              to="/"
              className="py-2 px-4 rounded-lg bg-gradient-to-b from-[#5f7858] to-[#3f5138] text-white flex items-center justify-center hover:from-[#d1b578] hover:to-[#a18a5f] transition-all duration-300"
            >
              <Home size={16} className="mr-2" />
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-3 border-t border-[#312223] text-center text-[#d1b578] text-sm">
        &copy; {new Date().getFullYear()} {data?.property_name || "Amberwood"}
      </div>
    </div>
  );
};

export default ThankYouPage;