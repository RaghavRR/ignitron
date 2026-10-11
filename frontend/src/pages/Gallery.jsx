import React, { useEffect, useState } from 'react';
import api, { resolveAsset } from '../api/axios';
import EditableImage from '../components/EditableImage';
import SectionHeader from '../components/SectionHeader';
import Loader from '../components/Loader';

const categories = ['All', 'Workshops', 'Robotics', 'Innovation Labs', 'Student Projects', 'Competitions', 'Events'];

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/gallery', { params: { category } }).then(({ data }) => setItems(data)).finally(() => setLoading(false));
  }, [category]);

  return (
    <>
      <section className="bg-white section !pb-8">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow mb-2">IGNITRON in Action</p>
            <h1 className="heading-lg">Real Labs. Real Projects. Real Students.</h1>
          </div>
          <EditableImage keyName="gallery_hero" alt="IGNITRON gallery" className="rounded-2xl w-full h-[260px] object-cover" />
        </div>
      </section>

      <section className="section !pt-4 bg-white">
        <div className="container-max">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  category === c ? 'bg-ignitron-orange text-white border-ignitron-orange' : 'border-gray-200 text-gray-600 hover:border-ignitron-orange'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? <Loader /> : items.length === 0 ? (
            <p className="text-gray-500 text-center py-16">No items in this category yet.</p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setLightbox(item)}
                  className="block w-full break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
{item.type === 'video' ? (
  <div className="relative w-full overflow-hidden rounded-xl bg-gray-950 group">
    <video
      src={resolveAsset(item.mediaUrl)}
      className="w-full h-56 object-cover opacity-80 transition duration-300 group-hover:opacity-60"
      muted
      preload="metadata"
      playsInline
    />

    <div className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ignitron-orange shadow-lg transition-transform group-hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>

    <span className="absolute left-3 top-3 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
      Video
    </span>

    <span className="absolute bottom-3 left-3 text-xs font-medium text-white">
      Watch video
    </span>
  </div>
) : (
  <img
    src={resolveAsset(item.mediaUrl)}
    alt={item.title}
    className="w-full h-auto transition duration-300 hover:scale-[1.02]"
    loading="lazy"
  />
)}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === 'video' ? (
              <video
  src={resolveAsset(lightbox.mediaUrl)}
  controls
  autoPlay
  playsInline
  preload="metadata"
  className="w-full rounded-xl max-h-[80vh] bg-black"
/>
            ) : (
              <img src={resolveAsset(lightbox.mediaUrl)} alt={lightbox.title} className="w-full rounded-xl max-h-[80vh] object-contain" />
            )}
            <p className="text-white text-center mt-4">{lightbox.caption || lightbox.title}</p>
          </div>
          <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setLightbox(null)}>×</button>
        </div>
      )}
    </>
  );
};

export default Gallery;
