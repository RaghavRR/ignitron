import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCopy, FiCheck } from 'react-icons/fi';
import api, { resolveAsset } from '../api/axios';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/projects/${slug}`)
      .then(({ data }) => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const copyCode = () => {
    navigator.clipboard.writeText(project.code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <Loader />;
  if (!project) return <p className="text-center py-24 text-gray-500">Project not found.</p>;

  return (
    <article className="bg-white">
      <section className="section !pb-8">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-ignitron-orange">{project.category}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">{project.difficulty}</span>
            </div>
            <h1 className="heading-lg mb-4">{project.title}</h1>
            <p className="text-gray-600 text-lg">{project.overview}</p>
            {project.timeRequired && <p className="text-sm text-gray-500 mt-3">⏱ {project.timeRequired}</p>}
          </div>
          <img src={resolveAsset(project.coverImage)} alt={project.title} className="rounded-2xl w-full h-[320px] object-cover shadow-lg" />
        </div>
      </section>

      {project.whatYouLearn?.length > 0 && (
        <section className="section !py-8 bg-ignitron-light">
          <div className="container-max">
            <h2 className="heading-md mb-5">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.whatYouLearn.map((item, i) => (
                <li key={i} className="flex gap-3 items-start bg-white rounded-lg p-4 border border-gray-100">
                  <span className="w-2 h-2 mt-2 rounded-full bg-ignitron-orange flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.components?.length > 0 && (
        <section className="section !py-8">
          <div className="container-max">
            <h2 className="heading-md mb-5">Components Required</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="py-3 pr-4">Component</th>
                    <th className="py-3">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {project.components.map((c, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">{c.name}</td>
                      <td className="py-3 text-gray-500">{c.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {project.circuitDiagram && (
        <section className="section !py-8 bg-ignitron-light">
          <div className="container-max">
            <h2 className="heading-md mb-5">Circuit / Wiring Diagram</h2>
            <img src={resolveAsset(project.circuitDiagram)} alt="Circuit diagram" className="rounded-xl w-full max-w-3xl mx-auto shadow" />
          </div>
        </section>
      )}

      {project.howToMake?.length > 0 && (
        <section className="section !py-8">
          <div className="container-max">
            <h2 className="heading-md mb-5">How to Make</h2>
            <ol className="space-y-4">
              {project.howToMake.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-ignitron-orange text-white flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                  <p className="text-gray-700 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {project.code && (
        <section className="section !py-8 bg-ignitron-navy">
          <div className="container-max">
            <div className="flex items-center justify-between mb-4">
              <h2 className="heading-md text-white">Code</h2>
              <button onClick={copyCode} className="flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy Code</>}
              </button>
            </div>
            <pre className="bg-black/40 text-gray-100 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed">
              <code>{project.code}</code>
            </pre>
          </div>
        </section>
      )}

      {project.videoUrl && (
        <section className="section !py-8">
          <div className="container-max">
            <h2 className="heading-md mb-5">Working Video</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto">
              <iframe src={project.videoUrl} title="Project video" className="w-full h-full" allowFullScreen />
            </div>
          </div>
        </section>
      )}

      {project.troubleshooting?.length > 0 && (
        <section className="section !py-8 bg-ignitron-light">
          <div className="container-max">
            <h2 className="heading-md mb-5">Testing / Troubleshooting</h2>
            <div className="space-y-4">
              {project.troubleshooting.map((t, i) => (
                <div key={i} className="card p-5">
                  <p className="font-semibold text-ignitron-navy mb-1">Issue: {t.issue}</p>
                  <p className="text-gray-600 text-sm">Fix: {t.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(project.challenge || project.upgradeIdeas?.length > 0) && (
        <section className="section !py-8">
          <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenge && (
              <div className="card p-6 border-l-4 border-ignitron-orange">
                <h3 className="font-bold mb-2">Challenge</h3>
                <p className="text-gray-600">{project.challenge}</p>
              </div>
            )}
            {project.upgradeIdeas?.length > 0 && (
              <div className="card p-6 border-l-4 border-ignitron-navy">
                <h3 className="font-bold mb-2">Upgrade Ideas</h3>
                <ul className="text-gray-600 space-y-1 list-disc list-inside">
                  {project.upgradeIdeas.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {project.relatedProjects?.length > 0 && (
        <section className="section bg-ignitron-light">
          <div className="container-max">
            <h2 className="heading-md mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.relatedProjects.map((p) => <ProjectCard key={p._id} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-ignitron-navy text-white text-center">
        <div className="container-max">
          <h2 className="heading-md text-white mb-4">Want This Project in Your School's Lab?</h2>
          <Link to="/contact" className="btn-primary inline-flex">Talk to IGNITRON</Link>
        </div>
      </section>
    </article>
  );
};

export default ProjectDetail;
