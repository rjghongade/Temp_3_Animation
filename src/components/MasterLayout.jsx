import React, { useEffect, useState, useRef } from "react";
import config from "../../config";

const MasterLayout = () => {
  const [masterLayout, setMasterLayout] = useState(null);
  const [heading, setHeading] = useState("");
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef(null);

  useEffect(() => {
    fetch(`${config.API_URL}/master-layout?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data.page?.[0]?.heading || "Master Layout");
        setMasterLayout(data.master_layout?.[0] || null);
      })
      .catch((error) => console.error("Error fetching master layout:", error));
  }, []);

  const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.2, 2));
  const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1));

  return (
<section
  id="MasterLayout"
  className="bg-gradient-to-br from-[#170505] via-[#312223] to-[#170505] py-16 px-6 text-[#d1b578] animate-fade-in"
>
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-[#d1b578] mb-8 animate-bounce">
      {heading}
    </h2>

    {masterLayout ? (
      <div className="relative bg-[#5f7858] bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden p-8">
        {/* Image Container with Zoom Controls */}
        <div className="relative group mb-6">
          <div className="flex justify-center items-center">
            <img
              ref={imageRef}
              src={masterLayout.layout_image}
              alt={masterLayout.layout_name}
              className="w-full max-h-[500px] object-contain transition-transform duration-300 hover:scale-105"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={zoomIn}
              className="bg-[#d1b578] hover:bg-[#312223] text-[#170505] font-semibold px-3 py-2 rounded-lg shadow-lg"
            >
              🔍+
            </button>
            <button
              onClick={zoomOut}
              className="bg-[#312223] hover:bg-[#5f7858] text-[#d1b578] font-semibold px-3 py-2 rounded-lg shadow-lg"
            >
              🔍-
            </button>
          </div>
        </div>

        {/* More Info Button */}
        <div className="flex justify-center mt-6">
        <a
            href="#contact"
            className="mt-8 bg-gradient-to-r to-amber-600 hover:from-amber-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl transition-transform transform hover:scale-105"
            style={{
              animation: "wiggle 0.5s ease-in-out infinite"
            }}
          >
            About Layout
          </a>
        </div>
      </div>
    ) : (
      <p className="text-gray-400 text-lg">No master layout available.</p>
    )}
  </div>

  {/* Animations */}
  <style>
    {`
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 1.5s ease-in-out;
      }
    `}
  </style>
</section>

  );
};

export default MasterLayout;
