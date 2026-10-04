import React from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from '../components/SectionHeader';

const solutions = [
  {
 title: 'STEM & Robotics Programs',
    desc: 'Hands-on STEM, robotics and project-based learning designed to build real technical skill from the ground up.',
  },
  { title: 'AI & Emerging Technology',
    desc: 'AI, IoT, automation, sensors and emerging technology exposure that keeps students ahead of the curve.',
  },
  {
   title: 'Innovation Labs',
    desc: 'Design and implementation of practical innovation and maker spaces inside your school.',
  },
  {
     title: 'Curriculum Development',
    desc: 'Structured, project-based STEM and technology curriculum aligned to learning outcomes.',
  },
  {
     title: 'Teacher Training',
    desc: 'Hands-on faculty enablement and implementation support so programs run confidently, long-term.',
  },
  {
     title: 'DIY STEM Kits',
    desc: 'Learning kits for experimentation, building and project development — in class or at home.',
  },
];

const Solutions = () => (
  <>
    <section className="bg-white section !pb-10">
      <div className="container-max text-center max-w-3xl mx-auto">
        <p className="eyebrow mb-2">Our Solutions</p>
        <h1 className="heading-lg mb-4">Every Solution, Built Around <span className="text-ignitron-orange">School Outcomes.</span></h1>
        <p className="text-gray-600 text-lg">
          Not a list of products — a complete ecosystem to move your school from traditional learning to practical innovation.
        </p>
      </div>
    </section>

    <section className="section bg-ignitron-light !pt-0">
      <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((s) => (
          <div key={s.title} className="card p-8">
            <h3 className="font-bold text-xl mb-3">{s.title}</h3>
            <p className="text-gray-600 mb-5">{s.desc}</p>
            <Link to="/contact" className="text-ignitron-orange font-semibold text-sm">Talk to Us →</Link>
          </div>
        ))}
      </div>
    </section>

  </>
);

export default Solutions;
