import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, AlertCircle, Loader } from "lucide-react";
import config from "../../config";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/faq?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }

        const data = await response.json();
        setFaqs(data.faqs);
        setHeading(data.page[0]?.heading || "Frequently Asked Questions");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleQuestionClick = (id) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8">
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400 flex items-center gap-3">
          <AlertCircle size={20} />
          <p>Failed to load FAQs: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-gradient-to-br from-[#170505] via-[#312223] to-black p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Contact Us Anchor with Continuous Floating Animation */}
      <motion.a
        href="#contact"
        className="absolute top-4 right-6 px-5 py-2 rounded-lg font-bold shadow-lg text-black bg-gradient-to-r from-[#d1b578] to-[#b99760] transition-all"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: [0, -5, 0], // Floating effect
        }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
        whileHover={{ 
          scale: 1.15, 
          backgroundColor: "#ffcc70", 
          textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" 
        }}
        whileTap={{ scale: 0.85, rotate: 5 }}
      >
        Outher Question
      </motion.a>

      {/* Header */}
      <motion.div 
        className="mb-10 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-[#d1b578]">{heading}</h2>
      </motion.div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            className="bg-[#312223]/60 border border-[#312223] rounded-lg"
            initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            <button
              onClick={() => handleQuestionClick(faq.id)}
              className="w-full flex items-center justify-between p-4 text-left transition-all hover:bg-[#312223] hover:border-[#d1b578]"
            >
              <span className="text-[#5f7858] font-medium text-lg">
                {faq.faq_title}
              </span>
              {activeQuestion === faq.id ? (
                <ChevronDown className="text-[#5f7858]" />
              ) : (
                <ChevronRight className="text-[#5f7858]" />
              )}
            </button>

            {activeQuestion === faq.id && (
              <motion.div
                className="p-4 border-t border-[#5f7858] text-[#d1b578]"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {stripHtml(faq.faq_content)}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
