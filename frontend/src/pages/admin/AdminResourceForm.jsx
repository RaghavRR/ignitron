import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/Loader';

const categories = ['Project Tutorials', 'STEM & Robotics Guides', 'AI / IoT Learning', 'Teacher Resources', 'Blogs', 'Downloads', 'Competitions'];

const AdminResourceForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', category: categories[0], excerpt: '', content: '', metaTitle: '', metaDescription: '', isPublished: true });
  const [coverImage, setCoverImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.get('/resources/admin/all').then(({ data }) => {
      const r = data.find((x) => x._id === id);
      if (r) setForm(r);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (!['coverImage', 'fileUrl', '_id', 'slug'].includes(k)) fd.append(k, v);
    });
    if (coverImage) fd.append('coverImage', coverImage);
    if (file) fd.append('file', file);
    try {
      if (isEdit) await api.put(`/resources/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/resources', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin/resources');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ignitron-navy mb-8">{isEdit ? 'Edit Resource' : 'Add Resource'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-100 space-y-5 max-w-3xl">
        <input required placeholder="Title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <textarea required placeholder="Short excerpt" rows="2" className="input" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <textarea required placeholder="Full content" rows="8" className="input" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <div>
          <label className="text-sm font-semibold">Cover Image</label>
          <input type="file" accept="image/*" className="input mt-1" onChange={(e) => setCoverImage(e.target.files[0])} />
        </div>
        <div>
          <label className="text-sm font-semibold">Downloadable File (PDF etc, optional)</label>
          <input type="file" className="input mt-1" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <input placeholder="Meta title (SEO)" className="input" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
        <textarea placeholder="Meta description (SEO)" rows="2" className="input" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} />
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Published
        </label>
        <button disabled={saving} className="btn-primary disabled:opacity-60">{saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default AdminResourceForm;
