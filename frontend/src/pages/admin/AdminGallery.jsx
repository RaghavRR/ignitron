import React, { useEffect, useState } from 'react';
import api, { resolveAsset } from '../../api/axios';
import Loader from '../../components/Loader';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const categories = ['Workshops', 'Robotics', 'Innovation Labs', 'Student Projects', 'Competitions', 'Events'];

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', category: categories[0], caption: '', type: 'image' });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    api.get('/gallery/admin/all').then(({ data }) => setItems(data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please choose a photo or video');
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('media', file);
    try {
      await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm({ title: '', category: categories[0], caption: '', type: 'image' });
      setFile(null);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    await api.delete(`/gallery/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Gallery</h1>
      <p className="text-gray-500 mb-8">Upload workshop, lab and project photos/videos.</p>

      <form onSubmit={handleUpload} className="bg-white rounded-xl p-6 border border-gray-100 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <input required placeholder="Title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input type="file" accept="image/*,video/*" required className="input" onChange={(e) => setFile(e.target.files[0])} />
        <input placeholder="Caption (optional)" className="input md:col-span-2" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
        <button disabled={saving} className="btn-primary md:col-span-2 justify-center disabled:opacity-60"><FiPlus /> {saving ? 'Uploading...' : 'Add to Gallery'}</button>
      </form>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative group rounded-lg overflow-hidden">
              {item.type === 'video' ? (
                <video src={resolveAsset(item.mediaUrl)} className="w-full h-28 object-cover" muted />
              ) : (
                <img src={resolveAsset(item.mediaUrl)} alt={item.title} className="w-full h-28 object-cover" />
              )}
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
