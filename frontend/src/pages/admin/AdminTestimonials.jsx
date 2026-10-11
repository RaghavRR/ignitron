
import React, { useEffect, useState } from "react";
import api, { resolveAsset } from "../../api/axios";

const emptyForm = {
  name: "",
  designation: "",
  institution: "",
  message: "",
  isPublished: true,
  photo: null,
};

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/testimonials/admin/all");
      setItems(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Testimonials load nahi ho paaye. Login/token check karo."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;

    if (type === "file") {
  const file = files?.[0] || null;

  setForm((prev) => ({ ...prev, photo: file }));
  setPhotoPreview(file ? URL.createObjectURL(file) : "");
  return;
}

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files?.[0] || null
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setPhotoPreview("");
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setPhotoPreview(item.photo ? resolveAsset(item.photo) : "");
    setForm({
      name: item.name || "",
      designation: item.designation || "",
      institution: item.institution || "",
      message: item.message || "",
      isPublished: Boolean(item.isPublished),
      photo: null,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = new FormData();

      payload.append("name", form.name.trim());
      payload.append("designation", form.designation.trim());
      payload.append("institution", form.institution.trim());
      payload.append("message", form.message.trim());
      payload.append("isPublished", String(form.isPublished));

      if (form.photo) {
        payload.append("photo", form.photo);
      }

      if (editingId) {
        await api.put(`/testimonials/${editingId}`, payload);
      } else {
        await api.post("/testimonials", payload);
      }

      resetForm();
      await loadTestimonials();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Testimonial save nahi hua. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete testimonial by ${item.name}?`)) return;

    try {
      await api.delete(`/testimonials/${item._id}`);
      if (editingId === item._id) resetForm();
      await loadTestimonials();
    } catch (err) {
      setError(
        err.response?.data?.message || "Delete nahi ho paya."
      );
    }
  };

  const togglePublished = async (item) => {
    try {
      const payload = new FormData();
      payload.append("name", item.name);
      payload.append("designation", item.designation);
      payload.append("institution", item.institution);
      payload.append("message", item.message);
      payload.append("isPublished", String(!item.isPublished));

      await api.put(`/testimonials/${item._id}`, payload);
      await loadTestimonials();
    } catch (err) {
      setError(
        err.response?.data?.message || "Publish status update nahi hua."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Website Management
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Testimonials
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage feedback from teachers and school representatives.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            {editingId ? "Edit Testimonial" : "Add Testimonial"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Teacher / Person Name *
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500"
                placeholder="e.g. Rahul Sharma"
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Designation *
              <input
                required
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500"
                placeholder="e.g. STEM Educator"
              />
            </label>

            <label className="text-sm font-medium text-gray-700 sm:col-span-2">
              School / Institution *
              <input
                required
                name="institution"
                value={form.institution}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500"
                placeholder="School or institution name"
              />
            </label>

            <label className="text-sm font-medium text-gray-700 sm:col-span-2">
              Testimonial / Feedback *
              <textarea
                required
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500"
                placeholder="Manage feedback from teachers and school representatives?"
              />
            </label>

            <label className="text-sm font-medium text-gray-700 sm:col-span-2">
              Teacher Photo
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 p-3 text-sm"
              />
              <span className="mt-1 block text-xs text-gray-500">
                If you don't select a photo while editing, the existing photo will remain.
              </span>
            </label>

            <label className="flex items-center gap-3 text-sm font-medium text-gray-700 sm:col-span-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="h-4 w-4 accent-orange-500"
              />
              Publish on homepage
            </label>
          </div>

          {photoPreview && (
  <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
    <p className="mb-2 text-sm font-medium text-gray-700">
      Photo Preview
    </p>
    <img
      src={photoPreview}
      alt="Testimonial preview"
      className="max-h-64 w-full object-contain"
    />
  </div>
)}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              disabled={saving}
              className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            All Testimonials ({items.length})
          </h2>
          <button
            onClick={loadTestimonials}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="py-8 text-center text-gray-500">Loading testimonials...</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            Abhi koi testimonial add nahi hua hai.
          </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
  {items.map((item) => (
    <article
      key={item._id}
      className="min-w-0 w-full h-fit rounded-xl border border-gray-200 bg-white p-4 overflow-hidden"
    >
                
<div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3">
  {item.photo ? (
    <img
      src={resolveAsset(item.photo)}
      alt={item.name}
      className="h-full w-full object-contain"
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden";
      }}
    />
  ) : (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600">
      {item.name?.charAt(0)?.toUpperCase() || "T"}
    </div>
  )}
</div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.designation}</p>
                    <p className="text-sm font-medium text-orange-600">
                      {item.institution}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      item.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="mt-3 min-w-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                    {item.message}
                    </p>

                <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublished(item)}
                    className="rounded-lg border border-orange-200 px-3 py-2 text-sm font-semibold text-orange-700"
                  >
                    {item.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
