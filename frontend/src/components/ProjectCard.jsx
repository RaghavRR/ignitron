import React from 'react';
import { Link } from 'react-router-dom';
import { resolveAsset } from '../api/axios';

const difficultyColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
};

const ProjectCard = ({ project }) => (
  <Link to={`/projects/${project.slug}`} className="card overflow-hidden group block">
    <div className="overflow-hidden h-48">
      <img
        src={resolveAsset(project.coverImage)}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[project.difficulty] || 'bg-gray-100 text-gray-700'}`}>
          {project.difficulty}
        </span>
        {project.technologies?.slice(0, 2).map((t) => (
          <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-ignitron-orange">
            {t}
          </span>
        ))}
      </div>
      <h3 className="font-bold text-lg text-ignitron-navy group-hover:text-ignitron-orange transition-colors">
        {project.title}
      </h3>
      <p className="text-ignitron-orange text-sm font-semibold mt-3">View Project →</p>
    </div>
  </Link>
);

export default ProjectCard;
