import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBookOpen, BiCog, BiBulb, BiRocket } from 'react-icons/bi';
import { FaRobot, FaBrain, FaWifi, FaSeedling, FaLightbulb, FaBuilding } from 'react-icons/fa';
import {
  FiCpu,
  FiCode,
  FiTool,
  FiAward,
  FiBookOpen,
  FiArrowRight
} from "react-icons/fi";
import api from '../api/axios';
import EditableImage from '../components/EditableImage';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import StatCounter from '../components/StatCounter';
import Loader from '../components/Loader';
import roboticsImg from '../images/missions/robotics.jpeg';
import aiImg from '../images/missions/ai.jpeg';
import iotImg from '../images/missions/iot.jpeg';
import realWorldImg from '../images/missions/real-world.jpeg';
import innovationImg from '../images/missions/innovation.jpeg';
import labImg from '../images/missions/lab.jpeg';

const solutions = [
  {
    icon: <FiCpu />,
    title: 'STEM & Robotics',
    desc: 'Hands-on STEM and robotics programs designed for real-world learning.'
  },
  {
    icon: <FiCpu />,
    title: 'Electronics & IoT',
    desc: 'Build practical electronics and IoT projects using modern hardware.'
  },
  {
    icon: <FiCode />,
    title: 'AI & Coding',
    desc: 'Learn coding, Python, AI and emerging technologies through projects.'
  },
  {
    icon: <FiTool />,
    title: 'Maker & Prototyping',
    desc: 'Turn ideas into working prototypes through hands-on experimentation.'
  },
  {
    icon: <FiAward />,
    title: 'Competition & Innovation',
    desc: 'Prepare students for competitions, showcases and innovation challenges.'
  },
  {
    icon: <FiBookOpen />,
    title: 'Curriculum & Programs',
    desc: 'Project-based learning programs designed for future-ready students.'
  }
];

const missions = [
  {
    title: 'Build a Robot',
    icon: <FaRobot />,
    image: roboticsImg,
  },
  {
    title: 'Explore AI',
    icon: <FaBrain />,
    image: aiImg,
  },
  {
    title: 'Build an IoT Solution',
    icon: <FaWifi />,
    image: iotImg,
  },
  {
    title: 'Solve a Real-World Problem',
    icon: <FaSeedling />,
    image: realWorldImg,
  },
  {
    title: 'Create an Innovation Project',
    icon: <FaLightbulb />,
    image: innovationImg,
  },
  {
    title: 'Build a Future-Ready Lab',
    icon: <FaBuilding />,
    image: labImg,
  },
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [impact, setImpact] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/projects', { params: { featured: 'true' } }),
      api.get('/impact'),
    ])
      .then(([p, i]) => {
        setProjects(p.data.slice(0, 5));
        setImpact(i.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
{/* HERO */}
<section className="relative bg-white overflow-hidden">

  {/* Soft background glow */}
  <div className="
    absolute
    -top-40
    -right-40
    w-[500px]
    h-[500px]
    rounded-full
    bg-orange-50
    blur-3xl
    pointer-events-none
  " />

  <div className="
    absolute
    -bottom-40
    -left-40
    w-[400px]
    h-[400px]
    rounded-full
    bg-orange-50/60
    blur-3xl
    pointer-events-none
  " />


  {/* Top-right circuit decoration */}
  <div className="
    absolute
    top-8
    right-0
    w-52
    h-32
    opacity-50
    pointer-events-none
  ">
    <div className="absolute right-0 top-8 w-36 h-px bg-orange-300" />
    <div className="absolute right-14 top-20 w-28 h-px bg-orange-200" />

    <span className="
      absolute right-14 top-[16px]
      w-2 h-2 rounded-full
      bg-orange-300
    " />

    <span className="
      absolute right-36 top-[28px]
      w-2 h-2 rounded-full
      bg-orange-300
    " />
  </div>


  <div className="
    relative
    z-10
    container-max
    px-5 sm:px-8 lg:px-12
    py-14 sm:py-16 lg:py-20
    grid
    grid-cols-1
    lg:grid-cols-[0.95fr_1.05fr]
    gap-10
    xl:gap-16
    items-center
  ">


    {/* ==================================================
        LEFT CONTENT
    ================================================== */}
    <div className="
      max-w-[580px]
      lg:pt-2
    ">

      {/* Eyebrow */}
      <div className="
        flex
        items-center
        gap-3
        mb-5
      ">

        <span className="
          w-9
          sm:w-12
          h-[2px]
          bg-ignitron-orange
        " />

        <p className="
          text-[11px]
          sm:text-xs
          md:text-sm
          font-bold
          tracking-[2px]
          text-ignitron-orange
        ">
          STEM / ROBOTICS / AI / IOT
        </p>

      </div>


      {/* Main Heading */}
      <h1 className="
        text-[34px]
        sm:text-[40px]
        md:text-[46px]
        lg:text-[48px]
        xl:text-[52px]
        leading-[1.08]
        font-extrabold
        tracking-[-1px]
        text-ignitron-navy
      ">

        We Don't Just Teach{" "}

        <span className="text-ignitron-orange">
          Technology.
        </span>

        <br />

        We Build the People Who{" "}

        <span className="relative inline-block text-ignitron-orange">

          Create It.

          {/* Small underline */}
          <span className="
            absolute
            left-0
            -bottom-2
            w-16
            sm:w-20
            h-[3px]
            rounded-full
            bg-ignitron-orange
          " />

        </span>

      </h1>


      {/* Description */}
      <p className="
        mt-7
        max-w-[500px]
        text-sm
        sm:text-base
        md:text-lg
        leading-7
        text-gray-600
      ">
        Building future-ready schools through{" "}
        <span className="font-semibold text-gray-800">
          STEM, Robotics, AI, IoT
        </span>{" "}
        and Innovation.
      </p>


      {/* CTA */}
      <div className="
        flex
        flex-col
        sm:flex-row
        gap-3
        mt-7
      ">

        <Link
          to="/solutions"
          className="
            btn-primary
            justify-center
            px-6
            py-3
            shadow-lg
            shadow-orange-500/10
          "
        >
          Explore Solutions
          <FiArrowRight />
        </Link>

        <Link
          to="/contact"
          className="
            btn-secondary
            justify-center
            px-6
            py-3
          "
        >
          Build Your Innovation Ecosystem
        </Link>

      </div>


      {/* Small credibility line */}
      <div className="
        mt-7
        flex
        flex-wrap
        gap-x-5
        gap-y-2
        text-xs
        sm:text-sm
        text-gray-500
      ">

        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ignitron-orange" />
          Hands-on Learning
        </span>

        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ignitron-orange" />
          Real Projects
        </span>

        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ignitron-orange" />
          Future Skills
        </span>

      </div>

    </div>


    {/* ==================================================
        RIGHT IMAGE
    ================================================== */}
    <div className="
      relative
      w-full
      max-w-[590px]
      mx-auto
      lg:ml-auto
    ">

      {/* Image glow */}
      <div className="
        absolute
        inset-5
        rounded-[28px]
        bg-orange-300/20
        blur-2xl
      " />


      {/* Image wrapper */}
      <div className="
        relative
        p-2
        rounded-[24px]
        bg-[#0b1013]
        shadow-[0_25px_60px_rgba(0,0,0,0.16)]
      ">

        <EditableImage
          keyName="hero_banner"
          alt="Students building a robotics project at IGNITRON"
          className="
            w-full
            h-[280px]
            sm:h-[340px]
            md:h-[390px]
            lg:h-[410px]
            xl:h-[430px]
            object-cover
            rounded-[18px]
          "
        />


        {/* Image corner accents */}

        <div className="
          absolute
          top-5
          left-5
          w-12
          h-12
          border-l-2
          border-t-2
          border-ignitron-orange
          rounded-tl-lg
        " />

        <div className="
          absolute
          bottom-5
          right-5
          w-12
          h-12
          border-r-2
          border-b-2
          border-ignitron-orange
          rounded-br-lg
        " />

      </div>


      {/* ==================================================
          TECH TAGS
      ================================================== */}
      <div className="
        absolute
        -top-4
        right-5
        flex
        items-center
        gap-2
      ">

        <span className="
          px-3
          py-1.5
          rounded-full
          bg-white
          border
          border-gray-200
          shadow-md
          text-[11px]
          font-semibold
          text-gray-700
        ">
          AI
        </span>

        <span className="
          px-3
          py-1.5
          rounded-full
          bg-ignitron-orange
          text-white
          shadow-md
          text-[11px]
          font-semibold
        ">
          ROBOTICS
        </span>

      </div>


      {/* ==================================================
          IGNITRON JOURNEY CARD
      ================================================== */}
      <div className="
        absolute
        -bottom-7
        left-4
        sm:left-6
        md:left-8

        w-[270px]
        sm:w-[300px]

        rounded-2xl
        bg-white
        border
        border-gray-200

        px-4
        py-3.5

        shadow-[0_15px_40px_rgba(0,0,0,0.13)]
      ">

        {/* Heading */}
        <div className="
          flex
          items-center
          justify-between
          mb-3
        ">

          <div>
            <p className="
              text-[9px]
              font-bold
              tracking-[1.8px]
              text-ignitron-orange
            ">
              THE IGNITRON JOURNEY
            </p>

            <p className="
              text-xs
              text-gray-500
              mt-0.5
            ">
              From curiosity to impact
            </p>
          </div>

          <div className="
            w-7
            h-7
            rounded-full
            bg-orange-50
            flex
            items-center
            justify-center
            text-ignitron-orange
            text-xs
            font-bold
          ">
            →
          </div>

        </div>


        {/* Journey steps */}
        <div className="
          flex
          items-center
          justify-between
        ">

          {/* Learn */}
          <div className="flex items-center gap-2">

            <div className="
              w-7
              h-7
              rounded-full
              bg-[#0b1013]
              text-white
              flex
              items-center
              justify-center
              text-[10px]
              font-bold
            ">
              01
            </div>

            <span className="
              text-[11px]
              font-bold
              text-gray-800
            ">
              Learn
            </span>

          </div>


          {/* Line */}
          <div className="
            flex-1
            h-px
            bg-gray-200
            mx-2
          " />


          {/* Build */}
          <div className="flex items-center gap-2">

            <div className="
              w-7
              h-7
              rounded-full
              bg-orange-50
              border
              border-orange-200
              text-ignitron-orange
              flex
              items-center
              justify-center
              text-[10px]
              font-bold
            ">
              02
            </div>

            <span className="
              text-[11px]
              font-bold
              text-gray-800
            ">
              Build
            </span>

          </div>


          {/* Line */}
          <div className="
            flex-1
            h-px
            bg-gray-200
            mx-2
          " />


          {/* Impact */}
          <div className="flex items-center gap-2">

            <div className="
              w-7
              h-7
              rounded-full
              bg-ignitron-orange
              text-white
              flex
              items-center
              justify-center
              text-[10px]
              font-bold
            ">
              03
            </div>

            <span className="
              text-[11px]
              font-bold
              text-gray-800
            ">
              Impact
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

{/* ECOSYSTEM */}
<section className="relative bg-white py-12 sm:py-14 lg:py-16 overflow-hidden">

  {/* Decorative bottom circuits */}
  <div className="absolute bottom-0 left-0 w-32 sm:w-44 h-20 sm:h-28
    border-l-2 border-b-2 border-gray-200
    -rotate-[20deg] opacity-60 pointer-events-none" />

  <div className="absolute bottom-0 right-0 w-32 sm:w-44 h-20 sm:h-28
    border-r-2 border-b-2 border-gray-200
    rotate-[20deg] opacity-60 pointer-events-none" />

  <div className="relative z-10 w-full max-w-[1120px] mx-auto px-4 sm:px-6">

    {/* ================= HEADER ================= */}
    <div className="relative flex items-center justify-center gap-3 sm:gap-5 mb-14 sm:mb-16">

      {/* Left line */}
      <div className="w-10 sm:w-16 md:w-24 lg:w-32 h-[2px] bg-ignitron-orange shrink-0" />

      <h2 className="
        text-[22px]
        sm:text-[26px]
        md:text-[30px]
        lg:text-[34px]
        font-normal
        tracking-[1px]
        sm:tracking-[2px]
        text-gray-800
        whitespace-nowrap
      ">
        OUR{" "}
        <span className="font-bold text-ignitron-orange">
          ECOSYSTEM
        </span>
      </h2>

      {/* Right line */}
      <div className="w-10 sm:w-16 md:w-24 lg:w-32 h-[2px] bg-ignitron-orange shrink-0" />

      {/* Subtitle */}
      <p className="
        absolute
        top-9 sm:top-11
        left-1/2
        -translate-x-1/2
        w-full
        text-center
        text-[11px]
        sm:text-xs
        md:text-sm
        text-gray-500
        px-2
      ">
        A complete journey from curiosity to real-world impact.
      </p>

    </div>


    {/* ================= CARDS ================= */}
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-4
      sm:gap-5
      lg:gap-6
      justify-items-center
    ">

      {/* ================= LEARN ================= */}
      <div className="
        group relative
        w-full
        max-w-[255px]
        min-h-[285px]
        sm:min-h-[290px]
        lg:min-h-[285px]
        rounded-xl
        overflow-hidden
        bg-[#0b1013]
        border border-gray-800
        shadow-lg
        hover:-translate-y-1.5
        hover:shadow-xl
        transition-all duration-300
      ">

        {/* Orange corner */}
        <div className="absolute top-0 left-0 w-16 h-14 overflow-hidden">
          <div className="absolute w-20 h-[5px] bg-ignitron-orange
            -rotate-45 -left-3 top-4" />
          <div className="absolute w-16 h-[5px] bg-ignitron-orange
            -rotate-45 left-0 top-8" />
        </div>

        {/* Icon */}
        <div className="flex justify-center pt-8">
          <div className="
            relative
            w-[82px] h-[82px]
            rounded-full
            border-2 border-ignitron-orange
            flex items-center justify-center
            text-white text-[42px]
          ">
            <BiBookOpen />

            <span className="absolute -top-1 left-1/2
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute top-5 -right-1
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute bottom-5 -left-1
              w-2 h-2 rounded-full bg-ignitron-orange" />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 text-center">

          <h3 className="
            mt-5
            text-[27px]
            sm:text-[28px]
            font-extrabold
            tracking-wide
            text-white
          ">
            <span className="text-ignitron-orange">L</span>EARN
          </h3>

          <p className="
            mt-3
            text-[13px]
            sm:text-[13.5px]
            leading-[1.55]
            text-gray-300
          ">
            Gain hands-on knowledge through interactive workshops,
            expert sessions and future-ready curriculum.
          </p>

          <div className="
            w-14 h-[3px]
            bg-ignitron-orange
            mx-auto mt-5
            rounded-full
          " />

        </div>
      </div>


      {/* ================= BUILD ================= */}
      <div className="
        group relative
        w-full
        max-w-[255px]
        min-h-[285px]
        sm:min-h-[290px]
        lg:min-h-[285px]
        rounded-xl
        overflow-hidden
        bg-[#0b1013]
        border border-gray-800
        shadow-lg
        hover:-translate-y-1.5
        hover:shadow-xl
        transition-all duration-300
      ">

        <div className="absolute top-0 left-0 w-16 h-14 overflow-hidden">
          <div className="absolute w-20 h-[5px] bg-ignitron-orange
            -rotate-45 -left-3 top-4" />
          <div className="absolute w-16 h-[5px] bg-ignitron-orange
            -rotate-45 left-0 top-8" />
        </div>

        <div className="flex justify-center pt-8">
          <div className="
            relative w-[82px] h-[82px]
            rounded-full border-2 border-ignitron-orange
            flex items-center justify-center
            text-white text-[42px]
          ">
            <BiCog />

            <span className="absolute -top-1 left-1/2
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute top-5 -right-1
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute bottom-5 -left-1
              w-2 h-2 rounded-full bg-ignitron-orange" />
          </div>
        </div>

        <div className="px-5 text-center">

          <h3 className="
            mt-5 text-[27px] sm:text-[28px]
            font-extrabold tracking-wide text-white
          ">
            <span className="text-ignitron-orange">B</span>UILD
          </h3>

          <p className="
            mt-3 text-[13px] sm:text-[13.5px]
            leading-[1.55] text-gray-300
          ">
            Turn ideas into real solutions with hands-on projects,
            labs, DIY kits and expert guidance.
          </p>

          <div className="
            w-14 h-[3px]
            bg-ignitron-orange
            mx-auto mt-5 rounded-full
          " />

        </div>
      </div>


      {/* ================= INNOVATE ================= */}
      <div className="
        group relative
        w-full
        max-w-[255px]
        min-h-[285px]
        sm:min-h-[290px]
        lg:min-h-[285px]
        rounded-xl
        overflow-hidden
        bg-[#0b1013]
        border border-gray-800
        shadow-lg
        hover:-translate-y-1.5
        hover:shadow-xl
        transition-all duration-300
      ">

        <div className="absolute top-0 left-0 w-16 h-14 overflow-hidden">
          <div className="absolute w-20 h-[5px] bg-ignitron-orange
            -rotate-45 -left-3 top-4" />
          <div className="absolute w-16 h-[5px] bg-ignitron-orange
            -rotate-45 left-0 top-8" />
        </div>

        <div className="flex justify-center pt-8">
          <div className="
            relative w-[82px] h-[82px]
            rounded-full border-2 border-ignitron-orange
            flex items-center justify-center
            text-white text-[42px]
          ">
            <BiBulb />

            <span className="absolute -top-1 left-1/2
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute top-5 -right-1
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute bottom-5 -left-1
              w-2 h-2 rounded-full bg-ignitron-orange" />
          </div>
        </div>

        <div className="px-5 text-center">

          <h3 className="
            mt-5 text-[27px] sm:text-[28px]
            font-extrabold tracking-wide text-white
          ">
            <span className="text-ignitron-orange">I</span>NNOVATE
          </h3>

          <p className="
            mt-3 text-[13px] sm:text-[13.5px]
            leading-[1.55] text-gray-300
          ">
            Explore emerging technologies, solve real-world
            challenges and create solutions for a better tomorrow.
          </p>

          <div className="
            w-14 h-[3px]
            bg-ignitron-orange
            mx-auto mt-5 rounded-full
          " />

        </div>
      </div>


      {/* ================= LEAD ================= */}
      <div className="
        group relative
        w-full
        max-w-[255px]
        min-h-[285px]
        sm:min-h-[290px]
        lg:min-h-[285px]
        rounded-xl
        overflow-hidden
        bg-[#0b1013]
        border border-gray-800
        shadow-lg
        hover:-translate-y-1.5
        hover:shadow-xl
        transition-all duration-300
      ">

        <div className="absolute top-0 left-0 w-16 h-14 overflow-hidden">
          <div className="absolute w-20 h-[5px] bg-ignitron-orange
            -rotate-45 -left-3 top-4" />
          <div className="absolute w-16 h-[5px] bg-ignitron-orange
            -rotate-45 left-0 top-8" />
        </div>

        <div className="flex justify-center pt-8">
          <div className="
            relative w-[82px] h-[82px]
            rounded-full border-2 border-ignitron-orange
            flex items-center justify-center
            text-white text-[42px]
          ">
            <BiRocket />

            <span className="absolute -top-1 left-1/2
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute top-5 -right-1
              w-2 h-2 rounded-full bg-ignitron-orange" />

            <span className="absolute bottom-5 -left-1
              w-2 h-2 rounded-full bg-ignitron-orange" />
          </div>
        </div>

        <div className="px-5 text-center">

          <h3 className="
            mt-5 text-[27px] sm:text-[28px]
            font-extrabold tracking-wide text-white
          ">
            <span className="text-ignitron-orange">L</span>EAD
          </h3>

          <p className="
            mt-3 text-[13px] sm:text-[13.5px]
            leading-[1.55] text-gray-300
          ">
            Build confidence, develop future skills and get ready
            to compete, showcase and make an impact.
          </p>

          <div className="
            w-14 h-[3px]
            bg-ignitron-orange
            mx-auto mt-5 rounded-full
          " />

        </div>
      </div>

    </div>
  </div>
</section>

{/* SOLUTIONS */}
<section className="relative bg-[#f8f9fa] py-16 sm:py-20 lg:py-24 overflow-hidden">

  {/* Background decoration */}
  <div className="
    absolute
    -top-32
    -right-32
    w-[400px]
    h-[400px]
    rounded-full
    bg-orange-100/40
    blur-3xl
    pointer-events-none
  " />

  <div className="
    absolute
    bottom-0
    left-0
    w-40
    h-40
    border-l
    border-b
    border-orange-200
    opacity-40
    pointer-events-none
  " />

  <div className="
    relative
    z-10
    container-max
    px-5 sm:px-8 lg:px-12
  ">

    {/* ==========================================
        TOP INTRO
    ========================================== */}
    <div className="
      grid
      grid-cols-1
      lg:grid-cols-[0.75fr_1.25fr]
      gap-10
      lg:gap-16
      items-end
      mb-12
      lg:mb-14
    ">

      {/* LEFT */}
      <div>

        <div className="flex items-center gap-3 mb-4">

          <span className="
            w-10
            h-[2px]
            bg-ignitron-orange
          " />

          <span className="
            text-xs
            sm:text-sm
            font-bold
            tracking-[2px]
            text-ignitron-orange
          ">
            WHAT WE DO
          </span>

        </div>

        <h2 className="
          text-3xl
          sm:text-4xl
          lg:text-[42px]
          leading-[1.1]
          font-extrabold
          tracking-tight
          text-ignitron-navy
        ">
          Building the{" "}
          <span className="text-ignitron-orange">
            Future
          </span>{" "}
          of Learning.
        </h2>

      </div>


      {/* RIGHT */}
      <div className="max-w-2xl">

        <p className="
          text-gray-600
          text-sm
          sm:text-base
          lg:text-lg
          leading-7
        ">
          We empower schools with hands-on technology programs,
          modern innovation labs and expert support — helping
          students move from{" "}
          <span className="font-semibold text-gray-800">
            curiosity to creation.
          </span>
        </p>

      </div>

    </div>


    {/* ==========================================
        SOLUTION GRID
    ========================================== */}
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4
      lg:gap-5
    ">

      {solutions.map((s, index) => (

        <div
          key={s.title}
          className="
            group
            relative
            min-h-[220px]
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-6
            sm:p-7
            overflow-hidden

            shadow-[0_6px_20px_rgba(0,0,0,0.04)]

            hover:-translate-y-1.5
            hover:border-orange-200
            hover:shadow-[0_18px_35px_rgba(0,0,0,0.08)]

            transition-all
            duration-300
          "
        >

          {/* Orange top line */}
          <div className="
            absolute
            top-0
            left-0
            w-0
            h-1
            bg-ignitron-orange
            group-hover:w-full
            transition-all
            duration-500
          " />


          {/* Number */}
          <span className="
            absolute
            top-5
            right-6
            text-[11px]
            font-bold
            tracking-widest
            text-gray-300
            group-hover:text-orange-300
            transition-colors
          ">
            0{index + 1}
          </span>


        <div className="
  w-14
  h-14
  flex
  items-center
  justify-center
  text-[32px]
  text-ignitron-orange
  transition-all
  duration-300
  group-hover:scale-110
">
  {s.icon}
</div>


          {/* Content */}
          <div className="mt-5">

            <h3 className="
  text-lg
  sm:text-xl
  font-bold
  text-ignitron-navy
">
  {s.title}
</h3>

            <p className="
              mt-2
              text-sm
              leading-6
              text-gray-500
              max-w-sm
            ">
              {s.desc}
            </p>

          </div>



        </div>

      ))}

    </div>

  </div>
</section>

{/* CHOOSE YOUR MISSION */}
<section className="relative bg-ignitron-navy text-white py-16 sm:py-20 lg:py-24 overflow-hidden">

  {/* Background glow */}
  <div className="
    absolute
    -top-40
    -right-40
    w-[450px]
    h-[450px]
    rounded-full
    bg-orange-500/10
    blur-3xl
    pointer-events-none
  " />

  <div className="
    absolute
    bottom-0
    left-0
    w-52
    h-52
    rounded-full
    bg-orange-500/5
    blur-3xl
    pointer-events-none
  " />


  <div className="
    relative
    z-10
    container-max
    px-5 sm:px-8 lg:px-12
  ">

    {/* ================= HEADER ================= */}
    <div className="max-w-2xl mb-10 sm:mb-12">

      <div className="flex items-center gap-3 mb-4">

        <span className="
          w-10
          sm:w-12
          h-[2px]
          bg-ignitron-orange
        " />

        <p className="
          text-xs
          sm:text-sm
          font-bold
          tracking-[2px]
          text-ignitron-orange
        ">
          CHOOSE YOUR MISSION
        </p>

      </div>


      <h2 className="
        text-3xl
        sm:text-4xl
        lg:text-5xl
        font-extrabold
        leading-tight
        text-white
      ">
        What Do You Want{" "}
        <span className="text-ignitron-orange">
          to Build?
        </span>
      </h2>


      <p className="
        mt-3
        text-sm
        sm:text-base
        text-gray-400
        max-w-xl
      ">
        Turn your ideas into real-world solutions.
        Choose a mission and start creating.
      </p>

    </div>


    {/* ================= MISSION GRID ================= */}
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4
      sm:gap-5
    ">

      {missions.map((mission, index) => (

        <Link
          key={mission.title}
          to="/projects"
          className="
            group
            relative
            block
            h-[230px]
            sm:h-[240px]
            lg:h-[250px]
            rounded-2xl
            overflow-hidden
            bg-gray-900
            border
            border-white/10
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-400/40
            hover:shadow-2xl
          "
        >

          {/* ================= IMAGE ================= */}
          <img
            src={mission.image}
            alt={mission.title}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />


          {/* Dark overlay */}
          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/75
            via-black/20
            to-black/5
          " />


          {/* ================= TOP NUMBER ================= */}
          <span className="
            absolute
            top-4
            right-4
            z-10

            text-[10px]
            font-bold
            tracking-[2px]

            text-white/70
          ">
            0{index + 1}
          </span>


          {/* ================= ORANGE DIAGONAL ================= */}
          <div className="
            absolute
            right-[-8px]
            bottom-[-12px]
            w-28
            h-7
            bg-ignitron-orange
            rotate-[-45deg]
            origin-center
            transition-all
            duration-300
            group-hover:w-36
          " />


          {/* ================= ICON ================= */}
          <div className="
            absolute
            left-4
            bottom-4
            z-20

            w-12
            h-12

            rounded-full

            bg-[#0b1013]/90
            border-2
            border-ignitron-orange

            flex
            items-center
            justify-center

            text-xl
            text-ignitron-orange

            shadow-lg

            group-hover:bg-ignitron-orange
            group-hover:text-white

            transition-all
            duration-300
          ">
            {mission.icon}
          </div>


          {/* ================= TITLE ================= */}
          <div className="
            absolute
            left-[70px]
            right-4
            bottom-5
            z-20
          ">

            <h3 className="
              text-base
              sm:text-lg
              font-bold
              text-white
              leading-tight
            ">
              {mission.title}
            </h3>

          </div>

        </Link>

      ))}

    </div>

  </div>
</section>

{/* ATL TEASER */}
<section className="relative bg-[#f5f7f8] py-16 sm:py-20 lg:py-24 overflow-hidden">

  {/* Background decoration */}
  <div className="
    absolute
    -top-32
    -left-32
    w-[420px]
    h-[420px]
    rounded-full
    bg-orange-100/50
    blur-3xl
    pointer-events-none
  " />

  <div className="
    absolute
    bottom-0
    right-0
    w-52
    h-52
    border-r
    border-b
    border-orange-200
    opacity-50
    pointer-events-none
  " />


  <div className="
    relative
    z-10
    container-max
    px-5 sm:px-8 lg:px-12
  ">

    <div className="
      grid
      grid-cols-1
      lg:grid-cols-[0.9fr_1.1fr]
      gap-10
      lg:gap-16
      items-center
    ">


      {/* ==========================================
          LEFT CONTENT
      ========================================== */}
      <div className="max-w-xl">

        {/* Eyebrow */}
        <div className="
          flex
          items-center
          gap-3
          mb-5
        ">

          <span className="
            w-10
            sm:w-12
            h-[2px]
            bg-ignitron-orange
          " />

          <p className="
            text-xs
            sm:text-sm
            font-bold
            tracking-[2px]
            text-ignitron-orange
          ">
            ATAL TINKERING LABS
          </p>

        </div>


        {/* Heading */}
        <h2 className="
          text-3xl
          sm:text-4xl
          lg:text-[46px]
          leading-[1.08]
          font-extrabold
          tracking-tight
          text-ignitron-navy
        ">
          Turn Curiosity Into{" "}
          <span className="text-ignitron-orange">
            Innovation.
          </span>
        </h2>


        {/* Description */}
        <p className="
          mt-5
          text-sm
          sm:text-base
          lg:text-lg
          leading-7
          text-gray-600
          max-w-lg
        ">
          End-to-end ATL Lab solutions that transform school
          spaces into hands-on innovation ecosystems where
          students can learn, experiment and create.
        </p>


        {/* ==========================================
            FEATURES
        ========================================== */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-x-6
          gap-y-4
          mt-8
          mb-8
        ">

          {[
            'Lab Setup & Infrastructure',
            'Robotics & Electronics',
            'AI, IoT & Emerging Tech',
            'Curriculum & Programs',
            'Teacher Training',
            'Ongoing Support'
          ].map((item, index) => (

            <div
              key={item}
              className="
                flex
                items-center
                gap-3
                group
              "
            >

              {/* Number */}
              <span className="
                flex
                items-center
                justify-center
                w-7
                h-7
                rounded-lg
                bg-white
                border
                border-gray-200
                text-[10px]
                font-bold
                text-ignitron-orange
                shrink-0
                group-hover:bg-ignitron-orange
                group-hover:text-white
                group-hover:border-ignitron-orange
                transition-all
              ">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="
                text-xs
                sm:text-sm
                font-semibold
                text-gray-700
              ">
                {item}
              </span>

            </div>

          ))}

        </div>


        {/* CTA */}
        <Link
          to="/atl-labs"
          className="
            btn-primary
            inline-flex
            items-center
            gap-2
            px-6
            py-3.5
          "
        >
          Explore ATL Labs
          <FiArrowRight />
        </Link>


        {/* Small supporting text */}
        <p className="
          mt-4
          text-xs
          text-gray-400
        ">
          From lab setup to long-term innovation support.
        </p>

      </div>


      {/* ==========================================
          RIGHT IMAGE
      ========================================== */}
      <div className="
        relative
        w-full
        max-w-[600px]
        mx-auto
        lg:ml-auto
      ">

        {/* Glow */}
        <div className="
          absolute
          inset-5
          rounded-[30px]
          bg-orange-300/20
          blur-2xl
        " />


        {/* Main image frame */}
        <div className="
          relative
          p-2
          rounded-[26px]
          bg-[#0b1013]
          shadow-[0_25px_60px_rgba(0,0,0,0.15)]
        ">

          <EditableImage
            keyName="atl_teaser"
            alt="ATL Innovation Lab"
            className="
              w-full
              h-[280px]
              sm:h-[350px]
              md:h-[400px]
              lg:h-[450px]
              object-cover
              rounded-[20px]
            "
          />


          {/* Image overlay */}
          <div className="
            absolute
            inset-2
            rounded-[20px]
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-transparent
            pointer-events-none
          " />


          {/* Top-left corner */}
          <div className="
            absolute
            top-5
            left-5
            w-14
            h-14
            border-l-2
            border-t-2
            border-ignitron-orange
            rounded-tl-xl
          " />


          {/* Bottom-right corner */}
          <div className="
            absolute
            bottom-5
            right-5
            w-14
            h-14
            border-r-2
            border-b-2
            border-ignitron-orange
            rounded-br-xl
          " />

        </div>


        {/* ==========================================
            FLOATING ATL BADGE
        ========================================== */}
        <div className="
          absolute
          left-4
          sm:left-6
          bottom-5
          sm:bottom-6

          bg-[#0b1013]
          rounded-xl
          border
          border-white/10

          px-4
          py-3

          shadow-xl

          flex
          items-center
          gap-3
        ">

          <div className="
            w-10
            h-10
            rounded-lg
            bg-ignitron-orange
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-sm
          ">
            ATL
          </div>

          <div>

            <p className="
              text-sm
              font-bold
              text-white
            ">
              Innovation Lab
            </p>

            <p className="
              text-[11px]
              text-gray-400
            ">
              Learn • Experiment • Create
            </p>

          </div>

        </div>


        {/* Top floating tag */}
        <div className="
          absolute
          -top-4
          right-5
          sm:right-7

          px-4
          py-2

          rounded-full

          bg-white
          border
          border-gray-200

          shadow-lg

          text-[11px]
          font-bold
          tracking-wide
          text-gray-700
        ">
          FUTURE-READY LAB
        </div>

      </div>

    </div>

  </div>
</section>

{/* FEATURED PROJECTS */}
<section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">

  <div className="
    relative
    z-10
    w-full
    max-w-[1200px]
    mx-auto
    px-4
    sm:px-6
    lg:px-8
  ">

    {/* ================= HEADER ================= */}
    <div className="
      flex
      flex-col
      md:flex-row
      md:items-end
      md:justify-between
      gap-5
      mb-10
      sm:mb-12
    ">

      <div className="min-w-0">

        <div className="
          flex
          items-center
          gap-3
          mb-4
        ">
          <span className="
            w-9
            sm:w-12
            h-[2px]
            bg-ignitron-orange
            shrink-0
          " />

          <p className="
            text-[11px]
            sm:text-xs
            md:text-sm
            font-bold
            tracking-[2px]
            text-ignitron-orange
          ">
            FEATURED PROJECTS
          </p>
        </div>


        <h2 className="
          text-3xl
          sm:text-4xl
          lg:text-[42px]
          leading-[1.1]
          font-extrabold
          tracking-tight
          text-ignitron-navy
          max-w-2xl
        ">
          Projects That Turn{" "}
          <span className="text-ignitron-orange">
            Learning
          </span>{" "}
          Into Reality.
        </h2>


        <p className="
          mt-3
          text-sm
          sm:text-base
          text-gray-500
          max-w-xl
        ">
          Explore real-world projects built through curiosity,
          experimentation and hands-on learning.
        </p>

      </div>


      {/* Desktop View All */}
      <Link
        to="/projects"
        className="
          hidden
          md:inline-flex
          shrink-0
          items-center
          gap-2
          px-5
          py-2.5
          rounded-lg
          border
          border-gray-200
          text-sm
          font-semibold
          text-gray-700
          hover:border-ignitron-orange
          hover:text-ignitron-orange
          transition-all
        "
      >
        View All Projects
        <FiArrowRight />
      </Link>

    </div>


    {/* ================= PROJECT GRID ================= */}
    {loading ? (
      <Loader />
    ) : (

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5

        gap-5
        sm:gap-6

        items-stretch
      ">

        {projects.map((project, index) => (

          <div
            key={project._id}
            className="
              relative
              min-w-0
              w-full
              h-full
              pt-2
            "
          >

            {/* ================= NUMBER ================= */}
            <div className="
              absolute
              top-0
              left-4
              z-30

              w-[58px]
              h-[38px]

              rounded-full

              bg-[#0b1013]
              border
              border-gray-700

              flex
              items-center
              justify-center

              text-[11px]
              font-bold
              tracking-[2px]
              text-white

              shadow-md
            ">
              {String(index + 1).padStart(2, "0")}
            </div>


            {/* ================= CARD ================= */}
            <div className="
              w-full
              h-full
              min-w-0
              flex
            ">
              <ProjectCard
                project={project}
              />
            </div>

          </div>

        ))}

      </div>

    )}


    {/* ================= MOBILE VIEW ALL ================= */}
    <div className="
      flex
      justify-center
      mt-8
      md:hidden
    ">

      <Link
        to="/projects"
        className="
          inline-flex
          items-center
          gap-2

          px-5
          py-3

          rounded-lg

          bg-ignitron-orange
          text-white

          text-sm
          font-semibold

          shadow-md
        "
      >
        View All Projects
        <FiArrowRight />
      </Link>

    </div>

  </div>
</section>

{/* IMPACT */}
{impact.length > 0 && (
  <section className="
    relative
    bg-ignitron-charcoal
    py-14
    sm:py-16
    lg:py-20
    overflow-hidden
  ">

    {/* Background decoration */}
    <div className="
      absolute
      -top-32
      -right-32
      w-[350px]
      h-[350px]
      rounded-full
      bg-orange-500/10
      blur-3xl
      pointer-events-none
    " />

    <div className="
      absolute
      bottom-0
      left-0
      w-40
      h-40
      border-l
      border-b
      border-orange-500/20
      pointer-events-none
    " />


    <div className="
      relative
      z-10
      w-full
      max-w-[1100px]
      mx-auto
      px-5
      sm:px-8
      lg:px-10
    ">

      {/* Small heading */}
      <div className="
        text-center
        mb-10
      ">

        <div className="
          flex
          items-center
          justify-center
          gap-3
          mb-3
        ">

          <span className="
            w-8
            sm:w-12
            h-[2px]
            bg-ignitron-orange
          " />

          <p className="
            text-[10px]
            sm:text-xs
            font-bold
            tracking-[2.5px]
            text-ignitron-orange
          ">
            OUR IMPACT
          </p>

          <span className="
            w-8
            sm:w-12
            h-[2px]
            bg-ignitron-orange
          " />

        </div>

        <h2 className="
          text-2xl
          sm:text-3xl
          font-extrabold
          text-white
        ">
          Creating Impact Through{" "}
          <span className="text-ignitron-orange">
            Innovation.
          </span>
        </h2>

      </div>


      {/* Stats */}
      <div className="
        grid
        grid-cols-2
        lg:grid-cols-4
      ">

        {impact.map((stat, index) => (

          <div
            key={stat._id}
            className={`
              relative
              text-center
              px-4
              py-6
              sm:px-6
              sm:py-8

              ${
                index !== impact.length - 1
                  ? "lg:border-r lg:border-white/10"
                  : ""
              }

              ${
                index === 0 || index === 2
                  ? "border-r border-white/10 lg:border-r"
                  : ""
              }

              ${
                index < 2
                  ? "border-b border-white/10 lg:border-b-0"
                  : ""
              }
            `}
          >

            {/* Number */}
            <div className="
              flex
              items-baseline
              justify-center
              gap-1
            ">

              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
              />

            </div>


            {/* Orange line */}
            <div className="
              w-10
              h-[3px]
              bg-ignitron-orange
              rounded-full
              mx-auto
              mt-3
              mb-3
            " />


            {/* Label */}
            <p className="
              text-xs
              sm:text-sm
              font-medium
              text-gray-400
              leading-5
            ">
              {stat.label}
            </p>

          </div>

        ))}

      </div>

    </div>

  </section>
)}

    </>
  );
};

export default Home;
