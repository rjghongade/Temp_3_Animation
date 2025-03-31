import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import config from "../../config";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [reraData, setReraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [footerResponse, reraResponse] = await Promise.all([
          fetch(`${config.API_URL}/footer?website=${config.SLUG_URL}`),
          fetch(`${config.API_URL}/rera?website=${config.SLUG_URL}`)
        ]);

        if (!footerResponse.ok) throw new Error("Failed to fetch footer data");
        if (!reraResponse.ok) throw new Error("Failed to fetch RERA data");

        const footerJson = await footerResponse.json();
        const reraJson = await reraResponse.json();

        setFooterData(footerJson);
        setReraData(reraJson.rera[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="bg-gray-900 p-8 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <footer className="bg-[#1e1e1e] text-[#d1b578] py-10 text-center border-t border-gray-700">
      <div className="flex flex-col items-center space-y-4 px-4">
        {reraData?.rera_url && (
          <QRCodeCanvas value={reraData.rera_url} size={120} className="mb-2" />
        )}

        <p className="text-sm max-w-md text-center">
          <span>Agent RERA: {footerData?.g_setting?.footer_agent_rera}</span> | 
          <span> Project RERA: {reraData?.rera_id}</span>{" "}
          {reraData?.rera_url && (
            <a href={reraData.rera_url} target="_blank" rel="noopener noreferrer" className="text-red-500">
              ({reraData.rera_url})
            </a>
          )}
        </p>

        <hr className="border-gray-600 w-3/4" />

        <p className="mt-2 text-xs max-w-md mx-auto">{footerData?.g_setting?.footer_disclamer || "No disclaimer available."}</p>

        <div className="text-xs mt-4">
          <p>
            Digital Media Planned By: <span className="text-red-500">My Digital Kart</span>
          </p>
          <a href="/privacy-policy" className="text-red-500">
            Privacy Policy
          </a>
        </div>

        <div className="text-xs text-gray-500 mt-4">&copy; 2025 All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
