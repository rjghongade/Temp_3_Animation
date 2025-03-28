import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  ChevronUp,
  AlertTriangle,
  Loader,
} from "lucide-react";
import config from "../../config";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/footer?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();
        setFooterData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getSocialIcon = (iconName) => {
    const iconMap = {
      "fab fa-facebook-f": <Facebook size={18} />,
      "fab fa-linkedin-in": <Linkedin size={18} />,
      "fab fa-instagram": <Instagram size={18} />,
      "fab fa-youtube": <Youtube size={18} />,
      "fab fa-twitter": <Twitter size={18} />,
    };
    return iconMap[iconName] || <AlertTriangle size={18} />;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-8 flex items-center justify-center min-h-[200px]">
        <Loader size={30} className="text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-8">
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400">
          <p>Failed to load footer data: {error}</p>
        </div>
      </div>
    );
  }

  const { social_icons, g_setting } = footerData;

  return (
    <motion.footer
      className="bg-[#170505] text-[#d1b578] border-t border-[#312223]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 py-10 max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h3 className="text-[#d1b578] text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Our Projects", "Why Choose Us"].map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <a href="#PropertiInfo" className="text-[#d1b578] hover:text-[#5f7858]">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h3 className="text-[#d1b578] text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            {g_setting.footer_phone && (
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="text-[#5f7858] mr-2" />
                <a href={`tel:${g_setting.footer_phone}`} className="text-[#d1b578] hover:text-[#5f7858]">
                  {g_setting.footer_phone}
                </a>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h3 className="text-[#d1b578] text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {social_icons.map((icon) => (
              <motion.a
                key={icon.id}
                href={icon.social_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5f7858] hover:bg-[#312223] transition-all"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {getSocialIcon(icon.social_icon)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Disclaimer Section */}
      <motion.div
        className="border-t border-[#312223] mt-6 py-6 bg-[#170505]/80 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-sm text-[#5f7858] mx-auto max-w-4xl">
          {g_setting.footer_disclamer}
        </p>
        {g_setting.footer_agent_rera && (
          <p className="mt-2 text-sm text-[#d1b578]">
            Agent Rera: {g_setting.footer_agent_rera}
          </p>
        )}
      </motion.div>

      {/* Copyright & Scroll Button */}
      <div className="border-t border-[#312223] bg-[#170505]/90 py-4">
        <div className="container mx-auto text-center">
          <p className="text-xs text-[#5f7858]">{g_setting.footer_copyright}</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-12 left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[#5f7858] hover:bg-[#312223] active:bg-[#d1b578] text-white shadow-lg transition-all"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronUp size={16} />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
