import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from '../../config'

const UnitLayouts = () => {
  const [layouts, setLayouts] = useState([]);
  const [heading, setHeading] = useState("Unit Layouts");
  const [selectedLayout, setSelectedLayout] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/unit-layout?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data?.page?.[0]?.heading || "Unit Layouts");
        setLayouts(data?.unit_layout || []);
      })
      .catch((error) => console.error("Error fetching unit layouts:", error));
  }, []);

  const closeModal = () => setSelectedLayout(null);
  const openModal = (layout) => setSelectedLayout(layout);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id="UnitLayouts"
      className="bg-gradient-to-br from-[#170505] via-[#312223] to-[#170505] py-12 px-5 text-[#5f7858]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center text-[#d1b578] mb-6"
        >
          {heading}
        </motion.h2>

        {layouts.length === 0 ? (
          <motion.p
            variants={itemVariants}
            className="text-center text-[#d1b578] opacity-80"
          >
            No unit layouts available.
          </motion.p>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {layouts.map((layout) => (
              <motion.div
                key={layout.id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-[#5f7858] shadow-lg rounded-xl overflow-hidden"
              >
                <motion.img
                  initial={{ filter: "blur(8px)" }} // Initial blur effect
                  animate={{ filter: "blur(3px)" }} // Soft blur after loading
                  whileHover={{ filter: "blur(0px)", scale: 1.05 }} // Remove blur and scale up on hover
                  transition={{ duration: 1.2, ease: "easeOut" }} // Smooth transition
                  src={layout.layout_image?.replace("//uploads", "/uploads")}
                  alt={layout.layout_name}
                  className="w-full h-56 object-cover rounded-t-xl"
                />

                <div className="p-6">
                  <motion.h3
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-2xl font-semibold text-[#170505]"
                  >
                    {layout.layout_name}
                  </motion.h3>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-[#d1b578] mt-1"
                  >
                    {layout.unit_layout_heading}
                  </motion.p>
                  <div className="mt-4 space-y-2">
                    <motion.p
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#d1b578]"
                    >
                      <strong>Carpet Area:</strong> {layout.unit_layout_carpet_area || "N/A"}
                    </motion.p>
                    {/* <motion.p
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#312223]"
                    >
                      <strong>Price:</strong> ₹{layout.unit_layout_price || "N/A"}
                    </motion.p> */}
                  </div>
                  <div className="mt-6 flex flex-col md:flex-row md:justify-between gap-4">
                    {/* <motion.button
                      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal(layout)}
                      className="bg-gradient-to-r from-[#5f7858] to-[#d1b578] hover:from-[#d1b578] hover:to-[#5f7858] text-white text-sm font-medium px-6 py-3 rounded-lg w-full md:w-auto transition"
                    >
                      View Details
                    </motion.button> */}

                    <motion.a
                      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
                      whileTap={{ scale: 0.95 }}
                      href="#contact"
                      className="bg-gradient-to-r from-[#5f7858] to-[#d1b578] hover:from-[#d1b578] hover:to-[#5f7858] text-white text-sm font-medium px-6 py-3 rounded-lg w-full md:w-auto transition"
                    >
                      More
                    </motion.a>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Animated Modal */}
        <AnimatePresence>
          {selectedLayout && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
              onClick={closeModal}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-[#5f7858] p-8 rounded-xl w-11/12 sm:w-3/4 md:w-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={closeModal}
                  className="absolute top-3 right-4 text-[#d1b578] text-2xl font-semibold"
                >
                  &times;
                </motion.button>

                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-3xl font-semibold text-[#170505] mb-4"
                >
                  {selectedLayout.layout_name}
                </motion.h3>
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={selectedLayout.layout_image?.replace("//uploads", "/uploads")}
                  alt={selectedLayout.layout_name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-[#d1b578] mb-2"
                >
                  {selectedLayout.unit_layout_heading}
                </motion.p>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#312223] mb-2"
                >
                  <strong>Carpet Area:</strong> {selectedLayout.unit_layout_carpet_area || "N/A"}
                </motion.p>
                {/* <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#312223] mb-4"
                >
                  <strong>Price:</strong> ₹{selectedLayout.unit_layout_price || "N/A"}
                </motion.p> */}

                <motion.h4
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-semibold text-[#170505] mb-2"
                >
                  More Details:
                </motion.h4>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#312223]"
                >
                  More information about the unit layout.
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default UnitLayouts;