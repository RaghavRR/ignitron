import React from 'react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    number: '01',
    title: 'Curriculum Development',
    description: 'Grade-wise STEM, Robotics, AI and Innovation curriculum built around practical learning outcomes.',
    tags: ['Grade-wise', 'STEM', 'Robotics', 'AI'],
    path: '/solutions/curriculum-development',
    // icon: '◈',
  },
  {
    number: '02',
    title: 'STEM & Robotics Workshops',
    description: 'Hands-on workshops that help students explore, build and innovate with emerging technologies.',
    tags: ['Grades 1–12', 'Coding', 'Electronics', 'Projects'],
    path: '/solutions/stem-robotics-workshops',
    // icon: '⌘',
  },
  {
    number: '03',
    title: 'STEM & Robotics Lab Setup',
    description: 'End-to-end school lab setup combining infrastructure, equipment, curriculum and support.',
    tags: ['STEM Lab', 'Robotics & AI', 'AR/VR', 'Composite Skills'],
    path: '/solutions/stem-robotics-lab-setup',
    // icon: '⌬',
  },
  {
    number: '04',
    title: 'ATL Lab Setup',
    description: 'Build, upgrade and activate Atal Tinkering Labs with equipment, activities and mentoring.',
    tags: ['ATL Setup', 'Enhancement', 'Projects', 'Mentoring'],
    path: '/solutions/atl-lab-setup',
    // icon: '✳',
  },
  {
    number: '05',
    title: 'Teacher Training',
    description: 'Practical capacity-building programs that empower educators to confidently deliver STEM learning.',
    tags: ['STEM Pedagogy', 'AI & Coding', 'IoT', 'Lab Training'],
    path: '/solutions/teacher-training',
    // icon: '⌑',
  },
  {
    number: '06',
    title: 'Year-Long Collaboration',
    description: 'A continuous innovation partnership for curriculum, student sessions, teacher support and showcases.',
    tags: ['Annual Plan', 'Mentoring', 'Teacher Support', 'Progress'],
    path: '/solutions/year-long-collaboration',
    // icon: '↗',
  },
  {
    number: '07',
    title: 'Competitions & Tech Events',
    description: 'Prepare students to build, compete and showcase ideas through technology events and challenges.',
    tags: ['Hackathons', 'Robotics', 'Tech Fests', 'Showcases'],
    path: '/solutions/competitions-tech-events',
    // icon: '✦',
  },
  {
    number: '08',
    title: 'School Digital Solutions',
    description: 'Digital tools to streamline school administration, student records, attendance and communication.',
    tags: ['School ERP', 'Attendance', 'Parent Updates', 'Digital Classroom'],
    path: '/solutions/school-digital-solutions',
    // icon: '▦',
  },
];

export default function Solutions() {
  return (
    <>
      <section className="bg-white section !pb-12">
        <div className="container-max mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-3">OUR SOLUTIONS</p>
          <h1 className="heading-lg mb-5">
            Solutions Designed for <span className="text-ignitron-orange">Future-Ready Schools</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            From curriculum development and hands-on STEM learning to innovation labs, teacher training,
            competitions and digital school solutions, IGNITRON provides an integrated ecosystem for future-ready education.
          </p>
        </div>
      </section>

      <section className="section bg-ignitron-light !pt-4">
        <div className="container-max mx-auto">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-2">ONE CONNECTED ECOSYSTEM</p>
              <h2 className="heading-md">Explore Our Solutions</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <article
                key={solution.number}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl md:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  {/* <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl font-semibold text-ignitron-orange">
                    {solution.icon}
                  </span> */}
                  <span className="text-sm font-semibold tracking-widest text-gray-400">{solution.number}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-ignitron-navy">{solution.title}</h3>
                <p className="mb-5 flex-1 leading-7 text-gray-600">{solution.description}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={solution.path}
                  className="inline-flex items-center gap-2 font-semibold text-ignitron-orange transition group-hover:gap-3"
                >
                  Explore Solution <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
