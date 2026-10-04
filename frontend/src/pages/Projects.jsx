import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import SectionHeader from '../components/SectionHeader';

const categories = ['All', 'Robotics', 'AI', 'IoT', 'Electronics'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');

  const fetchProjects = () => {
    setLoading(true);
    api
      .get('/projects', { params: { category, difficulty, search } })
      .then(({ data }) => setProjects(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(fetchProjects, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [category, difficulty, search]);

  return (
    <section className="section bg-white">
      <div className="container-max">
        <SectionHeader eyebrow="Project Library" title="Discover a Project. Learn How to Build It." subtitle="Searchable, filterable, and built for students and teachers to learn by doing." />

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project name, technology or component..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ignitron-orange"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                category === c ? 'bg-ignitron-orange text-white border-ignitron-orange' : 'border-gray-200 text-gray-600 hover:border-ignitron-orange'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-10">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                difficulty === d ? 'bg-ignitron-navy text-white border-ignitron-navy' : 'border-gray-200 text-gray-500 hover:border-ignitron-navy'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No projects match your filters yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => <ProjectCard key={p._id} project={p} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
