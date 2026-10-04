import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiTarget,
  FiLayers,
} from 'react-icons/fi';
import EditableImage from '../components/EditableImage';

const About = () => {
  const pillars = [
    {
      number: '01',
      icon: <FiEye />,
      title: 'Our Vision',
      desc: 'To become the most trusted technology and innovation partner for schools across India.',
    },
    {
      number: '02',
      icon: <FiTarget />,
      title: 'Our Mission',
      desc: 'Move schools from traditional learning to a practical, hands-on innovation ecosystem.',
    },
    {
      number: '03',
      icon: <FiLayers />,
      title: 'Our Approach',
      desc: 'Practical, outcome-oriented programs — never gimmicky, always school-ready.',
    },
  ];

  const strengths = [
    'Real IGNITRON photos and real student/project work — not stock imagery.',
    'Only verified numbers, partnerships and achievements — never exaggerated claims.',
    'Practical, outcome-oriented programs designed for school decision-makers.',
    'End-to-end support: setup, curriculum, teacher training and ongoing help.',
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20 lg:py-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div>

              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 sm:w-12 h-[2px] bg-ignitron-orange" />

                <p className="text-xs sm:text-sm font-bold tracking-[2px] text-ignitron-orange">
                  ABOUT IGNITRON
                </p>
              </div>

              <h1 className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                xl:text-[52px]
                leading-[1.08]
                font-extrabold
                text-ignitron-navy
              ">
                A Technology & Innovation Ecosystem —{' '}
                <span className="text-ignitron-orange">
                  Built for Schools.
                </span>
              </h1>

              <p className="
                mt-5
                text-sm
                sm:text-base
                lg:text-lg
                leading-7
                text-gray-600
                max-w-xl
              ">
                IGNITRON Future Labs helps schools build practical,
                technology-driven learning ecosystems through STEM,
                Robotics, AI, IoT, Innovation Labs, curriculum,
                teacher training, workshops and hands-on projects.
              </p>


            </div>


            {/* RIGHT IMAGE */}
            <div className="relative">

              <div className="
                rounded-2xl
                overflow-hidden
                shadow-xl
                border
                border-gray-100
              ">

                <EditableImage
                  keyName="about_hero"
                  alt="IGNITRON team and lab"
                  className="
                    w-full
                    h-[280px]
                    sm:h-[350px]
                    md:h-[400px]
                    lg:h-[430px]
                    object-cover
                  "
                />

              </div>

              {/* Orange corners */}
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
                pointer-events-none
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
                pointer-events-none
              " />

            </div>

          </div>

        </div>
      </section>


      {/* ================= VISION / MISSION / APPROACH ================= */}
      <section className="bg-ignitron-light py-16 sm:py-20 lg:py-24">

        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">

          <div className="mb-10">

            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 sm:w-12 h-[2px] bg-ignitron-orange" />

              <p className="text-xs sm:text-sm font-bold tracking-[2px] text-ignitron-orange">
                WHAT DRIVES US
              </p>
            </div>

            <h2 className="
              text-3xl
              sm:text-4xl
              lg:text-[44px]
              leading-tight
              font-extrabold
              text-ignitron-navy
            ">
              From Curiosity to{' '}
              <span className="text-ignitron-orange">
                Innovation.
              </span>
            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">

            {pillars.map((item) => (
              <div
                key={item.title}
                className="
                  group
                  relative
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  p-6
                  sm:p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                {/* Number */}
                <span className="
                  absolute
                  top-5
                  right-5
                  text-xs
                  font-bold
                  tracking-[2px]
                  text-gray-300
                  group-hover:text-ignitron-orange
                  transition-colors
                ">
                  {item.number}
                </span>


                <h3 className="
                  text-xl
                  font-bold
                  text-ignitron-navy
                  mb-3
                ">
                  {item.title}
                </h3>

                <p className="
                  text-sm
                  sm:text-base
                  leading-6
                  text-gray-600
                ">
                  {item.desc}
                </p>

                <div className="
                  mt-6
                  w-10
                  h-[3px]
                  rounded-full
                  bg-ignitron-orange
                " />

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ================= WHAT SETS US APART ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-16
            items-center
          ">

            {/* IMAGE */}
            <div className="order-2 lg:order-1">

              <div className="
                overflow-hidden
                rounded-2xl
                shadow-xl
              ">

                <EditableImage
                  keyName="about_team"
                  alt="IGNITRON team"
                  className="
                    w-full
                    h-[280px]
                    sm:h-[340px]
                    lg:h-[410px]
                    object-cover
                  "
                />

              </div>

            </div>


            {/* CONTENT */}
            <div className="order-1 lg:order-2">

              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 sm:w-12 h-[2px] bg-ignitron-orange" />

                <p className="
                  text-xs
                  sm:text-sm
                  font-bold
                  tracking-[2px]
                  text-ignitron-orange
                ">
                  WHAT SETS US APART
                </p>
              </div>


              <h2 className="
                text-3xl
                sm:text-4xl
                lg:text-[42px]
                leading-tight
                font-extrabold
                text-ignitron-navy
              ">
                Premium, Credible,{' '}
                <span className="text-ignitron-orange">
                  Technology-Driven and Human.
                </span>
              </h2>


              <ul className="mt-7 space-y-4">

                {strengths.map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      items-start
                      gap-3
                      text-sm
                      sm:text-base
                      leading-6
                      text-gray-700
                    "
                  >

                    <span className="
                      mt-0.5
                      w-7
                      h-7
                      rounded-lg
                      bg-orange-50
                      text-ignitron-orange
                      flex
                      items-center
                      justify-center
                      shrink-0
                    ">
                      <FiCheck className="text-sm" />
                    </span>

                    <span>{item}</span>

                  </li>
                ))}

              </ul>

            </div>

          </div>

        </div>
      </section>


    </>
  );
};

export default About;