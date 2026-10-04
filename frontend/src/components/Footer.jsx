import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF
} from "react-icons/fa";
import EditableImage from "./EditableImage";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "917393985330";

const Footer = () => {
  const quickLinks = [
    ["Home", "/"],
    ["About", "/about"],
    ["Solutions", "/solutions"],
    ["ATL Labs", "/atl-labs"],
    ["Projects", "/projects"],
    ["Kits", "/kits"],
    ["Gallery", "/gallery"],
  ];

  const solutionLinks = [
    ["STEM & Robotics", "/solutions"],
    ["ATL Lab Setup", "/atl-labs"],
    ["Teacher Training", "/solutions"],
    ["DIY Kits", "/kits"],
  ];

  return (
    <footer className="pt-5 sm:pt-8">

      {/* ================= MAIN FOOTER ================= */}
      <div className="
        relative
        w-full
        max-w-[1450px]
        mx-auto
        bg-ignitron-navy
        text-gray-300

        rounded-t-[32px]
        sm:rounded-t-[40px]
        lg:rounded-t-[52px]

        overflow-hidden
      ">

        {/* Orange glow */}
        <div className="
          absolute
          -top-32
          -right-32
          w-[350px]
          h-[350px]
          rounded-full
          bg-orange-500/5
          blur-3xl
          pointer-events-none
        " />

        {/* ================= CONTENT ================= */}
        <div className="
          relative
          z-10
          max-w-[1200px]
          mx-auto

          px-6
          sm:px-8
          lg:px-10

          pt-10
          sm:pt-12
          lg:pt-14

          pb-8
        ">

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.15fr]

            gap-9
            sm:gap-10
            lg:gap-14
          ">

            {/* ================= BRAND ================= */}
            <div className="max-w-[310px]">

              <EditableImage
                keyName="logo"
                alt="IGNITRON Future Labs"
                className="h-9 sm:h-10 w-auto max-w-[180px] object-contain mb-5"
              />
              <p className="
                text-sm
                leading-6
                text-gray-400
                max-w-[290px]
              ">
                Building future-ready schools through STEM,
                Robotics, AI, IoT and Innovation.
              </p>

              <p className="
                mt-5
                text-sm
                font-semibold
                text-ignitron-orange
              ">
                Learn • Build • Innovate • Lead
              </p>

              <p className="
                mt-3
                text-xs
                leading-5
                text-gray-500
                max-w-[300px]
              ">
                Aligned with <span className="text-ignitron-orange">NEP 2020</span> | Empowering Experiential & Skill-Based Learning
              </p>

            </div>


            {/* ================= QUICK LINKS ================= */}
            <div>

              <h4 className="
                text-base
                sm:text-lg
                font-bold
                text-white
                mb-5
              ">
                Company
              </h4>

              <ul className="space-y-3">

                {quickLinks.map(([label, path]) => (
                  <li key={label}>

                    <Link
                      to={path}
                      className="
                        text-sm
                        text-gray-400
                        hover:text-ignitron-orange
                        transition-colors
                      "
                    >
                      {label}
                    </Link>

                  </li>
                ))}

              </ul>

            </div>


            {/* ================= SOLUTIONS ================= */}
            <div>

              <h4 className="
                text-base
                sm:text-lg
                font-bold
                text-white
                mb-5
              ">
                Solutions
              </h4>

              <ul className="space-y-3">

                {solutionLinks.map(([label, path]) => (
                  <li key={label}>

                    <Link
                      to={path}
                      className="
                        text-sm
                        text-gray-400
                        hover:text-ignitron-orange
                        transition-colors
                      "
                    >
                      {label}
                    </Link>

                  </li>
                ))}

              </ul>

            </div>


            {/* ================= CONTACT ================= */}
            <div>

              <h4 className="
                text-base
                sm:text-lg
                font-bold
                text-white
                mb-5
              ">
                Contact
              </h4>


              {/* Phone */}
              <a
                href={`tel:+917393985330`}
                className="
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-gray-400
                  hover:text-ignitron-orange
                  transition-colors
                  mb-4
                "
              >

                <FaPhoneAlt
                  className="
                    mt-1
                    text-gray-500
                    shrink-0
                  "
                />

                <span>
                  +91 7393985330
                </span>

              </a>


              {/* Email */}
              <a
                href="mailto:info.ignitron@gmail.com"
                className="
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-gray-400
                  hover:text-ignitron-orange
                  transition-colors
                  mb-4
                "
              >

                <FaEnvelope
                  className="
                    mt-1
                    text-gray-500
                    shrink-0
                  "
                />

                <span className="break-all">
                  info.ignitron@gmail.com
                </span>

              </a>


              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-ignitron-orange
                  hover:text-orange-400
                  transition-colors
                  mb-5
                "
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>


              {/* Address */}
              <div className="
                flex
                items-start
                gap-3
                text-sm
                leading-5
                text-gray-400
              ">

                <FaMapMarkerAlt
                  className="
                    mt-1
                    text-gray-500
                    shrink-0
                  "
                />

                <span>
                  IGNITRON Future Labs,
                  <br />
                  Ghaziabad, Delhi NCR, Uttar Pradesh
                </span>

              </div>

            </div>

          </div>


          {/* ================= DIVIDER ================= */}
          <div className="
            mt-9
            sm:mt-10
            border-t
            border-white/10
          " />


          {/* ================= BOTTOM ================= */}
          <div className="
            flex
            flex-col-reverse
            sm:flex-row
            sm:items-center
            sm:justify-between

            gap-5

            pt-6
          ">

            {/* Copyright */}
            <p className="
              text-xs
              sm:text-sm
              text-gray-500
              text-center
              sm:text-left
            ">
              © {new Date().getFullYear()} IGNITRON Future Labs.
              All rights reserved.
            </p>


            {/* Social + Policies */}
            <div className="
              flex
              flex-col
              sm:flex-row
              items-center
              gap-5
            ">

              {/* Social icons */}
              <div className="flex items-center gap-2">

                <a
                  href="https://www.linkedin.com/company/ignitronfuturelabs/"
                  aria-label="LinkedIn"
                  className="
                    w-9
                    h-9
                    rounded-full
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-white
                    hover:bg-ignitron-orange
                    hover:border-ignitron-orange
                    transition-all
                  "
                >
                  <FaLinkedinIn size={14} />
                </a>

                <a
                  href="https://www.instagram.com/ignitronfuturelabs?stkn=MWoxdDZlYmM0ZjZ5Yg=="
                  aria-label="Instagram"
                  className="
                    w-9
                    h-9
                    rounded-full
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-white
                    hover:bg-ignitron-orange
                    hover:border-ignitron-orange
                    transition-all
                  "
                >
                  <FaInstagram size={14} />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61592422078669"
                  aria-label="Facebook"
                  className="
                    w-9
                    h-9
                    rounded-full
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-white
                    hover:bg-ignitron-orange
                    hover:border-ignitron-orange
                    transition-all
                  "
                >
                  <FaFacebookF size={14} />
                </a>

              </div>


              {/* Policies */}
              <div className="
                flex
                items-center
                gap-4
                text-xs
                text-gray-500
              ">

                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>

                <span className="text-white/10">
                  |
                </span>

                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;