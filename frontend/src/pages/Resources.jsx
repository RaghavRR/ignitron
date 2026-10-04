import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import api, { resolveAsset } from '../api/axios';
import EditableImage from '../components/EditableImage';
import Loader from '../components/Loader';

const categories = ['All', 'Project Tutorials', 'STEM & Robotics Guides', 'AI / IoT Learning', 'Teacher Resources', 'Blogs', 'Downloads', 'Competitions'];

const Resources = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      api.get('/resources', { params: { category, search } }).then(({ data }) => setItems(data)).finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [category, search]);

  return (
    <>
      <section className="bg-white section !pb-8">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow mb-2">Resources</p>
            <h1 className="heading-lg">Tutorials, Guides & Teacher Resources.</h1>
          </div>
          <EditableImage keyName="resources_hero" alt="IGNITRON resources" className="rounded-2xl w-full h-[260px] object-cover" />
        </div>
      </section>

      <section className="section !pt-4 bg-white">
        <div className="container-max">
          <div className="relative mb-6 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ignitron-orange"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold border transition-colors ${
                  category === c ? 'bg-ignitron-orange text-white border-ignitron-orange' : 'border-gray-200 text-gray-600 hover:border-ignitron-orange'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? <Loader /> : items.length === 0 ? (
            <p className="text-gray-500 text-center py-16">No resources in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((r) => (
                <Link to={`/resources/${r.slug}`} key={r._id} className="card overflow-hidden">
                  {r.coverImage && <img src={resolveAsset(r.coverImage)} alt={r.title} className="w-full h-44 object-cover" />}
                  <div className="p-5">
                    <span className="text-xs font-semibold text-ignitron-orange">{r.category}</span>
                    <h3 className="font-bold text-lg mt-2 mb-2">{r.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Resources;
