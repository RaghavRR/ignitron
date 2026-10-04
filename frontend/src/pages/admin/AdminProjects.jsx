import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { resolveAsset } from '../../api/axios';
import Loader from '../../components/Loader';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    setLoading(true);
    api.get('/projects/admin/all').then(({ data }) => setProjects(data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Projects</h1>
          <p className="text-gray-500">Manage the Project Library.</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary !py-2.5"><FiPlus /> Add Project</Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4">Project</th>
              <th className="p-4">Category</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Published</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t border-gray-100">
                <td className="p-4 flex items-center gap-3">
                  <img src={resolveAsset(p.coverImage)} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                  <span className="font-semibold">{p.title}</span>
                </td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.difficulty}</td>
                <td className="p-4">{p.isPublished ? 'Yes' : 'No'}</td>
                <td className="p-4 text-right space-x-3">
                  <Link to={`/admin/projects/${p._id}/edit`} className="text-ignitron-orange inline-flex"><FiEdit2 /></Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 inline-flex"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && <p className="text-center text-gray-500 py-10">No projects yet.</p>}
      </div>
    </div>
  );
};

export default AdminProjects;
