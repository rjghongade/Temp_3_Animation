import { useEffect, useState } from "react";
import {
  FiMenu,
  FiX,
  FiInfo,
  FiDollarSign,
  FiImage,
  FiBook,
  FiMapPin,
  FiPhone,
  FiGrid,
  FiHome,
  FiStar,
} from "react-icons/fi";
import config from "../../config";

const Header = () => {
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // fetch data + scroll listener
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/header?website=${config.SLUG_URL}`
        );
        if (!response.ok) throw new Error("Failed to fetch header");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSmoothScroll = (e, section) => {
    e && e.preventDefault();

    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
      const target = document.getElementById(section);
      if (!target) {
        console.error(`Target section "${section}" not found`);
        return;
      }

      // Get the header height for offset calculation
      const headerEl = document.querySelector("header nav");
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;

      // Calculate the exact position with proper offset
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      // Perform the smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash after scrolling
      if (history.pushState) {
        history.pushState(null, null, `#${section}`);
      } else {
        location.hash = `#${section}`;
      }

      // Close mobile menu if open
      setMenuOpen(false);
    }, 100);
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-16 bg-gray-900">
        <div className="loader"></div>
      </div>
    );
  }

  const navItems = [
    {
      href: "AmenitiesSection",
      label: "Amenities",
      icon: <FiStar className="mr-1" />,
    },
    { href: "Price", label: "Price", icon: <span className="mr-1">₹</span> },
    { href: "PropertiInfo", label: "About", icon: <FiHome className="mr-1" /> },
    { href: "Gallery", label: "Gallery", icon: <FiImage className="mr-1" /> },
    {
      href: "Location",
      label: "Location",
      icon: <FiMapPin className="mr-1" />,
    },
    { href: "Blogs", label: "Blogs", icon: <FiBook className="mr-1" /> },
    {
      href: "UnitLayouts",
      label: "Layouts",
      icon: <FiGrid className="mr-1" />,
    },
    { href: "contact", label: "Contact", icon: <FiPhone className="mr-1" /> },
  ];

  return (
    <header className="relative w-full bg-gradient-to-r from-[#5f7858] to-[#170505] text-white">
      {/* Hero Banner */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={data.hero_banner_img.desktop[0]}
            alt={data.property_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#312223]/30 to-[#170505]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-500 drop-shadow-xl animate-pulse">
            {data.hero_banner_heading}
          </h1>
          <h2 className="text-lg md:text-2xl text-amber-600 drop-shadow-lg uppercase tracking-wide">
            {data.hero_banner_subheading}
          </h2>
          <p className="mt-2 text-lg md:text-xl text-amber-200 animate-bounce">
            {data.sublocation}-{data.location}
          </p>
          <p className="mt-1 text-lg md:text-xl text-amber-100">
            {data.property_type_price_range_text} | {data.property_area_min_max}
          </p>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "contact")}
            className="mt-8 inline-block bg-gradient-to-r to-amber-600 hover:from-amber-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl transform hover:scale-105"
            style={{ animation: "wiggle 0.5s ease-in-out infinite" }}
          >
            Enquire Now
          </a>
          <style>{`
            @keyframes wiggle {
              0%,100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
          `}</style>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "h-16 bg-black/90 backdrop-blur-md"
            : "h-20 bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-full px-4">
          <a href="/" className="flex items-center">
            <img
              src={data.logo}
              alt={data.property_name}
              className={`transition-all duration-300 max-w-[120px] ${
                scrolled ? "h-12" : "h-16"
              }`}
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-sm font-medium animate-bounce">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.href}`}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center text-gray-200 hover:text-amber-400 transition-colors"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          {/* Enquire + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="hidden md:block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-700 hover:to-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full animate-blink transition-all duration-300"
            >
              Enquire
            </a>
            <button
              className="md:hidden text-white text-xl bg-black/30 p-2 rounded-full hover:bg-black/50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-64 bg-gray-900 shadow-2xl animate-slide-in">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="px-6 py-4">
              <img
                src={data.logo}
                alt={data.property_name}
                className="mb-8 w-32"
              />
              <ul className="space-y-6 animate-blink">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <a
                      href={`#${item.href}`}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="flex items-center text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-6 border-t border-gray-700">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "contact")}
                  className="block text-center bg-amber-500 text-white font-medium py-3 px-6 rounded-lg animate-blink"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blink {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 1s ease-in-out infinite;
          animation-delay: 5s;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
