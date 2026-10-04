import React, { useEffect, useState } from 'react';
import api, { resolveAsset } from '../../api/axios';
import Loader from '../../components/Loader';
import { FiUpload } from 'react-icons/fi';

// The core admin requirement: replace ANY photo on the website from one screen.
// Each row is a SiteImage slot; uploading a new file updates that slot in place
// and the change is instantly reflected everywhere <EditableImage keyName="..."/> is used.
const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState(null);

  const fetchImages = () => {
    setLoading(true);
    api.get('/images').then(({ data }) => setImages(data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const handleReplace = async (key, file) => {
    if (!file) return;
    setUploadingKey(key);
    const formData = new FormData();
    formData.append('image', file);
    try {
      await api.put(`/images/${key}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploadingKey(null);
    }
  };

  const grouped = images.reduce((acc, img) => {
    acc[img.page] = acc[img.page] || [];
    acc[img.page].push(img);
    return acc;
  }, {});

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ignitron-navy mb-1">Site Photos</h1>
      <p className="text-gray-500 mb-8">Replace any photo on the live website. Changes go live immediately.</p>

      {Object.entries(grouped).map(([page, imgs]) => (
        <div key={page} className="mb-10">
          <h2 className="font-bold text-lg mb-4 capitalize">{page}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {imgs.map((img) => (
              <div key={img.key} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <img src={resolveAsset(img.imageUrl)} alt={img.label} className="w-full h-40 object-cover rounded-lg mb-3" />
                <p className="font-semibold text-sm">{img.label}</p>
                <p className="text-xs text-gray-400 mb-3">key: {img.key}</p>
                <label className="btn-secondary w-full justify-center text-sm cursor-pointer !py-2">
                  {uploadingKey === img.key ? 'Uploading...' : <><FiUpload /> Replace Photo</>}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingKey === img.key}
                    onChange={(e) => handleReplace(img.key, e.target.files[0])}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminImages;
