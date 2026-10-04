import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const AdminResources = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    setLoading(true);
    api.get('/resources/admin/all').then(({ data }) => setItems(data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    await api.delete(`/resources/${id}`);
    fetchItems();
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Resources</h1>
          <p className="text-gray-500">Blogs, tutorials and teacher resources.</p>
        </div>
        <Link to="/admin/resources/new" className="btn-primary !py-2.5"><FiPlus /> Add Resource</Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="border-t border-gray-100">
                <td className="p-4 font-semibold">{r.title}</td>
                <td className="p-4">{r.category}</td>
                <td className="p-4 text-right space-x-3">
                  <Link to={`/admin/resources/${r._id}/edit`} className="text-ignitron-orange inline-flex"><FiEdit2 /></Link>
                  <button onClick={() => handleDelete(r._id)} className="text-red-500 inline-flex"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center text-gray-500 py-10">No resources yet.</p>}
      </div>
    </div>
  );
};

export default AdminResources;
