import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import config from '../../config';

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
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <h2 className="text-4xl font-bold text-center text-[#d1b578] mb-10">{heading}</h2>
      </motion.div>

      {floorPlans.length === 0 ? (
        <motion.p 
          className="text-center text-[#d1b578] opacity-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          No floor plans available.
        </motion.p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, 
              },
            },
          }}
          viewport={{ once: false }} // This ensures animations trigger again when revisited
        >
          {floorPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="bg-[#5f7858] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-[#d1b578]"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <img
                src={plan.layout_image}
                alt={plan.layout_name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-6">
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

                <p className="text-[#170505] text-sm mt-4">
                  <strong className="text-[#d1b578]">Updated At:</strong> {new Date(plan.updated_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default FloorPlans;
