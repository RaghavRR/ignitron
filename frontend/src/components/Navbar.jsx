import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import EditableImage from "./EditableImage";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Solutions", path: "/solutions" },
  { name: "ATL Labs", path: "/atl-labs" },
  { name: "Projects", path: "/projects" },
  { name: "Kits", path: "/kits" },
  { name: "Gallery", path: "/gallery" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="
      sticky
      top-0
      z-50
      w-full
      bg-white/95
      backdrop-blur-xl
      border-b
      border-gray-100
    ">

      {/* ================= NAVBAR ================= */}
      <div className="
        w-full
        max-w-[1400px]
        mx-auto

        px-4
        sm:px-6
        lg:px-10
        xl:px-12

        h-[68px]
        sm:h-[72px]

        flex
        items-center
        justify-between
        gap-4
      ">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMenu}
          className="
            flex
            items-center
            shrink-0
            min-w-0
          "
        >
          <EditableImage
            keyName="logo"
            alt="IGNITRON Future Labs"
            className="
              h-9
              sm:h-10
              lg:h-11
              w-auto
              max-w-[175px]
              sm:max-w-[190px]
              lg:max-w-[210px]
              object-contain
            "
          />
        </Link>


        {/* ================= DESKTOP NAV ================= */}
        <nav className="
          hidden
          lg:flex
          items-center
          gap-5
          xl:gap-7
        ">

          {navLinks.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                relative
                py-2

                text-[13px]
                xl:text-sm

                font-semibold
                whitespace-nowrap

                transition-colors
                duration-200

                ${
                  isActive
                    ? "text-ignitron-orange"
                    : "text-ignitron-navy hover:text-ignitron-orange"
                }

                after:absolute
                after:left-0
                after:bottom-0
                after:h-[2px]
                after:rounded-full
                after:bg-ignitron-orange
                after:transition-all
                after:duration-200

                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }
              `}
            >
              {link.name}
            </NavLink>

          ))}

        </nav>


        {/* ================= DESKTOP CTA ================= */}
        <Link
          to="/contact"
          className="
            hidden
            lg:inline-flex

            items-center
            justify-center
            gap-2

            shrink-0

            btn-primary

            !py-2.5
            !px-4
            xl:!px-5

            text-xs
            xl:text-sm
          "
        >
          Book a Consultation
          <FiArrowRight className="text-sm" />
        </Link>


        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="
            lg:hidden

            w-10
            h-10

            shrink-0

            rounded-lg

            border
            border-gray-200

            bg-white

            flex
            items-center
            justify-center

            text-2xl
            text-ignitron-navy

            hover:border-ignitron-orange
            hover:text-ignitron-orange

            transition-all
          "
        >
          {open ? <HiX /> : <HiMenu />}
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}
      {open && (

        <div className="
          lg:hidden
          border-t
          border-gray-100
          bg-white
          shadow-lg
        ">

          <div className="
            w-full
            max-w-[1400px]
            mx-auto

            px-5
            sm:px-8

            py-5
          ">

            {/* Mobile links */}
            <nav className="
              flex
              flex-col
              gap-1
            ">

              {navLinks.map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) => `
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    rounded-lg

                    text-sm
                    font-semibold

                    transition-all

                    ${
                      isActive
                        ? "bg-orange-50 text-ignitron-orange"
                        : "text-ignitron-navy hover:bg-gray-50"
                    }
                  `}
                >

                  {link.name}

                  <FiArrowRight className="
                    text-sm
                    opacity-50
                  " />

                </NavLink>

              ))}

            </nav>


            {/* Mobile CTA */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="
                mt-4

                w-full

                inline-flex
                items-center
                justify-center
                gap-2

                btn-primary

                py-3
              "
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