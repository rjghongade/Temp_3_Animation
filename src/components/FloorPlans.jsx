import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from "../../config";

const FloorPlans = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [heading, setHeading] = useState("Floor Plans");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/floor-layout?website=${config.SLUG_URL}`);
        if (!response.ok) throw new Error("Failed to fetch floor plans");

        const data = await response.json();
        setHeading(data.page?.[0]?.heading || "Floor Plans");
        setFloorPlans(data.Floor_plans || []);
      } catch (error) {
        console.error("Error fetching floor plans:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.section
      id="FloorPlans"
      className="bg-gradient-to-br from-[#170505] via-[#312223] to-[#170505] py-16 px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Heading with Glow Effect */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl font-bold text-center text-[#d1b578] mb-10"
          animate={{
            textShadow: ["0px 0px 10px rgba(209, 181, 120, 0.8)", "0px 0px 20px rgba(209, 181, 120, 1)"],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
        >
          {heading}
        </motion.h2>
      </motion.div>

      {floorPlans.length === 0 ? (
        <motion.p
          className="text-center text-[#d1b578] opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          No floor plans available.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.3,
                ease: "easeOut",
              },
            },
          }}
        >
          {floorPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="bg-[#5f7858] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-[#d1b578]"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: [0, -5, 0], // Floating effect
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Image with Hover Zoom */}
              <motion.img
                src={plan.layout_image}
                alt={plan.layout_name}
                className="w-full h-56 object-cover rounded-t-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-semibold text-[#170505]">{plan.layout_name}</h3>

                {plan.unit_layout_heading && (
                  <p className="text-[#312223] mt-2">
                    <strong className="text-[#d1b578]">Heading:</strong> {plan.unit_layout_heading}
                  </p>
                )}

                {plan.unit_layout_carpet_area && (
                  <p className="text-[#312223] mt-2">
                    <strong className="text-[#d1b578]">Carpet Area:</strong> {plan.unit_layout_carpet_area}
                  </p>
                )}

                {plan.unit_layout_price && (
                  <p className="text-[#312223] mt-2">
                    <strong className="text-[#d1b578]">Price:</strong> ₹{plan.unit_layout_price}
                  </p>
                )}

                {plan.unit_layout_description && (
                  <p className="text-[#312223] mt-2">
                    <strong className="text-[#d1b578]">Description:</strong> {plan.unit_layout_description}
                  </p>
                )}

                {/* See Floor Plan Button with Pulsating Effect */}
                <motion.div
                  className="mt-6"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: [1, 1.05, 1], // Continuous pulse
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <a
                    href="#contact"
                    className="bg-[#d1b578] hover:bg-[#e6c57f] text-[#170505] font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform block text-center"
                  >
                    See Floor Plan
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default FloorPlans;
