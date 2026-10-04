import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  createKit,
  getKitById,
  updateKit,
} from '../../api/kits';

const initialForm = {
  name: '',
  shortDescription: '',
  description: '',
  image: '',
  videoUrl: '',
  price: '',
  originalPrice: '',
  features: [''],
  includedItems: [''],
  skills: [''],
  ageGroup: '',
  classLevel: '',
  category: 'STEM',
  stock: 0,
  featured: false,
  isActive: true,
  sortOrder: 0,
};

const AdminKitForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // ==========================================
  // FETCH EDIT KIT
  // ==========================================

  useEffect(() => {
    if (!isEditMode) return;

    const fetchKit = async () => {
      try {
        const result = await getKitById(id);

        if (result.success) {
          const kit = result.data;

          setForm({
            name: kit.name || '',
            shortDescription:
              kit.shortDescription || '',
            description: kit.description || '',
            image: kit.image || '',
            videoUrl: kit.videoUrl || '',
            price: kit.price ?? '',
            originalPrice:
              kit.originalPrice ?? '',
            features:
              kit.features?.length > 0
                ? kit.features
                : [''],
            includedItems:
              kit.includedItems?.length > 0
                ? kit.includedItems
                : [''],
            skills:
              kit.skills?.length > 0
                ? kit.skills
                : [''],
            ageGroup: kit.ageGroup || '',
            classLevel: kit.classLevel || '',
            category: kit.category || 'STEM',
            stock: kit.stock ?? 0,
            featured: Boolean(kit.featured),
            isActive:
              kit.isActive !== undefined
                ? kit.isActive
                : true,
            sortOrder: kit.sortOrder ?? 0,
          });
        }
      } catch (err) {
        setError(
          err.message || 'Failed to load kit'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKit();
  }, [id, isEditMode]);

  // ==========================================
  // NORMAL INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));
  };

const handleImageDrop = (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files?.[0];

  if (!file || !file.type.startsWith('image/')) {
    setError('Please upload a valid image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const imageUrl = reader.result;

    setImageFile(file);
    setImagePreview(imageUrl);

    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    setError('');
  };

  reader.readAsDataURL(file);
};

const handleImageSelect = (e) => {
  const file = e.target.files?.[0];

  if (!file || !file.type.startsWith('image/')) {
    setError('Please upload a valid image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const imageUrl = reader.result;

    setImageFile(file);
    setImagePreview(imageUrl);

    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    setError('');
  };

  reader.readAsDataURL(file);
};

  // ==========================================
  // ARRAY INPUTS
  // ==========================================

  const updateArrayItem = (
    field,
    index,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map(
        (item, itemIndex) =>
          itemIndex === index
            ? value
            : item
      ),
    }));
  };

  const addArrayItem = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        '',
      ],
    }));
  };

  const removeArrayItem = (
    field,
    index
  ) => {
    setForm((prev) => {
      const updated = prev[field].filter(
        (_, itemIndex) =>
          itemIndex !== index
      );

      return {
        ...prev,
        [field]:
          updated.length > 0
            ? updated
            : [''],
      };
    });
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validate = () => {
    if (!form.name.trim()) {
      return 'Kit name is required';
    }

    if (!form.shortDescription.trim()) {
      return 'Short description is required';
    }

    if (!form.description.trim()) {
      return 'Description is required';
    }

    if (!form.image.trim() && !imageFile) {
      return 'Product image is required';
    }

    if (
      form.price === '' ||
      Number(form.price) < 0
    ) {
      return 'Enter a valid price';
    }

    if (
      form.originalPrice !== '' &&
      Number(form.originalPrice) < 0
    ) {
      return 'Enter a valid original price';
    }

    if (
      form.stock !== '' &&
      Number(form.stock) < 0
    ) {
      return 'Stock cannot be negative';
    }

    return '';
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: form.name.trim(),

        shortDescription:
          form.shortDescription.trim(),

        description:
          form.description.trim(),

        image: form.image.trim(),

        videoUrl:
          form.videoUrl.trim(),

        price: Number(form.price),

        originalPrice:
          form.originalPrice === ''
            ? null
            : Number(form.originalPrice),

        features: form.features
          .map((item) => item.trim())
          .filter(Boolean),

        includedItems:
          form.includedItems
            .map((item) => item.trim())
            .filter(Boolean),

        skills: form.skills
          .map((item) => item.trim())
          .filter(Boolean),

        ageGroup:
          form.ageGroup.trim(),

        classLevel:
          form.classLevel.trim(),

        category:
          form.category.trim() || 'STEM',

        stock: Number(form.stock) || 0,

        featured:
          Boolean(form.featured),

        isActive:
          Boolean(form.isActive),

        sortOrder:
          Number(form.sortOrder) || 0,
      };

      if (isEditMode) {
        await updateKit(id, payload);
      } else {
        await createKit(payload);
      }

      navigate('/admin/kits');
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          'Failed to save kit'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading kit...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/admin/kits"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Kits
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mt-3">
          {isEditMode
            ? 'Edit Kit'
            : 'Add New Kit'}
        </h1>

        <p className="text-gray-500 mt-1">
          {isEditMode
            ? 'Update your kit information.'
            : 'Add a new DIY STEM kit to your website.'}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >
        {/* ================================= */}
        {/* BASIC INFORMATION */}
        {/* ================================= */}

        <FormSection title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Kit Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Arduino Smart Car Kit"
            />

            <Input
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Robotics"
            />
          </div>

          <Textarea
            label="Short Description *"
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="Short description visible on the kit card..."
            rows={3}
          />

          <Textarea
            label="Full Description *"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Detailed description of the kit..."
            rows={7}
          />
        </FormSection>

        {/* ================================= */}
        {/* IMAGE / VIDEO */}
        {/* ================================= */}

        <FormSection title="Media">
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image *
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              onClick={() => document.getElementById('product-image').click()}
              className="w-full min-h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-black transition bg-gray-50"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-full max-w-md h-56 object-contain rounded-xl"
                />
              ) : form.image ? (
                <img
                  src={form.image}
                  alt="Product Preview"
                  className="w-full max-w-md h-56 object-contain rounded-xl"
                />
              ) : (
                <>
                  <div className="text-4xl mb-3">📁</div>

                  <p className="font-medium">
                    Drag & Drop your image here
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    or click to browse
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG, JPEG, WEBP
                  </p>
                </>
              )}

              <input
                id="product-image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>

          <Input
            label="Video URL"
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </FormSection>

        {/* ================================= */}
        {/* PRICE */}
        {/* ================================= */}

        <FormSection title="Pricing & Stock">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              label="Selling Price *"
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="1499"
            />

            <Input
              label="Original Price"
              name="originalPrice"
              type="number"
              min="0"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="1999"
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              placeholder="20"
            />
          </div>
        </FormSection>

        {/* ================================= */}
        {/* FEATURES */}
        {/* ================================= */}

        <FormSection title="Features">
          <DynamicList
            items={form.features}
            field="features"
            placeholder="Arduino Uno included"
            updateItem={updateArrayItem}
            addItem={addArrayItem}
            removeItem={removeArrayItem}
          />
        </FormSection>

        {/* ================================= */}
        {/* INCLUDED ITEMS */}
        {/* ================================= */}

        <FormSection title="What's Included">
          <DynamicList
            items={form.includedItems}
            field="includedItems"
            placeholder="Arduino Uno"
            updateItem={updateArrayItem}
            addItem={addArrayItem}
            removeItem={removeArrayItem}
          />
        </FormSection>

        {/* ================================= */}
        {/* SKILLS */}
        {/* ================================= */}

        <FormSection title="Skills Developed">
          <DynamicList
            items={form.skills}
            field="skills"
            placeholder="Robotics"
            updateItem={updateArrayItem}
            addItem={addArrayItem}
            removeItem={removeArrayItem}
          />
        </FormSection>

        {/* ================================= */}
        {/* EDUCATION */}
        {/* ================================= */}

        <FormSection title="Recommended For">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Age Group"
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
              placeholder="12-18 Years"
            />

            <Input
              label="Class Level"
              name="classLevel"
              value={form.classLevel}
              onChange={handleChange}
              placeholder="Class 8-12"
            />
          </div>
        </FormSection>

        {/* ================================= */}
        {/* SETTINGS */}
        {/* ================================= */}

        <FormSection title="Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Sort Order"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="space-y-4">
            <Checkbox
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              label="Featured Kit"
              description="Show this kit as a featured product."
            />

            <Checkbox
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              label="Active"
              description="Show this kit on the public website."
            />
          </div>
        </FormSection>

        {/* ================================= */}
        {/* SUBMIT */}
        {/* ================================= */}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary justify-center disabled:opacity-50"
          >
            {saving
              ? 'Saving...'
              : isEditMode
              ? 'Update Kit'
              : 'Create Kit'}
          </button>

          <Link
            to="/admin/kits"
            className="px-6 py-3 rounded-xl border text-center hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

/* ==========================================
   REUSABLE COMPONENTS
========================================== */

const FormSection = ({
  title,
  children,
}) => (
  <section className="bg-white rounded-2xl p-6 md:p-7 shadow-sm">
    <h2 className="text-lg font-bold mb-6">
      {title}
    </h2>

    <div className="space-y-5">
      {children}
    </div>
  </section>
);

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black transition"
    />
  </div>
);

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label}
    </label>

    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black transition resize-y"
    />
  </div>
);

const Checkbox = ({
  name,
  checked,
  onChange,
  label,
  description,
}) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="mt-1 w-4 h-4"
    />

    <span>
      <span className="block font-medium">
        {label}
      </span>

      <span className="block text-sm text-gray-500">
        {description}
      </span>
    </span>
  </label>
);

const DynamicList = ({
  items,
  field,
  placeholder,
  updateItem,
  addItem,
  removeItem,
}) => (
  <div className="space-y-3">
    {items.map((item, index) => (
      <div
        key={`${field}-${index}`}
        className="flex gap-2"
      >
        <input
          type="text"
          value={item}
          onChange={(e) =>
            updateItem(
              field,
              index,
              e.target.value
            )
          }
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black"
        />

        <button
          type="button"
          onClick={() =>
            removeItem(field, index)
          }
          className="px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
        >
          ×
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={() => addItem(field)}
      className="text-sm font-medium hover:underline"
    >
      + Add Item
    </button>
  </div>
);

export default AdminKitForm;