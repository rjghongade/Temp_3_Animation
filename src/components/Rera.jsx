import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Building,
  FileText,
  ExternalLink,
  Map,
  Home,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";
import { QRCodeCanvas } from "qrcode.react";

const ReraInformation = () => {
  const [reraData, setReraData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/rera?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch RERA data");
        }

        const data = await response.json();
        setPageInfo(data.page[0]);
        setReraData(data.rera);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching RERA data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReraData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-gray-900">
        <Loader size={30} className="text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-gray-900 text-amber-400">
        <AlertTriangle size={24} className="mr-2" />
        <p>Failed to load RERA information: {error}</p>
      </div>
    );
  }

  if (!reraData || reraData.length === 0) return null;
  const displayed = showAll ? reraData : reraData.slice(0, 2);

  return (
    <>
      <motion.div
        className="bg-gradient-to-b from-[#170505] via-[#312223] to-[#170505] py-16 px-6 text-[#d1b578]"
        id="about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#d4af37] drop-shadow-lg animate-pulse">
            {pageInfo?.heading || "RERA Information"}
          </h2>
          {pageInfo?.subheading && (
            <p className="text-[#e0c98f] mt-2">{pageInfo.subheading}</p>
          )}
        </div>
        {displayed.map((reraData) => {
          return (
            <>
              <motion.div
                className="max-w-6xl mx-auto mb-8"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="bg-[#312223] rounded-xl shadow-2xl p-6 relative overflow-hidden border border-[#8d6f3a]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8d6f3a]/40 via-transparent to-[#5f4c2f]/40 opacity-50 animate-gradient" />

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-semibold text-[#d4af37] animate-fade-in">
                        {reraData.phase_name}
                      </h3>
                      <p className="text-[#e0c98f] mt-1 flex items-center">
                        <FileText
                          size={16}
                          className="mr-2 text-[#d4af37] animate-bounce"
                        />{" "}
                        RERA ID: {reraData.rera_id}
                      </p>
                    </div>
                    <QRCodeCanvas
                      value={
                        reraData?.rera_url ||
                        "https://maharera.maharashtra.gov.in/"
                      }
                      height={120}
                      width={120}
                      className="p-3 bg-[#ffffff] rounded-xl"
                    />
                  </div>
                </motion.div>

                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  {[
                    {
                      label: "Completion Date",
                      value: formatDate(reraData.completion_date),
                      icon: <Calendar />,
                    },
                    {
                      label: "Project Area",
                      value: `${reraData.total_area} sq.m (${reraData.total_acre} Acre)`,
                      icon: <Map />,
                    },
                    {
                      label: "Total Towers",
                      value: reraData.total_tower,
                      icon: <Building />,
                    },
                    {
                      label: "Total Units",
                      value: reraData.total_units,
                      icon: <Home />,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-[#312223] rounded-lg border border-[#8d6f3a] shadow-lg flex items-center gap-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-3 bg-[#5f4c2f] rounded-lg text-[#d4af37] animate-pulse">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[#e0c98f] text-sm">{item.label}</p>
                        <h4 className="text-[#d4af37] font-semibold text-lg">
                          {item.value}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </>
          );
        })}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center md:justify-end">
          <motion.button
            onClick={() => openDialog()}
            className="w-full sm:w-auto bg-gradient-to-b from-[#312223]/30 to-[#170505] hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 active:to-indigo-800 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 text-center shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1], // Pulsing effect
              boxShadow: [
                "0px 0px 10px rgba(128, 90, 213, 0.5)",
                "0px 0px 20px rgba(128, 90, 213, 0.8)",
                "0px 0px 10px rgba(128, 90, 213, 0.5)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 25px rgba(128, 90, 213, 0.9)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Request Property Documents
          </motion.button>
        </div>

        {/* Show more / less toggle */}
        {reraData.length > 2 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="border border-gray-50 text-white font-medium px-6 py-2 rounded-md"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}

        <ContactDialog isOpen={isOpen} onClose={closeDialog} />
      </motion.div>
    </>
  );
};

export default ReraInformation;
