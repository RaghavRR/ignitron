// import React, { useEffect, useState } from 'react';
// import api, { resolveAsset } from '../../api/axios';
// import Loader from '../../components/Loader';
// import { FiTrash2, FiPlus } from 'react-icons/fi';

// const AdminTestimonials = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({ name: '', designation: '', institution: '', message: '' });
//   const [photo, setPhoto] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const fetchItems = () => {
//     setLoading(true);
//     api.get('/testimonials/admin/all').then(({ data }) => setItems(data)).finally(() => setLoading(false));
//   };

//   useEffect(() => { fetchItems(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     const fd = new FormData();
//     Object.entries(form).forEach(([k, v]) => fd.append(k, v));
//     if (photo) fd.append('photo', photo);
//     try {
//       await api.post('/testimonials', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//       setForm({ name: '', designation: '', institution: '', message: '' });
//       setPhoto(null);
//       fetchItems();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to save');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this testimonial?')) return;
//     await api.delete(`/testimonials/${id}`);
//     fetchItems();
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Testimonials</h1>
//       <p className="text-gray-500 mb-8">Add principal, teacher or student testimonials.</p>

//       <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-100 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
//         <input required placeholder="Name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//         <input required placeholder="Designation" className="input" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
//         <input required placeholder="Institution" className="input md:col-span-2" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
//         <textarea required placeholder="Testimonial message" rows="3" className="input md:col-span-2" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
//         <input type="file" accept="image/*" className="input" onChange={(e) => setPhoto(e.target.files[0])} />
//         <button disabled={saving} className="btn-primary md:col-span-2 justify-center disabled:opacity-60"><FiPlus /> {saving ? 'Saving...' : 'Add Testimonial'}</button>
//       </form>

//       {loading ? <Loader /> : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {items.map((t) => (
//             <div key={t._id} className="bg-white rounded-xl p-5 border border-gray-100 relative">
//               <button onClick={() => handleDelete(t._id)} className="absolute top-3 right-3 text-red-500"><FiTrash2 /></button>
//               <div className="flex items-center gap-3 mb-3">
//                 {t.photo && <img src={resolveAsset(t.photo)} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
//                 <div>
//                   <p className="font-semibold text-sm">{t.name}</p>
//                   <p className="text-xs text-gray-500">{t.designation}, {t.institution}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-600">"{t.message}"</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTestimonials;
