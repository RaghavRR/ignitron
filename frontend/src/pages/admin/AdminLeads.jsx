import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import { FiTrash2 } from 'react-icons/fi';

const statuses = ['New', 'Contacted', 'Converted', 'Closed'];

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = () => {
    setLoading(true);
    api.get('/leads').then(({ data }) => setLeads(data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/leads/${id}`, { status });
    fetchLeads();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    fetchLeads();
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Leads / Enquiries</h1>
      <p className="text-gray-500 mb-8">School enquiries submitted through the Contact page.</p>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[900px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4">Name</th><th className="p-4">School</th><th className="p-4">Phone</th>
              <th className="p-4">Interested In</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l._id} className="border-t border-gray-100">
                <td className="p-4 font-semibold">{l.name}<br /><span className="text-xs text-gray-400">{l.email}</span></td>
                <td className="p-4">{l.schoolOrg}</td>
                <td className="p-4">{l.phone}</td>
                <td className="p-4">{l.interestedIn}</td>
                <td className="p-4">
                  <select className="input !py-1.5 !text-xs" value={l.status} onChange={(e) => handleStatusChange(l._id, e.target.value)}>
                    {statuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(l._id)} className="text-red-500"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p className="text-center text-gray-500 py-10">No enquiries yet.</p>}
      </div>
    </div>
  );
};

export default AdminLeads;
