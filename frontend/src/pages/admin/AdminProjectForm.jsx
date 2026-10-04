import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { resolveAsset } from '../../api/axios';
import Loader from '../../components/Loader';

const emptyProject = {
  title: '', difficulty: 'Beginner', category: 'Robotics', timeRequired: '', overview: '',
  technologies: [], skills: [], whatYouLearn: [], howToMake: [], upgradeIdeas: [],
  components: [], troubleshooting: [], code: '', codeLanguage: 'cpp', videoUrl: '', challenge: '',
  isFeatured: false, isPublished: true,
};

// helper: turn a newline-separated textarea into an array, and back
const toLines = (arr) => (arr || []).join('\n');
const fromLines = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean);

const AdminProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProject);
  const [coverImage, setCoverImage] = useState(null);
  const [circuitDiagram, setCircuitDiagram] = useState(null);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/projects/admin/all`).then(({ data }) => {
      const p = data.find((pr) => pr._id === id);
      if (p) {
        setForm(p);
        setExisting(p);
      }
      setLoading(false);
    });
  }, [id]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleComponentChange = (idx, key, value) => {
    const updated = [...form.components];
    updated[idx] = { ...updated[idx], [key]: value };
    setForm({ ...form, components: updated });
  };
  const addComponent = () => setForm({ ...form, components: [...form.components, { name: '', quantity: '' }] });
  const removeComponent = (idx) => setForm({ ...form, components: form.components.filter((_, i) => i !== idx) });

  const handleTroubleChange = (idx, key, value) => {
    const updated = [...form.troubleshooting];
    updated[idx] = { ...updated[idx], [key]: value };
    setForm({ ...form, troubleshooting: updated });
  };
  const addTrouble = () => setForm({ ...form, troubleshooting: [...form.troubleshooting, { issue: '', fix: '' }] });
  const removeTrouble = (idx) => setForm({ ...form, troubleshooting: form.troubleshooting.filter((_, i) => i !== idx) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (['technologies', 'skills', 'whatYouLearn', 'howToMake', 'upgradeIdeas', 'components', 'troubleshooting'].includes(key)) {
        fd.append(key, JSON.stringify(value));
      } else if (key !== 'coverImage' && key !== 'circuitDiagram' && key !== '_id' && key !== 'slug' && key !== 'relatedProjects') {
        fd.append(key, value);
      }
    });
    if (coverImage) fd.append('coverImage', coverImage);
    if (circuitDiagram) fd.append('circuitDiagram', circuitDiagram);

    try {
      if (isEdit) {
        await api.put(`/projects/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/admin/projects');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ignitron-navy mb-8">{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-100 space-y-6 max-w-3xl">
        <div>
          <label className="text-sm font-semibold">Title</label>
          <input required className="input mt-1" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Category</label>
            <select className="input mt-1" value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
              {['Robotics', 'AI', 'IoT', 'Electronics'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">Difficulty</label>
            <select className="input mt-1" value={form.difficulty} onChange={(e) => handleChange('difficulty', e.target.value)}>
              {['Beginner', 'Intermediate', 'Advanced'].map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Time Required</label>
          <input className="input mt-1" value={form.timeRequired} onChange={(e) => handleChange('timeRequired', e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-semibold">Overview</label>
          <textarea required rows="3" className="input mt-1" value={form.overview} onChange={(e) => handleChange('overview', e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-semibold">Cover Image</label>
          {existing?.coverImage && <img src={resolveAsset(existing.coverImage)} alt="cover" className="w-32 h-20 object-cover rounded-lg my-2" />}
          <input type="file" accept="image/*" className="mt-1" onChange={(e) => setCoverImage(e.target.files[0])} required={!isEdit} />
        </div>

        <div>
          <label className="text-sm font-semibold">Technologies (comma separated)</label>
          <input className="input mt-1" value={(form.technologies || []).join(', ')} onChange={(e) => handleChange('technologies', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
        </div>
        <div>
          <label className="text-sm font-semibold">Skills (comma separated)</label>
          <input className="input mt-1" value={(form.skills || []).join(', ')} onChange={(e) => handleChange('skills', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
        </div>

        <div>
          <label className="text-sm font-semibold">What You'll Learn (one per line)</label>
          <textarea rows="3" className="input mt-1" value={toLines(form.whatYouLearn)} onChange={(e) => handleChange('whatYouLearn', fromLines(e.target.value))} />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">Components Required</label>
          {form.components.map((c, idx) => (
            <div key={idx} className="flex gap-3 mb-2">
              <input placeholder="Component name" className="input" value={c.name} onChange={(e) => handleComponentChange(idx, 'name', e.target.value)} />
              <input placeholder="Qty" className="input w-24" value={c.quantity} onChange={(e) => handleComponentChange(idx, 'quantity', e.target.value)} />
              <button type="button" onClick={() => removeComponent(idx)} className="text-red-500 px-2">✕</button>
            </div>
          ))}
          <button type="button" onClick={addComponent} className="text-ignitron-orange text-sm font-semibold">+ Add Component</button>
        </div>

        <div>
          <label className="text-sm font-semibold">Circuit / Wiring Diagram (optional)</label>
          {existing?.circuitDiagram && <img src={resolveAsset(existing.circuitDiagram)} alt="circuit" className="w-32 h-20 object-cover rounded-lg my-2" />}
          <input type="file" accept="image/*" className="mt-1" onChange={(e) => setCircuitDiagram(e.target.files[0])} />
        </div>

        <div>
          <label className="text-sm font-semibold">How to Make (one step per line)</label>
          <textarea rows="4" className="input mt-1" value={toLines(form.howToMake)} onChange={(e) => handleChange('howToMake', fromLines(e.target.value))} />
        </div>

        <div>
          <label className="text-sm font-semibold">Code</label>
          <textarea rows="6" className="input mt-1 font-mono text-xs" value={form.code} onChange={(e) => handleChange('code', e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-semibold">Working Video (embed URL)</label>
          <input className="input mt-1" value={form.videoUrl} onChange={(e) => handleChange('videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">Testing / Troubleshooting</label>
          {form.troubleshooting.map((t, idx) => (
            <div key={idx} className="flex gap-3 mb-2">
              <input placeholder="Issue" className="input" value={t.issue} onChange={(e) => handleTroubleChange(idx, 'issue', e.target.value)} />
              <input placeholder="Fix" className="input" value={t.fix} onChange={(e) => handleTroubleChange(idx, 'fix', e.target.value)} />
              <button type="button" onClick={() => removeTrouble(idx)} className="text-red-500 px-2">✕</button>
            </div>
          ))}
          <button type="button" onClick={addTrouble} className="text-ignitron-orange text-sm font-semibold">+ Add Issue</button>
        </div>

        <div>
          <label className="text-sm font-semibold">Challenge</label>
          <textarea rows="2" className="input mt-1" value={form.challenge} onChange={(e) => handleChange('challenge', e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-semibold">Upgrade Ideas (one per line)</label>
          <textarea rows="3" className="input mt-1" value={toLines(form.upgradeIdeas)} onChange={(e) => handleChange('upgradeIdeas', fromLines(e.target.value))} />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => handleChange('isFeatured', e.target.checked)} /> Featured on Homepage
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => handleChange('isPublished', e.target.checked)} /> Published
          </label>
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default AdminProjectForm;
