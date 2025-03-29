import React, { useState } from "react";
import { MessageCircle, Phone, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import seodata from "../../seodata.json";
import { ContactDialog } from "./Contact";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const propertyName = seodata?.data?.property_name || "your property";

  const buttons = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} className="text-green-400" />,
      label: "WhatsApp",
      href: `https://wa.me/918181817136?text=I%20am%20interested%20in%20${encodeURIComponent(propertyName)}`,
      color: "bg-[#d1b578] hover:bg-[#caa76c]",
    },
    {
      id: "phone",
      icon: <Phone size={20} />,
      label: "Call",
      href: "tel:+918181817136",
      color: "bg-[#5f7858] hover:bg-[#506a4d]",
    },
    {
      id: "contact",
      icon: <User size={20} />,
      label: "Contact",
      color: "bg-[#170505] hover:bg-[#3d0d0d]",
      onClick: openDialog,
    },
  ];

  return (
    <div className="fixed bottom-12 right-8 z-50 flex flex-col-reverse items-end gap-4">
      {/* Floating Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col-reverse gap-3 animate-blink"
          >
            {buttons.map((button, index) => (
              <motion.div
                key={button.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.1, ease: "easeOut" }}
              >
                {button.href ? (
                  <a
                    href={button.href}
                    className={`animate-blink flex items-center justify-between w-40 px-4 py-3 rounded-full text-white shadow-xl transition-all duration-300 ${button.color}`}
                    target={button.id === "whatsapp" ? "_blank" : "_self"}
                    rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
                  >
                    <span className="text-sm font-semibold">{button.label}</span>
                    <span className="p-2 rounded-full bg-white bg-opacity-20">{button.icon}</span>
                  </a>
                ) : (
                  <button
                    onClick={button.onClick}
                    className={`animate-blink flex items-center justify-between w-40 px-4 py-3 rounded-full text-white shadow-xl transition-all duration-300 ${button.color}`}
                  >
                    <span className="text-sm font-semibold">{button.label}</span>
                    <span className="p-2 rounded-full bg-white bg-opacity-20">{button.icon}</span>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleExpand}
        className="animate-blink p-4 rounded-full bg-gradient-to-r to-amber-600 hover:from-amber-700 shadow-lg border transition-all duration-300 ease-in-out"
        aria-label="Toggle floating menu"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: isExpanded ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {isExpanded ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Contact Dialog without animation */}
      <ContactDialog isOpen={isOpen} onClose={closeDialog} noAnimation />
    </div>
  );
};

export default FloatingButtons;
