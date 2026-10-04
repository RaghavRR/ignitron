import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const AdminImpact = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ label: '', value: '', suffix: '+', order: 0 });

  const fetchItems = () => {
    setLoading(true);
    api.get('/impact').then(({ data }) => setItems(data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/impact', { ...form, value: Number(form.value), order: Number(form.order) });
    setForm({ label: '', value: '', suffix: '+', order: 0 });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await api.delete(`/impact/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Impact Numbers</h1>
      <p className="text-gray-500 mb-8">Only publish verified, real numbers — these appear across the homepage.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-100 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl">
        <input required placeholder="Label (e.g. Schools)" className="input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
        <input required type="number" placeholder="Value" className="input" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        <input placeholder="Suffix" className="input" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} />
        <button className="btn-primary justify-center"><FiPlus /> Add</button>
      </form>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 max-w-2xl">
          {items.map((i) => (
            <div key={i._id} className="flex items-center justify-between p-4">
              <p className="font-semibold">{i.label}: <span className="text-ignitron-orange">{i.value}{i.suffix}</span></p>
              <button onClick={() => handleDelete(i._id)} className="text-red-500"><FiTrash2 /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminImpact;
