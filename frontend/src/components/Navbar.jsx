import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import EditableImage from "./EditableImage";
import {
  FaBookOpen,
  FaRobot,
  FaFlask,
  FaChalkboardTeacher,
  FaHandshake,
  FaTrophy,
  FaLaptopCode,
  FaSchool,
  FaUsers,
} from "react-icons/fa";



const solutionLinks = [
  {
    name: "Curriculum Development",
    path: "/solutions/curriculum-development",
    icon: FaBookOpen,
  },
  {
    name: "STEM & Robotics Workshops",
    path: "/solutions/stem-robotics-workshops",
    icon: FaRobot,
  },
  {
    name: "STEM & Robotics Lab Setup",
    path: "/solutions/stem-robotics-lab-setup",
    icon: FaFlask,
  },
  {
    name: "ATL Lab Setup",
    path: "/solutions/atl-lab-setup",
    icon: FaSchool,
  },
  {
    name: "Teacher Training",
    path: "/solutions/teacher-training",
    icon: FaChalkboardTeacher,
  },
  {
    name: "Year-Long Collaboration",
    path: "/solutions/year-long-collaboration",
    icon: FaHandshake,
  },
  {
    name: "Competitions & Tech Events",
    path: "/solutions/competitions-tech-events",
    icon: FaTrophy,
  },
  {
    name: "School Digital Solutions",
    path: "/solutions/school-digital-solutions",
    icon: FaLaptopCode,
  },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "ATL Labs", path: "/atl-labs" },
  { name: "Projects", path: "/projects" },
  { name: "Kits", path: "/kits" },
  { name: "Gallery", path: "/gallery" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
const [open, setOpen] = useState(false);
const [solutionsOpen, setSolutionsOpen] = useState(false);
const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const location = useLocation();
const closeMenu = () => {
  setOpen(false);
  setSolutionsOpen(false);
  setMobileSolutionsOpen(false);
};

  const solutionsRef = useRef(null);


useEffect(() => {
  const handleOutsideClick = (event) => {
    if (
      solutionsRef.current &&
      !solutionsRef.current.contains(event.target)
    ) {
      setSolutionsOpen(false);
    }
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setSolutionsOpen(false);
    }
  };

  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleEscape);
  };
}, []);


  const isSolutionsActive = location.pathname.startsWith("/solutions");

  const navClass = ({ isActive }) => `
    relative py-2 text-[13px] xl:text-sm font-semibold whitespace-nowrap
    transition-colors duration-200
    ${
      isActive
        ? "text-ignitron-orange"
        : "text-ignitron-navy hover:text-ignitron-orange"
    }
    after:absolute after:left-0 after:bottom-0 after:h-[2px]
    after:rounded-full after:bg-ignitron-orange
    after:transition-all after:duration-200
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
  `;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl">
      {/* NAVBAR */}
      <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-10 xl:px-12">
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 shrink-0 items-center"
        >
          <EditableImage
            keyName="logo"
            alt="IGNITRON Future Labs"
            className="h-9 w-auto max-w-[175px] object-contain sm:h-10 sm:max-w-[190px] lg:h-11 lg:max-w-[210px]"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="relative hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.slice(0, 2).map((link) => (
            <NavLink key={link.path} to={link.path} className={navClass}>
              {link.name}
            </NavLink>
          ))}

{/* SOLUTIONS DROPDOWN */}
<div
  ref={solutionsRef}
  className="relative"
  onMouseEnter={() => setSolutionsOpen(true)}
>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={solutionsOpen}
              className={`
                flex items-center gap-1.5 py-2 text-[13px] font-semibold
                transition-colors xl:text-sm
                ${
                  isSolutionsActive
                    ? "text-ignitron-orange"
                    : "text-ignitron-navy hover:text-ignitron-orange"
                }
              `}
            >
              Solutions
              <FiChevronDown
  className={`transition-transform duration-200 ${
    solutionsOpen ? "rotate-180" : "rotate-0"
  }`}
/>
            </button>



<div

className={`
  fixed left-1/2 top-[72px] z-[60]
  w-[calc(100vw-32px)] max-w-[1400px]
  -translate-x-1/2
  transition-all duration-200
  ${
    solutionsOpen
      ? "visible translate-y-0 opacity-100"
      : "invisible translate-y-2 opacity-0 pointer-events-none"
  }
`}

>
  <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl sm:p-4">
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


{solutionLinks.map((item) => {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.path}
      to={item.path}
      onClick={closeMenu}
      className={({ isActive }) => `
  flex min-h-[85px] items-center gap-3
  rounded-xl bg-[#dedede] p-3
  transition-all duration-200
  hover:bg-[#d2d2d2] hover:shadow-md
        ${
          isActive
            ? "ring-2 ring-ignitron-orange"
            : ""
        }
      `}
    >
      <Icon className="h-8 w-8 shrink-0 text-orange-500" />

      <span className="text-sm font-semibold leading-5 text-gray-900">
        {item.name}
      </span>
    </NavLink>
  );
})}

</div>
  </div>
</div>


          </div>

          {navLinks.slice(2).map((link) => (
            <NavLink key={link.path} to={link.path} className={navClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <Link
          to="/contact"
          className="btn-primary hidden shrink-0 items-center justify-center gap-2 !px-4 !py-2.5 text-xs lg:inline-flex xl:!px-5 xl:text-sm"
        >
          Book a Consultation
          <FiArrowRight className="text-sm" />
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-2xl text-ignitron-navy transition-all hover:border-ignitron-orange hover:text-ignitron-orange lg:hidden"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-5 sm:px-8">
            <nav className="flex flex-col gap-1">
              {navLinks.slice(0, 2).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) => `
                    flex items-center justify-between rounded-lg px-4 py-3
                    text-sm font-semibold transition-all
                    ${
                      isActive
                        ? "bg-orange-50 text-ignitron-orange"
                        : "text-ignitron-navy hover:bg-gray-50"
                    }
                  `}
                >
                  {link.name}
                  <FiArrowRight className="text-sm opacity-50" />
                </NavLink>
              ))}

              {/* MOBILE SOLUTIONS DROPDOWN */}
              <div className="rounded-lg">
                <button
                  type="button"
                  onClick={() => setMobileSolutionsOpen((prev) => !prev)}
                  aria-expanded={mobileSolutionsOpen}
                  className={`
                    flex w-full items-center justify-between rounded-lg
                    px-4 py-3 text-sm font-semibold transition-all
                    ${
                      isSolutionsActive
                        ? "bg-orange-50 text-ignitron-orange"
                        : "text-ignitron-navy hover:bg-gray-50"
                    }
                  `}
                >
                  Solutions
<FiChevronDown
  className={`transition-transform duration-200 ${
    mobileSolutionsOpen ? "rotate-180" : "rotate-0"
  }`}
/>
                </button>

                {mobileSolutionsOpen && (
                    <div className="ml-3 mt-1 border-l-2 border-orange-100 pl-3">
                    {solutionLinks.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/solutions"}
                        onClick={closeMenu}
                        className={({ isActive }) => `
                          flex items-center justify-between gap-2
                          rounded-md px-3 py-3 text-sm transition-colors
                          ${
                            isActive
                              ? "bg-orange-50 font-semibold text-ignitron-orange"
                              : "text-gray-600 hover:bg-gray-50 hover:text-ignitron-orange"
                          }
                        `}
                      >
                        <span>{item.name}</span>
                        <FiArrowRight className="shrink-0 text-xs opacity-50" />
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(2).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) => `
                    flex items-center justify-between rounded-lg px-4 py-3
                    text-sm font-semibold transition-all
                    ${
                      isActive
                        ? "bg-orange-50 text-ignitron-orange"
                        : "text-ignitron-navy hover:bg-gray-50"
                    }
                  `}
                >
                  {link.name}
                  <FiArrowRight className="text-sm opacity-50" />
                </NavLink>
              ))}
            </nav>

            {/* MOBILE CTA */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="btn-primary mt-4 inline-flex w-full items-center justify-center gap-2 py-3"
            >
              Book a Consultation
              <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;