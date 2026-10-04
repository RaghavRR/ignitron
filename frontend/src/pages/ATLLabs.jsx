import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCpu,FiSettings, FiTool, FiBookOpen, FiUsers, FiHeadphones } from 'react-icons/fi';
import EditableImage from '../components/EditableImage';
import SectionHeader from '../components/SectionHeader';

const services = [
  {
    number: '01',
    icon: <FiSettings />,
    title: 'ATL Lab Setup & Infrastructure',
    desc: 'Complete planning, setup and infrastructure support for a functional innovation lab.',
  },
  {
    number: '02',
    icon: <FiCpu />,
    title: 'Robotics & Electronics',
    desc: 'Hands-on robotics, electronics and hardware learning experiences for students.',
  },
  {
    number: '03',
    icon: <FiTool />,
    title: 'AI, IoT & Emerging Technology',
    desc: 'Practical exposure to AI, IoT, sensors, automation and emerging technologies.',
  },
  {
    number: '04',
    icon: <FiBookOpen />,
    title: 'Curriculum & Student Programs',
    desc: 'Structured project-based programs designed around practical learning outcomes.',
  },
  {
    number: '05',
    icon: <FiUsers />,
    title: 'Teacher Training',
    desc: 'Hands-on faculty training to help teachers confidently run technology programs.',
  },
  {
    number: '06',
    icon: <FiHeadphones />,
    title: 'Ongoing Technical Support',
    desc: 'Continuous support to keep your lab, equipment and programs running smoothly.',
  },
];

const journey = [
  'School Assessment',
  'Lab Design',
  'Setup & Installation',
  'Teacher Training',
  'Student Programs',
  'Project Development',
  'Innovation & Competitions',
];

const ATLLabs = () => {
  return (
    <>
     {/* ATL HERO */}
<section className="relative overflow-hidden bg-ignitron-navy text-white">

  {/* Background decoration */}
  <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

  <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

      {/* LEFT CONTENT */}
      <div className="max-w-xl">

        <div className="mb-5 flex items-center gap-3">
          <span className="h-[2px] w-10 bg-ignitron-orange sm:w-14" />

          <span className="text-[11px] font-bold tracking-[2.5px] text-ignitron-orange sm:text-xs">
            ATAL TINKERING LABS
          </span>
        </div>

        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Turn Curiosity
          <br />
          Into{' '}
          <span className="text-ignitron-orange">
            Innovation.
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-7 text-gray-300 sm:text-base lg:text-lg">
          End-to-end ATL Lab solutions that transform school
          spaces into hands-on innovation ecosystems.
        </p>



        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ignitron-orange" />
            Robotics
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ignitron-orange" />
            AI & IoT
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ignitron-orange" />
            Hands-on Learning
          </span>

        </div>

      </div>


      {/* RIGHT IMAGE */}
      <div className="relative">

        <div className="absolute inset-6 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/10
          shadow-[0_25px_70px_rgba(0,0,0,0.35)]
        ">

          <EditableImage
            keyName="atl_hero"
            alt="ATL Innovation Lab setup"
            className="
              h-[280px]
              w-full
              object-cover
              sm:h-[360px]
              md:h-[420px]
              lg:h-[450px]
            "
          />

          <div className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
          " />

          {/* Orange corner */}
          <div className="
            absolute
            left-5
            top-5
            h-12
            w-12
            rounded-tl-lg
            border-l-2
            border-t-2
            border-ignitron-orange
          " />

          <div className="
            absolute
            bottom-5
            right-5
            h-12
            w-12
            rounded-br-lg
            border-b-2
            border-r-2
            border-ignitron-orange
          " />

        </div>


        {/* Floating badge */}
        <div className="
          absolute
          -bottom-5
          left-4
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-white/10
          bg-[#10161b]
          px-4
          py-3
          shadow-2xl
          sm:left-6
          sm:px-5
          sm:py-4
          lg:-left-6
        ">

          <div className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-orange-500/10
            text-lg
            text-ignitron-orange
          ">
            <FiCpu />
          </div>

          <div>
            <p className="text-sm font-bold text-white sm:text-base">
              Learn. Build. Innovate.
            </p>

            <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
              Create the future
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* =====================================================
          WHAT WE DELIVER
      ===================================================== */}
      <section className="
        bg-white
        py-16
        sm:py-20
        lg:py-24
      ">

        <div className="
          max-w-[1200px]
          mx-auto
          px-5
          sm:px-8
          lg:px-10
        ">

          <div className="max-w-2xl mb-10">

            <div className="
              flex
              items-center
              gap-3
              mb-4
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
                WHAT WE DELIVER
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
              Complete ATL Lab{' '}
              <span className="text-ignitron-orange">
                Solutions.
              </span>
            </h2>

            <p className="
              mt-4
              text-sm
              sm:text-base
              text-gray-600
              leading-6
              max-w-xl
            ">
              Everything your school needs to create, operate and
              grow a practical innovation ecosystem.
            </p>

          </div>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            lg:gap-6
          ">

            {services.map((service) => (
              <div
                key={service.number}
                className="
                  group
                  relative
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  p-6
                  sm:p-7
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                <span className="
                  absolute
                  top-5
                  right-5
                  text-[11px]
                  font-bold
                  tracking-[2px]
                  text-gray-300
                ">
                  {service.number}
                </span>


                <h3 className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-ignitron-navy
                  leading-snug
                  pr-8
                ">
                  {service.title}
                </h3>

                <p className="
                  mt-3
                  text-sm
                  sm:text-[15px]
                  leading-6
                  text-gray-600
                ">
                  {service.desc}
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


      {/* =====================================================
          ATL JOURNEY
      ===================================================== */}
      <section className="
        bg-ignitron-light
        py-16
        sm:py-20
        lg:py-24
      ">

        <div className="
          max-w-[1200px]
          mx-auto
          px-5
          sm:px-8
          lg:px-10
        ">

          <div className="text-center max-w-2xl mx-auto">

            <div className="
              flex
              items-center
              justify-center
              gap-3
              mb-4
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
                THE ATL JOURNEY
              </p>

              <span className="
                w-10
                sm:w-12
                h-[2px]
                bg-ignitron-orange
              " />
            </div>


          </div>


          <div className="
            mt-12
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          ">

            {journey.map((step, index) => (
              <div
                key={step}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  p-5
                  sm:p-6
                  flex
                  items-start
                  gap-4
                  shadow-sm
                "
              >

                <div className="
                  w-10
                  h-10
                  shrink-0
                  rounded-xl
                  bg-ignitron-navy
                  text-white
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-bold
                ">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <p className="
                    font-semibold
                    text-sm
                    sm:text-base
                    leading-6
                    text-ignitron-navy
                  ">
                    {step}
                  </p>

                  <div className="
                    mt-3
                    w-8
                    h-[2px]
                    bg-ignitron-orange
                  " />
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          WHY ATL
      ===================================================== */}
      {/* <section className="
        bg-white
        py-16
        sm:py-20
        lg:py-24
      ">

        <div className="
          max-w-[1000px]
          mx-auto
          px-5
          sm:px-8
          text-center
        ">

          <div className="
            flex
            items-center
            justify-center
            gap-3
            mb-4
          ">
            <span className="
              w-10
              sm:w-12
              h-[2px]
              bg-ignitron-orange
            />

            <p className="
              text-xs
              sm:text-sm
              font-bold
              tracking-[2px]
              text-ignitron-orange
            ">
              BUILT FOR SCHOOLS
            </p>

            <span className="
              w-10
              sm:w-12
              h-[2px]
              bg-ignitron-orange
            " />
          </div>


          <h2 className="
            text-3xl
            sm:text-4xl
            lg:text-[44px]
            leading-tight
            font-extrabold
            text-ignitron-navy
          ">
            A Lab Is Just the{' '}
            <span className="text-ignitron-orange">
              Beginning.
            </span>
          </h2>


          <p className="
            mt-5
            text-sm
            sm:text-base
            lg:text-lg
            leading-7
            text-gray-600
            max-w-2xl
            mx-auto
          ">
            We help schools go beyond infrastructure by combining
            technology, curriculum, teacher enablement and real
            project-based learning.
          </p>


          <div className="
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-4
            text-left
          ">

            {[
              'Practical student learning',
              'Teacher enablement',
              'Long-term technical support',
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-xl
                  bg-ignitron-light
                "
              >
                <span className="
                  w-7
                  h-7
                  shrink-0
                  rounded-lg
                  bg-orange-50
                  text-ignitron-orange
                  flex
                  items-center
                  justify-center
                ">
                  <FiCheck />
                </span>

                <span className="
                  text-sm
                  font-semibold
                  text-ignitron-navy
                ">
                  {item}
                </span>
              </div>
            ))}

          </div>
      </section> */}
    </>

  );
};

export default ATLLabs;